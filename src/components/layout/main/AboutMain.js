import About11 from "@/components/sections/abouts/About11";
import CoursesFilter from "@/components/sections/courses/CoursesFilter";
import Image from "next/image";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import charityImage from "@/assets/images/chairty.png";

const AboutMain = () => {
  return (
    <>
      {/* Hero Banner */}
      {/* <HeroPrimary
        title="About ReadGro"
        subtitle="Empowering Learners, Transforming Lives"
        path={"About Us"}
      /> */}

      {/* Main About Section */}
      <About11 />

      {/* Courses Filter Section */}
      <CoursesFilter />

      {/* Charity Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto" data-aos="fade-up">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-blackColor dark:text-whiteColor mb-6">
                Our Commitment to Social Impact
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <Image
                  className="w-full h-auto object-cover"
                  src={charityImage}
                  alt="Charity Support"
                  width={800}
                  height={600}
                  priority
                />
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-blackColor dark:text-whiteColor mb-6">
                  Supporting Education for All
                </h3>
                <div className="space-y-6">
                  <p className="text-lg leading-7 text-contentColor dark:text-contentColor-dark">
                    At ReadGro, we believe education should be accessible to
                    everyone. That's why we've built social responsibility into
                    our business model.
                  </p>
                  <p className="text-lg leading-7 text-contentColor dark:text-contentColor-dark">
                    <strong>
                      For every course registration on our platform
                    </strong>
                    , we donate a portion of proceeds to reputable charities
                    focused on:
                  </p>
                  <ul className="space-y-3 text-contentColor dark:text-contentColor-dark">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Providing school supplies to underprivileged children
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Building schools in developing communities
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Supporting teacher training programs
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Funding scholarships for disadvantaged students
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blackColor dark:text-whiteColor mb-6">
              Our Mission
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-xl leading-8 text-contentColor dark:text-contentColor-dark mb-8">
              We're on a mission to democratize education while creating
              meaningful social impact. By combining quality online learning
              with charitable giving, we're building a platform where every
              student's success contributes to a better world.
            </p>
            {/* <button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-200">
              Learn More About Our Partners
            </button> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMain;
