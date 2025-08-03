// all donations pages
import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { Trash2, Pencil, Pause, Play } from "lucide-react";
import ProgressBar from "@ramonak/react-progress-bar";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AllDonationsAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: campaigns = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donations", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get("/allDonations");
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/donations-delete/${id}`);
    },
    onSuccess: () => refetch(),
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/donations/toggle-status/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      refetch();
      Swal.fire({
        icon: "success",
        title: `Donation ${data.status === "paused" ? "Paused" : "Resumed"}`,
        text: `The donation campaign has been successfully ${
          data.status === "paused" ? "paused" : "resumed"
        }.`,
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update donation status.",
      });
    },
  });

  const handlePauseToggle = (campaign) => {
    toggleStatusMutation.mutate(campaign._id);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the donation campaign!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Donation campaign deleted.", "success");
          },
          onError: () => {
            Swal.fire("Error!", "Failed to delete campaign.", "error");
          },
        });
      }
    });
  };

  // Loading Skeleton UI for Table Rows
  const renderSkeletonRows = () => {
    return Array(4)
      .fill(0)
      .map((_, idx) => (
        <tr key={idx} className="animate-pulse">
          <td className="px-4 py-3">
            <Skeleton height={20} width={100} />
          </td>
          <td className="px-4 py-3">
            <Skeleton height={20} width={60} />
          </td>
          <td className="px-4 py-3">
            <Skeleton height={20} width={150} />
          </td>
          <td className="px-4 py-3">
            <Skeleton height={30} width={120} />
          </td>
        </tr>
      ));
  };

  // Loading Skeleton UI for Card View
  const renderSkeletonCards = () => {
    return Array(3)
      .fill(0)
      .map((_, idx) => (
        <div
          key={idx}
          className="border rounded-lg p-4 shadow-sm bg-white animate-pulse"
        >
          <Skeleton height={25} width={"60%"} className="mb-3" />
          <Skeleton height={20} width={"40%"} className="mb-3" />
          <Skeleton height={20} width={"100%"} className="mb-3" />
          <div className="flex gap-2">
            <Skeleton height={30} width={80} />
            <Skeleton height={30} width={80} />
            <Skeleton height={30} width={80} />
          </div>
        </div>
      ));
  };

  return (
    <div className="w-full mx-auto px-4 py-10 max-w-6xl">
  <h2 className="text-3xl font-bold text-center text-secondary dark:text-white mb-8">
    All Donation Campaigns
  </h2>

  {/* Desktop Table (md and up) */}
  <div className="hidden md:block overflow-x-auto rounded-lg border dark:border-white/20">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-white/10">
      <thead className="bg-secondary text-white">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-semibold">Pet Name</th>
          <th className="px-4 py-3 text-left text-sm font-semibold">Max Amount</th>
          <th className="px-4 py-3 text-left text-sm font-semibold">Progress</th>
          <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-black divide-y divide-gray-100 dark:divide-white/10">
        {isLoading ? (
          renderSkeletonRows()
        ) : campaigns.length === 0 ? (
          <tr>
            <td
              colSpan={4}
              className="text-center py-6 text-gray-500 italic dark:text-gray-400"
            >
              No donation campaigns found.
            </td>
          </tr>
        ) : (
          campaigns.map((donation) => {
            const totalCollected = donation.collectedAmount || 0;
            const goal = donation.maxDonation || 0;

            return (
              <tr
                key={donation._id}
                className="hover:bg-secondary/10 transition-colors duration-150 dark:hover:bg-secondary/20"
              >
                <td className="px-4 py-3 font-medium dark:text-white">
                  {donation.petName || "N/A"}
                </td>
                <td className="px-4 py-3 dark:text-white">${goal.toFixed(2)}</td>
                <td className="px-4 py-3 w-[250px]">
                  <ProgressBar
                    completed={totalCollected}
                    maxCompleted={goal}
                  />
                  <div className="flex justify-between text-xs mt-1 dark:text-gray-300">
                    <p>Goal: {goal}</p>
                    <p>Collected: {totalCollected}</p>
                  </div>
                </td>
                <td className="px-4 py-3 flex justify-center items-center gap-2 flex-wrap">
                  <button
                    onClick={() => handlePauseToggle(donation)}
                    className={`flex items-center gap-1 px-3 py-1 text-sm rounded text-white ${
                      donation.pause === "pause"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                  >
                    {donation.pause === "pause" ? (
                      <Play size={16} />
                    ) : (
                      <Pause size={16} />
                    )}
                    {donation.pause === "pause" ? "Resume" : "Pause"}
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/dashboard/donationsedit/${donation._id}`, {
                        state: { from: location.pathname },
                      })
                    }
                    className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(donation._id)}
                    className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 text-sm rounded"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  </div>

  {/* Mobile Card View (below md) */}
  <div className="md:hidden space-y-6">
    {isLoading
      ? renderSkeletonCards()
      : campaigns.map((donation) => {
          const totalCollected = donation.collectedAmount || 0;
          const goal = donation.maxDonation || 0;

          return (
            <div
              key={donation._id}
              className="border rounded-lg p-4 shadow-sm bg-white dark:bg-black dark:border-white/20"
            >
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                {donation.petName || "N/A"}
              </h3>
              <p className="mb-2 dark:text-gray-300">
                <strong>Max Amount: </strong>${goal.toFixed(2)}
              </p>
              <div className="mb-3">
                <ProgressBar
                  completed={totalCollected}
                  maxCompleted={goal}
                />
                <div className="flex justify-between text-sm mt-1 dark:text-gray-300">
                  <span>Goal: {goal}</span>
                  <span>Collected: {totalCollected}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handlePauseToggle(donation)}
                  className={`flex items-center gap-1 px-3 py-1 text-sm rounded text-white ${
                    donation.pause === "pause"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                >
                  {donation.pause === "pause" ? (
                    <Play size={16} />
                  ) : (
                    <Pause size={16} />
                  )}
                  {donation.pause === "pause" ? "Resume" : "Pause"}
                </button>

                <button
                  onClick={() =>
                    navigate(`/dashboard/donationsedit/${donation._id}`, {
                      state: { from: location.pathname },
                    })
                  }
                  className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(donation._id)}
                  className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 text-sm rounded"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
  </div>
</div>

  );
};

export default AllDonationsAdmin;
