// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { imageUpload } from "../../api/utils";
// import useAuth from "../../hooks/useAuth";
// import Swal from "sweetalert2";

// const CreateDonationPage = () => {
//   const { user } = useAuth();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const axiosSecure = useAxiosSecure();
//   const [uploading, setUploading] = useState(false);

//   const { mutateAsync: createDonation, isPending } = useMutation({
//     mutationFn: async (data) => {
//       const res = await axiosSecure.post("/donations", data);
//       return res.data;
//     },
//     onSuccess: () => {
//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Donation campaign created successfully.",
//       });
//       reset();
//     },
//     onError: (err) => {
//       console.error(err);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "Failed to create donation campaign.",
//       });
//     },
//   });

//   const onSubmit = async (data) => {
//     try {
//       setUploading(true);
//       const imageURL = await imageUpload(data.petImage[0]);

// const donationData = {
//   petImage: imageURL,
//   maxDonation: parseFloat(data.maxDonation),
//   lastDate: data.lastDate,
//   shortDescription: data.shortDescription,
//   longDescription: data.longDescription,
//   createdAt: new Date().toISOString(),
//   status: "notDonate",
//   campaignOwnerName: user?.displayName || "Anonymous",
//   campaignOwnerEmail: user?.email || "No Email",
// };


//       await createDonation(donationData);
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Something went wrong while uploading!",
//       });
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-10">
//       <h2 className="text-3xl font-bold text-center text-secondary mb-8">
//         Create Donation Campaign
//       </h2>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white p-6 rounded-lg shadow-md space-y-4 border"
//       >
//         {/* Pet Image */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Pet Picture</label>
//           <input
//             type="file"
//             accept="image/*"
//             {...register("petImage", { required: "Pet image is required" })}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//           {errors.petImage && (
//             <p className="text-red-500 text-sm">{errors.petImage.message}</p>
//           )}
//         </div>

//         {/* Max Donation */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Maximum Donation Amount
//           </label>
//           <input
//             type="number"
//             step="0.01"
//             {...register("maxDonation", { required: "Amount is required" })}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//           {errors.maxDonation && (
//             <p className="text-red-500 text-sm">{errors.maxDonation.message}</p>
//           )}
//         </div>

//         {/* Last Date */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Last Date of Donation
//           </label>
//           <input
//             type="date"
//             {...register("lastDate", { required: "Last date is required" })}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//           {errors.lastDate && (
//             <p className="text-red-500 text-sm">{errors.lastDate.message}</p>
//           )}
//         </div>

//         {/* Short Description */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Short Description
//           </label>
//           <input
//             type="text"
//             {...register("shortDescription", {
//               required: "Short description is required",
//             })}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//           {errors.shortDescription && (
//             <p className="text-red-500 text-sm">
//               {errors.shortDescription.message}
//             </p>
//           )}
//         </div>

//         {/* Long Description */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Long Description
//           </label>
//           <textarea
//             rows={5}
//             {...register("longDescription", {
//               required: "Long description is required",
//             })}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           ></textarea>
//           {errors.longDescription && (
//             <p className="text-red-500 text-sm">
//               {errors.longDescription.message}
//             </p>
//           )}
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={uploading || isPending}
//           className="w-full bg-secondary text-white py-2 rounded hover:bg-secondary/90 transition"
//         >
//           {uploading || isPending
//             ? "Submitting..."
//             : "Submit Donation Campaign"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateDonationPage;



import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../api/utils";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import TiptapEditor from "../../components/Shared/LongDiscription/TiptapEditor";


const CreateDonationPage = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);

  const { mutateAsync: createDonation, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/donations", data);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Donation campaign created successfully.",
      });
      reset();
    },
    onError: (err) => {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to create donation campaign.",
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      setUploading(true);
      const imageURL = await imageUpload(data.petImage[0]);

      const donationData = {
        petImage: imageURL,
        maxDonation: parseFloat(data.maxDonation),
        lastDate: data.lastDate,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        createdAt: new Date().toISOString(),
        status: "notDonate",
        campaignOwnerName: user?.displayName || "Anonymous",
        campaignOwnerEmail: user?.email || "No Email",
      };

      await createDonation(donationData);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while uploading!",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-secondary mb-8">
        Create Donation Campaign
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 border"
      >
        {/* Pet Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Pet Picture</label>
          <input
            type="file"
            accept="image/*"
            {...register("petImage", { required: "Pet image is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.petImage && (
            <p className="text-red-500 text-sm">{errors.petImage.message}</p>
          )}
        </div>

        {/* Max Donation */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Maximum Donation Amount
          </label>
          <input
            type="number"
            step="0.01"
            {...register("maxDonation", { required: "Amount is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.maxDonation && (
            <p className="text-red-500 text-sm">{errors.maxDonation.message}</p>
          )}
        </div>

        {/* Last Date */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Last Date of Donation
          </label>
          <input
            type="date"
            {...register("lastDate", { required: "Last date is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.lastDate && (
            <p className="text-red-500 text-sm">{errors.lastDate.message}</p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Short Description
          </label>
          <input
            type="text"
            {...register("shortDescription", {
              required: "Short description is required",
            })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.shortDescription && (
            <p className="text-red-500 text-sm">
              {errors.shortDescription.message}
            </p>
          )}
        </div>

        {/* Long Description using TiptapEditor */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Long Description
          </label>
          <Controller
            name="longDescription"
            control={control}
            defaultValue=""
            rules={{ required: "Long description is required" }}
            render={({ field }) => (
              <TiptapEditor value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.longDescription && (
            <p className="text-red-500 text-sm">
              {errors.longDescription.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading || isPending}
          className="w-full bg-secondary text-white py-2 rounded hover:bg-secondary/90 transition"
        >
          {uploading || isPending
            ? "Submitting..."
            : "Submit Donation Campaign"}
        </button>
      </form>
    </div>
  );
};

export default CreateDonationPage;
