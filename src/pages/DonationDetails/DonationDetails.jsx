// Donation Details Page
// ---------------------
// This component displays the full details of a specific donation campaign.
// Features:
// 1. Fetches donation data and recommended campaigns using TanStack Query
// 2. Shows skeleton loader while fetching data
// 3. Displays donation info, including descriptions, amounts, owner info, and status
// 4. Prevents donation if the user is the campaign owner, campaign is paused, or expired
// 5. Donation modal with validation and Stripe Payment integration
// 6. Shows recommended donation campaigns at the bottom

import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Title from "../../components/Shared/Title/Title"; // Page title (currently unused here)
import Payment from "../Payment/Payment"; // Payment component for handling Stripe
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Custom secure Axios instance
import useAuth from "../../hooks/useAuth"; // Get current user & loading state
import Skeleton from "react-loading-skeleton"; // Loading skeleton UI
import { format } from "date-fns"; // Date formatting

const DonationDetails = () => {
  const { id } = useParams(); // Extract donation ID from route
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false); // Controls donation modal visibility
  const [amount, setAmount] = useState(""); // Stores donation input amount
  const { user, loading } = useAuth();

  // Fetch donation details
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

  // Determine if donation is paused or expired
  const isPaused = donation?.pause !== "resume";
  const isExpired = new Date(donation?.lastDate) < new Date();

  // Fetch recommended donation campaigns (excluding current one)
  const { data: recommended = [] } = useQuery({
    queryKey: ["recommendedDonations", donation?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donationsrecommended?excludeId=${donation?._id}`
      );
      return res.data;
    },
    enabled: !!donation?._id, // Only fetch if we already have the main donation
  });

  // Skeleton loader while fetching data
  if (isLoading || loading) {
    return (
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
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Donation Details Card */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-4 max-w-5xl mx-auto backdrop-blur custom_gradientd custom_gradientl dark:border-white border-2 border-secondary/15 rounded-2xl shadow-lg">
        {/* Donation Image */}
        <img
          src={donation.petImage}
          alt={donation.petName}
          className="w-full md:w-1/2 h-80 md:h-[450px] object-cover rounded-2xl shadow-lg border"
        />

        {/* Donation Information */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-secondary dark:text-white tracking-tight">
            {donation.petName}
          </h2>

          <p className="text-gray-700 dark:text-white">
            <strong>Short Description:</strong> {donation.shortDescription}
          </p>

          <p className="text-gray-700 dark:text-white">
            <strong>Long Description:</strong> {donation.longDescription}
          </p>

          <p className="text-gray-700 dark:text-white">
            <strong>Max Donation:</strong> ${donation.maxDonation}
          </p>

          <p className="text-gray-700 dark:text-white">
            <strong>Collected:</strong> ${donation.collectedAmount}
          </p>

          <p className="text-gray-700 dark:text-white">
            <strong>Created At:</strong>{" "}
            {format(new Date(donation.createdAt), "MMMM d, yyyy")}
          </p>

          <p className="text-gray-700 dark:text-white">
            <strong>Last Date:</strong>{" "}
            {format(new Date(donation.lastDate), "MMMM d, yyyy")}
          </p>

          <p className="text-gray-700 dark:text-white">
            <strong>Status:</strong> {donation.status}
          </p>

          <p className="text-gray-700 dark:text-white">
            <strong>Owner:</strong> {donation.campaignOwnerName} (
            {donation.campaignOwnerEmail})
          </p>

          {/* Donation Button / Status Messages */}
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
        </div>
      </div>

      {/* Donation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative shadow-xl dark:bg-black dark:text-white">
            {/* Close Modal */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-4 text-center text-secondary">
              Donate to: {donation.shortDescription}
            </h3>

            {/* Donation Amount Input */}
            <input
              type="number"
              placeholder="Enter donation amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded mb-2 focus:outline-none focus:ring focus:ring-secondary/40 dark:bg-black dark:text-white"
              required
            />
            {amount == 0 && (
              <p className="text-red-500 ">Please enter your amount</p>
            )}

            {/* Amount Validation */}
            {amount &&
            (Number(amount) <= 0 ||
              Number(amount) > Number(donation.maxDonation)) ? (
              <p className="text-sm text-red-500 text-center mb-2">
                Please enter an amount between $1 and ${donation.maxDonation}
              </p>
            ) : null}

            {/* Stripe Payment Component */}
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

      {/* Recommended Donations Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">Recommended Donations</h3>
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
  );
};

export default DonationDetails;
