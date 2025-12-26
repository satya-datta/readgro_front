export const createOrder = async (priceDifference) => {
  try {
    console.log(priceDifference);
    const response = await fetch(
      "http://localhost:5000/create-order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currency: "INR", amount: priceDifference }),
      }
    );

    const data = await response.json();
    console.log("Create Order Response:", data);

    if (!data.order.id) {
      console.error("Error: order_id missing in API response");
      return null;
    }

    // setOrderResponse(data);
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
};
export const validatePayment = async (paymentData) => {
  const response = await fetch(
    "http://localhost:5000/order/validate",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    }
  );
  return response.json();
};
