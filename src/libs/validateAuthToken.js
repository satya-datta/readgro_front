const validateAuthToken = async () => {
  try {
    // const token = req.cookies.get("UserauthToken");
    // console.log(token);
    const response = await fetch(
      "http://localhost:5000/auth/uservalidate",
      {
        method: "GET",
        credentials: "include", // Ensures cookies are sent in the request
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return { isValid: false, user: null };
    }

    const data = await response.json();
    return { isValid: !!data.user, user: data.user };
  } catch (error) {
    console.error("Token validation error:", error);
    return { isValid: false, user: null };
  }
};

export default validateAuthToken;
