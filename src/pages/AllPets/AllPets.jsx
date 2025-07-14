import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useLocation, useNavigate } from "react-router";
import Title from "../../components/Shared/Title/Title";
import Select from "react-select";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const LIMIT = 4;

const categoryOptions = [
  { value: "", label: "All Categories" },
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Bird", label: "Bird" },
  { value: "Other", label: "Other" },
];

const AllPets = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);
  const navigate = useNavigate();
  const location = useLocation();

  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, refetch, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["allPets", searchText, selectedCategory.value],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await axiosSecure.get(
          `/allpets?page=${pageParam}&limit=${LIMIT}&search=${encodeURIComponent(
            searchText
          )}&category=${encodeURIComponent(selectedCategory.value)}`
        );
        return res.data;
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === LIMIT) {
          return allPages.length + 1;
        }
        return undefined;
      },
      keepPreviousData: true,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  // pet update by admin
  const onUpdate = (pet) => {
    navigate(`/dashboard/pets-admin-update/${pet._id}`, {
      state: { from: location.pathname },
    });
  };

  // ✅ Delete Pet Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/pet-delete-admin/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Pet deleted successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      refetch()
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong. Could not delete the pet.",
        confirmButtonColor: "#d33",
      });
    },
  });

  // ✅ SweetAlert Delete Handler
  const onDelete = (pet) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `You are about to delete "${pet.petName}". This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(pet._id);
      }
    });
  };
  const pets = data?.pages.flat() || [];

  return (
    <div className="xl:w-[80%] mx-auto">
      <Title titels="All" titese="Pets" />
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative md:w-[500px]">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input 
             type="text"
          placeholder="Search by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-secondary hover:bg-secondary/80 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
    </div>

        <div className="w-full md:w-1/4">
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={(option) => setSelectedCategory(option)}
            classNamePrefix="react-select"
            isClearable={false}
            placeholder="Select Category"
          />
        </div>
      </div>
      {/* table design */}
      <div className="xl:w-7xl w-full mx-auto p-4">
        {/* Large screen: Table View */}
        <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-secondary text-white">
              <tr className="border-2 border-secondary">
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Pet Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Category
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Adoption Status
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                [...Array(6)].map((_, idx) => (
                  <tr key={idx} className="border-2 border-secondary">
                    <td className="px-6 py-4 text-center">
                      <Skeleton height={80} width={80} className="mx-auto" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton width="60%" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton width="50%" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Skeleton width="70%" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Skeleton width="80%" />
                    </td>
                  </tr>
                ))
              ) : pets.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No pets found.
                  </td>
                </tr>
              ) : (
                pets.map((pet, index) => (
                  <tr
                    key={pet._id || index}
                    className="hover:bg-secondary/20 bg-white border-2 border-secondary mb-3 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-center">
                      <img
                        src={pet.pteImage}
                        alt={pet.petName}
                        className="w-32 h-32 object-cover rounded-md mx-auto border border-gray-200"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {pet.petName}
                    </td>
                    <td className="px-6 py-4">{pet.petCategory}</td>
                    <td className="px-6 py-4 text-center">
                      {pet.adopted === "adopted" ? (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold border-2 border-secondary text-secondary ">
                          Adopted
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-white">
                          Not Adopted
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="xl:flex justify-center hidden gap-2">
                        <Link
                          to={`/pet-details/${pet._id}`}
                          className="flex items-center gap-1 bg-secondary hover:bg-secondary/30 text-white px-3 py-2 rounded text-sm transition"
                        >
                          <Eye size={16} /> View
                        </Link>
                        <button
                          onClick={() => onUpdate(pet)}
                          className="flex items-center gap-1 bg-secondary hover:bg-secondary/20 text-white px-3 py-2 rounded text-sm transition"
                        >
                          <Pencil size={16} /> Update
                        </button>
                        <button
                          onClick={() => onDelete(pet)}
                          className="flex items-center gap-1 bg-secondary hover:bg-secondary/20 text-white px-3 py-2 rounded text-sm transition"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                      <div className="flex justify-center xl:hidden gap-2 mt-2">
                        <Link
                          to={`/pet-details/${pet._id}`}
                          className="bg-secondary text-white p-2 rounded"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          onClick={() => onUpdate(pet)}
                          className="bg-secondary text-white p-2 rounded"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(pet)}
                          className="bg-secondary text-white p-2 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Small screen: Card View */}
        <div className="md:hidden space-y-4">
          {isLoading ? (
            [...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="border border-gray-300 rounded-lg p-4 shadow"
              >
                <div className="flex items-center space-x-4">
                  <Skeleton height={80} width={80} />
                  <div className="flex-1 space-y-2">
                    <Skeleton width="60%" />
                    <Skeleton width="40%" />
                    <Skeleton width="50%" />
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <Skeleton width={80} height={32} />
                  <Skeleton width={80} height={32} />
                  <Skeleton width={80} height={32} />
                </div>
              </div>
            ))
          ) : pets.length === 0 ? (
            <p className="text-center py-6 text-gray-500 italic">
              No pets found.
            </p>
          ) : (
            pets.map((pet, index) => (
              <div
                key={pet._id || index}
                className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={pet.pteImage}
                    alt={pet.petName}
                    className="w-20 h-20 object-cover rounded-md border border-gray-200"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold text-secondary">
                      {pet.petName}
                    </h3>
                    <p className="text-sm text-gray-700">
                      Category: {pet.petCategory}
                    </p>
                    <p className="text-sm text-gray-700">
                      Status:{" "}
                      {pet.adopted === "adopted" ? (
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold border-2 border-secondary text-secondary ">
                          Adopted
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-secondary text-white">
                          Not Adopted
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <Link
                    to={`/pet-details/${pet._id}`}
                    className="bg-secondary flex items-center gap-x-2 text-white px-3 py-2 rounded text-sm"
                  >
                    <Eye size={16} /> View
                  </Link>
                  <button
                    onClick={() => onUpdate(pet)}
                    className="bg-secondary flex items-center gap-x-2 text-white px-3 py-2 rounded text-sm"
                  >
                    <Pencil size={16} /> Update
                  </button>
                  <button
                    onClick={() => onDelete(pet)}
                    className="bg-secondary flex items-center gap-x-2 text-white px-3 py-2 rounded text-sm"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* table design */}
      <div className="w-[95%] mx-auto ">
        <table ref={ref} className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {isFetchingNextPage ? (
              [...Array(6)].map((_, idx) => (
                <tr key={idx} className="border-2 border-secondary ">
                  <td className="px-6 py-4 text-center">
                    <Skeleton height={80} width={80} className="mx-auto" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton width="60%" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton width="50%" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Skeleton width="70%" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Skeleton width="80%" />
                  </td>
                </tr>
              ))
            ) : !hasNextPage && pets.length > 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 italic"
                >
                  You have seen all pets.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPets;
