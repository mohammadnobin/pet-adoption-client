import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Shared/Container";
import Title from "../../components/Shared/Title/Title";
import Payment from "../Payment/Payment";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import { format } from "date-fns";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const { user, loading } = useAuth();

  // Get donation details
  const {
    data: donation,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-details/${id}`);
      return res.data;
    },
  });
  const isPaused = donation?.pause !== "resume";
  const isExpired = new Date(donation?.lastDate) < new Date();


  const { data: recommended = [] } = useQuery({
  queryKey: ["recommendedDonations", donation?._id],
  queryFn: async () => {
    const res = await axiosSecure.get(
      `/donationsrecommended?excludeId=${donation?._id}`
    );
    return res.data;
  },
  enabled: !!donation?._id,
});


  if (isLoading || loading) {
    return (
      // Skeleton Loader
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-full md:w-1/2 h-80 md:h-[450px]">
          <Skeleton height="100%" className="rounded-2xl" />
        </div>
        <div className="flex-1 space-y-4 w-full">
          <Skeleton height={32} width="60%" />
          <Skeleton height={24} width="40%" />
          <Skeleton height={24} width="50%" />
          <Skeleton height={24} width="70%" />
          <Skeleton height={80} />
          <Skeleton height={40} width="30%" />
        </div>
      </div>
    );
  }

  return (
    <Container>
      <div className="py-10 space-y-6">
        <Title titels="Donation " titese="Campaign" />
        <div className="max-w-3xl mx-auto backdrop-blur bg-gradient-to-t from-secondary/8 via-bash to-secondary/8  border-2 border-secondary/15 rounded-xl shadow-lg p-4 md:p-6 space-y-4">
          <img
            src={donation.petImage}
            alt={donation.petName}
            className="w-full h-64 md:h-[400px] object-cover rounded-lg border"
          />

          <h2 className="text-2xl font-bold text-secondary">
            {donation.petName}
          </h2>

          <p className="text-gray-600">
            <strong>Short Description:</strong> {donation.shortDescription}
          </p>

          <p className="text-gray-600">
            <strong>Long Description:</strong> {donation.longDescription}
          </p>

          <p className="text-gray-600">
            <strong>Max Donation:</strong> ${donation.maxDonation}
          </p>

          <p className="text-gray-600">
            <strong>Collected:</strong> ${donation.collectedAmount}
          </p>

          <p className="text-gray-600">
            <strong>Created At:</strong>{" "}
            {format(new Date(donation.createdAt), "MMMM d, yyyy")}
          </p>

          <p className="text-gray-600">
            <strong>Last Date:</strong>{" "}
            {format(new Date(donation.lastDate), "MMMM d, yyyy")}
          </p>

          <p className="text-gray-600">
            <strong>Status:</strong> {donation.status}
          </p>

          <p className="text-gray-600">
            <strong>Owner:</strong> {donation.campaignOwnerName} (
            {donation.campaignOwnerEmail})
          </p>
          {donation.campaignOwnerEmail === user?.email ? (
            <p className="text-red-500 font-medium">
              🚫 You cannot donate to your own campaign.
            </p>
          ) : isPaused ? (
            <p className="text-red-500 font-medium">
              🚫 This donation campaign is currently paused.
            </p>
          ) : isExpired ? (
            <p className="text-red-500 font-medium">
              ⌛ Donation period has expired.
            </p>
          ) : (
            <button
              className="bg-secondary hover:bg-secondary/90 text-white px-6 py-2 rounded"
              onClick={() => setShowModal(true)}
            >
              💖 Donate Now
            </button>
          )}
          {showModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className="bg-white p-6 rounded-lg max-w-md w-full relative shadow-xl">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        onClick={() => setShowModal(false)}
      >
        ✕
      </button>
      <h3 className="text-xl font-semibold mb-4 text-center text-secondary">
        Donate to: {donation.shortDescription}
      </h3>

      <input
        type="number"
        placeholder="Enter donation amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded mb-2 focus:outline-none focus:ring focus:ring-secondary/40"
        required
      />

      {/* ✅ Validation */}
      {amount && (Number(amount) <= 0 || Number(amount) > Number(donation.maxDonation)) ? (
        <p className="text-sm text-red-500 text-center mb-2">
          Please enter an amount between $1 and ${donation.maxDonation}
        </p>
      ) : null}

      {/* ✅ Show Payment only if amount is valid */}
      {amount &&
      Number(amount) > 0 &&
      Number(amount) <= Number(donation.maxDonation) ? (
        <Payment
          refetch={refetch}
          setShowModal={setShowModal}
          donationData={donation}
          amount={Number(amount)}
        />
      ) : null}
    </div>
  </div>
)}

        </div>
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
