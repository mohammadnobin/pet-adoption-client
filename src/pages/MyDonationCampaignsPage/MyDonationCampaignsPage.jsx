// import React, { useState } from "react";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useNavigate } from "react-router";
// import { Eye, Pencil, Pause, Play, X } from "lucide-react";
// import ProgressBar from "@ramonak/react-progress-bar";
// import useAuth from "../../hooks/useAuth";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import Swal from "sweetalert2";

// const MyDonationCampaignsPage = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [donors, setDonors] = useState([]);
//   const [modalLoading, setModalLoading] = useState(false);

//   const {
//     data: campaigns = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["donations", user?.email],
//     queryFn: async () => {
//       if (!user?.email) return [];
//       const res = await axiosSecure.get(`/donations-user?email=${user.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   const toggleStatusMutation = useMutation({
//     mutationFn: async (id) => {
//       const res = await axiosSecure.patch(
//         `/donations-toggle-status-user/${id}`
//       );
//       return res.data;
//     },
//     onSuccess: (data) => {
//       refetch();
//       Swal.fire({
//         icon: "success",
//         title: `Donation ${data.status === "paused" ? "Paused" : "Resumed"}`,
//         text: `The donation campaign has been successfully ${
//           data.status === "paused" ? "paused" : "resumed"
//         }.`,
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     },
//     onError: () => {
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "Failed to update donation status.",
//       });
//     },
//   });

//   const handlePauseToggle = (campaign) => {
//     toggleStatusMutation.mutate(campaign._id);
//   };

//   const handleViewDonators = async (donorIds = []) => {
//     if (!donorIds.length) {
//       Swal.fire("No Donors", "No one has donated yet!", "info");
//       return;
//     }
//     try {
//       setModalLoading(true);
//       setIsModalOpen(true);
//       const res = await axiosSecure.post("/donors/by-ids", { ids: donorIds });
//       setDonors(res.data);
//     } catch (error) {
//       Swal.fire("Error", "Could not fetch donor information", error);
//     } finally {
//       setModalLoading(false);
//     }
//   };

//   const renderSkeletonRows = () =>
//     Array(4)
//       .fill(0)
//       .map((_, idx) => (
//         <tr key={idx} className="animate-pulse">
//           <td className="px-4 py-3">
//             <Skeleton height={20} width={100} />
//           </td>
//           <td className="px-4 py-3">
//             <Skeleton height={20} width={60} />
//           </td>
//           <td className="px-4 py-3">
//             <Skeleton height={20} width={180} />
//           </td>
//           <td className="px-4 py-3">
//             <div className="flex gap-2">
//               <Skeleton height={30} width={80} />
//               <Skeleton height={30} width={80} />
//               <Skeleton height={30} width={100} />
//             </div>
//           </td>
//         </tr>
//       ));

//   const renderSkeletonCards = () =>
//     Array(3)
//       .fill(0)
//       .map((_, idx) => (
//         <div
//           key={idx}
//           className="border rounded-lg p-4 bg-white shadow animate-pulse space-y-2"
//         >
//           <Skeleton height={20} width={"70%"} />
//           <Skeleton height={18} width={"40%"} />
//           <Skeleton height={16} width={"100%"} />
//           <div className="flex gap-2">
//             <Skeleton height={30} width={80} />
//             <Skeleton height={30} width={80} />
//             <Skeleton height={30} width={100} />
//           </div>
//         </div>
//       ));

//   const DonorModal = () => (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4">
//       <div className="bg-white w-full max-w-md md:max-w-lg lg:max-w-xl p-6 rounded-2xl shadow-2xl relative animate-fadeIn">
//         <button
//           onClick={() => setIsModalOpen(false)}
//           className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
//         >
//           <X size={22} />
//         </button>

//         <h2 className="text-2xl font-bold text-center mb-4 text-secondary">
//           🧾 Donators List
//         </h2>

//         {modalLoading ? (
//           <div className="space-y-3 py-4">
//             {Array(3)
//               .fill(0)
//               .map((_, idx) => (
//                 <div
//                   key={idx}
//                   className="p-3 bg-gray-50 rounded-md shadow-sm border"
//                 >
//                   <Skeleton height={16} width="60%" className="mb-2" />
//                   <Skeleton height={14} width="40%" />
//                 </div>
//               ))}
//           </div>
//         ) : donors.length ? (
//           <ul className="space-y-3 max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-200 pr-2">
//             {donors.map((donor, idx) => (
//               <li
//                 key={donor._id}
//                 className="p-3 bg-gray-50 rounded-md shadow-sm border hover:bg-gray-100 transition"
//               >
//                 <p className="font-semibold text-gray-800">
//                   {idx + 1}. {donor.name || "Anonymous"}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   💰 Donated:{" "}
//                   <span className="font-medium">${donor.amount || 0}</span>
//                 </p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div className="text-center text-gray-500 py-6">
//             No donors found for this campaign.
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="w-full mx-auto px-4 py-10 max-w-6xl">
//       <h2 className="text-3xl font-bold text-center text-secondary mb-8">
//         My Donation Campaigns
//       </h2>

