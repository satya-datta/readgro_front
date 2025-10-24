import ContactMain from "@/components/layout/main/ContactMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export const metadata = {
  title: "Contact | ReadGro - Learn and Earn",
  description: "Contact | ReadGro - Learn and Earn",
};

const Contact = async () => {
  return (
    <PageWrapper>
      <main>
        <ContactMain />
      </main>
    </PageWrapper>
  );
};

export default Contact;
