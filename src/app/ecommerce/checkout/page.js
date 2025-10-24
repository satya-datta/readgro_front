"use client";
import { useSearchParams } from "next/navigation";
import CheckoutMain from "@/components/layout/main/ecommerce/CheckoutMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";
// import { metadata } from "./metadata";

const Checkout = () => {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("packageId");

  console.log("Package Id:", packageId);

  return (
    <PageWrapper>
      <main>
        <CheckoutMain packageId={packageId} />
      </main>
    </PageWrapper>
  );
};

export default Checkout;
