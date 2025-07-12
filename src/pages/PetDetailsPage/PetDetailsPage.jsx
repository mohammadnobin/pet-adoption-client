// import React, { useState } from "react";
// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";


// const PetDetailsPage = () => {
//   const { id } = useParams(); // URL থেকে pet ID নিচ্ছি
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [showModal, setShowModal] = useState(false);
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");

//   // Pet ডেটা আনছি
//   const { data: pet, isLoading } = useQuery({
//     queryKey: ["pet", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/pets/${id}`);
//       return res.data;
//     },
//   });

//   // সাবমিট ফাংশন
//   const handleAdoptionRequest = async (e) => {
//     e.preventDefault();

//     const adoptionData = {
//       petId: pet._id,
//       petName: pet.petName,
//       petImage: pet.pteImage,
//       userName: user.displayName,
//       userEmail: user.email,
//       phone,
//       address,
//       status: "pending",
//       requestedAt: new Date(),
//     };
//     console.log(adoptionData);

//     try {
//       const res = await axiosSecure.post("/adoptions", adoptionData);
//       if (res.data.insertedId) {
//         alert("Adoption request submitted successfully!");
//         setShowModal(false);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit adoption request.");
//     }
//   };

//   if (isLoading) return <p className="text-center mt-10">লোড হচ্ছে...</p>;

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//   {/* Pet Info Section */}
//   <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
//     <img
//       src={pet.pteImage}
//       alt={pet.petName}
//       className="w-full md:w-1/2 h-80 md:h-[450px] object-cover rounded-2xl shadow-lg border"
//     />
//     <div className="flex-1 space-y-4">
//       <h2 className="text-3xl md:text-4xl font-extrabold text-secondary tracking-tight">
//         {pet.petName}
//       </h2>
//       <p className="text-gray-700 text-base">
//         <span className="font-semibold text-black">Category:</span> {pet.petCategory}
//       </p>
//       <p className="text-gray-700 text-base">
//         <span className="font-semibold text-black">Age:</span> {pet.petAge} year(s)
//       </p>
//       <p className="text-gray-700 text-base">
//         <span className="font-semibold text-black">Location:</span> {pet.petlocation}
//       </p>
//       <p className="text-gray-700 text-base">
//         <span className="font-semibold text-black">Short Description:</span> {pet.shortDescription}
//       </p>
//       <button
//         onClick={() => setShowModal(true)}
//         className="mt-6 bg-secondary text-white px-6 py-2 rounded-xl hover:bg-secondary/90 transition duration-200 text-sm font-medium"
//       >
//         🐾 Adopt Me
//       </button>
//     </div>
//   </div>

//   {/* Adoption Modal */}
//   {showModal && (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
//         <button
//           onClick={() => setShowModal(false)}
//           className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
//         >
//           &times;
//         </button>
//         <h3 className="text-2xl font-bold text-secondary mb-6">
//           🐶 Adopt {pet.petName}
//         </h3>
//         <form onSubmit={handleAdoptionRequest} className="space-y-4">
//           <div>
//             <label className="block mb-1 text-sm font-medium">User Name</label>
//             <input
//               type="text"
//               value={user.displayName}
//               disabled
//               className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-700"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 text-sm font-medium">Email</label>
//             <input
//               type="email"
//               value={user.email}
//               disabled
//               className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-700"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 text-sm font-medium">Phone Number</label>
//             <input
//               type="text"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded focus:outline-secondary"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 text-sm font-medium">Address</label>
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded focus:outline-secondary"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-secondary/90 transition"
//           >
//             Submit Adoption Request
//           </button>
//         </form>
//       </div>
//     </div>
//   )}
// </div>

//   );
// };

// export default PetDetailsPage;


import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

const PetDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Fetch pet details
  const { data: pet, isLoading } = useQuery({
    queryKey: ["pet", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pets/${id}`);
      return res.data;
    },
  });

  console.log(pet);

  // Mutation for adoption request
  const { mutateAsync: submitAdoption, isPending } = useMutation({
    mutationFn: async (adoptionData) => {
      const res = await axiosSecure.post("/adoptions", adoptionData);
      return res.data;
    },
    onSuccess: () => {
      alert("Adoption request submitted successfully!");
      reset();
      setShowModal(false);
    },
    onError: () => {
      alert("Failed to submit adoption request.");
    },
  });

  const onSubmit = async (formData) => {
    const adoptionData = {
      petId: pet._id,
      petName: pet.petName,
      petImage: pet.pteImage,
      userName: user.displayName,
      userEmail: user.email,
      phone: formData.phone,
      address: formData.address,
      status: "pending",
      requestedAt: new Date(),
    };

    await submitAdoption(adoptionData);
  };

  if (isLoading) return <p className="text-center mt-10">লোড হচ্ছে...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Pet Info Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={pet.pteImage}
          alt={pet.petName}
          className="w-full md:w-1/2 h-80 md:h-[450px] object-cover rounded-2xl shadow-lg border"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-secondary tracking-tight">
            {pet.petName}
          </h2>
          <p className="text-gray-700"><strong>Category:</strong> {pet.petCategory}</p>
          <p className="text-gray-700"><strong>Age:</strong> {pet.petAge} year(s)</p>
          <p className="text-gray-700"><strong>Location:</strong> {pet.petlocation}</p>
          <p className="text-gray-700"><strong>Short Description:</strong> {pet.shortDescription}</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 bg-secondary text-white px-6 py-2 rounded-xl hover:bg-secondary/90 transition"
          >
            🐾 Adopt Me
          </button>
        </div>
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
                <label className="block mb-1 text-sm font-medium">User Name</label>
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
                <label className="block mb-1 text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  {...register("phone", { required: "Phone number is required" })}
                  className="w-full px-4 py-2 border rounded focus:outline-secondary"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Address</label>
                <input
                  type="text"
                  {...register("address", { required: "Address is required" })}
                  className="w-full px-4 py-2 border rounded focus:outline-secondary"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
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
