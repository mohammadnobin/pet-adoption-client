
// import React, { useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import Select from "react-select";
// import { Link } from "react-router";

// const categoryOptions = [
//   { value: "Dog", label: "Dog" },
//   { value: "Cat", label: "Cat" },
//   { value: "Rabbit", label: "Rabbit" },
//   { value: "Bird", label: "Bird" },
//   { value: "Other", label: "Other" },
// ];

// const PetListPage = () => {
//   const axiosSecure = useAxiosSecure();
//   const [searchText, setSearchText] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const { data: pets = [], isLoading } = useQuery({
//     queryKey: ["allPets"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/pets"); // Backend should return sorted non-adopted pets
//       return res.data;
//     },
//   });

//   // Filter only by search and category (no sort here)
//   const filteredPets = pets
//     .filter((pet) =>
//       pet.petName.toLowerCase().includes(searchText.toLowerCase())
//     )
//     .filter((pet) =>
//       selectedCategory ? pet.petCategory === selectedCategory.value : true
//     );

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold text-center mb-6 text-lime-700">
//         Browse Available Pets
//       </h2>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
//         <input
//           type="text"
//           placeholder="Search by pet name"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           className="w-full md:w-1/2 border p-2 rounded shadow"
//         />

//         <div className="w-full md:w-1/2">
//           <Select
//             options={categoryOptions}
//             value={selectedCategory}
//             onChange={setSelectedCategory}
//             isClearable
//             placeholder="Filter by category"
//           />
//         </div>
//       </div>

//       {/* Grid */}
//       {isLoading ? (
//         <p className="text-center text-gray-500">Loading pets...</p>
//       ) : filteredPets.length === 0 ? (
//         <p className="text-center text-red-500 font-medium">
//           No pets found matching your criteria.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {filteredPets.map((pet) => (
//             <div
//               key={pet._id}
//               className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition"
//             >
//               <img
//                 src={pet.pteImage}
//                 alt={pet.petName}
//                 className="w-full h-56 object-cover"
//               />
//               <div className="p-4 space-y-2">
//                 <h3 className="text-xl font-semibold text-lime-700">
//                   {pet.petName}
//                 </h3>
//                 <p className="text-gray-600">Age: {pet.petAge}</p>
//                 <p className="text-gray-600">Location: {pet.petlocation}</p>
//                 <Link
//                   to={`/pets/${pet._id}`}
//                   className="inline-block bg-lime-600 hover:bg-lime-700 text-white text-sm font-semibold px-4 py-2 rounded"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PetListPage;


// import React, { useState, useEffect } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import Select from "react-select";
// import { Link } from "react-router";
// import LoadingSpinner from "../../components/Shared/Loading/LoadingSpinner";

// const categoryOptions = [
//   { value: "", label: "All Categories" },
//   { value: "Dog", label: "Dog" },
//   { value: "Cat", label: "Cat" },
//   { value: "Rabbit", label: "Rabbit" },
//   { value: "Bird", label: "Bird" },
//   { value: "Other", label: "Other" },
// ];

// const PetListPage = () => {
//   const axiosSecure = useAxiosSecure();
//   const [searchText, setSearchText] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);
//   const [queryUrl, setQueryUrl] = useState("/pets");

//   useEffect(() => {
//     const query = new URLSearchParams();
//     if (searchText) query.append("search", searchText);
//     if (selectedCategory?.value) query.append("category", selectedCategory.value);

//     setQueryUrl(`/pets?${query.toString()}`);
//   }, [searchText, selectedCategory]);

//   const { data: pets = [], isLoading } = useQuery({
//     queryKey: ["allPets", queryUrl],
//     queryFn: async () => {
//       const res = await axiosSecure.get(queryUrl);
//       return res.data;
//     },
//     enabled: !!queryUrl,
//   });

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold text-center mb-6 text-lime-700">
//         Browse Available Pets
//       </h2>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
//         <input
//           type="text"
//           placeholder="Search by pet name"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           className="w-full md:w-1/2 border p-2 rounded shadow"
//         />

//         <div className="w-full md:w-1/2">
//           <Select
//             options={categoryOptions}
//             value={selectedCategory}
//             onChange={(value) => setSelectedCategory(value)}
//             isClearable
//             placeholder="Filter by category"
//           />
//         </div>
//       </div>

