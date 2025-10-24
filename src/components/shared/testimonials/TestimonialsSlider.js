"use client";
import React from "react";
import testimonialImage1 from "@/assets/images/testimonial/testi_1.png";
import testimonialImage2 from "@/assets/images/testimonial/testi_2.png";
import testimonialImage3 from "@/assets/images/teacher/teacher__3.png";
import testimonialImage4 from "@/assets/images/teacher/teacher__4.png";
import testimonialImage5 from "@/assets/images/teacher/teacher__5.png";
import testimonialImage6 from "@/assets/images/teacher/teacher__6.png";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialSlide from "./TestimonialSlide";
import { Navigation } from "swiper/modules";
const TestimonialsSlider = () => {
  const testimonials = [
    {
      name: "John Doe",
      image: testimonialImage1,
      desig: "Freelance Developer",
      desc: "ReadGro has transformed the way I manage my learning. The courses are structured perfectly, making complex topics easier to grasp. Highly recommended!",
    },
    {
      name: "Sarah Smith",
      image: testimonialImage2,
      desig: "UI/UX Designer",
      desc: "I love how intuitive and well-organized ReadGro is. The platform offers valuable insights, and the interactive lessons make learning fun and effective.",
    },
    {
      name: "Michael Johnson",
      image: testimonialImage3,
      desig: "Software Engineer",
      desc: "ReadGro provides high-quality content with expert guidance. The hands-on projects and real-world examples make it an excellent learning experience!",
    },
    {
      name: "Emily Brown",
      image: testimonialImage4,
      desig: "Digital Marketer",
      desc: "The best e-learning platform I’ve come across! ReadGro offers in-depth knowledge with practical exercises, making skill-building easier and engaging.",
    },
    {
      name: "David Wilson",
      image: testimonialImage5,
      desig: "Project Manager",
      desc: "ReadGro's structured approach to learning has helped me upskill efficiently. The platform is user-friendly and offers great support.",
    },
    {
      name: "Sophia Martinez",
      image: testimonialImage6,
      desig: "Business Analyst",
      desc: "A game-changer in online education! ReadGro’s courses are well-explained, and the learning experience is seamless and enjoyable.",
    },
  ];
  return (
    <Swiper
      className="mySwiper "
      slidesPerView={1}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
      }}
      loop={true}
      navigation={true}
      modules={[Navigation]}
    >
      {testimonials.map((testimonial, idx) => (
        <SwiperSlide key={idx}>
          <TestimonialSlide testimonial={testimonial} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialsSlider;
