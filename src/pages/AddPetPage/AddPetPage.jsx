import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { imageUpload } from "../../api/utils";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import Title from "../../components/Shared/Title/Title";
import TextEditor from "../../components/addPets/TiptapEditor";

const categories = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Bird", label: "Bird" },
  { value: "Other", label: "Other" },
];

const AddPetPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagesubmite, setImagesubmite] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (petData) => {
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
      reset();
      setUploadedImage(null);
      setImagesubmite(false);
      navigate("/dashboard/my-pets");
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
    setImagesubmite(true);
    if (!uploadedImage) return;

    const { age, shortDesc, location, name, longDesc, category } = data;
    const parser = new DOMParser();
    const plainText = parser.parseFromString(longDesc, "text/html").body
      .textContent;
    const petInfo = {
      petName: name,
      petAge: age,
      pteImage: uploadedImage,
      petCategory: category?.value,
      petlocation: location,
      shortDescription: shortDesc,
      longDescription: plainText, // Tiptap HTML content
      adopted: "notAdopted",
      ownerEmail: user.email,
      addedAt: new Date().toISOString(),
    };

    mutate(petInfo);
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const res = await imageUpload(image);
    setUploadedImage(res);
  };

  return (
    <>
      <Title titels="Added" titese="Pets" />
      <div className="w-full max-w-4xl mx-auto mb-10 p-6 backdrop-blur custom_gradientd custom_gradientl border-2 dark:border-white to-secondary/8  border-secondary/15 shadow-lg rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name & Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Pet Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full border-2 border-secondary/15 p-2 rounded dark:border-white"
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
                className="w-full border-2 border-secondary/15 p-2 rounded dark:border-white"
                placeholder="Enter pet age"
              />
              {errors.age && (
                <p className="text-red-500 text-sm">{errors.age.message}</p>
              )}
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block font-semibold mb-2">Pet Image</label>
            <div className="border-4 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-between flex-wrap gap-4">
              <label className="cursor-pointer bg-secondary text-white px-4 py-2 rounded hover:bg-white hover:text-secondary duration-200 border-2 hover:border-secondary">
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
            {imagesubmite && !uploadedImage && (
              <p className="text-red-500 text-sm mt-1">Image is required</p>
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
                  className="dark:text-black"
                    {...field}
                    options={categories}
                    placeholder="Select a category"
                  />
                )}
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Pet Location</label>
              <input
                {...register("location", { required: "Location is required" })}
                className="w-full border-2 border-secondary/15 p-2 rounded dark:border-white"
                placeholder="Enter pickup location"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
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
              className="w-full border-2 border-secondary/15 p-2 rounded dark:border-white"
              placeholder="Short note or description"
            />
            {errors.shortDesc && (
              <p className="text-red-500 text-sm">{errors.shortDesc.message}</p>
            )}
          </div>

          {/* Long Description (Tiptap) */}
          <div>
            <label className="block font-semibold mb-1">Long Description</label>
            <Controller
              name="longDesc"
              control={control}
              defaultValue=""
              rules={{ required: "Long description is required" }}
              render={({ field }) => (
                <TextEditor value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.longDesc && (
              <p className="text-red-500 text-sm">{errors.longDesc.message}</p>
            )}
          </div>

          {/* Submit */}
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

export default AddPetPage;