//       {/* Grid */}
//       {isLoading ? (
//         <p className="text-center text-gray-500">Loading pets...</p>
//       ) : pets.length === 0 ? (
//         <p className="text-center text-red-500 font-medium">
//           No pets found matching your criteria.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {pets.map((pet) => (
//             <div
//               key={pet._id}
//               className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition"
//             >
//               <img
//                 src={pet.pteImage}
//                 alt={pet.petName}
//                 className="w-full h-56 object-cover"
//               />
//               <div className="p-4 space-y-2">
//                 <h3 className="text-xl font-semibold text-lime-700">
//                   {pet.petName}
//                 </h3>
//                 <p className="text-gray-600">Age: {pet.petAge}</p>
//                 <p className="text-gray-600">Location: {pet.petlocation}</p>
//                 <Link
//                   to={`/pets/${pet._id}`}
//                   className="inline-block bg-lime-600 hover:bg-lime-700 text-white text-sm font-semibold px-4 py-2 rounded"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PetListPage;


// import React, { useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { Link } from "react-router";

// const PetListPage = () => {
//   const axiosSecure = useAxiosSecure();
//   const [searchText, setSearchText] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   // 🔁 Backend should handle search & filter
//   const { data: pets = [], isLoading } = useQuery({
//     queryKey: ["allPets", searchText, selectedCategory],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/pets?search=${encodeURIComponent(searchText)}&category=${encodeURIComponent(selectedCategory)}`
//       );
//       return res.data;
//     },
//   });

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold text-lime-600 text-center mb-8">Available Pets for Adoption</h2>

//       {/* 🔍 Filter controls */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           className="w-full md:w-1/2 border border-gray-300 rounded px-4 py-2 focus:outline-lime-500"
//         />

//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="w-full md:w-1/4 border border-gray-300 rounded px-4 py-2 focus:outline-lime-500"
//         >
//           <option value="">All Categories</option>
//           <option value="Dog">Dog</option>
//           <option value="Cat">Cat</option>
//           <option value="Rabbit">Rabbit</option>
//           <option value="Bird">Bird</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>

