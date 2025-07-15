import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Title from "../../components/Shared/Title/Title";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyAddedPets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ✅ Fetch pets
  const { data: pets = [], isLoading } = useQuery({
    queryKey: ["myPets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/owner-pets?email=${user?.email}`);
      return res.data;
    },
  });

  // ✅ Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/pet-woner-delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Pet has been deleted.", "success");
      queryClient.invalidateQueries(["myPets"]);
    },
  });

  const handleDelete = (pet) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `You are about to delete "${pet.petName}".`,
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

  // ✅ Adopt Mutation
  const adoptMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/pte-owner/adopt/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myPets"]);
    },
  });

  const handleAdopt = (pet) => {
    adoptMutation.mutate(pet._id);
  };

  // ✅ Table Columns
  const columns = [
       {
      header: "SL",
      cell: (info) => info.row.index + 1,
    },
        {
      header: "Image",
      accessorKey: "pteImage",
      cell: ({ getValue }) => (
        <img src={getValue()} alt="pet" className="w-[120px] border border-secondary  object-cover rounded-md" />
      ),
    },
 
    {
      header: "Pet Name",
      accessorKey: "petName",
    },
    {
      header: "Category",
      accessorKey: "petCategory",
    },

    {
      header: "Adoption Status",
      accessorKey: "adopted",
      cell: ({ getValue }) =>
        getValue() === "adopted" ? (
          <span className="text-green-600 font-semibold">Adopted</span>
        ) : (
          <span className="text-yellow-600 font-semibold">Not Adopted</span>
        ),
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const pet = row.original;
        return (
          <div className="space-x-2">
            <button
              onClick={() => navigate(`/dashboard/pet-update/${pet._id}`)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(pet)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
            {pet.adopted !== "adopted" && (
              <button
                onClick={() => handleAdopt(pet)}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Adopt
              </button>
            )}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: pets || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="xl:w-[80%] mx-auto px-2">
      <Title titels="My Added" titese="Pets" />

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-4 items-center"
            >
              <Skeleton width={100} height={100} />
              <div className="flex-1 w-full space-y-2">
                <Skeleton height={20} width="60%" />
                <Skeleton height={20} width="40%" />
                <Skeleton height={20} width="30%" />
              </div>
              <Skeleton width={90} height={30} />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto shadow-md border rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 text-left">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 cursor-pointer select-none"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === "asc"
                          ? " 🔼"
                          : header.column.getIsSorted() === "desc"
                          ? " 🔽"
                          : ""}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-t">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4 mt-4">
            {table.getRowModel().rows.map((row) => {
              const pet = row.original;
              return (
                <div
                  key={row.id}
                  className="border rounded-lg p-4 shadow space-y-2"
                >
                  <img
                    src={pet.pteImage}
                    alt={pet.petName}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h2 className="text-lg font-bold">{pet.petName}</h2>
                  <p className="text-sm text-gray-500">Category: {pet.petCategory}</p>
                  <p className="text-sm">
                    Status:{" "}
                    <span
                      className={
                        pet.adopted === "adopted" ? "text-green-600" : "text-yellow-600"
                      }
                    >
                      {pet.adopted === "adopted" ? "Adopted" : "Not Adopted"}
                    </span>
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/dashboard/pet-update/${pet._id}`)}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(pet)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                    {pet.adopted !== "adopted" && (
                      <button
                        onClick={() => handleAdopt(pet)}
                        className="px-3 py-1 bg-green-500 text-white rounded"
                      >
                        Adopt
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {table.getPageCount() > 1 && (
            <div className="flex justify-center gap-3 py-4">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-2 py-1">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyAddedPets;
