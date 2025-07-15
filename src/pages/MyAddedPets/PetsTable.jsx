import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";

const PetsTable = ({ pets, onDelete, isLoading }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const columns = useMemo(
    () => [
      {
        header: "Photo",
        accessorKey: "pteImage",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="pet"
            className="w-16 h-16 object-cover rounded"
          />
        ),
      },
      {
        header: "Pet Name",
        accessorKey: "petName",
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Status",
        accessorKey: "adopted",
        cell: ({ row }) =>
          row.original.adopted ? (
            <span className="text-green-600 font-semibold">Adopted</span>
          ) : (
            <span className="text-yellow-600 font-semibold">Available</span>
          ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <button
            onClick={() => onDelete(row.original)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        ),
      },
    ],
    [onDelete]
  );

  const table = useReactTable({
    data: pets,
    columns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    manualPagination: false,
    pageCount: Math.ceil(pets.length / pagination.pageSize),
  });

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full divide-y divide-gray-200 text-left">
        <thead className="bg-secondary text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-3">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading
            ? [...Array(5)].map((_, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-4">
                    <Skeleton height={64} width={64} />
                  </td>
                  <td className="px-4 py-4">
                    <Skeleton width="60%" />
                  </td>
                  <td className="px-4 py-4">
                    <Skeleton width="50%" />
                  </td>
                  <td className="px-4 py-4">
                    <Skeleton width="40%" />
                  </td>
                  <td className="px-4 py-4">
                    <Skeleton width="50%" />
                  </td>
                </tr>
              ))
            : table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-100 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-end gap-4 mt-4 items-center">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PetsTable;
