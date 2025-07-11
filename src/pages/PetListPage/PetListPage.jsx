import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router"; // Make sure to use 'react-router-dom'

const LIMIT = 10;

const PetListPage = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["allPets", searchText, selectedCategory],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosSecure.get(
        `/pets?page=${pageParam}&limit=${LIMIT}&search=${encodeURIComponent(
          searchText
        )}&category=${encodeURIComponent(selectedCategory)}`
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

  const pets = data?.pages.flat() || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-lime-600 text-center mb-8">
        Available Pets for Adoption
      </h2>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 rounded px-4 py-2 focus:outline-lime-500"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/4 border border-gray-300 rounded px-4 py-2 focus:outline-lime-500"
        >
          <option value="">All Categories</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Bird">Bird</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Pet Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pets.length === 0 ? (
              <p className="text-center col-span-full text-gray-500 italic">
                No pets found.
              </p>
            ) : (
              pets.map((pet) => (
                <div
                  key={pet._id}
                  className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
                >
                  <img
                    src={pet.pteImage}
                    alt={pet.petName}
                    className="w-full h-56 object-cover rounded-md"
                  />
                  <div className="mt-4 space-y-1">
                    <h3 className="text-xl font-semibold text-lime-600">
                      {pet.petName}
                    </h3>
                    <p className="text-sm text-gray-700">
                      Age: {pet.petAge} year(s)
                    </p>
                    <p className="text-sm text-gray-700">
                      Location: {pet.petlocation}
                    </p>
                  </div>
                  <Link
                    to={`/pet-details/${pet._id}`}
                    className="block mt-4 bg-lime-600 text-white text-center py-2 rounded hover:bg-lime-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              ))
            )}
          </div>

          {/* Infinite Scroll Trigger */}
          <div ref={ref} className="mt-8 flex justify-center">
            {isFetchingNextPage && (
              <p className="text-lime-600 font-semibold">Loading more pets...</p>
            )}
            {!hasNextPage && pets.length > 0 && (
              <p className="text-gray-500 italic">You have seen all pets.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PetListPage;
