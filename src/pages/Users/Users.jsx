import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Swal from "sweetalert2";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const {
    data: users = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["searchedUsers", search],
    enabled: true,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?searchparams=${search}`);
      return res.data;
    },
  });

  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosSecure.patch(`/users/${id}/role`, { role }),
    onSuccess: () => {
      refetch();
    },
  });
  const handleRoleChange = async (id, currentRole) => {
    const action = currentRole === "admin" ? "Remove admin" : "Make admin";
    const newRole = currentRole === "admin" ? "user" : "admin";

    const confirm = await Swal.fire({
      title: `${action}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateRole({ id, role: newRole });
      Swal.fire("Success", `${action} successful`, "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update user role", "error");
    }
  };

  return (
    <div className="xl:w-[80%] mx-auto">
  <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-gray-900 dark:text-white">
    Make Admin
  </h2>

  <div className="flex items-center gap-3 mb-6">
    <FaSearch className="text-gray-700 dark:text-white" />
    <input
      type="text"
      className="w-full max-w-md border border-gray-300 rounded-md px-4 py-2
                 focus:outline-none focus:ring-2 focus:ring-black focus:border-black
                 transition
                 dark:bg-black dark:border-white dark:text-white dark:placeholder-white
                 dark:focus:ring-white dark:focus:border-white"
      placeholder="Search user by email"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  {/* Large screen Table */}
  <div className="hidden md:block">
    {isFetching ? (
      <div className="overflow-x-auto border rounded-lg shadow-sm
                      dark:border-white">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-white">
          <thead className="bg-white dark:bg-black">
            <tr>
              {[
                "Photo",
                "Email",
                "Role",
                "Created At",
                "Last Login",
                "Action",
              ].map((title, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-xs font-medium
                             text-black dark:text-white uppercase tracking-wider"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-black dark:divide-white">
            {[...Array(9)].map((_, idx) => (
              <tr key={idx}>
                {[...Array(6)].map((__, i) => (
                  <td key={i} className="px-6 py-4 whitespace-nowrap">
                    <Skeleton width={100} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : users.length === 0 && search ? (
      <p className="text-center text-black dark:text-white italic">No users found.</p>
    ) : (
      <div className="overflow-x-auto border rounded-lg shadow-sm dark:border-white">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-white">
          <thead className="bg-white dark:bg-black">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase">
                Photo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-black dark:text-white uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-black dark:divide-white">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-100 dark:hover:bg-white/30">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={u.photo || "/default-avatar.png"}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border border-black dark:border-white"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-black dark:text-white">{u.email}</td>
                <td className="px-6 py-4 text-sm text-black dark:text-white">
                  {new Date(u.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold
                      ${u.role === "admin"
                        ? "bg-white border-black border-2 text-black"
                        : "bg-black text-white"
                    }`}
                  >
                    {u.role || "user"}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleRoleChange(u._id, u.role || "user")}
                    className={`inline-flex cursor-pointer items-center gap-2 px-3 py-1 rounded-md text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-1
                      ${
                        u.role === "admin"
            ? "bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500"
                         : "bg-secondary text-white hover:bg-secondary/80 focus:ring-secondary"
                      }`}
                  >
                    {u.role === "admin" ? (
                      <>
                        <FaUserTimes />
                        Remove Admin
                      </>
                    ) : (
                      <>
                        <FaUserShield />
                        Make Admin
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>

  {/* Small device cards */}
  <div className="md:hidden space-y-4">
    {isFetching ? (
      [...Array(3)].map((_, idx) => (
        <div
          key={idx}
          className="border rounded-lg p-4 shadow-sm space-y-2 dark:border-white dark:bg-black"
        >
          <Skeleton height={30} width={200} />
          <Skeleton height={20} width={150} />
          <Skeleton height={20} width={100} />
          <Skeleton height={20} width={100} />
          <Skeleton height={35} width={120} />
        </div>
      ))
    ) : users.length === 0 && search ? (
      <p className="text-center text-black dark:text-white italic">No users found.</p>
    ) : (
      users.map((u) => (
        <div
          key={u._id}
          className="border rounded-lg p-4 shadow-sm flex flex-col gap-2
                     dark:border-white dark:bg-black"
        >
          <div className="flex items-center gap-3">
            <img
              src={u.photo || "/default-avatar.png"}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover border border-black dark:border-white"
            />
            <div>
              <p className="text-sm font-medium text-black dark:text-white">{u.email}</p>
              <span
                className={`text-xs font-medium ${
                  u.role === "admin" ? "text-white" : "text-gray-500 dark:text-white/70"
                }`}
              >
                {u.role || "user"}
              </span>
            </div>
          </div>
          <p className="text-sm text-black dark:text-white">
            Created: {new Date(u.created_at).toLocaleDateString()}
          </p>
          <p className="text-sm text-black dark:text-white">
            Last Login:{" "}
            {u.last_login ? new Date(u.last_login).toLocaleString() : "N/A"}
          </p>
          <button
            onClick={() => handleRoleChange(u._id, u.role || "user")}
            className={`mt-2 inline-flex cursor-pointer items-center gap-2 px-3 py-1 rounded-md text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-1
              ${
                u.role === "admin"
         ? "bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500"
 : "bg-secondary text-white hover:bg-secondary/80 focus:ring-secondary"
              }`}
          >
            {u.role === "admin" ? (
              <>
                <FaUserTimes />
                Remove Admin
              </>
            ) : (
              <>
                <FaUserShield />
                Make Admin
              </>
            )}
          </button>
        </div>
      ))
    )}
  </div>
</div>

  );
};

export default Users;
