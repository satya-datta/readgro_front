import React, { useEffect, useState } from "react";
import HreoName from "../section-names/HreoName";
import Link from "next/link";
import PreloaderPrimary from "@/components/shared/others/PreloaderPrimary";

const HeroSlide2 = ({ slide, idx }) => {
  const { title, tag } = slide;
  const [imageUrls, setImageUrls] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/getwebsite_hero"
        );
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setImageUrls(
              data.map((item) => ({
                image1: item.image1 || null,
                image2: item.image2 || null,
                image3: item.image3 || null,
              }))
            );
          } else {
            setImageUrls([]);
          }
        } else {
          console.error("Failed to fetch images:", response.status);
          setImageUrls([]);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setImageUrls([]);
      } finally {
        setLoading(false); // 👈 Ensure loading is false no matter what
      }
    };

    fetchImages();
  }, []);

  const getBackgroundImage = () => {
    if (imageUrls && imageUrls.length > 0) {
      if (idx === 0 && imageUrls[0].image1)
        return `url('${imageUrls[0].image1}')`;
      if (idx === 1 && imageUrls[0].image2)
        return `url('${imageUrls[0].image2}')`;
      if (idx === 2 && imageUrls[0].image3)
        return `url('${imageUrls[0].image3}')`;
    }

    return idx === 0
      ? "url('../assets/images/herobanner/university_1.jpg')"
      : idx === 1
      ? "url('../assets/images/herobanner/university_2.jpg')"
      : "url('../assets/images/herobanner/university_3.jpg')";
  };

  if (loading) {
    return <PreloaderPrimary />;
  }

  return (
    <div className="relative z-0 w-full">
      {/* Hero Image */}
      <div className="relative w-full h-[400px] md:h-[600px] lg:h-[750px] overflow-hidden">
        <img
          src={
            (idx === 0 && imageUrls?.[0]?.image1) ||
            (idx === 1 && imageUrls?.[0]?.image2) ||
            (idx === 2 && imageUrls?.[0]?.image3) ||
            (idx === 0
              ? "/assets/images/herobanner/university_1.jpg"
              : idx === 1
              ? "/assets/images/herobanner/university_2.jpg"
              : "/assets/images/herobanner/university_3.jpg")
          }
          alt="Hero"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>
      </div>

      {/* Hero Content */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center px-4">
        <div data-aos="fade-up">
          <HreoName>{tag}</HreoName>
          <h1 className="text-white text-[35px] md:text-[50px] lg:text-5xl 2xl:text-[75px] leading-tight font-bold mb-5 md:mb-10">
            {title}
          </h1>
          <Link
            href="/about"
            className="text-white bg-primaryColor border border-primaryColor px-10 py-[15px] hover:text-primaryColor hover:bg-white rounded-full inline-block"
          >
            More about ReadGro
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide2;
