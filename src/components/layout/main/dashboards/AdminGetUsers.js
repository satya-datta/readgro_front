"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // App Router hook
function AdminGetUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://readgro-backend-new.onrender.com/getallusers")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  console.log(users);
  const filteredUsers = users
    .filter(
      (user) =>
        user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.generatedReferralCode
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "withdrawals") {
        return b.withdrawalCount - a.withdrawalCount;
      } else if (sortOption === "latest") {
        return new Date(b.latestWithdrawal) - new Date(a.latestWithdrawal);
      }
      return 0;
    });

  const handleView = (userId) => {
    router.push(`../Gnaneswar/admin-users/manageuser/${userId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Users</h1>

      {/* Search & Sort */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by name or referral code"
          className="border px-3 py-2 rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/4"
        >
          <option value="">Sort by</option>
          <option value="withdrawals">Withdrawal Count</option>
          <option value="latest">Latest Withdrawal</option>
        </select>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Referral Code</th>
              <th className="px-4 py-2 border">Wallet Balance</th>
              <th className="px-4 py-2 border">Phone Number</th>
              <th className="px-4 py-2 border">Withdrawals</th>
              <th className="px-4 py-2 border">Latest Request</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.userId} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{user.Name}</td>
                <td className="px-4 py-2 border">
                  {user.generatedReferralCode}
                </td>
                <td className="px-4 py-2 border">₹{user.balance || 0}</td>
                <td className="px-4 py-2 border">{user.Phone}</td>
                <td className="px-4 py-2 border">{user.withdrawalCount}</td>
                <td className="px-4 py-2 border">
                  {user.latestWithdrawal
                    ? new Date(user.latestWithdrawal).toLocaleString()
                    : "N/A"}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleView(user.userId)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminGetUsers;
