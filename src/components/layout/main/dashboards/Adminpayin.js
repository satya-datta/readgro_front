"use client";
import React, { useEffect, useState } from "react";

const Adminpayin = () => {
  const [payments, setPayments] = useState([]);
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(
          "https://your-backend-domain.com/getpayment"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setPayments(data.data);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, []);

  const filteredPayments = dateFilter
    ? payments.filter((p) => p.payment_time.startsWith(dateFilter))
    : payments;

  return (
    <div className="overflow-auto">
      {/* Date Filter */}
      <div className="mb-4">
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
            <th className="border p-2">User Name</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Payment Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <tr key={payment.payment_id} className="border">
                <td className="border p-2">{payment.payment_id}</td>
                <td className="border p-2">{payment.user_name}</td>
                <td className="border p-2">₹{payment.payment_amount}</td>
                <td className="border p-2">
                  {new Date(payment.payment_time).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No payments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Adminpayin;