//       {/* 📱 Mobile Card View */}
//       <div className="md:hidden space-y-4">
//         {isLoading
//           ? renderSkeletonCards()
//           : campaigns.map((donation) => {
//               const totalCollected = donation.collectedAmount || 0;
//               const goal = donation.maxDonation || 0;
//                 const progress = Math.min((totalCollected / goal) * 100, 100);
//               return (
//                 <div
//                   key={donation._id}
//                   className="border rounded-lg p-4 bg-white shadow"
//                 >
//                   <h3 className="text-xl font-semibold mb-1 text-secondary">
//                     {donation.petName || "N/A"}
//                   </h3>
//                   <p className="mb-2 text-sm text-gray-600">
//                     Max Amount: <strong>${goal.toFixed(2)}</strong>
//                   </p>
//                   <ProgressBar completed={progress} maxCompleted={goal} />
//                   <div className="text-xs mt-1 flex justify-between text-gray-500">
//                     <span>Goal: {goal}</span>
//                     <span>Collected: {totalCollected}</span>
//                   </div>
//                   <div className="flex flex-wrap gap-2 mt-4">
//                     <button
//                       onClick={() => handlePauseToggle(donation)}
//                       className={`flex items-center gap-1 px-3 py-1 text-sm rounded text-white ${
//                         donation.pause === "pause"
//                           ? "bg-green-500 hover:bg-green-600"
//                           : "bg-yellow-500 hover:bg-yellow-600"
//                       }`}
//                     >
//                       {donation.pause === "pause" ? (
//                         <Play size={16} />
//                       ) : (
//                         <Pause size={16} />
//                       )}
//                       {donation.pause === "pause" ? "Resume" : "Pause"}
//                     </button>
//                     <button
//                       onClick={() =>
//                         navigate(`/dashboard/donationsedit/${donation._id}`, {
//                           state: { from: location.pathname },
//                         })
//                       }
//                       className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded"
//                     >
//                       <Pencil size={16} />
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleViewDonators(donation.donorIds)}
//                       className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 text-sm rounded"
//                     >
//                       <Eye size={16} />
//                       View Donators
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//       </div>

//       {/* 💻 Desktop Table View */}
//       <div className="hidden md:block overflow-x-auto rounded-lg border mt-6">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-secondary text-white">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-semibold">
//                 Pet Name
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold">
//                 Max Amount
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold">
//                 Progress
//               </th>
//               <th className="px-4 py-3 text-center text-sm font-semibold">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-100">
//             {isLoading
//               ? renderSkeletonRows()
//               : campaigns.map((donation) => {
//                   const totalCollected = donation.collectedAmount || 0;
//                   const goal = donation.maxDonation || 0;

//                   return (
//                     <tr key={donation._id}>
//                       <td className="px-4 py-3 font-medium">
//                         {donation.petName || "N/A"}
//                       </td>
//                       <td className="px-4 py-3">${goal.toFixed(2)}</td>
//                       <td className="px-4 py-3 w-[250px]">
//                         <ProgressBar
//                           completed={totalCollected}
//                           maxCompleted={goal}
//                         />
//                         <div className="text-xs flex justify-between text-gray-500 mt-1">
//                           <span>Goal: {goal}</span>
//                           <span>Collected: {totalCollected}</span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 flex justify-center items-center gap-2 flex-wrap">
//                         <button
//                           onClick={() => handlePauseToggle(donation)}
//                           className={`flex items-center gap-1 px-3 py-1 text-sm rounded text-white ${
//                             donation.pause === "pause"
//                               ? "bg-green-500 hover:bg-green-600"
//                               : "bg-yellow-500 hover:bg-yellow-600"
//                           }`}
//                         >
//                           {donation.pause === "pause" ? (
//                             <Play size={16} />
//                           ) : (
//                             <Pause size={16} />
//                           )}
//                           {donation.pause === "pause" ? "Resume" : "Pause"}
//                         </button>

//                         <button
//                           onClick={() =>
//                             navigate(
//                               `/dashboard/donationsedit/${donation._id}`,
//                               {
//                                 state: { from: location.pathname },
//                               }
//                             )
//                           }
//                           className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded"
//                         >
//                           <Pencil size={16} />
//                           Edit
//                         </button>

//                         <button
//                           onClick={() => handleViewDonators(donation.donorIds)}
//                           className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 text-sm rounded"
//                         >
//                           <Eye size={16} />
//                           View Donators
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//           </tbody>
//         </table>
//       </div>

//       {isModalOpen && <DonorModal />}
//     </div>
//   );
// };

