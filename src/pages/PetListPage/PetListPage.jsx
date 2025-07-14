// import React, { useState, useEffect } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { useInView } from "react-intersection-observer";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { Link } from "react-router";
// import Title from "../../components/Shared/Title/Title";
// import Container from "../../components/Shared/Container";

// const LIMIT = 6;

// const PetListPage = () => {
//   const axiosSecure = useAxiosSecure();
//   const [searchText, setSearchText] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const { ref, inView } = useInView();

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     isError,
//   } = useInfiniteQuery({
//     queryKey: ["allPets", searchText, selectedCategory],
//     queryFn: async ({ pageParam = 1 }) => {
//       const res = await axiosSecure.get(
//         `/pets?page=${pageParam}&limit=${LIMIT}&search=${encodeURIComponent(
//           searchText
//         )}&category=${encodeURIComponent(selectedCategory)}`
//       );
//       return res.data;
//     },
//     getNextPageParam: (lastPage, allPages) => {
//       if (lastPage.length === LIMIT) {
//         return allPages.length + 1;
//       }
//       return undefined;
//     },
//     keepPreviousData: true,
//   });

//   useEffect(() => {
//     if (inView && hasNextPage && !isFetchingNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

//   const pets = data?.pages.flat() || [];
//   console.log(pets);

//   return (
//     <Container>

//     <div className="">
//       <Title titels='Available' titese='Pets for Adoption'  disciption='Discover adorable pets waiting for a loving home. Search by category or name, and find your perfect furry friend today!' />

//       {/* Filter Controls */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           className="w-full md:w-1/2 border border-gray-300 rounded px-4 py-2 focus:outline-lime-500"
//           />

//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="w-full md:w-1/4 border border-gray-300 rounded px-4 py-2 focus:outline-lime-500"
//           >
//           <option value="">All Categories</option>
//           <option value="Dog">Dog</option>
//           <option value="Cat">Cat</option>
//           <option value="Rabbit">Rabbit</option>
//           <option value="Bird">Bird</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>

//       {/* Pet Grid */}
//       {isLoading ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
//           {[...Array(6)].map((_, idx) => (
//             <div
//             key={idx}
//             className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
//             >
//               <Skeleton height={220} />
//               <div className="mt-4 space-y-2">
//                 <Skeleton height={20} width="80%" />
//                 <Skeleton height={15} width="60%" />
//                 <Skeleton height={15} width="40%" />
//                 <Skeleton height={36} width="100%" />
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : isError ? (
//         <p className="text-center text-red-500">Failed to load pets.</p>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
//             {pets.length === 0 ? (
//               <p className="text-center col-span-full text-gray-500 italic">
//                 No pets found.
//               </p>
//             ) : (
//               pets.map((pet) => (
//                 <div
//                 key={pet._id}
//                 className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
//                 >
//                   <img
//                     src={pet.pteImage}
//                     alt={pet.petName}
//                     className="w-full h-56 object-cover rounded-md"
//                     />
//                   <div className="mt-4 space-y-1">
//                     <h3 className="text-xl font-semibold text-secondary">
//                       {pet.petName}
//                     </h3>
//                     <div className="md:flex items-center justify-between ">
//                     <p className="text-sm text-gray-700">
//                       Age: {pet.petAge} year(s)
//                     </p>
//                     <p className="inline-block px-2 py-1 rounded-full text-xs font-semibold border-2 border-secondary text-secondary ">{pet.adopted}</p>
//                     </div>
//                     <p className="text-sm text-gray-700">
//                       Location: {pet.petlocation}
//                     </p>
//                   </div>
//                   <Link
//                     to={`/pet-details/${pet._id}`}
//                     className="block mt-4 bg-secondary text-white text-center py-2 rounded hover:bg-lime-700 transition"
//                     >
//                     View Details
//                   </Link>
//                 </div>
//               ))
//             )}
//           </div>
//           <div ref={ref} className="mt-8 flex justify-center">
//             {isFetchingNextPage ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full">
//                 {[...Array(3)].map((_, idx) => (
//                   <div
//                   key={idx}
//                   className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-full"
//                   >
//                     <Skeleton height={220} />
//                     <div className="mt-4 space-y-2">
//                       <Skeleton height={20} width="80%" />
//                       <Skeleton height={15} width="60%" />
//                       <Skeleton height={15} width="40%" />
//                       <Skeleton height={36} width="100%" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : !hasNextPage && pets.length > 0 ? (
//               <p className="text-gray-500 italic">You have seen all pets.</p>
//             ) : null}
//           </div>
//         </>
//       )}
//     </div>
//       </Container>
//   );
// };

// export default PetListPage;


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

const LIMIT = 6;

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

  const { ref, inView } = useInView();

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
    <Container>
      <div>
        <Title
          titels="Available"
          titese="Pets for Adoption"
          disciption="Discover adorable pets waiting for a loving home. Search by category or name, and find your perfect furry friend today!"
        />

        {/* Filter Controls */}
        <div className="flex flex-col  md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative  md:w-[500px]">
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
         className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
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

        {/* Pet Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {pets.length === 0 ? (
                <p className="text-center col-span-full text-gray-500 italic">
                  No pets found.
                </p>
              ) : (
                pets.map((pet) => (
                  <div
                    key={pet._id}
                    className="backdrop-blur bg-gradient-to-t from-secondary/8 via-bash to-secondary/8  border-2 border-secondary/15 rounded-lg shadow-md p-8  hover:shadow-lg transition"
                  >
                    <img
                      src={pet.pteImage}
                      alt={pet.petName}
                      className="w-full h-56 object-cover rounded-md"
                    />
                    <div className="mt-4 space-y-1">
                      <h3 className="text-xl font-semibold text-secondary">
                        {pet.petName}
                      </h3>
                      <div className="md:flex items-center justify-between ">
                        <p className="text-sm text-gray-700">
                          Age: {pet.petAge} year(s)
                        </p>
                        <p className="inline-block px-2 py-1 rounded-full text-xs font-semibold border-2 border-secondary text-secondary ">
                          {pet.adopted}
                        </p>
                      </div>
                      <p className="text-sm text-gray-700">
                        Location: {pet.petlocation}
                      </p>
                    </div>
                    <Link
                      to={`/pet-details/${pet._id}`}
                      className="block mt-4 bg-secondary text-white text-center py-2 rounded hover:bg-secondary/70 transition"
                    >
                      View Details
                    </Link>
                  </div>
                ))
              )}
            </div>
            <div ref={ref} className="mt-8 flex justify-center">
              {isFetchingNextPage ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full">
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
              ) : !hasNextPage && pets.length > 0 ? (
                <p className="text-gray-500 italic">You have seen all pets.</p>
              ) : null}
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default PetListPage;
