import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../api/utils";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import Title from "../../components/Shared/Title/Title";

const CreateDonationPage = () => {
  const { user } = useAuth();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagesubmite, setImagesubmite] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

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
      setUploadedImage(null);
      setImagesubmite(false);
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
    const { longDesc, name, pickupDate, shortDesc,amount } = data;
    setImagesubmite(true);
    if (!uploadedImage) return;
    try {
      const donationData = {
        petName:name,
        petImage: uploadedImage,
        maxDonation: parseFloat(amount),
        lastDate: pickupDate,
        shortDescription: shortDesc,
        longDescription: longDesc,
        createdAt: new Date().toISOString(),
        status: "notDonate",
        pause: "resume",
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
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const res = await imageUpload(image);
    setUploadedImage(res);
  };

  return (
    <>
      <Title titels="Added" titese="Pets" />
      <div className="w-full max-w-4xl mx-auto p-6 backdrop-blur bg-gradient-to-t -mt-8 from-secondary/8 via-bash to-secondary/8 border-2 border-secondary/15 shadow-lg rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Pet Name & Age */}

          <div>
            <label className="block font-semibold mb-1">Pet Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full border-2 border-secondary/15 p-2 rounded"
              placeholder="Enter pet name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          {/* Image Upload */}
          <div className="w-full">
            <label className="block font-semibold mb-2">Pet Image</label>
            <div className="border-4 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-between flex-wrap gap-4">
              <label className="cursor-pointer bg-secondary text-white px-4 py-2 rounded hover:bg-white hover:text-secondary duration-200 border-2 hover:border-secondary">
                Upload
                <input
                  onChange={handleImageUpload}
                  className="hidden"
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                />
              </label>
              {uploadedImage && (
                <img
                  className="w-[100px] h-[100px] object-cover rounded"
                  src={uploadedImage}
                  alt="pet"
                />
              )}
            </div>
            {imagesubmite && !uploadedImage && (
              <p className="text-sm text-red-500 mt-1">Image is required</p>
            )}
          </div>

          {/* date and admount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Amount Field */}
            <div>
              <label className="block font-semibold mb-1">
                Donation Amount
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                {...register("amount", {
                  required: "Amount is required",
                  min: {
                    value: 1,
                    message: "Minimum amount must be 1",
                  },
                })}
                className="w-full border-2 border-secondary/15 p-2 rounded"
                placeholder="Enter amount"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount.message}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Pickup Date</label>
              <input
                type="date"
                {...register("pickupDate", {
                  required: "Pickup date is required",
                })}
                className="w-full border-2 border-secondary/15 p-2 rounded"
              />
              {errors.pickupDate && (
                <p className="text-red-500 text-sm">
                  {errors.pickupDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block font-semibold mb-1">
              Short Description
            </label>
            <input
              {...register("shortDesc", {
                required: "Short description is required",
              })}
              className="w-full border-2 border-secondary/15 p-2 rounded"
              placeholder="Short note or description"
            />
            {errors.shortDesc && (
              <p className="text-red-500 text-sm">{errors.shortDesc.message}</p>
            )}
          </div>

          {/* Long Description */}
          <div>
            <label className="block font-semibold mb-1">Long Description</label>
            <textarea
              {...register("longDesc", {
                required: "Long description is required",
              })}
              className="w-full border-2 border-secondary/15 p-2 rounded"
              rows={5}
              placeholder="Detailed information about the pet"
            />
            {errors.longDesc && (
              <p className="text-red-500 text-sm">{errors.longDesc.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="cursor-pointer bg-secondary text-white w-full py-3 rounded hover:bg-white hover:text-secondary duration-200 border-2 hover:border-secondary"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit Pet"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateDonationPage;
