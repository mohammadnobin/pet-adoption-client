// import React from "react";
// import { Eye, Pencil, Trash2 } from "lucide-react";
// import Skeleton from "react-loading-skeleton";
// import { Link } from "react-router";

// const PetsTable = ({ pets = [], onUpdate, onDelete, }) => {
//   console.log(pets);
//   return (
//     <div className="xl:w-7xl w-full mx-auto p-4">
//       {/* বড় ডিভাইস: Table */}
//       <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg border border-gray-300">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-secondary text-white">
//             <tr className="border-2 border-secondary">
//               <th className="px-6 py-3 text-center text-sm font-semibold">
//                 Image
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">
//                 Pet Name
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">
//                 Category
//               </th>
//               <th className="px-6 py-3 text-center text-sm font-semibold">
//                 Adoption Status
//               </th>
//               <th className="px-6 py-3 text-center text-sm font-semibold">
//                 Actions
//               </th>
//             </tr>
//           </thead>

//           <tbody className="bg-white divide-y divide-gray-200">
//             {pets.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={6}
//                   className="text-center py-6 text-gray-500 italic"
//                 >
//                   No pets found.
//                 </td>
//               </tr>
//             ) : (
//               pets.map((pet, index) => (
//                 <tr
//                   key={pet._id || index}
//                   className="hover:bg-secondary/20 bg-white border-2 border-secondary mb-3 transition-colors duration-200"
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <img
//                       src={pet.pteImage}
//                       alt={pet.petName}
//                       className="w-32 h-32 object-cover rounded-md mx-auto border border-gray-200"
//                     />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
//                     {pet.petName}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {pet.petCategory}
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     {pet.adopted === "adopted" ? (
//                       <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold border-2 border-secondary text-secondary ">
//                         Adopted
//                       </span>
//                     ) : (
//                       <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-white">
//                         Not Adopted
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="xl:flex justify-center hidden  gap-2">
//                       {/* View Button */}
//                       <Link
//                         to={`/pet-details/${pet._id}`}
//                         className="flex items-center gap-1 bg-secondary hover:bg-secondary/30 text-white px-3 py-2 rounded text-sm transition"
//                       >
//                         <Eye size={16} />
//                         View
//                       </Link>

//                       {/* Update Button */}
//                       <button
//                         onClick={() => onUpdate(pet)}
//                         className="flex items-center gap-1 bg-secondary hover:bg-secondary/20 text-white px-3 py-2 rounded text-sm transition"
//                       >
//                         <Pencil size={16} />
//                         Update
//                       </button>

//                       {/* Delete Button */}
//                       <button
//                         onClick={() => onDelete(pet)}
//                         className="flex items-center gap-1 bg-secondary hover:bg-secondary/20 text-white px-3 py-2 rounded text-sm transition"
//                       >
//                         <Trash2 size={16} />
//                         Delete
//                       </button>
//                     </div>
//                     <div className="flex justify-center xl:hidden  gap-2">
//                       {/* View Button */}
//                       <Link
//                         to={`/pet-details/${pet._id}`}
//                         className="flex items-center gap-1 bg-secondary hover:bg-secondary/20 text-white px-3 py-2 rounded text-sm transition"
//                       >
//                         <Eye size={16} />
//                       </Link>

//                       {/* Update Button */}
//                       <button
//                         onClick={() => onUpdate(pet)}
//                         className="flex items-center gap-1 bg-secondary hover:bg-secondary/20 text-white px-3 py-2 rounded text-sm transition"
//                       >
//                         <Pencil size={16} />
//                       </button>

//                       {/* Delete Button */}
//                       <button
//                         onClick={() => onDelete(pet)}
//                         className="flex items-center gap-1 bg-secondary hover:bg-secondary/20 text-white px-3 py-2 rounded text-sm transition"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ছোট ডিভাইস: Card View */}
//       <div className="md:hidden space-y-4">
//         {pets.length === 0 ? (
//           <p className="text-center py-6 text-gray-500 italic">
//             No pets found.
//           </p>
//         ) : (
//           pets.map((pet, index) => (
//             <div
//               key={pet._id || index}
//               className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition"
//             >
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={pet.pteImage}
//                   alt={pet.petName}
//                   className="w-20 h-20 object-cover rounded-md border border-gray-200"
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-seondbg-secondary">
//                     {pet.petName}
//                   </h3>
//                   <p className="text-sm text-gray-700">
//                     Category: {pet.petCategory}
//                   </p>
//                   <p className="text-sm text-gray-700">
//                     Status:{" "}
//                     {pet.adopted === "adopted" ? (
//                       <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold border-2 border-secondary text-secondary ">
//                         Adopted
//                       </span>
//                     ) : (
//                       <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-secondary text-white">
//                         Not Adopted
//                       </span>
//                     )}
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-4 flex justify-between">
//                 <Link
//                   to={`/pet-details/${pet._id}`}
//                   className="flex items-center gap-1 bg-secondary hover:bg-secondary/20 text-white px-3 py-2 rounded text-sm transition"
//                 >
//                   <Eye size={16} />
//                   View
//                 </Link>

//                 {/* Update Button */}
//                 <button
//                   onClick={() => onUpdate(pet)}
//                   className="flex items-center gap-1 bg-secondary hover:bg-secondary/20 text-white px-3 py-2 rounded text-sm transition"
//                 >
//                   <Pencil size={16} />
//                   Update
//                 </button>

//                 {/* Delete Button */}
//                 <button
//                   onClick={() => onDelete(pet)}
//                   className="flex items-center gap-1 bg-secondary hover:bg-secondary/20 text-white px-3 py-2 rounded text-sm transition"
//                 >
//                   <Trash2 size={16} />
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default PetsTable;


import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PetsTable = ({ pets = [], isLoading, onUpdate, onDelete }) => {
  return (
    <div className="xl:w-7xl w-full mx-auto p-4">
      {/* Large screen: Table View */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg border border-gray-300">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-secondary text-white">
            <tr className="border-2 border-secondary">
              <th className="px-6 py-3 text-center text-sm font-semibold">Image</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Pet Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Adoption Status</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              [...Array(9)].map((_, idx) => (
                <tr key={idx} className="border-2 border-secondary">
                  <td className="px-6 py-4 text-center">
                    <Skeleton height={80} width={80} className="mx-auto" />
                  </td>
                  <td className="px-6 py-4"><Skeleton width="60%" /></td>
                  <td className="px-6 py-4"><Skeleton width="50%" /></td>
                  <td className="px-6 py-4 text-center"><Skeleton width="70%" /></td>
                  <td className="px-6 py-4 text-center"><Skeleton width="80%" /></td>
                </tr>
              ))
            ) : pets.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500 italic">
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
                  <td className="px-6 py-4 font-medium text-gray-900">{pet.petName}</td>
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
                      <Link to={`/pet-details/${pet._id}`} className="bg-secondary text-white p-2 rounded">
                        <Eye size={16} />
                      </Link>
                      <button onClick={() => onUpdate(pet)} className="bg-secondary text-white p-2 rounded">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => onDelete(pet)} className="bg-secondary text-white p-2 rounded">
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
            <div key={idx} className="border border-gray-300 rounded-lg p-4 shadow">
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
          <p className="text-center py-6 text-gray-500 italic">No pets found.</p>
        ) : (
          pets.map((pet, index) => (
            <div key={pet._id || index} className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition">
              <div className="flex items-center space-x-4">
                <img
                  src={pet.pteImage}
                  alt={pet.petName}
                  className="w-20 h-20 object-cover rounded-md border border-gray-200"
                />
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-semibold text-secondary">{pet.petName}</h3>
                  <p className="text-sm text-gray-700">Category: {pet.petCategory}</p>
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
                <Link to={`/pet-details/${pet._id}`} className="bg-secondary flex items-center gap-x-2 text-white px-3 py-2 rounded text-sm">
                  <Eye size={16} /> View
                </Link>
                <button onClick={() => onUpdate(pet)} className="bg-secondary flex items-center gap-x-2 text-white px-3 py-2 rounded text-sm">
                  <Pencil size={16} /> Update
                </button>
                <button onClick={() => onDelete(pet)} className="bg-secondary flex items-center gap-x-2 text-white px-3 py-2 rounded text-sm">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PetsTable;
