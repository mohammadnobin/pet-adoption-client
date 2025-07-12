import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { Eye, Pencil, Pause, Play } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const MyDonationCampaignsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: campaigns = [], refetch } = useQuery({
 queryKey: ['donations', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      // এখানে ইউজারের ইমেইলকে কোয়েরি প্যারামিটার হিসেবে ইউজ করা হয়েছে
      const res = await axiosSecure.get(`/donations/user?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(campaigns);

  const pauseMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/donations/pause/${id}`);
    },
    onSuccess: () => refetch(),
  });

  const resumeMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/donations/resume/${id}`);
    },
    onSuccess: () => refetch(),
  });

  const handlePauseToggle = (campaign) => {
    if (campaign.status === "paused") {
      resumeMutation.mutate(campaign._id);
    } else {
      pauseMutation.mutate(campaign._id);
    }
  };

  const handleViewDonators = (donators) => {
    const list = donators
      ?.map((d, idx) => `${idx + 1}. ${d.name} - $${d.amount}`)
      .join("\n");
    alert(list || "No donators yet");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-secondary mb-8">
        My Donation Campaigns
      </h2>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Pet Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Max Amount</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Progress</th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {campaigns.map((donation) => {
              const totalCollected = donation.donators?.reduce(
                (acc, d) => acc + d.amount,
                0
              ) || 0;
              const progress = Math.min((totalCollected / donation.maxDonation) * 100, 100);

              return (
                <tr
                  key={donation._id}
                  className="hover:bg-secondary/10 transition-colors duration-150"
                >
                  <td className="px-4 py-3 font-medium">{donation.petName || "N/A"}</td>
                  <td className="px-4 py-3">${donation.maxDonation}</td>
                  <td className="px-4 py-3">
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-4 bg-secondary text-xs text-white text-center leading-4 rounded-full"
                        style={{ width: `${progress}%` }}
                      >
                        {progress.toFixed(1)}%
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 flex justify-center items-center gap-2 flex-wrap">
                    <button
                      onClick={() => handlePauseToggle(donation)}
                      className={`flex items-center gap-1 px-3 py-1 text-sm rounded text-white ${
                        donation.status === "paused"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                    >
                      {donation.status === "paused" ? <Play size={16} /> : <Pause size={16} />}
                      {donation.status === "paused" ? "Resume" : "Pause"}
                    </button>

                    <button
                      onClick={() => navigate(`/donations/edit/${donation._id}`)}
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
            })}

            {campaigns.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500 italic">
                  No donation campaigns found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDonationCampaignsPage;
