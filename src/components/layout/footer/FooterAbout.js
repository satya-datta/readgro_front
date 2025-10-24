import useIsSecondary from "@/hooks/useIsSecondary";

const FooterAbout = () => {
  const { isSecondary } = useIsSecondary();
  return (
    <div
      className="sm:col-start-1 sm:col-span-12 md:col-span-6  lg:col-span-4 mr-30px"
      data-aos="fade-up"
    >
      <h4 className="text-size-22 font-bold text-whiteColor mb-3">About us</h4>
      <p className="text-base lg:text-sm 2xl:text-base text-darkgray mb-30px leading-1.8 2xl:leading-1.8">
        We are an innovative e-learning and e-earning platform designed to
        empower individuals with knowledge and financial growth. At ReadGro, we
        believe that education should not only enhance your skills but also open
        doors to real-world opportunities.
      </p>
    </div>
  );
};

export default FooterAbout;
