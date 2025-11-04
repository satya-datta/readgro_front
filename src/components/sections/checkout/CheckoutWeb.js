"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/contexts/CartContext";
import { useUserContext } from "@/contexts/UserContext";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import { createOrder, validatePayment } from "@/libs/PaymentOrder";
import Testloader from "@/components/shared/others/loader";

const CheckoutWeb = ({ coursename }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'processing', 'failed', null
  const { user } = useUserContext();
  const userId = user?.userId;

  const course_name = coursename;
  const router = useRouter();
  const { cartProducts: products } = useCartContext();
  const [formData, setFormData] = useState(() => {
    // Check for referral code in both cookies and localStorage
    const refCode = Cookies.get("referralCode") || 
                  (typeof window !== 'undefined' ? localStorage.getItem('referralCode') : '') || 
                  '';
    
    // Clear the referral code from localStorage after reading it
    if (typeof window !== 'undefined' && localStorage.getItem('referralCode')) {
      localStorage.removeItem('referralCode');
    }

    return {
      name: "",
      email: "",
      phone: "",
      Address: "",
      Pincode: "",
      password: "",
      referralCode: refCode,
    };
  });

  const [errors, setErrors] = useState({});
  const [courseDetails, setCourseDetails] = useState(null);
  const [isReferralValid, setIsReferralValid] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  // Fetch course details when available
  useEffect(() => {
    if (coursename) {
      fetch(
        `https://readgro-backend-new.onrender.com/getcoursebyname/${encodeURIComponent(coursename)}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Course data:", data);
          setCourseDetails(data);
          setDiscountedPrice(data?.discount_price || data?.course_price);
        })
        .catch((err) => {
          console.error("Error fetching course:", err);
          // If there's an error, try to fetch the course by ID
          if (coursename.match(/^[0-9a-fA-F]{24}$/)) { // Check if it's a MongoDB ID
            fetch(`https://readgro-backend-new.onrender.com/getcourse/${coursename}`)
              .then(res => res.json())
              .then(data => {
                console.log("Course data (by ID):", data);
                setCourseDetails(data);
                setDiscountedPrice(data?.discount_price || data?.course_price);
              })
              .catch(err => console.error("Error fetching course by ID:", err));
          }
        });
    }
  }, [coursename]);
  const validateReferralCode = async (referralCode) => {
    if (!referralCode) {
      setDiscountedPrice(courseDetails?.course_price); // Reset to original price if referral is empty
      return;
    }

    try {
      const response = await fetch(
        "https://readgro-backend-new.onrender.com/validate_refferalcode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ referralCode }),
        }
      );

      const data = await response.json();

      if (data.valid) {
        setDiscountedPrice(
          courseDetails?.course?.discount_price || courseDetails?.course_price
        ); // Apply discount
      } else {
        setDiscountedPrice(courseDetails?.course?.course_price); // No discount
      }
    } catch (error) {
      console.error("Error validating referral code:", error);
      setDiscountedPrice(courseDetails?.course?.course_price); // Default price on error
    
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "referralCode") {
      validateReferralCode(e.target.value);
    }
  };

  // Validate Form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim() || formData.name.length < 3)
      newErrors.name = "Name must be at least 3 characters";
    if (
      !formData.email.trim() ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)
    )
      newErrors.email = "Enter a valid email";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!formData.Address.trim()) newErrors.Address = "Address is required";
    if (!formData.Pincode.trim() || !/^\d{6}$/.test(formData.Pincode))
      newErrors.Pincode = "Enter a valid 6-digit Pincode";
    if (!formData.password.trim() || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Next Button

  const handleNext = async () => {
    console.log("Processing checkout...");
    console.log(userId);
    if (!validateForm()) return;

    try {
      // Step 1: Validate user
      const validateResponse = await fetch(
        "https://readgro-backend-new.onrender.com/validate_user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            phone: formData.phone,
          }),
        }
      );

      const validateResult = await validateResponse.json();
      if (!validateResult.verified) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: validateResult.message.includes("Email")
            ? validateResult.message
            : "",
          phone: validateResult.message.includes("Phone")
            ? validateResult.message
            : "",
        }));
        return;
      }

      console.log("User validated. Initiating payment...");

      // Step 2: Process Payment
      const priceToPay = discountedPrice || courseDetails?.course_price;
      
      const paymentSuccess = await handleRazorpayPayment(priceToPay);
      if (!paymentSuccess) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          api: "Payment failed. Please try again.",
        }));
        return;
      }

      console.log("Payment successful. Registering user...");

      // Step 3: Register the User
      const registerResponse = await fetch(
        "https://readgro-backend-new.onrender.com/create-user",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            course_id: courseDetails?.id,
          }),
        }
      );

      const registerResult = await registerResponse.json();
      if (registerResult.success) {
        router.push("/user/user-enrolled-courses");
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          api: registerResult.message || "User registration failed.",
        }));
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        api: "Something went wrong. Please try again later.",
      }));
    }
  };

  const handleRazorpayPayment = async (priceToPay) => {
    try {
      setPaymentStatus("processing"); // Show loading state
      const finalPrice = priceToPay || discountedPrice || courseDetails?.course_price;

      const orderData = await createOrder(finalPrice);
      if (!orderData) {
        setPaymentStatus("failed");
        alert("Failed to create Razorpay order. Try again.");
        return false;
      }

      return new Promise((resolve) => {
        const options = {
          key: "rzp_live_BF04chKRoQcXXm",
          amount: finalPrice * 100,
          currency: "INR",
          name: "Read Gro",
          description: "Payment for Course",
          order_id: orderData.order.id,
          handler: async function (response) {
            setPaymentStatus("processing"); // Show processing again after payment
            const validationResponse = await validatePayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (validationResponse.success) {
              setPaymentStatus("success");
              setTimeout(() => {
                resolve(true);
              }, 3000); // Show success message for 3 seconds before proceeding
            } else {
              setPaymentStatus("failed");
              alert("Payment verification failed! Please try again.");
              resolve(false);
            }
          },
          prefill: {
            name: formData.name || "User",
            email: formData.email || "user@example.com",
            contact: formData.phone || "0000000000",
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      });
    } catch (error) {
      console.error("Error in payment:", error);
      setPaymentStatus("failed");
      return false;
    }
  };

  return (
    <section>
      {paymentStatus === "success" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md text-center">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
            <p className="mb-4">Please wait while we process your order...</p>
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        </div>
      )}

      {paymentStatus === "processing" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <h3 className="text-2xl font-bold mb-2">Processing Payment</h3>
            <p>Please do not refresh or close this page...</p>
          </div>
        </div>
      )}

      {paymentStatus === "failed" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md text-center">
            <div className="text-red-500 text-5xl mb-4">✗</div>
            <h3 className="text-2xl font-bold mb-2">Payment Failed</h3>
            <p className="mb-4">Please try again or contact support.</p>
            <button
              onClick={() => setPaymentStatus(null)}
              className="px-4 py-2 bg-primaryColor text-white rounded"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <div className="container py-50px lg:py-60px 2xl:py-20 3xl:py-100px">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-30px">
          {/* Left Section */}
          <div>
            <h4 className="text-xl font-bold pb-10px mb-5 border-b">
              Billing Details
            </h4>
            <form data-aos="fade-up">
              <div className="grid grid-cols-1 gap-y-5 mb-5">
                <div>
                  <label className="text-sm mb-5px block">Referral Code</label>
                  <input
                    type="text"
                    name="referralCode"
                    placeholder="Referral Code"
                    value={formData.referralCode}
                    onChange={handleChange}
                    className="w-full h-50px px-5 border placeholder-opacity-80"
                  />
                  {isReferralValid === false && (
                    <p className="text-red-500">Invalid referral code</p>
                  )}
                </div>
                <div>
                  <label className="text-sm mb-5px block">Name*</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-50px px-5 border placeholder-opacity-80"
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-sm mb-5px block">Email Address*</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-50px px-5 border placeholder-opacity-80"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm mb-5px block">Phone Number*</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full h-50px px-5 border placeholder-opacity-80"
                  />
                  {errors.phone && (
                    <p className="text-red-500">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm mb-5px block">Address*</label>
                  <input
                    type="text"
                    name="Address"
                    placeholder="Address"
                    value={formData.Address}
                    onChange={handleChange}
                    className="w-full h-50px px-5 border placeholder-opacity-80"
                  />
                  {errors.Address && (
                    <p className="text-red-500">{errors.Address}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm mb-5px block">Pincode*</label>
                  <input
                    type="number"
                    name="Pincode"
                    placeholder="Pincode"
                    value={formData.Pincode}
                    onChange={handleChange}
                    className="w-full h-50px px-5 border placeholder-opacity-80"
                  />
                  {errors.Pincode && (
                    <p className="text-red-500">{errors.Pincode}</p>
                  )}
                </div>
                <div className="relative">
                  <label className="text-sm mb-2 block">Set Password*</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full h-[50px] px-5 border placeholder-opacity-80 pr-10"
                    />
                    {/* Eye Icon for Toggle */}
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Right Section (Order Summary) */}
          <div className="p-10px lg:p-35px">
            <h4 className="text-2xl font-bold mb-5">Your Order</h4>
            <div className="overflow-auto">
              <table className="table-fixed w-full border-t font-medium">
                <thead>
                  <tr className="border-b">
                    <td className="p-10px md:p-15px">Product</td>
                    <td className="p-10px md:p-15px"> Price</td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-10px md:p-15px">
                      {courseDetails?.course?.name || (
                        <div>
                          <Testloader />
                        </div>
                      )}
                    </td>

                    <td className="p-10px md:p-15px font-bold text-green-600">
                      ₹
                      {discountedPrice ||
                        courseDetails?.course?.course_price ||
                        "0.00"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Course Image (Below Product Details) */}
            {courseDetails?.course?.image && (
              <div className="mt-5">
                <img
                  src={courseDetails?.course?.image}
                  alt={courseDetails?.course?.name || "Course"}
                  className="w-full h-[400px] object-cover rounded-md border"
                />
              </div>
            )}

            {/* Next Button */}
            <div className="flex justify-end mt-5">
              <ButtonPrimary
                onClick={handleNext}
                type="submit"
                width="full"
                className="px-5 py-3 bg-primaryColor text-white font-bold rounded hover:bg-primaryColor w-3/4 lg:w-[300px]"
              >
                Next
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutWeb;
