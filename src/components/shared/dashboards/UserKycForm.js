"use client";
import React, { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/UserContext";

const UserKycForm = () => {
  const { user } = useUserContext();
  const [editableData, setEditableData] = useState({
    account_holder_name: "",
    ifsc_code: "",
    account_number: "",
    bank_name: "",
    upi_id: "",
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    if (user?.userId) {
      fetchUserBankData(user.userId);
    }
  }, [user?.userId]);

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

      if (response.ok) {
        const data = await response.json();
        if (data.bank_details[0]) {
          setEditableData({
            account_holder_name: data.bank_details[0].account_holder_name,
            ifsc_code: data.bank_details[0].ifsc_code,
            account_number: data.bank_details[0].account_number,
            bank_name: data.bank_details[0].bank_name,
            upi_id: data.bank_details[0].upi_id,
          });
          setIsNewUser(false);
        } else {
          setIsNewUser(true);
        }
      } else {
        setIsNewUser(true);
      }
    } catch (error) {
      setIsNewUser(true);
    }
  };

  const handleInputChange = (e) => {
    setEditableData({ ...editableData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!editableData.account_holder_name.trim()) {
      newErrors.account_holder_name = "Account holder name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(editableData.account_holder_name)) {
      newErrors.account_holder_name = "Only alphabets and spaces are allowed";
    }

    if (!editableData.ifsc_code.trim()) {
      newErrors.ifsc_code = "IFSC code is required";
    } else if (!/^[A-Z]{4}[A-Z0-9]{7}$/.test(editableData.ifsc_code)) {
      newErrors.ifsc_code = "Invalid IFSC code format (e.g., ABCD0123456)";
    }

    if (!editableData.account_number.trim()) {
      newErrors.account_number = "Account number is required";
    } else if (!/^\d{8,18}$/.test(editableData.account_number)) {
      newErrors.account_number =
        "Account number must be between 8 and 18 digits";
    }

    if (!editableData.bank_name.trim()) {
      newErrors.bank_name = "Bank name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(editableData.bank_name)) {
      newErrors.bank_name = "Only alphabets and spaces are allowed";
    }

    if (!editableData.upi_id.trim()) {
      newErrors.upi_id = "UPI ID is required";
    } else if (!/^[\w.-]+@[\w.-]+$/.test(editableData.upi_id)) {
      newErrors.upi_id = "Invalid UPI ID format (e.g., name@bank)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) return;

    const url = isNewUser
      ? `http://localhost:5000/insert_bank_detials`
      : `http://localhost:5000/updateuser_bank_details/${user?.userId}`;

    const method = isNewUser ? "POST" : "PUT";

    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify({ user_id: user?.userId, ...editableData }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert(
          isNewUser
            ? "Bank details added successfully"
            : "Bank details updated successfully"
        );
        fetchUserBankData(user.userId);
      } else {
        console.error("Failed to save user bank data");
        alert("Failed to save data. Please try again.");
      }
    } catch (error) {
      console.error("Error saving user bank data:", error);
    }
  };

  return (
    <div className="p-5 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4">Bank Details</h2>
      <ul>
        {[
          { label: "Account Holder Name", name: "account_holder_name" },
          { label: "IFSC Code", name: "ifsc_code" },
          { label: "Account Number", name: "account_number" },
          { label: "Bank Name", name: "bank_name" },
          { label: "UPI ID", name: "upi_id" },
        ].map(({ label, name }) => (
          <li key={name} className="mb-3">
            <label className="font-semibold">{label}</label>
            <input
              type="text"
              name={name}
              value={editableData[name] || ""}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded mt-1 ${
                errors[name] ? "border-red-500" : ""
              }`}
            />
            {errors[name] && (
              <p className="text-red-500 text-sm">{errors[name]}</p>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={handleSaveChanges}
        className="mt-4 p-2 bg-primaryColor text-white rounded hover:bg-primaryColor"
      >
        Save Changes
      </button>
    </div>
  );
};

export default UserKycForm;
