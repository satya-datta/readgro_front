"use client";
import { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/UserContext";
import HeadingDashboard from "@/components/shared/headings/HeadingDashboard";
import { FetchWallet } from "@/libs/FetchWallet"; // Import fetchWallet function
import Testloader from "@/components/shared/others/loader";

const WalletTransactions = () => {
  const { user } = useUserContext(); // Retrieve user data from context
  const [transactions, setTransactions] = useState([]); // Updated state name
  const [walletBalance, setWalletBalance] = useState(0); // State for wallet balance
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    if (!user || !user?.userId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/getwallettransaction/${user.userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      setTransactions(data.transactions); // Updated state to transactions
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
      setWalletBalance(walletData.balance || 0); // Update wallet balance
    }
  };

  // Fetch data on page load
  useEffect(() => {
    fetchTransactions();
    fetchUserWallet();
  }, [user]);

  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark rounded-5">
      <HeadingDashboard>Wallet Transactions</HeadingDashboard>

      {/* Wallet Balance Display */}
      <div className="mb-4 p-4 bg-lightGrey5 dark:bg-lightGrey5-dark rounded-md flex justify-between items-center">
        <h3 className="text-lg font-bold text-blackColor dark:text-blackColor-dark">
          Wallet Balance:
        </h3>
        <span className="text-xl font-bold text-primaryColor">
          ₹{walletBalance}
        </span>
      </div>

      <hr className="my-4 border-contentColor opacity-35" />
      <div>
        {loading ? (
          <div>
            <Testloader />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-left">
              <thead className="text-sm md:text-base text-blackColor dark:text-blackColor-dark bg-lightGrey5 dark:bg-whiteColor-dark leading-1.8 md:leading-1.8">
                <tr>
                  <th className="px-5px py-10px md:px-5">S/N</th>
                  <th className="px-5px py-10px md:px-5">Amount</th>
                  <th className="px-5px py-10px md:px-5">Transaction Type</th>
                  <th className="px-5px py-10px md:px-5">Created Time</th>
                </tr>
              </thead>
              <tbody className="text-size-13 md:text-base text-contentColor dark:text-contentColor-dark font-normal">
                {transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <tr
                      key={transaction.id}
                      className="leading-1.8 md:leading-1.8"
                    >
                      <td className="px-5px py-10px md:px-5 font-normal">
                        {index + 1}
                      </td>
                      <td className="px-5px py-10px md:px-5 font-bold text-blackColor dark:text-blackColor-dark">
                        ₹{transaction.amount ?? "N/A"}
                      </td>
                      <td className="px-5px py-10px md:px-5 capitalize">
                        <span
                          className={`${transaction.transaction_type === "credit"
                              ? "bg-primaryColor"
                              : "bg-red-500"
                            } h-22px inline-block px-7px leading-22px font-bold text-whiteColor rounded-md`}
                        >
                          {transaction.transaction_type}
                        </span>
                      </td>
                      <td className="px-5px py-10px md:px-5 font-normal">
                        {new Date(transaction.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-10px">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletTransactions;
