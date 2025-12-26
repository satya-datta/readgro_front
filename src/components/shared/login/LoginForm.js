"use client";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:5000/authadmin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      console.log("Data recieved ---", data);
      if (response.ok) {
        localStorage.setItem("adminToken", data.token); // ✅ Save token
        setIsAuthenticated(true);
        setError(null);
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
        "http://localhost:5000/sendadmin-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setError(null);
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
        "http://localhost:5000/verifyadmin-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setRedirecting(true);
      } else {
        setError(data.message || "Invalid OTP.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (redirecting) {
      setTimeout(() => {
        window.location.href = "/admin/Gnaneswar/admin-dashboard";
      }, 1500);
    }
  }, [redirecting]);

  return (
    <div className="opacity-100 transition-opacity duration-150 ease-linear">
      <div className="text-center">
        <h3 className="text-size-32 font-bold text-blackColor dark:text-blackColor-dark mb-2 leading-normal">
          {forgotPassword ? "Login With Otp" : "Login"}
        </h3>
      </div>

      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

      <form
        onSubmit={forgotPassword ? handleVerifyOtp : handleSignIn}
        className="pt-25px"
      >
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

        {!forgotPassword && (
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
        )}

        {forgotPassword && otpSent && (
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
        )}

        <div className="my-25px text-center">
          {!forgotPassword && (
            <button
              type="submit"
              className="text-size-15 text-whiteColor bg-primaryColor px-25px py-10px w-full border border-primaryColor rounded"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          )}
          {forgotPassword && !otpSent && (
            <button
              type="button"
              onClick={handleSendOtp}
              className="text-size-15 text-whiteColor bg-primaryColor px-25px py-10px w-full border border-primaryColor rounded"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          )}
          {forgotPassword && otpSent && (
            <button
              type="submit"
              className="text-size-15 text-whiteColor bg-primaryColor px-25px py-10px w-full border border-primaryColor rounded"
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          )}
        </div>
      </form>
      {!forgotPassword && (
        <div
          className="text-center text-primaryColor cursor-pointer"
          onClick={() => setForgotPassword(true)}
        >
          Forgot Password?
        </div>
      )}
    </div>
  );
};

export default LoginForm;
