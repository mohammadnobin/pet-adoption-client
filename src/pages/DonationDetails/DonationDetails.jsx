import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Shared/Container";
import Title from "../../components/Shared/Title/Title";
import Payment from "../Payment/Payment";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");

  // Get donation details
  const { data: donation, isLoading,refetch  } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
  });

  // Get recommended donations
  const { data: recommended = []} = useQuery({
    queryKey: ["recommendedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donationsrecommended");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <Container>
      <div className="py-10 space-y-6">
        <Title
          titels="Donation Campaign"
          titese={donation.shortDescription}
          disciption={donation.longDescription}
        />

        <img
          src={donation.petImage}
          alt="Pet"
          className="w-full h-[400px] object-cover rounded"
        />
        <p>
          <strong>Max Donation:</strong> ${donation.maxDonation}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(donation.createdAt).toLocaleDateString()}
        </p>

        <button
          className="bg-secondary cursor-pointer text-white px-6 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Donate Now
        </button>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold mb-4">
                Donate to: {donation.shortDescription}
              </h3>

              {/* ইনপুট ও পেমেন্ট */}
              <input
                type="number"
                placeholder="Enter donation amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border px-4 py-2 rounded mb-4"
                required
              />

              {/* Stripe Payment Component */}
              {amount && Number(amount) > 0 ? (
                <Payment refetch={refetch} setShowModal={setShowModal} donationData={donation} amount={Number(amount)} />
              ) : (
                <p className="text-sm text-red-500">Enter valid amount</p>
              )}
            </div>
          </div>
        )}

        {/* Recommended Donations */}
        <div>
          <h3 className="text-2xl font-bold mt-12 mb-4">
            Recommended Donations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommended.map((item) => (
              <div
                key={item._id}
                className="border p-4 rounded shadow hover:shadow-lg transition"
              >
                <img
                  src={item.petImage}
                  alt={item.shortDescription}
                  className="w-full h-40 object-cover rounded"
                />
                <h4 className="text-lg font-semibold mt-2">
                  {item.shortDescription}
                </h4>
                <p className="text-sm text-gray-600">
                  Max: ${item.maxDonation}
                </p>
                <Link
                  to={`/donationDetais/${item._id}`}
                  className="block mt-2 bg-secondary text-white text-center py-1 rounded"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DonationDetails;
