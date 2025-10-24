"use client";
import { useState } from "react";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceType: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/sendcontact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      console.log("Response from API:", result);
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <section>
      <div className="container pb-100px">
        <form
          onSubmit={handleSubmit} // ✅ Form submission linked
          className="p-5 md:p-70px md:pt-90px border border-borderColor2 dark:border-transparent dark:shadow-container"
          data-aos="fade-up"
        >
          {/* Heading */}
          <div className="mb-10">
            <h4 className="text-size-23 md:text-size-44 font-bold leading-10 md:leading-70px text-blackColor dark:text-blackColor-dark">
              Drop Us a Line
            </h4>
            <p className="text-size-13 md:text-base leading-5 md:leading-30px text-contentColor dark:text-contentColor-dark">
              Your email address will not be published. Required fields are
              marked *
            </p>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 xl:grid-cols-2 mb-30px gap-30px">
            {/* Name Field */}
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Enter your name*"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-26px pr-12 bg-transparent focus:outline-none text-contentColor dark:text-contentColor-dark border border-borderColor2 dark:border-borderColor2-dark placeholder:text-placeholder placeholder:opacity-80 h-15 leading-15 font-medium rounded"
              />
              <i className="icofont-businessman absolute right-6 top-1/2 transform -translate-y-1/2 text-primaryColor"></i>
            </div>

            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Enter Email Address*"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-26px pr-12 bg-transparent focus:outline-none text-contentColor dark:text-contentColor-dark border border-borderColor2 dark:border-borderColor2-dark placeholder:text-placeholder placeholder:opacity-80 h-15 leading-15 font-medium rounded"
              />
              <i className="icofont-envelope absolute right-6 top-1/2 transform -translate-y-1/2 text-primaryColor"></i>
            </div>

            {/* Service Type Field */}
            <div className="relative">
              <input
                type="text"
                name="serviceType"
                placeholder="Write Service Type"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full pl-26px pr-12 bg-transparent focus:outline-none text-contentColor dark:text-contentColor-dark border border-borderColor2 dark:border-borderColor2-dark placeholder:text-placeholder placeholder:opacity-80 h-15 leading-15 font-medium rounded"
              />
              <i className="icofont-edit absolute right-6 top-1/2 transform -translate-y-1/2 text-primaryColor"></i>
            </div>

            {/* Phone Field */}
            <div className="relative">
              <input
                type="text"
                name="phone"
                placeholder="Enter Your Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-26px pr-12 bg-transparent focus:outline-none text-contentColor dark:text-contentColor-dark border border-borderColor2 dark:border-borderColor2-dark placeholder:text-placeholder placeholder:opacity-80 h-15 leading-15 font-medium rounded"
              />
              <i className="icofont-ui-call absolute right-6 top-1/2 transform -translate-y-1/2 text-primaryColor"></i>
            </div>
          </div>

          {/* Message Field */}
          <div className="relative">
            <textarea
              name="message"
              placeholder="Enter your message here"
              value={formData.message}
              onChange={handleChange}
              className="w-full pl-26px pr-12 bg-transparent text-contentColor dark:text-contentColor-dark border border-borderColor2 dark:border-borderColor2-dark placeholder:text-placeholder placeholder:opacity-80 rounded"
              cols="30"
              rows="5"
            />
            <i className="icofont-pen-alt-2 absolute right-6 top-[17px] text-primaryColor"></i>
          </div>

          {/* Submit Button */}
          <div className="mt-30px">
            <ButtonPrimary type="submit">Post a Comment</ButtonPrimary>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
