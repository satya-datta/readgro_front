import React, { useEffect, useState } from "react";

const WithDrawlRequest = ({ userId }) => {
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [bankDetails, setBankDetails] = useState(null);
  const [showBankModal, setShowBankModal] = useState(false);

  // 📌 Fetch Withdrawal Requests
  useEffect(() => {
    const fetchWithdrawRequests = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/getwithdrawlrequests/${userId}`
        );
        if (!response.ok)
          throw new Error("Failed to fetch withdrawal requests");
        const data = await response.json();

        if (data.withdrawalRequests && Array.isArray(data.withdrawalRequests)) {
          setWithdrawRequests(data.withdrawalRequests);
        } else {
          console.error(
            "Expected withdrawalRequests to be an array, but got:",
            data
          );
        }
      } catch (error) {
        console.error("Error fetching withdrawal requests:", error);
      }
    };

    fetchWithdrawRequests();
  }, [userId]);

  // 📌 Send OTP & Show Modal
  const handlePayClick = async (request) => {
    setSelectedRequest(request);
    setShowOtpModal(true);

    try {
      const response = await fetch(
        "http://localhost:5000/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok)
        throw new Error(`Failed to send OTP: ${response.statusText}`);
      console.log("OTP request sent successfully");
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  // 📌 Handle OTP Submit
  const handleOtpSubmit = async () => {
    if (!otp) return alert("Please enter OTP");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/process-payout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            amount: selectedRequest.amount,
            otp,
            requestId: selectedRequest.id,
          }),
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

  // 📌 View User Bank Details
  const handleViewBankDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/getuser_bank_details/${userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch bank details");

      const data = await response.json();
      console.log(data);
      setBankDetails(data.bank_details);
      setShowBankModal(true);
    } catch (error) {
      console.error("Error fetching user bank details:", error);
    }
  };

  return (
    <div className="overflow-auto">
      <table className="w-full text-left">
        <thead className="text-sm md:text-base text-black bg-lightGrey5 leading-1.8">
          <tr>
            <th className="px-5px py-10px">Request ID</th>
            <th className="px-5px py-10px">Amount</th>
            <th className="px-5px py-10px">Status</th>
            <th className="px-5px py-10px">Created Time</th>
            <th className="px-5px py-10px">Actions</th>
          </tr>
        </thead>
        <tbody className="text-size-13 md:text-base text-contentColor">
          {withdrawRequests.length > 0 ? (
            withdrawRequests.map((request, index) => (
              <tr
                key={request.id}
                className={index % 2 === 0 ? "bg-lightGrey5" : ""}
              >
                <td className="px-5px py-10px">{request.id}</td>
                <td className="px-5px py-10px">{request.amount}</td>
                <td className="px-5px py-10px">{request.status}</td>
                <td className="px-5px py-10px">
                  {new Date(request.created_at).toLocaleString()}
                </td>
                <td className="px-5px py-10px flex gap-2">
                  {request.status.toLowerCase() === "pending" ? (
                    <button
                      className="bg-primaryColor text-white px-4 py-2 rounded"
                      onClick={() => handlePayClick(request)}
                    >
                      Pay
                    </button>
                  ) : request.status.toLowerCase() === "approved" ? (
                    <button
                      className="bg-gray-400 text-white px-4 py-2 rounded"
                      disabled
                    >
                      Paid
                    </button>
                  ) : null}
                  <button
                    className="bg-blue-500 text-white px-3 py-2 rounded"
                    onClick={handleViewBankDetails}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-10px">
                No withdrawal requests available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* OTP Modal */}
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

      {/* Bank Details Modal */}
      {showBankModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40">
          <div className="bg-white p-5 rounded shadow-md w-96">
            <h3 className="text-lg font-semibold mb-4">User Bank Details</h3>
            {bankDetails ? (
              <ul className="text-left space-y-2">
                <li>
                  <strong>Account Holder:</strong>{" "}
                  {bankDetails[0].account_holder_name}
                </li>
                <li>
                  <strong>Account Number:</strong>{" "}
                  {bankDetails[0].account_number}
                </li>
                <li>
                  <strong>Bank Name:</strong> {bankDetails[0].bank_name}
                </li>
                <li>
                  <strong>IFSC Code:</strong> {bankDetails[0].ifsc_code}
                </li>
                <li>
                  <strong>Upi Id:</strong> {bankDetails[0].upi_id}
                </li>
              </ul>
            ) : (
              <p>Loading...</p>
            )}
            <div className="text-right mt-4">
              <button
                onClick={() => setShowBankModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithDrawlRequest;
