import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { imageUpload } from "../../api/utils";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const categories = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Bird", label: "Bird" },
  { value: "Other", label: "Other" },
];

const UpDatePetPage = () => {
  const axiosSecure  = useAxiosSecure();
  const [uploadedImage, setUploadedImage] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // 🔁 Mutation
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (petData) => {
      // Optional: loading alert before actual request (shown only once)
      Swal.fire({
        title: "Uploading...",
        text: "Please wait while we add your pet.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await axiosSecure.post("/pets", petData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Pet Added!",
        text: "Your pet has been successfully added.",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Pet",
        text: error?.message || "Something went wrong. Please try again.",
      });
    },
  });

  const onSubmit = async (data) => {
    const { age, shortDesc, location, name, longDesc, category } = data;

    const petInfo = {
      petName: name,
      petAge: age,
      pteImage: uploadedImage,
      petCategory: category?.value,
      petlocation: location,
      shortDescription: shortDesc,
      longDescription: longDesc,
      adopted: "notAdopted",
      addedAt: new Date().toISOString(),
    };

    mutate(petInfo);
    console.log(petInfo);
  };
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const res = await imageUpload(image);
    setUploadedImage(res);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-lime-600">
        Add Your Pet
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Pet Name & Age */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Pet Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full border p-2 rounded"
              placeholder="Enter pet name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Pet Age</label>
            <input
              type="number"
              {...register("age", { required: "Age is required" })}
              className="w-full border p-2 rounded"
              placeholder="Enter pet age"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>
        </div>
        {/* Image Upload */}
        <div className="w-full">
          <label className="block font-semibold mb-2">Pet Image</label>
          <div className="border-4 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-between flex-wrap gap-4">
            <label className="cursor-pointer bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700">
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
          {!uploadedImage && (
            <p className="text-sm text-red-500 mt-1">Image is required</p>
          )}
        </div>

        {/* Category & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Pet Category</label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={categories}
                  placeholder="Select a category"
                />
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Pet Location</label>
            <input
              {...register("location", { required: "Location is required" })}
              className="w-full border p-2 rounded"
              placeholder="Enter pickup location"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block font-semibold mb-1">Short Description</label>
          <input
            {...register("shortDesc", {
              required: "Short description is required",
            })}
            className="w-full border p-2 rounded"
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
            className="w-full border p-2 rounded"
            rows={5}
            placeholder="Detailed information about the pet"
          />
          {errors.longDesc && (
            <p className="text-red-500 text-sm">{errors.longDesc.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-6 rounded w-full"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit Pet"}
        </button>
      </form>
    </div>
  );
};

export default UpDatePetPage;
