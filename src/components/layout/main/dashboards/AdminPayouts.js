import React, { useEffect, useState } from "react";

const AdminPayouts = ({ userId }) => {
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWithdrawRequests = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/getpayouts`
        );
        if (!response.ok)
          throw new Error("Failed to fetch withdrawal requests");
        const data = await response.json();
        if (data.withdrawalRequests && Array.isArray(data.withdrawalRequests)) {
          setWithdrawRequests(data.withdrawalRequests);
          setFilteredRequests(data.withdrawalRequests);
        }
      } catch (error) {
        console.error("Error fetching withdrawal requests:", error);
      }
    };
    fetchWithdrawRequests();
  }, [userId]);

  useEffect(() => {
    let filtered = withdrawRequests;
    if (statusFilter !== "All") {
      filtered = filtered.filter((req) => req.status === statusFilter);
    }
    if (dateFilter) {
      filtered = filtered.filter((req) =>
        req.created_at.startsWith(dateFilter)
      );
    }
    setFilteredRequests(filtered);
  }, [statusFilter, dateFilter, withdrawRequests]);

  const handlePayClick = async (request) => {
    setSelectedRequest(request);
    setShowOtpModal(true);
    try {
      await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp) return alert("Please enter OTP");
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/process-payout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, amount: selectedRequest.amount, otp }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Payout processed successfully!");
        setWithdrawRequests((prev) =>
          prev.map((req) =>
            req.id === selectedRequest.id ? { ...req, status: "Paid" } : req
          )
        );
      } else {
        alert("Failed to process payout: " + data.message);
      }
    } catch (error) {
      console.error("Error processing payout:", error);
    }
    setShowOtpModal(false);
    setOtp("");
    setLoading(false);
  };

  return (
    <div className="overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
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
            <th className="border p-2">Request ID</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Created Time</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <tr key={request.id} className="border">
                <td className="border p-2">{request.id}</td>
                <td className="border p-2">{request.amount}</td>
                <td className="border p-2">{request.status}</td>
                <td className="border p-2">
                  {new Date(request.created_at).toLocaleString()}
                </td>
                <td className="border p-2">
                  {request.status.toLowerCase() === "pending" && (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => handlePayClick(request)}
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No withdrawal requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showOtpModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg text-center">
            <h2 className="text-lg mb-3">Enter OTP</h2>
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              placeholder="Enter OTP"
            />
            <div className="mt-3 flex justify-center gap-3">
              <button
                className="bg-primaryColor text-white px-4 py-2 rounded"
                onClick={handleOtpSubmit}
                disabled={loading}
              >
                {loading ? "Processing..." : "Verify & Pay"}
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setShowOtpModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayouts;
