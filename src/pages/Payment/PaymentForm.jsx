// payments gayway 
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { TbFidgetSpinner } from "react-icons/tb";

const PaymentForm = ({ amount, setShowModal, refetch, donationData }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state
  const navigate = useNavigate();

  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    setLoading(true); // ✅ Start loading

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    } else {
      setError("");
    }

    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        donationId: donationData._id,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          const transactionId = result.paymentIntent.id;
          const paymentMethod = result.paymentIntent.payment_method_types;
          const donorData = {
            donationId: donationData._id,
            name: user.displayName,
            email: user.email,
            amount,
            transactionId,
            paymentMethod,
          };
          const donorsRes = await axiosSecure.post("/donors", donorData);
          if (donorsRes.data.updatedOrInsertedId) {
            setShowModal(false);
            refetch();
            await Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
              confirmButtonText: "Go to My Parcels",
            });
            navigate("/dashboard/my-donations");
          }
        }
      }
    } catch (err) {
      setError("Something went wrong during payment.");
    } finally {
      setLoading(false); // ✅ End loading
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded" />
        <button
          type="submit"
          className="bg-secondary py-2 rounded-2xl cursor-pointer text-white w-full flex justify-center items-center gap-2"
          disabled={!stripe || loading}
        >
          {loading ? (
            <>
              <TbFidgetSpinner className="animate-spin text-lg" />
              Processing...
            </>
          ) : (
            <>Pay ${amount}</>
          )}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
