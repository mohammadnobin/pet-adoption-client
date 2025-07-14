import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { Eye, Pencil, Pause, Play } from "lucide-react";
import ProgressBar from "@ramonak/react-progress-bar";
import useAuth from "../../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Swal from "sweetalert2";

const MyDonationCampaignsPage = () => {
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
      const res = await axiosSecure.get(`/donations/user?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/donations/toggle-status-user/${id}`);
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

  const handleViewDonators = (donators) => {
    const list = donators
      ?.map((d, idx) => `${idx + 1}. ${d.name} - $${d.amount}`)
      .join("\n");
    alert(list || "No donators yet");
  };

  // Skeleton for Table Rows
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

  // Skeleton for Card View
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
      <h2 className="text-3xl font-bold text-center text-secondary mb-8">
        My Donation Campaigns
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Pet Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Max Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Progress
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {isLoading ? (
              renderSkeletonRows()
            ) : campaigns.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-500 italic"
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
                    className="hover:bg-secondary/10 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 font-medium">
                      {donation.petName || "N/A"}
                    </td>
                    <td className="px-4 py-3">${goal.toFixed(2)}</td>
                    <td className="px-4 py-3 w-[250px]">
                      <ProgressBar
                        completed={totalCollected}
                        maxCompleted={goal}
                      />
                      <div className="flex justify-between">
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
  {donation.pause === "pause" ? <Play size={16} /> : <Pause size={16} />}
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
                        onClick={() => handleViewDonators(donation.donators)}
                        className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 text-sm rounded"
                      >
                        <Eye size={16} />
                        View Donators
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-6">
        {isLoading ? (
          renderSkeletonCards()
        ) : campaigns.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            No donation campaigns found.
          </p>
        ) : (
          campaigns.map((donation) => {
            const totalCollected = donation.collectedAmount || 0;
            const goal = donation.maxDonation || 0;

            return (
              <div
                key={donation._id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {donation.petName || "N/A"}
                </h3>
                <p className="mb-2">
                  <strong>Max Amount: </strong>${goal.toFixed(2)}
                </p>
                <div className="mb-3">
                  <ProgressBar completed={totalCollected} maxCompleted={goal} />
                  <div className="flex justify-between text-sm mt-1">
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
  {donation.pause === "pause" ? <Play size={16} /> : <Pause size={16} />}
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
                    onClick={() => handleViewDonators(donation.donators)}
                    className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 text-sm rounded"
                  >
                    <Eye size={16} />
                    View Donators
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyDonationCampaignsPage;
