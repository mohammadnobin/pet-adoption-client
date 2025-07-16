import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdoptionRequestPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user, loading } = useAuth();

  // Get pending pets
  const { data: pets = [], isLoading } = useQuery({
    queryKey: ["pendingPets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/petsrequst?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // user আসার পরেই query চালাবে
  });

  // Accept mutation
  const acceptMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/pets/${id}/status`, { adopted: "adopted" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingPets"] });
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/pets/${id}/status`, { adopted: "notAdopted" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingPets"] });
    },
  });

  return (
    <div className="xl:w-[80%] mx-auto ">
      <h2 className="text-2xl font-bold mb-6 text-secondary">
        Pending Adoption Requests
      </h2>

      {isLoading ? (
        // Skeleton Loader
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="hidden md:grid grid-cols-6 border rounded-xl p-4 shadow bg-white"
            >
              <Skeleton height={20} className="col-span-1" />
              <Skeleton height={20} className="col-span-1" />
              <Skeleton height={20} className="col-span-1" />
              <Skeleton height={20} className="col-span-1" />
              <Skeleton height={20} className="col-span-1" />
              <Skeleton height={32} className="col-span-1" />
            </div>
          ))}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="md:hidden border rounded-lg p-4 shadow">
              <Skeleton height={180} />
              <Skeleton height={24} width="60%" className="mt-4" />
              <Skeleton height={16} width="80%" />
              <Skeleton height={16} width="70%" />
              <Skeleton height={16} width="70%" />
              <Skeleton height={36} className="" />
            </div>
          ))}
        </div>
      ) : pets.length === 0 ? (
        <p className="text-gray-500 italic">No pending adoption request</p>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full dark:bg-black bg-white border border-gray-200 rounded-lg shadow">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="py-3 px-4 text-left">Pet Name</th>
                  <th className="py-3 px-4 text-left">Requester Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((pet) => (
                  <tr
                    key={pet._id}
                    className="border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-black"
                  >
                    <td className="py-3 px-4">{pet.petName}</td>
                    <td className="py-3 px-4">
                      {pet.adoptedHistory.adopterName}
                    </td>
                    <td className="py-3 px-4">
                      {pet.adoptedHistory.adopterEmail}
                    </td>
                    <td className="py-3 px-4">
                      {pet.adoptedHistory.adopterPhone}
                    </td>
                    <td className="py-3 px-4">
                      {pet.adoptedHistory.adopterAddress}
                    </td>
                    <td className="py-3 px-4 flex justify-center gap-2">
                      <button
                        onClick={() => acceptMutation.mutate(pet._id)}
                        className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => rejectMutation.mutate(pet._id)}
                        className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="border rounded-lg p-4 shadow  bg-white dark:bg-black dark:text-white"
              >
                <h3 className="text-xl font-bold mb-1">{pet.petName}</h3>
                <p>
                  <strong>Requester:</strong> {pet.adoptedHistory.adopterName}
                </p>
                <p>
                  <strong>Email:</strong> {pet.adoptedHistory.adopterEmail}
                </p>
                <p>
                  <strong>Phone:</strong> {pet.adoptedHistory.adopterPhone}
                </p>
                <p>
                  <strong>Location:</strong> {pet.adoptedHistory.adopterAddress}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => acceptMutation.mutate(pet._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded w-full"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => rejectMutation.mutate(pet._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded w-full"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdoptionRequestPage;
