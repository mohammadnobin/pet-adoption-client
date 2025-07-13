import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { imageUpload } from "../../api/utils";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useParams, useNavigate, useLocation } from "react-router";

const categories = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Bird", label: "Bird" },
  { value: "Other", label: "Other" },
];

const adoptedOptions = [
  { value: "adopted", label: "Adopted" },
  { value: "notAdopted", label: "Not Adopted" },
];

const UpdatePetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [uploadedImage, setUploadedImage] = useState(null);
  const location = useLocation();
const from = location.state?.from

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // 🔁 Fetch existing pet data
  const { data: pet, isLoading } = useQuery({
    queryKey: ["pet", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pets/${id}`);
      return res.data;
    },
  });

  // ✅ Pre-fill form once data is loaded
  useEffect(() => {
    if (pet) {
      reset({
        name: pet.petName,
        age: pet.petAge,
        category: categories.find((c) => c.value === pet.petCategory),
        location: pet.petlocation,
        shortDesc: pet.shortDescription,
        longDesc: pet.longDescription,
        adopted: adoptedOptions.find((opt) => opt.value === pet.adopted),
      });
      setUploadedImage(pet.pteImage);
    }
  }, [pet, reset]);

  // ✅ Mutation for updating pet
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.put(`/pets/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Pet updated successfully!", "success");
      navigate(from);
    },
    onError: () => {
      Swal.fire("Error", "Failed to update pet", "error");
    },
  });

  const onSubmit = async (data) => {
    const petInfo = {
      petName: data.name,
      petAge: data.age,
      petCategory: data.category?.value,
      petlocation: data.location,
      shortDescription: data.shortDesc,
      longDescription: data.longDesc,
      pteImage: uploadedImage || pet?.pteImage,
      adopted: data.adopted?.value || "notAdopted",
      updatedAt: new Date().toISOString(),
    };

    updateMutation.mutate(petInfo);
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const res = await imageUpload(image);
    setUploadedImage(res);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-lime-600">
        Update Pet
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Pet Name & Age */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Pet Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Pet Age</label>
            <input
              type="number"
              {...register("age", { required: "Age is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-2">Pet Image</label>
          <div className="border-4 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-between flex-wrap gap-4">
            <label className="cursor-pointer bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700">
              Upload
              <input
                onChange={handleImageUpload}
                className="hidden"
                type="file"
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
                <Select {...field} options={categories} placeholder="Select category" />
              )}
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              {...register("location", { required: "Location is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>
        </div>

        {/* Adoption Status */}
        <div>
          <label className="block font-semibold mb-1">Adoption Status</label>
          <Controller
            name="adopted"
            control={control}
            rules={{ required: "Adoption status is required" }}
            render={({ field }) => (
              <Select {...field} options={adoptedOptions} placeholder="Select status" />
            )}
          />
          {errors.adopted && <p className="text-red-500 text-sm">{errors.adopted.message}</p>}
        </div>

        {/* Short Description */}
        <div>
          <label className="block font-semibold mb-1">Short Description</label>
          <input
            {...register("shortDesc", { required: "Short description is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.shortDesc && <p className="text-red-500 text-sm">{errors.shortDesc.message}</p>}
        </div>

        {/* Long Description */}
        <div>
          <label className="block font-semibold mb-1">Long Description</label>
          <textarea
            {...register("longDesc", { required: "Long description is required" })}
            className="w-full border p-2 rounded"
            rows={5}
          />
          {errors.longDesc && <p className="text-red-500 text-sm">{errors.longDesc.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-6 rounded w-full"
        >
          {updateMutation.isPending ? "Updating..." : "Update Pet"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePetPage;
