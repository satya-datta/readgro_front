import Image from "next/image";

import aboutImage8 from "@/assets/images/about/about_8.png";
import aboutImage14 from "@/assets/images/about_bg_1.jpg";

import SectionName from "@/components/shared/section-names/SectionName";

import HeadingSecondary from "@/components/shared/headings/HeadingSecondary";

import TiltWrapper from "@/components/shared/wrappers/TiltWrapper";
const About11 = () => {
  return (
    <section>
      <div className="container py-50px md:py-70px lg:py-20 2xl:py-100px">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-30px">
          {/* about left */}
          <div data-aos="fade-up">
            <TiltWrapper>
              <div className="tilt relative overflow-hidden z-0">
                <Image
                  className="absolute left-0 top-0 lg:top-4 right-0 mx-auto -z-1"
                  src={aboutImage8}
                  alt=""
                />
                <Image
                  className="w-full rounded-2xl" // <-- Added border radius
                  src={aboutImage14}
                  alt=""
                />
              </div>
            </TiltWrapper>
          </div>
          {/* about right */}
          <div data-aos="fade-up" className="2xl:ml-65px">
            <SectionName>About Us</SectionName>
            <HeadingSecondary>Welcome to ReadGro</HeadingSecondary>

            <p className="text-sm md:text-base leading-7 text-contentColor dark:text-contentColor-dark mb-6">
              Welcome to ReadGro, where learning meets earning! We are an
              innovative e-learning and e-earning platform designed to empower
              individuals with knowledge and financial growth. At ReadGro, we
              believe that education should not only enhance your skills but
              also open doors to real-world opportunities.
            </p>

            <p className="flex items-center gap-x-4 text-lg text-blackColor dark:text-blackColor-dark mt-6 mb-25px">
              {/* <Image loading="lazy" src={aboutImage15} alt="about" /> */}
              <span>
                <b>Empowering Learners & Earners</b> – Bridging the gap between
                education and financial independence.
              </span>
            </p>

            <p className="flex items-center gap-x-4 text-lg text-blackColor dark:text-blackColor-dark mb-25px">
              {/* <Image loading="lazy" src={aboutImage16} alt="growth" /> */}
              <span>
                <b>1000+ Learners & Creators</b> are already shaping their
                future with ReadGro.
              </span>
            </p>

            <p className="text-sm md:text-base leading-7 text-contentColor dark:text-contentColor-dark mb-25px">
              Join ReadGro today and take a step toward a brighter future—where{" "}
              <b>learning fuels earning!</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About11;
