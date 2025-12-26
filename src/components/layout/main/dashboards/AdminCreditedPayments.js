"use client";
import React, { useEffect, useState } from "react";

const AdminCreditedPayments = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/payments"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.payments)) {
          setPayments(data.payments);
          setFilteredPayments(data.payments);
        } else {
          console.error("Unexpected response format", data);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, []);

  // Filtering function
  useEffect(() => {
    let filtered = payments;
    if (statusFilter !== "All") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }
    if (methodFilter !== "All") {
      filtered = filtered.filter((p) => p.method === methodFilter);
    }
    if (dateFilter) {
      filtered = filtered.filter((p) => p.created_at.startsWith(dateFilter));
    }
    setFilteredPayments(filtered);
  }, [statusFilter, methodFilter, dateFilter, payments]);

  return (
    <div className="overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Status Filter */}
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="captured">Captured</option>
          <option value="authorized">Authorized</option>
        </select>

        {/* Method Filter */}
        <select
          className="border p-2 rounded"
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
        >
          <option value="All">All Methods</option>
          <option value="upi">UPI</option>
          <option value="card">Card</option>
        </select>

        {/* Date Filter */}
        <input
          type="date"
          className="border p-2 rounded"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      <table className="w-full text-left border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Payment ID</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Currency</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Method</th>
            <th className="border p-2">Created Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <tr key={payment.id} className="border">
                <td className="border p-2">{payment.id}</td>
                <td className="border p-2">{payment.amount}</td>
                <td className="border p-2">{payment.currency}</td>
                <td className="border p-2">{payment.status}</td>
                <td className="border p-2">{payment.method}</td>
                <td className="border p-2">
                  {new Date(payment.created_at).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No payments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCreditedPayments;
