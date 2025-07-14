import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const MyDonationPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 1. Fetch all donations for this user
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['myDonations', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donors/user?email=${user.email}`);
      return res.data;
    }
  });

  // 2. Refund mutation (remove donation)
  const refundMutation = useMutation({
    mutationFn: async (donorId) => {
      await axiosSecure.delete(`/donors/${donorId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myDonations']);
    }
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
          Swal.fire("Refunded!", "Your donation has been removed.", "success");
        },
        onError: () => {
          Swal.fire("Error!", "Something went wrong.", "error");
        },
      });
    }
  });
};

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-secondary mb-8">My Donations</h2>

      {isLoading ? (
        <p>Loading donations...</p>
      ) : donations.length === 0 ? (
        <p className="text-center text-gray-500">You haven't donated yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-secondary text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Pet Image</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Pet Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Donated Amount</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {donations.map((donation) => (
                <tr key={donation._id}>
                  <td className="px-4 py-3">
                    <img
                      src={donation.petImage}
                      alt={donation.petName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{donation.petName}</td>
                  <td className="px-4 py-3">${donation.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleRefund(donation._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded"
                    >
                      Ask for Refund
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyDonationPage;
