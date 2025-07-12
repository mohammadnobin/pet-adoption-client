import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [emailQuery, setEmailQuery] = useState("");

  const {
    data: users = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["searchedUsers", emailQuery],
    enabled: !!emailQuery,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
      return res.data;
    },
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
  <h2 className="text-3xl font-semibold mb-6 text-gray-800">Make Admin</h2>

  <div className="flex items-center gap-3 mb-6">
    <FaSearch className="text-gray-500" />
    <input
      type="text"
      className="w-full max-w-md border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition"
      placeholder="Search user by email"
      value={emailQuery}
      onChange={(e) => setEmailQuery(e.target.value)}
    />
  </div>

  {isFetching && <p className="text-gray-600">Loading users...</p>}

  {!isFetching && users.length === 0 && emailQuery && (
    <p className="text-center text-gray-500 italic">No users found.</p>
  )}

  {users.length > 0 && (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Created At
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Role
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((u) => (
            <tr key={u._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {u.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {new Date(u.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                    u.role === "admin"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {u.role || "user"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  // onClick={() => handleRoleChange(u._id, u.role || "user")}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                    u.role === "admin"
                      ? "bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500"
                      : "bg-lime-500 text-white hover:bg-lime-600 focus:ring-lime-400"
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

  );
};

export default Users;
