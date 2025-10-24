export const FetchWallet = async (userId) => {
  if (!userId) {
    console.error("fetchWallet: userId is required");
    return null;
  }

  try {
    const response = await fetch(
      `https://readgro-backend-new.onrender.com/getwallet/${userId}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching wallet: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Return wallet data
  } catch (error) {
    console.error("fetchWallet error:", error);
    return null;
  }
};
export const deductWalletBalance = async (userId, amount, setShowPopup) => {
  if (!userId || !amount || amount <= 0) {
    console.error("deductWalletBalance: Invalid userId or amount");
    return false;
  }

  try {
    const response = await fetch(
      `https://readgro-backend-new.onrender.com/deductwallet`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, amount }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Error deducting wallet balance:", data);
      if (data.message === "Insufficient wallet balance") {
        setShowPopup(true); // Show popup when insufficient balance
      }
      return false;
    }

    return data.success; // Assuming API returns { success: true } on success
  } catch (error) {
    console.error("deductWalletBalance error:", error);
    return false;
  }
};
