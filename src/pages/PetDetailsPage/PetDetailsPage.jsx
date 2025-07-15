import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PetDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch pet details
  const {
    data: pet,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["pet", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pets/${id}`);
      return res.data;
    },
  });
  // Mutation for adoption request
  const { mutateAsync: submitAdoption, isPending } = useMutation({
    mutationFn: async (adoptionData) => {
      const res = await axiosSecure.post("/adoptions", adoptionData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire(
        "Success",
        "Adoption request submitted successfully!",
        "success"
      );
      reset();
      setShowModal(false);
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to submit adoption request.", "error");
    },
  });

  const onSubmit = async (formData) => {
    const adoptionData = {
      petId: pet._id,
      petName: pet.petName,
      petImage: pet.pteImage,
      adopterName: user.displayName,
      adopterEmail: user.email,
      adopterPhone: formData.phone,
      adopterAddress: formData.address,
      status: "pending",
      requestedAt: new Date(),
    };

    await submitAdoption(adoptionData);
  };

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
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Pet Info Section */}
      {/* <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={pet.pteImage}
          alt={pet.petName}
          className="w-full md:w-1/2 h-80 md:h-[450px] object-cover rounded-2xl shadow-lg border"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-secondary tracking-tight">
            {pet.petName}
          </h2>
          <p className="text-gray-700">
            <strong>Category:</strong> {pet.petCategory}
          </p>
          <p className="text-gray-700">
            <strong>Age:</strong> {pet.petAge} year(s)
          </p>
          <p className="text-gray-700">
            <strong>Location:</strong> {pet.petlocation}
          </p>
          <p className="text-gray-700">
            <strong>Short Description:</strong> {pet.shortDescription}
          </p>

          {pet?.adopted === "request" ? (
            <button className="mt-6 cursor-not-allowed bg-secondary text-white px-6 py-2 rounded-xl hover:bg-secondary/90 transition">
              Request Pending
            </button>
          ) : user?.email === pet?.ownerEmail ? (
            <button
              onClick={() =>
                Swal.fire(
                  "Oops!",
                  "This is your pet. You cannot adopt your own pet!",
                  "warning"
                )
              }
              className="mt-6 cursor-pointer bg-gray-400 text-white px-6 py-2 rounded-xl"
            >
              🐾 Adopt Me
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 cursor-pointer bg-secondary text-white px-6 py-2 rounded-xl hover:bg-secondary/90 transition"
            >
              🐾 Adopt Me
            </button>
          )}
        </div>
      </div> */}

<div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-4 max-w-5xl mx-auto backdrop-blur bg-gradient-to-t from-secondary/8 via-bash to-secondary/8  border-2 border-secondary/15 rounded-2xl shadow-lg">
      <img
        src={pet.pteImage}
        alt={pet.petName}
        className="w-full md:w-1/2 h-80 md:h-[450px] object-cover rounded-2xl shadow-lg border"
      />
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary tracking-tight">
          {pet.petName}
        </h2>

        <p className="text-gray-700">
          <strong>Category:</strong> {pet.petCategory}
        </p>
        <p className="text-gray-700">
          <strong>Age:</strong> {pet.petAge} year{pet.petAge > 1 ? "s" : ""}
        </p>
        <p className="text-gray-700">
          <strong>Location:</strong> {pet.petlocation}
        </p>
        <p className="text-gray-700">
          <strong>Short Description:</strong> {pet.shortDescription}
        </p>
        <p className="text-gray-700">
          <strong>Long Description:</strong> {pet.longDescription}
        </p>
        <p className="text-gray-700">
          <strong>Added At:</strong>{" "}
          {format(new Date(pet.addedAt), "MMMM d, yyyy, h:mm a")}
        </p>

        {pet?.adopted === "request" ? (
          <button className="mt-6 cursor-not-allowed bg-secondary text-white px-6 py-2 rounded-xl hover:bg-secondary/90 transition">
            Request Pending
          </button>
        ) : user?.email === pet?.ownerEmail ? (
          <button
            onClick={() =>
              Swal.fire(
                "Oops!",
                "This is your pet. You cannot adopt your own pet!",
                "warning"
              )
            }
            className="mt-6 cursor-pointer bg-gray-400 text-white px-6 py-2 rounded-xl"
          >
            🐾 Adopt Me
          </button>
        ) : pet.adopted === "notAdopted" ? (
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 cursor-pointer bg-secondary text-white px-6 py-2 rounded-xl hover:bg-secondary/90 transition"
          >
            🐾 Adopt Me
          </button>
        ) : (
          <button
            disabled
            className="mt-6 cursor-not-allowed bg-gray-300 text-gray-600 px-6 py-2 rounded-xl"
          >
            Already Adopted
          </button>
        )}
      </div>

      {/* Modal placeholder if needed */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative shadow-xl">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center text-secondary">
              Adoption Request for {pet.petName}
            </h3>
            {/* Your adoption form or info here */}
          </div>
        </div>
      )}
    </div>


      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-secondary mb-6">
              🐶 Adopt {pet.petName}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  User Name
                </label>
                <input
                  type="text"
                  value={user.displayName}
                  disabled
                  className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-700"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-700"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  className="w-full px-4 py-2 border rounded focus:outline-secondary"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Address
                </label>
                <input
                  type="text"
                  {...register("address", { required: "Address is required" })}
                  className="w-full px-4 py-2 border rounded focus:outline-secondary"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-secondary/90 transition"
              >
                {isPending ? "Submitting..." : "Submit Adoption Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetDetailsPage;
