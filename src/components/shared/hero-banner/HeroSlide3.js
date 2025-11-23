import Image from "next/image";
import React from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import HreoName from "../section-names/HreoName";
import PopupVideo from "../popup/PopupVideo";
import useIsTrue from "@/hooks/useIsTrue";

const HeroSlide3 = ({ slide, idx }) => {
  const isHome9 = useIsTrue("/home-9");
  const isHome9Dark = useIsTrue("/home-9-dark");
  const { tag, title, image } = slide;
  return (
    <div className="container 2xl:container-secondary-md relative overflow-hidden">
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 items-center gap-8">
        {/* Banner Left (Text Section) */}
        <div
          data-aos="fade-up"
          className="lg:col-span-7 w-full text-center lg:text-left"
        >
          <div className="3xl:pr-135px">
            <HreoName>{tag}</HreoName>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-base md:text-lg mb-6">
              Join{" "}
              <span className="font-semibold text-secondaryColor">ReadGro</span>{" "}
              today and take a step toward a brighter future where learning
              fuels earning!
            </p>

            {/* Buttons side by side */}
            <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
              <ButtonPrimary path="/courses">
                Start With ReadGro
              </ButtonPrimary>
              <ButtonPrimary color="secondary" path="/about">
                Explore More
              </ButtonPrimary>
            </div>
          </div>
        </div>

        {/* Banner Right (Image Section) */}
        <div data-aos="fade-up" className="lg:col-span-5 w-full">
          <div className="relative">
            <Image
              className="w-full rounded-xl"
              src={image}
              alt=""
              placeholder="blur"
            />
            {(isHome9 || isHome9Dark) && idx == 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <PopupVideo />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide3;
