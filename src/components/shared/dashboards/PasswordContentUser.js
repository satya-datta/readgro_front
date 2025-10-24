import React, { useState } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { useUserContext } from "@/contexts/UserContext"; // Get user ID from context

const PasswordContentUser = () => {
  const { user } = useUserContext(); // Get user ID
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    try {
      // Step 1: Validate old password
      const validateRes = await fetch(
        "https://readgro-backend-new.onrender.com/validate-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.userId,
            password: oldPassword,
          }),
        }
      );

      const validateData = await validateRes.json();
      console.log("Validate Response:", validateRes.status, validateData);

      if (!validateRes.ok) {
        setError(validateData.message || "Old password is incorrect.");
        return;
      }

      // Step 2: Validate new password only after old password is confirmed
      if (newPassword !== confirmPassword) {
        setError("New passwords do not match.");
        return;
      }

      if (newPassword.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }

      // Step 3: Update new password
      const updateRes = await fetch(
        `https://readgro-backend-new.onrender.com/updatepassword/${user.userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      const updateData = await updateRes.json();

      if (!updateRes.ok) {
        setError(updateData.message || "Failed to update password.");
      } else {
        setSuccess("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error(err);
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
          <label className="mb-3 block font-semibold">Old Password</label>
          <input
            type="password"
            placeholder="Old Password"
            className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-3 block font-semibold">New Password</label>
          <input
            type="password"
            placeholder="New Password"
            className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md"
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
            className="w-full py-10px px-5 text-sm focus:outline-none text-contentColor dark:text-contentColor-dark bg-whiteColor dark:bg-whiteColor-dark border-2 border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 leading-23px rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Success Message */}
      {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

      <div className="mt-15px">
        <ButtonPrimary type="submit">Update Password</ButtonPrimary>
      </div>
    </form>
  );
};

export default PasswordContentUser;