// export default MyDonationCampaignsPage;


import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { Eye, Pencil, Pause, Play, X } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Swal from "sweetalert2";
import ProgressBar from "../../components/MyDonationsCampaign/ProgressBar";

// rest of the code is exactly the same, only ProgressBar component is swapped

const MyDonationCampaignsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donors, setDonors] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  const {
    data: campaigns = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donations", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/donations-user?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(
        `/donations-toggle-status-user/${id}`
      );
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

  const handleViewDonators = async (donorIds = []) => {
    if (!donorIds.length) {
      Swal.fire("No Donors", "No one has donated yet!", "info");
      return;
    }
    try {
      setModalLoading(true);
      setIsModalOpen(true);
      const res = await axiosSecure.post("/donors/by-ids", { ids: donorIds });
      setDonors(res.data);
    } catch (error) {
      Swal.fire("Error", "Could not fetch donor information", error);
    } finally {
      setModalLoading(false);
    }
  };

  const renderSkeletonRows = () =>
    Array(4)
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
            <Skeleton height={20} width={180} />
          </td>
          <td className="px-4 py-3">
            <div className="flex gap-2">
              <Skeleton height={30} width={80} />
              <Skeleton height={30} width={80} />
              <Skeleton height={30} width={100} />
            </div>
          </td>
        </tr>
      ));

  const renderSkeletonCards = () =>
    Array(3)
      .fill(0)
      .map((_, idx) => (
        <div
          key={idx}
          className="border rounded-lg p-4 bg-white shadow animate-pulse space-y-2"
        >
          <Skeleton height={20} width={"70%"} />
          <Skeleton height={18} width={"40%"} />
          <Skeleton height={16} width={"100%"} />
          <div className="flex gap-2">
            <Skeleton height={30} width={80} />
            <Skeleton height={30} width={80} />
            <Skeleton height={30} width={100} />
          </div>
        </div>
      ));

  const DonorModal = () => (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-md md:max-w-lg lg:max-w-xl p-6 rounded-2xl shadow-2xl relative animate-fadeIn">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-secondary">
          🧾 Donators List
        </h2>

        {modalLoading ? (
          <div className="space-y-3 py-4">
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-gray-50 rounded-md shadow-sm border"
                >
                  <Skeleton height={16} width="60%" className="mb-2" />
                  <Skeleton height={14} width="40%" />
                </div>
              ))}
          </div>
        ) : donors.length ? (
          <ul className="space-y-3 max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-200 pr-2">
            {donors.map((donor, idx) => (
              <li
                key={donor._id}
                className="p-3 bg-gray-50 rounded-md shadow-sm border hover:bg-gray-100 transition"
              >
                <p className="font-semibold text-gray-800">
                  {idx + 1}. {donor.name || "Anonymous"}
                </p>
                <p className="text-sm text-gray-600">
                  💰 Donated:{" "}
                  <span className="font-medium">${donor.amount || 0}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 py-6">
            No donors found for this campaign.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full mx-auto px-4 py-10 max-w-6xl">
      <h2 className="text-3xl font-bold text-center text-secondary mb-8">
        My Donation Campaigns
      </h2>

      {/* 📱 Mobile Card View */}
      <div className="md:hidden space-y-4">
        {isLoading
          ? renderSkeletonCards()
          : campaigns.map((donation) => {
              return (
                <div
                  key={donation._id}
                  className="border rounded-lg p-4 bg-white shadow"
                >
                  <h3 className="text-xl font-semibold mb-1 text-secondary">
                    {donation.petName || "N/A"}
                  </h3>
                  <p className="mb-2 text-sm text-gray-600">
                    Max Amount: <strong>${donation.maxDonation.toFixed(2)}</strong>
                  </p>
                  <ProgressBar
                    collected={donation.collectedAmount}
                    goal={donation.maxDonation}
                  />
                  <div className="flex flex-wrap gap-2 mt-4">
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
                      onClick={() => handleViewDonators(donation.donorIds)}
                      className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 text-sm rounded"
                    >
                      <Eye size={16} />
                      View Donators
                    </button>
                  </div>
                </div>
              );
            })}
      </div>

      {/* 💻 Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-lg border mt-6">
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
            {isLoading
              ? renderSkeletonRows()
              : campaigns.map((donation) => (
                  <tr key={donation._id}>
                    <td className="px-4 py-3 font-medium">
                      {donation.petName || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      ${donation.maxDonation.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 w-[250px]">
                      <ProgressBar
                        collected={donation.collectedAmount}
                        goal={donation.maxDonation}
                      />
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
                        onClick={() =>
                          handleViewDonators(donation.donorIds)
                        }
                        className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 text-sm rounded"
                      >
                        <Eye size={16} />
                        View Donators
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <DonorModal />}
    </div>
  );
};

export default MyDonationCampaignsPage;
