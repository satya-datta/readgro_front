"use client";
import { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/UserContext";
import HeadingDashboard from "@/components/shared/headings/HeadingDashboard";
import { FetchWallet } from "@/libs/FetchWallet";
import Testloader from "@/components/shared/others/loader";

const RGWithdrawlRequestInner = () => {
  const { user } = useUserContext();
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showBankPopup, setShowBankPopup] = useState(false);
  const [userHasBankDetails, setUserHasBankDetails] = useState(false);

  const fetchWithdrawRequests = async () => {
    if (!user || !user?.userId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/getwithdrawlrequests/${user.userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      setWithdrawRequests(data.withdrawalRequests);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserWallet = async () => {
    if (!user || !user?.userId) return;

    const walletData = await FetchWallet(user.userId);
    if (walletData) {
      setWalletBalance(walletData.balance || 0);
    }
  };

  const fetchUserBankData = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/getuser_bank_details/${userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      if (data.bank_details?.length > 0) {
        setUserHasBankDetails(true);
      } else {
        setUserHasBankDetails(false);
      }
    } catch (error) {
      console.error("Error fetching user bank details:", error);
      setUserHasBankDetails(false);
    }
  };

  useEffect(() => {
    fetchWithdrawRequests();
    fetchUserWallet();
    if (user?.userId) {
      fetchUserBankData(user.userId);
    }
  }, [user]);

  const handleAddRequest = async () => {
    if (!userHasBankDetails) {
      setShowBankPopup(true);
      return;
    }

    if (!withdrawAmount || withdrawAmount <= 0) {
      alert("Please enter a valid withdrawal amount");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/withdrawlrequests/${user.userId}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ withdrawAmount }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Withdrawal request submitted successfully!");
        setShowPopup(false);
        setWithdrawAmount("");
        fetchWithdrawRequests();
        fetchUserWallet();
      } else {
        alert(data.message || "Failed to submit request");
      }
    } catch (error) {
      alert("Error submitting withdrawal request");
    }
  };

  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-white shadow rounded">
      <HeadingDashboard>Withdrawal Requests</HeadingDashboard>

      <div className="mb-4 p-4 bg-gray-100 rounded flex justify-between items-center">
        <h3 className="text-lg font-bold">Wallet Balance:</h3>
        <span className="text-xl font-bold text-green-600">
          ₹{walletBalance}
        </span>
      </div>

      <div className="mb-60px py-25px px-30px bg-lightGrey7 dark:bg-lightGrey7-dark grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 rounded-md">
        <div className="xl:col-start-1 xl:col-span-8">
          <h2 className="text-xl font-bold text-blackColor dark:text-blackColor-dark mb-5px">
            Make Request to Admin
          </h2>
          <p className="text-contentColor dark:text-contentColor-dark leading-1.8">
            Create New Withdrawal Request
          </p>
        </div>
        <div className="xl:col-start-9 xl:col-span-4">
          <button
            onClick={() => setShowPopup(true)}
            className="text-size-15 text-whiteColor bg-primaryColor px-25px py-10px border border-primaryColor hover:text-primaryColor hover:bg-whiteColor rounded group text-nowrap"
          >
            Add Request
          </button>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      {loading ? (
        <div>
          <Testloader />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          {" "}
          {/* ✅ Enables horizontal scrolling */}
          <table className="w-full text-left min-w-[600px]">
            {" "}
            {/* ✅ Ensures min width */}
            <thead className="text-sm bg-gray-100">
              <tr>
                <th className="px-5 py-3">S/N</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="text-size-13 md:text-base text-contentColor dark:text-contentColor-dark font-normal">
              {withdrawRequests.length > 0 ? (
                withdrawRequests.map((request, index) => (
                  <tr key={request.id} className="leading-1.8 md:leading-1.8">
                    <td className="px-5px py-10px md:px-5 font-normal">
                      {index + 1}
                    </td>
                    <td className="px-5px py-10px md:px-5 font-normal font-bold text-blackColor dark:text-blackColor-dark">
                      ₹{request.amount ?? "N/A"}
                    </td>
                    <td className="px-5px py-10px md:px-5">
                      <span
                        className={`${request.status === "approved"
                            ? "bg-primaryColor"
                            : request.status === "rejected"
                              ? "bg-red-500"
                              : "bg-secondaryColor"
                          } h-22px inline-block px-7px leading-22px font-bold text-whiteColor rounded-md capitalize`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-5px py-10px md:px-5 font-normal">
                      {new Date(request.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-10px">
                    No withdrawal requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Withdrawal Request</h2>

            {/* Bank details warning inside popup */}
            {showBankPopup && (
              <p className="text-red-500 mb-4">
                Please fill in your bank details before proceeding.
              </p>
            )}

            <label className="block mb-2">Withdrawal Amount:</label>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Enter Amount"
            />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowPopup(false);
                  setShowBankPopup(false); // clear bank popup on cancel
                }}
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRequest}
                className="px-4 py-2 bg-primaryColor text-white rounded-md"
              >
                Add Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RGWithdrawlRequestInner;
