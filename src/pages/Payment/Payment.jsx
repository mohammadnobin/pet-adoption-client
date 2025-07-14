// Payment.jsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);

const Payment = ({ donationData,setShowModal,refetch, amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm donationData={donationData} refetch={refetch} setShowModal={setShowModal} amount={amount} />
    </Elements>
  );
};

export default Payment;
