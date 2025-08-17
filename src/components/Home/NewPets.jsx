// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Container from "../Shared/Container";
// import { Link } from "react-router";
// import Title from "../Shared/Title/Title";

// const NewPets = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: pets = [], isLoading, isError } = useQuery({
//     queryKey: ["latestPets"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/api/pets/latest");
//       return res.data;
//     },
//   });

//   if (isLoading) return <p className="text-center py-12">Loading...</p>;
//   if (isError) return <p className="text-center py-12">Something went wrong!</p>;

//   return (
//     <Container>
//         <div className="pt-[100px] -mb-[50px]">
//          <Title titels="New" titese="Pets" />
//         </div>
//       <div className=" py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {pets.map((pet) => (
//           <div
//             key={pet._id}
//             className="relative group custom_gradientl custom_gradientd dark:border-white border-2 border-secondary/15 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl p-4"
//           >
//             {/* Image */}
//             <div className="relative h-64 overflow-hidden rounded-t-2xl">
//               <img
//                 src={pet.pteImage}
//                 alt={pet.petName}
//                 className="w-full border-b border-secondary/50 h-full object-cover transition-transform duration-500 group-hover:scale-110"
//               />
//               {/* Category Badge */}
//               <span className="absolute bg-secondary top-4 left-4  text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
//                 {pet.petCategory}
//               </span>
//             </div>

//             {/* Card Content */}
//             <div className="p-6 space-y-2">
//               <h3 className="text-2xl font-bold text-secondary dark:text-gray-100">
//                 {pet.petName}
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-300">
//                 Age: {pet.petAge} | Location: {pet.petlocation}
//               </p>
//               <div className="flex items-center justify-between">
//               <p className="text-gray-700 dark:text-gray-200 text-sm line-clamp-3">
//                 {pet.shortDescription}
//               </p>
//               <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
//                 Added: {new Date(pet.addedAt).toLocaleDateString()}
//               </div>
//               </div>
//             </div>

//             {/* Optional Hover Overlay */}
//             <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
//           </div>
//         ))}
//       </div>

//       {/* See All Pets Button */}
//       <div className="flex justify-center">
//         <Link to='/pets'>
//         <button className="px-6 py-3 bg-secondary text-white dark:bg-white dark:text-black font-semibold rounded-lg hover:bg-primary-dark cursor-pointer dark:hover:bg-secondary-light transition-colors">
//           See All Pets
//         </button>
//         </Link>
//       </div>
//     </Container>
//   );
// };

// export default NewPets;


import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../Shared/Container";
import { Link } from "react-router";
import Title from "../Shared/Title/Title";

const NewPets = () => {
  const axiosSecure = useAxiosSecure();

  const { data: pets = [], isLoading, isError } = useQuery({
    queryKey: ["latestPets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/pets/latest");
      return res.data;
    },
  });

  // ✅ Skeleton Loader
  if (isLoading)
    return (
      <Container>
        <div className="pt-[100px] -mb-[50px]">
          <Title titels="New" titese="Pets" />
        </div>
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-white dark:bg-gray-800 border-2 border-secondary/15 rounded-2xl shadow-lg overflow-hidden p-4"
            >
              {/* Image skeleton */}
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>

              {/* Text skeleton */}
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    );

  if (isError)
    return <p className="text-center py-12">Something went wrong!</p>;

  return (
    <Container>
      <div className="pt-[100px] -mb-[50px]">
        <Title titels="New" titese="Pets" />
      </div>
      <div className=" py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pets.map((pet) => (
          // <div
          //   key={pet._id}
          //   className="relative group custom_gradientl custom_gradientd dark:border-white border-2 border-secondary/15 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl p-4"
          // >
          //   {/* Image */}
          //   <div className="relative h-64 overflow-hidden rounded-t-2xl">
          //     <img
          //       src={pet.pteImage}
          //       alt={pet.petName}
          //       className="w-full border-b border-secondary/50 h-full object-cover transition-transform duration-500 group-hover:scale-110"
          //     />
          //     {/* Category Badge */}
          //     <span className="absolute bg-secondary top-4 left-4  text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          //       {pet.petCategory}
          //     </span>
          //   </div>

          //   {/* Card Content */}
          //   <div className="p-6 space-y-2">
          //     <h3 className="text-2xl font-bold text-secondary dark:text-gray-100">
          //       {pet.petName}
          //     </h3>
          //     <p className="text-sm text-gray-600 dark:text-gray-300">
          //       Age: {pet.petAge} | Location: {pet.petlocation}
          //     </p>
          //     <div className="flex items-center justify-between">
          //       <p className="text-gray-700 dark:text-gray-200 text-sm line-clamp-3">
          //         {pet.shortDescription}
          //       </p>
          //       <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          //         Added: {new Date(pet.addedAt).toLocaleDateString()}
          //       </div>
          //     </div>
          //   </div>

          //   {/* Optional Hover Overlay */}
          //   <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
          // </div>


          <div
  key={pet._id}
  className="relative group rounded-3xl border border-secondary/20 bg-white dark:bg-gray-900 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
>
  {/* Image */}
  <div className="relative h-64 overflow-hidden">
    <img
      src={pet.pteImage}
      alt={pet.petName}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition duration-300"></div>

    {/* Category Badge */}
    <span className="absolute top-4 left-4 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
      {pet.petCategory}
    </span>
  </div>

  {/* Card Content */}
  <div className="p-5 flex flex-col gap-3">
    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-secondary transition">
      {pet.petName}
    </h3>

    {/* Age & Location */}
    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
      <span className="flex items-center gap-1">
        🐾 Age: <span className="font-medium">{pet.petAge}</span>
      </span>
      <span className="flex items-center gap-1">
        📍 {pet.petlocation}
      </span>
    </div>

    {/* Description */}
    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
      {pet.shortDescription}
    </p>

    {/* Added Date */}
    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
      Added: {new Date(pet.addedAt).toLocaleDateString()}
    </div>
  </div>

  {/* Hover Overlay Border Effect */}
  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-secondary/50 transition-all duration-300"></div>
</div>


        ))}
      </div>

      {/* See All Pets Button */}
      <div className="flex justify-center">
        <Link to="/pets">
          <button className="px-6 py-3 bg-secondary text-white dark:bg-white dark:text-black font-semibold rounded-lg hover:bg-primary-dark cursor-pointer dark:hover:bg-secondary-light transition-colors">
            See All Pets
          </button>
        </Link>
      </div>
    </Container>
  );
};

export default NewPets;
