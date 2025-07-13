// import React from 'react';
// import PetsTable from '../../components/MyaddedPets/PetsTable';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../hooks/useAuth';

// const MyAddedPets = () => {
//      const axiosSecure = useAxiosSecure();
//      const {user} = useAuth()

// const {
//   data: pets = [],
//   isLoading,
// } = useQuery({
//   queryKey: ["myPets", user?.email],
//   queryFn: async () => {
//     if (!user?.email) return [];
//     const res = await axiosSecure.get(`/pets/my-pets?email=${user.email}`);
//     return res.data;
//   },
//   enabled: !!user?.email,
// });
// console.log(pets);
//     return (
//         <div>
//             <PetsTable pets={pets} isLoading={isLoading} />
//         </div>
//     );
// };

// export default MyAddedPets;

import React, { useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Title from "../../components/Shared/Title/Title";
import PetsTable from "../../components/MyaddedPets/PetsTable";
import useAuth from "../../hooks/useAuth";

const LIMIT = 3;

const MyAddedPets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["myPets", user?.email],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await axiosSecure.get(
          `/pets/my-pets?page=${pageParam}&limit=${LIMIT}&email=${user.email}`
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
    <div className="xl:w-[80%] mx-auto">
      <Title titels="All" titese="Pets" />
      <PetsTable pets={pets} isLoading={isLoading} />
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
              <p className="text-gray-500 italic">You have seen all pets.</p>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAddedPets;
