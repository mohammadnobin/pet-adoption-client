import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { imageUpload } from "../../api/utils";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useParams, useNavigate, useLocation } from "react-router";
import Title from "../../components/Shared/Title/Title";

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

const UpdatePetPageUser = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [uploadedImage, setUploadedImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard/my-pets";

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
      const res = await axiosSecure.put(`/user-pets/${id}`, updatedData);
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

  if (isLoading) {
    // লোডিং অবস্থায় Skeleton দেখাবো
    return (
      <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-lime-600">
          <Skeleton width={200} />
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton height={40} />
            <Skeleton height={40} />
          </div>

          <Skeleton height={180} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton height={40} />
            <Skeleton height={40} />
          </div>

          <Skeleton height={40} />
          <Skeleton height={180} />

          <Skeleton height={48} />
        </div>
      </div>
    );
  }

  return (
 <>
    <Title titels="Update" titese="Pets" />
    <div className="w-full max-w-4xl mb-11 mx-auto p-6 backdrop-blur custom_gradientd custom_gradientl border-2 dark:border-white border-secondary/15 shadow-lg rounded-xl">

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Pet Name & Age */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Pet Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full border-2 border-secondary/15 p-2 rounded dark:border-white"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Pet Age</label>
            <input
              type="number"
              {...register("age", { required: "Age is required" })}
              className="w-full border-2 border-secondary/15 p-2 rounded dark:border-white"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-2">Pet Image</label>
          <div className="border-4 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-between flex-wrap gap-4">
            <label className="cursor-pointer bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/80">
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
                <Select {...field} options={categories} className="dark:text-black" placeholder="Select category" />
              )}
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              {...register("location", { required: "Location is required" })}
              className="w-full border-2 border-secondary/15 p-2 rounded dark:border-white"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>
        </div>
        {/* Short Description */}
        <div>
          <label className="block font-semibold mb-1">Short Description</label>
          <input
            {...register("shortDesc", { required: "Short description is required" })}
            className="w-full border-2 border-secondary/15 p-2 rounded dark:border-white"
          />
          {errors.shortDesc && <p className="text-red-500 text-sm">{errors.shortDesc.message}</p>}
        </div>

        {/* Long Description */}
        <div>
          <label className="block font-semibold mb-1">Long Description</label>
          <textarea
            {...register("longDesc", { required: "Long description is required" })}
            className="w-full border-2 border-secondary/15 p-2 rounded dark:border-white"
            rows={5}
          />
          {errors.longDesc && <p className="text-red-500 text-sm">{errors.longDesc.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="bg-secondary hover:bg-secondary/80 cursor-pointer text-white font-semibold py-3 px-6 rounded w-full"
        >
          {updateMutation.isPending ? "Updating..." : "Update Pet"}
        </button>
      </form>
    </div>
    </>
  );
};

export default UpdatePetPageUser;