//       {/* 🐾 Pet Cards Grid */}
//       {isLoading ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {[...Array(6)].map((_, i) => (
//             <div
//               key={i}
//               className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
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
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {pets.length === 0 ? (
//             <p className="text-center col-span-full text-gray-500 italic">
//               No pets found.
//             </p>
//           ) : (
//             pets.map((pet) => (
//               <div
//                 key={pet._id}
//                 className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
//               >
//                 <img
//                   src={pet.pteImage}
//                   alt={pet.petName}
//                   className="w-full h-56 object-cover rounded-md"
//                 />
//                 <div className="mt-4 space-y-1">
//                   <h3 className="text-xl font-semibold text-lime-600">
//                     {pet.petName}
//                   </h3>
//                   <p className="text-sm text-gray-700">
//                     Age: {pet.petAge} year(s)
//                   </p>
//                   <p className="text-sm text-gray-700">
//                     Location: {pet.petlocation}
//                   </p>
//                 </div>
//                 <Link
//                   to={`/pet-details/${pet._id}`}
//                   className="block mt-4 bg-lime-600 text-white text-center py-2 rounded hover:bg-lime-700 transition"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PetListPage;


// import React, { useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { useInView } from "react-intersection-observer";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { Link } from "react-router";

// const LIMIT = 10;

// const PetListPage = () => {
//   const axiosSecure = useAxiosSecure();
//   const [searchText, setSearchText] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   // useInView to detect when bottom element is visible
//   const { ref, inView } = useInView();

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     isError,
//   } = useInfiniteQuery(
//     ["allPets", searchText, selectedCategory],
//     async ({ pageParam = 1 }) => {
//       const res = await axiosSecure.get(
//         `/pets?page=${pageParam}&limit=${LIMIT}&search=${encodeURIComponent(searchText)}&category=${encodeURIComponent(selectedCategory)}`
//       );
//       return res.data;
//     },
//     {
//       getNextPageParam: (lastPage, pages) => {
//         // backend should return something like { data: [...], nextPage: 2 } or null if no more pages
//         // or you can decide by length of last page items
//         if (lastPage.length === LIMIT) {
//           return pages.length + 1; // next page number
//         }
//         return undefined; // no more pages
//       },
//       keepPreviousData: true,
//     }
//   );

//   // When bottom is visible, fetch next page
//   React.useEffect(() => {
//     if (inView && hasNextPage && !isFetchingNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

//   const pets = data?.pages.flat() || [];

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold text-lime-600 text-center mb-8">Available Pets for Adoption</h2>

//       {/* Search & Filter */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           className="w-full md:w-1/2 border border-gray-300 rounded px-4 py-2 focus:outline-lime-500"
//         />

//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="w-full md:w-1/4 border border-gray-300 rounded px-4 py-2 focus:outline-lime-500"
//         >
//           <option value="">All Categories</option>
//           <option value="Dog">Dog</option>
//           <option value="Cat">Cat</option>
//           <option value="Rabbit">Rabbit</option>
//           <option value="Bird">Bird</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>

//       {/* Pet cards grid */}
//       {isLoading ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {[...Array(6)].map((_, i) => (
//             <div
//               key={i}
//               className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
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
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {pets.length === 0 ? (
//               <p className="text-center col-span-full text-gray-500 italic">
//                 No pets found.
//               </p>
//             ) : (
//               pets.map((pet) => (
//                 <div
//                   key={pet._id}
//                   className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
//                 >
//                   <img
//                     src={pet.pteImage}
//                     alt={pet.petName}
//                     className="w-full h-56 object-cover rounded-md"
//                   />
//                   <div className="mt-4 space-y-1">
//                     <h3 className="text-xl font-semibold text-lime-600">
//                       {pet.petName}
//                     </h3>
//                     <p className="text-sm text-gray-700">
//                       Age: {pet.petAge} year(s)
//                     </p>
//                     <p className="text-sm text-gray-700">
//                       Location: {pet.petlocation}
//                     </p>
//                   </div>
//                   <Link
//                     to={`/pet-details/${pet._id}`}
//                     className="block mt-4 bg-lime-600 text-white text-center py-2 rounded hover:bg-lime-700 transition"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Loading more indicator */}
//           <div ref={ref} className="mt-8 flex justify-center">
//             {isFetchingNextPage && (
//               <p className="text-lime-600 font-semibold">Loading more pets...</p>
//             )}
//             {!hasNextPage && pets.length > 0 && (
//               <p className="text-gray-500 italic">You have seen all pets.</p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default PetListPage;



// import React, { useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { useInView } from "react-intersection-observer";

// const LIMIT = 10;

// const PetListPage = () => {
//   const axiosSecure = useAxiosSecure();

//   const [searchText, setSearchText] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const { ref, inView } = useInView();

//   const {
//     data,
//     isLoading,
//     isError,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useInfiniteQuery({
//     queryKey: ["allPets", searchText, selectedCategory],
//     queryFn: async ({ pageParam = 1 }) => {
//       const params = new URLSearchParams();
//       params.append("page", pageParam);
//       params.append("limit", LIMIT);
//       if (searchText) params.append("search", searchText);
//       if (selectedCategory) params.append("category", selectedCategory);

//       const res = await axiosSecure.get(`/pets?${params.toString()}`);
//       return res.data; // backend থেকে expect করা: pets এর array
//     },
//     getNextPageParam: (lastPage, allPages) => {
//       // যদি lastPage এর length LIMIT এর সমান হয়, মানে আরও পেজ থাকতে পারে
//       return lastPage.length === LIMIT ? allPages.length + 1 : undefined;
//     },
//     keepPreviousData: true,
//   });

//   // যখন ইনভিউতে আসবে তখন পরের পেজ লোড কর
//   React.useEffect(() => {
//     if (inView && hasNextPage && !isFetchingNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

//   // সব পেজ থেকে pets একত্রিত করা
//   const pets = data?.pages.flat() || [];

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       {/* Search and filter */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by pet name"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           className="border border-gray-300 rounded px-3 py-2 flex-1"
//         />
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="border border-gray-300 rounded px-3 py-2"
//         >
//           <option value="">All Categories</option>
//           <option value="Dog">Dog</option>
//           <option value="Cat">Cat</option>
//           <option value="Rabbit">Rabbit</option>
//           <option value="Bird">Bird</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>

//       {/* Loading or Error */}
//       {isLoading && <p className="text-center">Loading pets...</p>}
//       {isError && <p className="text-center text-red-600">Error loading pets.</p>}

//       {/* Pets Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {pets.map((pet) => (
//           <div
//             key={pet._id}
//             className="border rounded-lg p-4 shadow hover:shadow-lg transition"
//           >
//             <img
//               src={pet.pteImage}
//               alt={pet.petName}
//               className="w-full h-48 object-cover rounded-md mb-4"
//             />
//             <h3 className="text-lg font-semibold mb-1">{pet.petName}</h3>
//             <p className="text-sm text-gray-600 mb-1">Age: {pet.petAge}</p>
//             <p className="text-sm text-gray-600 mb-3">Location: {pet.petlocation}</p>
//             <button className="bg-lime-600 text-white px-4 py-2 rounded w-full hover:bg-lime-700 transition">
//               View Details
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Loading next page indicator */}
//       <div ref={ref} className="text-center my-6">
//         {isFetchingNextPage && <p>Loading more pets...</p>}
//         {!hasNextPage && pets.length > 0 && <p>No more pets to load.</p>}
//       </div>
//     </div>
//   );
// };

// export default PetListPage;


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
