import Accordion from "@/components/shared/accordion/Accordion";
import AccordionContent from "@/components/shared/accordion/AccordionContent";
import AccordionController from "@/components/shared/accordion/AccordionController";
import AccordionContainer from "@/components/shared/containers/AccordionContainer";
import Image from "next/image";
import faqImage from "@/assets/images/blog/blog_7.png"; // Replace with the actual image path
import HeadingPrimary from "@/components/shared/headings/HeadingPrimary";
import SectionName from "@/components/shared/section-names/SectionName";
const Faq = () => {
  const accordionItems = [
    {
      question: "What is ReadGro?",
      answer:
        "ReadGro is an e-learning and e-earning platform where users can learn and earn by referring courses to others.",
    },
    {
      question: "Why ReadGro?",
      answer:
        "We offer the best courses and provide better commissions compared to other apps, making learning and earning seamless.",
    },
    {
      question: "How to signup or Register?",
      answer:
        "First, select a plan, navigate to the checkout page by clicking the 'Buy Now' button, and use a referral code if available or proceed without a discount.",
    },
    {
      question: "What Type of Courses Available in ReadGro?",
      answer:
        "ReadGro offers courses in various domains, including business, marketing, photography, and many more.",
    },
  ];

  return (
    <section>
      <div className="container pb-100px">
        <div className="mb-5 md:mb-10" data-aos="fade-up">
          <div className="text-center">
            {/* <SectionName>Course List</SectionName> */}
          </div>

          <HeadingPrimary text="center">
            {" "}
            <span className="relative after:w-full after:h-[7px] z-0 after:bg-secondaryColor after:absolute after:left-0 after:bottom-3 md:after:bottom-5 after:z-[-1]">
              FAQ's
            </span>
          </HeadingPrimary>
        </div>
        <div className="fees faq grid grid-cols-1 lg:grid-cols-12 gap-30px">
          <div
            className="lg:col-start-1 lg:col-span-3 flex justify-center items-center"
            data-aos="fade-up"
          >
            <div className="relative w-full h-64">
              <Image
                src={faqImage}
                alt="FAQ"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
          {/* accordions */}
          <div className="lg:col-start-4 lg:col-span-9" data-aos="fade-up">
            <AccordionContainer>
              {accordionItems?.map((item, idx) => (
                <Accordion
                  key={idx}
                  idx={idx}
                  isActive={idx === 0 ? true : false}
                  accordion={"secondaryLg"}
                >
                  <AccordionController type={"secondaryLg"}>
                    {item.question}
                  </AccordionController>
                  <AccordionContent>
                    <div className="content-wrapper py-4 px-5">
                      <p className="leading-7 text-contentColor dark:text-contentColor-dark mb-15px">
                        {item.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </Accordion>
              ))}
            </AccordionContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
