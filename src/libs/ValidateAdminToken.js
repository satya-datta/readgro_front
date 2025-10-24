const validateAdminToken = async () => {
  try {
    const token = localStorage.getItem("adminToken");

    if (!token) return { isValid: false, admin: null };

    const response = await fetch(
      "https://readgro-backend-new.onrender.com/auth/validate",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Send token in header
        },
      }
    );

    if (!response.ok) {
      return { isValid: false, admin: null };
    }

    const data = await response.json();
    console.log(data);
    return { isValid: !!data.admin, admin: data.admin };
  } catch (error) {
    console.error("Admin token validation error:", error);
    return { isValid: false, admin: null };
  }
};

export default validateAdminToken;
