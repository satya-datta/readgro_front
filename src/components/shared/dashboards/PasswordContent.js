import React, { useState, useEffect } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { useUserContext } from "@/contexts/UserContext";
import bcrypt from "bcryptjs"; // For password encryption

const PasswordContent = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/getadmindetails"
        );
        const data = await response.json();
        setEmail(data.email || "");
        setName(data.name || "");
        setPhone(data.phone_number || "");
      } catch (err) {
        console.error("Error fetching admin details:", err);
      }
    };
    fetchAdminDetails();
  }, []);

  const handleSendOtp = async () => {
    setError("");
    setSuccess("");
    try {
      const response = await fetch(
        "http://localhost:5000/admin-cred-send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      if (response.ok) {
        setOtpSent(true);
        setSuccess("OTP sent successfully!");
      } else {
        setError("Failed to send OTP.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const hashedPassword = newPassword
      ? await bcrypt.hash(newPassword, 10)
      : null;

    try {
      const response = await fetch(
        "http://localhost:5000/update-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            name,
            phone_number: phone,
            password: hashedPassword,
            otp,
          }),
        }
      );

      const responseData = await response.json(); // Get response body

      if (response.ok) {
        setSuccess("Admin details updated successfully!");
        setNewPassword("");
        setConfirmPassword("");
        setOtp("");
        setOtpSent(false);
      } else {
        setError(responseData.message || "Failed to update admin details.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      className="text-sm text-blackColor dark:text-blackColor-dark leading-1.8"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-y-15px gap-x-30px mb-15px">
        <div>
          <label className="mb-3 block font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full py-10px px-5 text-sm rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-3 block font-semibold">Full Name</label>
          <input
            type="text"
            placeholder="Enter Full Name"
            className="w-full py-10px px-5 text-sm rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-3 block font-semibold">Phone Number</label>
          <input
            type="text"
            placeholder="Enter Phone Number"
            className="w-full py-10px px-5 text-sm rounded-md"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        {!otpSent ? (
          <div className="mt-15px">
            <ButtonPrimary type="button" onClick={handleSendOtp}>
              Send OTP
            </ButtonPrimary>
          </div>
        ) : (
          <>
            <div>
              <label className="mb-3 block font-semibold">Enter OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full py-10px px-5 text-sm rounded-md"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-3 block font-semibold">New Password</label>
              <input
                type="password"
                placeholder="New Password (optional)"
                className="w-full py-10px px-5 text-sm rounded-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-3 block font-semibold">
                Re-Type New Password
              </label>
              <input
                type="password"
                placeholder="Re-Type New Password"
                className="w-full py-10px px-5 text-sm rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
      {otpSent && (
        <div className="mt-15px">
          <ButtonPrimary type="submit">Update Admin Details</ButtonPrimary>
        </div>
      )}
    </form>
  );
};

export default PasswordContent;
