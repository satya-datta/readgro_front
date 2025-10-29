import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserLoginForm = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginMethod, setLoginMethod] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://readgro-backend-new.onrender.com/userauth",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
        setError(null);
        setLoginMethod("password");
        setRedirecting(true);
      } else {
        setIsAuthenticated(false);
        setError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setIsAuthenticated(false);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://readgro-backend-new.onrender.com/send-userlogin-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setError(null);
        setSuccess("OTP sent successfully!");
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://readgro-backend-new.onrender.com/verifyuser-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (forgotPassword) {
          setOtpVerified(true);
          setSuccess("OTP verified. Please set your new password.");
        } else {
          setLoginMethod("otp");
          setRedirecting(true);
        }
      } else {
        setError(data.message || "Invalid OTP.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Get user ID
      const userRes = await fetch(
        `https://readgro-backend-new.onrender.com/getuserbyemail/${email}`
      );
      const user = await userRes.json();
      console.log(user);
      if (!userRes.ok) {
        throw new Error(user.message || "Failed to find user");
      }

      // Step 2: Update password
      const updateRes = await fetch(
        `https://readgro-backend-new.onrender.com/updatepassword/${user.user.userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      const updateData = await updateRes.json();

      if (updateRes.ok) {
        setSuccess(
          "Password updated successfully! Redirecting to dashboard..."
        );
        setLoginMethod("password");
        setRedirecting(true);
      } else {
        throw new Error(updateData.message || "Failed to update password");
      }
    } catch (err) {
      setError(err.message || "Something went wrong during password reset.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (forgotPassword && !otpVerified) {
      handleSendOtp();
    }
  }, [forgotPassword]);

  useEffect(() => {
    if (redirecting) {
      setTimeout(() => {
        if (loginMethod === "password") {
          window.location.href = "/user/user-enrolled-courses";
        } else if (loginMethod === "otp") {
          window.location.href = "/user/settings";
        }
      }, 1500);
    }
  }, [redirecting, loginMethod]);

  return (
    <div className="opacity-100 transition-opacity duration-150 ease-linear">
      <div className="text-center">
        <h3 className="text-size-32 font-bold text-blackColor dark:text-blackColor-dark mb-2 leading-normal">
          {forgotPassword
            ? otpVerified
              ? "Reset Password"
              : "Forgot Password"
            : "Login"}
        </h3>
      </div>

      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
      {success && (
        <div className="mb-4 text-green-500 text-center">{success}</div>
      )}

      {!forgotPassword ? (
        <form onSubmit={handleSignIn} className="pt-25px">
          <div className="mb-25px">
            <label className="text-contentColor dark:text-contentColor-dark mb-10px block">
              Email
            </label>
            <input
              type="email"
              placeholder="Your email"
              className="w-full h-52px pl-5 bg-transparent border border-borderColor rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-25px relative">
            <label className="text-contentColor dark:text-contentColor-dark mb-10px block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full h-52px pl-5 pr-12 bg-transparent border border-borderColor rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </div>
            </div>
          </div>

          <div className="my-25px text-center">
            <button
              type="submit"
              className="text-size-15 text-whiteColor bg-primaryColor px-25px py-10px w-full border border-primaryColor rounded"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>

          <div className="text-center mt-4">
            <div
              className="text-primaryColor cursor-pointer"
              onClick={() => {
                setForgotPassword(true);
                setOtpVerified(false);
              }}
            >
              Forgot Password?
            </div>
          </div>
        </form>
      ) : otpVerified ? (
        <form onSubmit={handleResetPassword} className="pt-25px">
          <div className="mb-25px relative">
            <label className="text-contentColor dark:text-contentColor-dark mb-10px block">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                className="w-full h-52px pl-5 pr-12 bg-transparent border border-borderColor rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <div
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </div>
            </div>
          </div>

          <div className="mb-25px relative">
            <label className="text-contentColor dark:text-contentColor-dark mb-10px block">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full h-52px pl-5 pr-12 bg-transparent border border-borderColor rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </div>
            </div>
          </div>

          <div className="my-25px text-center">
            <button
              type="submit"
              className="text-size-15 text-whiteColor bg-primaryColor px-25px py-10px w-full border border-primaryColor rounded"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>

          <div
            className="text-center text-primaryColor cursor-pointer mt-4"
            onClick={() => {
              setForgotPassword(false);
              setOtpVerified(false);
            }}
          >
            Back to Login
          </div>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="pt-25px">
          <div className="mb-25px">
            <label className="text-contentColor dark:text-contentColor-dark mb-10px block">
              Email
            </label>
            <input
              type="email"
              placeholder="Your email"
              className="w-full h-52px pl-5 bg-transparent border border-borderColor rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-25px">
            <label className="text-contentColor dark:text-contentColor-dark mb-10px block">
              OTP
            </label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full h-52px pl-5 bg-transparent border border-borderColor rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <div
              className="mt-2 text-sm text-primaryColor cursor-pointer"
              onClick={handleSendOtp}
            >
              Resend OTP
            </div>
          </div>

          <div className="my-25px text-center">
            <button
              type="submit"
              className="text-size-15 text-whiteColor bg-primaryColor px-25px py-10px w-full border border-primaryColor rounded"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>

          <div
            className="text-center text-primaryColor cursor-pointer mt-4"
            onClick={() => {
              setForgotPassword(false);
              setOtpVerified(false);
            }}
          >
            Back to Login
          </div>
        </form>
      )}
    </div>
  );
};

export default UserLoginForm;
