// PetListPage Component
// ---------------------
// Features:
// 1. Displays all available pets for adoption
// 2. Supports search by pet name and category filtering
// 3. Uses infinite scroll to fetch more pets as the user scrolls
// 4. Shows skeleton loaders while fetching data
// 5. Displays a "View Details" link for each pet

import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router";
import Title from "../../components/Shared/Title/Title";
import Container from "../../components/Shared/Container";
import Select from "react-select";

const LIMIT = 6; // Number of pets to fetch per page

// Dropdown options for pet categories
const categoryOptions = [
  { value: "", label: "All Categories" },
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Bird", label: "Bird" },
  { value: "Other", label: "Other" },
];

const PetListPage = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);

  // Infinite scroll hook
  const { ref, inView } = useInView();

  // Fetch pets with infinite scroll using TanStack Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["allPets", searchText, selectedCategory.value],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosSecure.get(
        `/pets?page=${pageParam}&limit=${LIMIT}&search=${encodeURIComponent(
          searchText
        )}&category=${encodeURIComponent(selectedCategory.value)}`
      );
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has full results, allow fetching the next page
      return lastPage.length === LIMIT ? allPages.length + 1 : undefined;
    },
    keepPreviousData: true,
  });

  // Automatically fetch next page when the sentinel div is in view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten paginated results
  const pets = data?.pages.flat() || [];

  return (
    <div className="bg-white dark:bg-black">
      <Container>
        {/* Page Title */}
        <Title
          titels="Available"
          titese="Pets for Adoption"
          disciption="Discover adorable pets waiting for a loving home. Search by category or name, and find your perfect furry friend today!"
        />

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          {/* Search Input */}
          <div className="relative md:w-[500px]">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-white dark:placeholder-white dark:text-white dark:focus:ring-white dark:focus:border-white"
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-secondary hover:bg-secondary/80 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>

          {/* Category Dropdown */}
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

        {/* Pet Grid */}
        {isLoading ? (
          // Skeleton loader while fetching initial pets
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-black p-4 rounded-lg shadow-md border border-gray-200"
              >
                <Skeleton height={220} />
                <div className="mt-4 space-y-2">
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={15} width="60%" />
                  <Skeleton height={15} width="40%" />
                  <Skeleton height={36} width="100%" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load pets.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {pets.length === 0 ? (
                <p className="text-center col-span-full text-gray-500 italic">
                  No pets found.
                </p>
              ) : (
                pets.map((pet) => (
                  <div
                    key={pet._id}
                    className="backdrop-blur custom_gradientd custom_gradientl border-2 dark:border-white border-secondary/15 rounded-lg shadow-md p-8 hover:shadow-lg transition"
                  >
                    <img
                      src={pet.pteImage}
                      alt={pet.petName}
                      className="w-full h-56 object-cover rounded-md"
                    />
                    <div className="mt-4 space-y-1">
                      <h3 className="text-xl font-semibold dark:text-white text-secondary">
                        {pet.petName}
                      </h3>
                      <div className="md:flex items-center justify-between ">
                        <p className="text-sm text-gray-700 dark:text-white">
                          Age: {pet.petAge} year
                        </p>
                        <p className="inline-block px-2 py-1 rounded-full text-xs dark:text-white font-semibold border-2 dark:border-white border-secondary text-secondary ">
                          {pet.adopted}
                        </p>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-white">
                        Location: {pet.petlocation}
                      </p>
                    </div>
                    <Link
                      to={`/pet-details/${pet._id}`}
                      className="block mt-4 bg-secondary dark:bg-white dark:text-black text-white text-center py-2 dark:hover:bg-white/80 rounded hover:bg-secondary/70 transition"
                    >
                      View Details
                    </Link>
                  </div>
                ))
              )}
            </div>

            {/* Infinite Scroll Loader / End Message */}
            <div ref={ref} className="mt-8 flex justify-center">
              {isFetchingNextPage ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full">
                  {[...Array(3)].map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-black p-4 rounded-lg shadow-md border border-gray-200 w-full"
                    >
                      <Skeleton height={220} />
                      <div className="mt-4 space-y-2">
                        <Skeleton height={20} width="80%" />
                        <Skeleton height={15} width="60%" />
                        <Skeleton height={15} width="40%" />
                        <Skeleton height={36} width="100%" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : !hasNextPage && pets.length > 0 ? (
                <p className="text-gray-500 italic">You have seen all pets.</p>
              ) : null}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default PetListPage;
