import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyDonationPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["myDonations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donors/user?email=${user.email}`);
      return res.data;
    },
  });


  const refundMutation = useMutation({
    mutationFn: async (donorId) => {
      await axiosSecure.delete(`/donors/${donorId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myDonations"]);
    },
  });

  const handleRefund = (donorId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to request a refund. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, refund it!",
    }).then((result) => {
      if (result.isConfirmed) {
        refundMutation.mutate(donorId, {
          onSuccess: () => {
            Swal.fire(
              "Refunded!",
              "Your donation has been removed.",
              "success"
            );
          },
          onError: () => {
            Swal.fire("Error!", "Something went wrong.", "error");
          },
        });
      }
    });
  };

  // Skeleton Loader
  const renderSkeletonTable = () =>
    Array(4)
      .fill(0)
      .map((_, i) => (
        <tr key={i}>
          <td className="px-4 py-3">
            <Skeleton height={64} width={64} />
          </td>
          <td className="px-4 py-3">
            <Skeleton width={100} />
          </td>
          <td className="px-4 py-3">
            <Skeleton width={80} />
          </td>
          <td className="px-4 py-3 text-center">
            <Skeleton height={32} width={120} />
          </td>
        </tr>
      ));

  const renderSkeletonCards = () =>
    Array(3)
      .fill(0)
      .map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-md p-4 flex gap-4 animate-pulse"
        >
          <Skeleton height={64} width={64} />
          <div className="flex-1 space-y-2">
            <Skeleton width="60%" />
            <Skeleton width="40%" />
            <Skeleton height={32} width={120} />
          </div>
        </div>
      ));

  return (
    <div className="px-4 py-10 w-full md:w-[70%] mx-auto">
      <h2 className="text-3xl font-bold text-center text-secondary dark:text-white mb-8">
        My Donations
      </h2>

      {/* 🖥️ Table View (Large Device) */}
      <div className="hidden md:block overflow-x-auto rounded-lg border dark:border-white/20">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-white/10">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Pet Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Pet Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Donated Amount
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-black divide-y divide-gray-100 dark:divide-white/10">
            {isLoading ? (
              renderSkeletonTable()
            ) : donations.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-500 dark:text-gray-400 italic"
                >
                  You haven't donated yet.
                </td>
              </tr>
            ) : (
              donations.map((donation) => (
                <tr key={donation._id}>
                  <td className="px-4 py-3">
                    <img
                      src={donation.petImage}
                      alt={donation.petName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium dark:text-white">
                    {donation.petName}
                  </td>
                  <td className="px-4 py-3 dark:text-white">
                    ${donation.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleRefund(donation._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded"
                    >
                      Ask for Refund
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* 📱 Card View (Mobile) */}
      <div className="md:hidden space-y-4">
        {isLoading ? (
          renderSkeletonCards()
        ) : donations.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            You haven't donated yet.
          </p>
        ) : (
          donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white dark:bg-black dark:border-white/20 rounded-lg shadow-md p-4 flex gap-4"
            >
              <img
                src={donation.petImage}
                alt={donation.petName}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-semibold dark:text-white">
                  {donation.petName}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  💰 Donated: ${donation.amount.toFixed(2)}
                </p>
                <button
                  onClick={() => handleRefund(donation._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded mt-2"
                >
                  Ask for Refund
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyDonationPage;
