import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Shared/Container";

const AdoptionRequestPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Get pending pets
  const { data: pets = [], isLoading } = useQuery({
    queryKey: ["pendingPets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/petsrequst");
      return res.data;
    },
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

  if (isLoading) return <p className="text-center mt-10">লোড হচ্ছে...</p>;

  return (
    <Container>
      <h2 className="text-2xl font-bold mb-6 text-secondary">Pending Adoption Requests</h2>

      {pets.length === 0 ? (
        <p className="text-gray-500 italic">কোনো pending adoption request নেই।</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div key={pet._id} className="border rounded-xl p-4 shadow bg-white">
              <img
                src={pet.pteImage}
                alt={pet.petName}
                className="w-full h-56 object-cover rounded-md"
              />
              <h3 className="text-xl font-bold mt-3">{pet.petName}</h3>
              <p className="text-gray-700">Category: {pet.petCategory}</p>
              <p className="text-gray-700">Location: {pet.petlocation}</p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => acceptMutation.mutate(pet._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => rejectMutation.mutate(pet._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default AdoptionRequestPage;
