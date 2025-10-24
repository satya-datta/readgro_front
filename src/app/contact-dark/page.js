import ContactMain from "@/components/layout/main/ContactMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export const metadata = {
  title: "Contact Dark | ReadGro - Learn and Earn",
  description: "Contact Dark | ReadGro - Learn and Earn",
};

const Contact_Dark = async () => {
  return (
    <PageWrapper>
      <main className="is-dark">
        <ContactMain />
      </main>
    </PageWrapper>
  );
};

export default Contact_Dark;
