import React, { useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Container from "../../components/Shared/Container";
import { Link } from "react-router";

const LIMIT = 3;

const DonationPage = () => {
  const axiosSecure = useAxiosSecure();
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["donations"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosSecure.get(`/donations?page=${pageParam}&limit=${LIMIT}`);
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

  const donations = data?.pages.flat() || [];

  if (isLoading) {
    return (
      <Container>
        <h2 className="text-4xl font-bold text-center text-secondary mb-8">Donation Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
      </Container>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-600 mt-10">
        Error loading donations: {error.message}
      </p>
    );
  }

  return (
    <Container>
      <h2 className="text-4xl font-bold text-center text-secondary mb-8">Donation Campaigns</h2>

      {donations.length === 0 ? (
        <p className="text-center text-gray-600 italic">No donation campaigns available.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden flex flex-col border border-gray-200"
              >
                <img
                  src={donation.petImage}
                  alt={donation.petName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white text-secondary">
                    {donation.petName || "Unnamed Pet"}
                  </h3>
                  <p className="mb-1 dark:text-white">
                    <span className="font-semibold ">Max Donation: </span>$
                    {donation.maxDonation?.toFixed(2) || "0.00"}
                  </p>
                  <p className="mb-3 dark:text-white">
                    <span className="font-semibold ">Donated Amount: </span>$
                    {donation.collectedAmount?.toFixed(2) || "0.00"}
                  </p>
                  <Link to={`/donationDetais/${donation._id}`}>
                  <button
                    className="mt-auto bg-secondary text-white py-2 rounded px-4 cursor-pointer hover:bg-secondary/90 transition"
                    >
                    View Details
                  </button>
                      </Link>
                </div>
              </div>
            ))}
          </div>

          <div ref={ref} className="mt-8 flex justify-center">
            {isFetchingNextPage ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                {[...Array(3)].map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-full"
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
            ) : !hasNextPage && donations.length > 0 ? (
              <p className="text-gray-500 italic">You have seen all donations.</p>
            ) : null}
          </div>
        </>
      )}
    </Container>
  );
};

export default DonationPage;
