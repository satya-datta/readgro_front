"use client";
import { useSearchParams } from "next/navigation";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

const TermsandConditions = () => {
  const searchParams = useSearchParams();
  const packagename = searchParams.get("package");

  console.log("Package Name:", packagename);

  return (
    <PageWrapper>
      <main className="max-w-4xl mx-auto px-4 py-8 text-sm md:text-base leading-7 space-y-6">
        <h2 className="text-2xl font-bold">Overview</h2>
        <p>
          By visiting our site and/or purchasing something from us, you engage
          in our “Service” and agree to be bound by the following terms and
          conditions (“Terms and Conditions”, “Terms”), including those
          additional terms and conditions and policies referenced herein and/or
          available by hyperlink.
        </p>
        <p>
          These Terms and Conditions apply to all users of the site, including
          without limitation browsers, vendors, customers, merchants, and/or
          contributors of content.
        </p>
        <p>
          Any new features or tools added to the current site shall also be
          subject to the Terms and Conditions. We reserve the right to update,
          change or replace any part of these Terms at any time.
        </p>
        <p>
          Your continued use of or access to the website following any posted
          changes constitutes acceptance of those changes.
        </p>
        <h2 className="text-xl font-semibold">
          Course/Package Registration Terms
        </h2>
        <p>
          By agreeing to these Terms, you confirm that you are at least the age
          of majority in your jurisdiction, or have given consent for any minor
          dependents to use this site.
        </p>
        <p>
          You may not use our services for illegal or unauthorized purposes,
          including violating copyright laws.
        </p>
        <p>
          Transmission of any destructive code, such as worms or viruses, is
          prohibited. Any breach will lead to immediate termination of services.
        </p>
        <h2 className="text-xl font-semibold">General Conditions</h2>
        <p>
          We reserve the right to refuse service to anyone, for any reason, at
          any time.
        </p>
        <p>
          Content (excluding credit card info) may be transferred unencrypted
          across networks and adapted to connect with devices. Credit card info
          is always encrypted during transmission.
        </p>
        <p>
          You agree not to copy, resell, or exploit any part of the Service
          without our written permission.
        </p>
        <p>
          Section headings are for convenience and will not affect
          interpretation.
        </p>
        <h2 className="text-xl font-semibold">
          Accuracy, Completeness and Timeliness of Information
        </h2>
        <p>
          We are not liable for inaccurate or outdated content. The information
          is for general reference and should not be solely relied upon for
          decisions.
        </p>
        <p>
          Historical information may be present and is provided for reference
          only. We may update content, but are not obligated to do so.
        </p>
        <h2 className="text-xl font-semibold">
          Modifications to the Service and Prices
        </h2>
        <p>
          We reserve the right to cancel subscriptions or memberships at any
          time without notice.
        </p>
        <p>
          Prices for services or products can change without notice. We may
          modify or discontinue any service or feature at any time.
        </p>
        <p>
          We are not liable for any modifications, price changes, or service
          discontinuation.
        </p>
        <h2 className="text-xl font-semibold">Products or Services</h2>
        <p>
          Some products/services may only be available online with limited
          quantities. Returns or exchanges will follow our Return Policy.
        </p>
        <p>
          You can review the most current version of the Terms and Conditions at
          any time on this page.
        </p>
        <p>
          It is your responsibility to monitor changes. Continued use of the
          website implies acceptance of the updated terms.
        </p>
        <h2 className="text-xl font-semibold">Entire Agreement</h2>
        The failure of us to exercise or enforce any right or provision of these
        Terms and Conditions shall not constitute a waiver of such right or
        provision. These Terms and Conditions and any policies or operating
        rules posted by us on this site or in respect to The Service constitutes
        the entire agreement and understanding between you and us and govern
        your use of the Service, superseding any prior or contemporaneous
        agreements, communications and proposals, whether oral or written,
        between you and us (including, but not limited to, any prior versions of
        the Terms and Conditions). Any ambiguities in the interpretation of
        these Terms and Conditions shall not be construed against the drafting
        party. Changes To Terms and Conditions You can review the most current
        version of the Terms and Conditions at any time at this page. We reserve
        the right, at our sole discretion, to update, change or replace any part
        of these Terms and Conditions by posting updates and changes to our
        website. It is your responsibility to check our website periodically for
        changes. Your continued use of or access to our website or the Service
        following the posting of any changes to these Terms and Conditions
        constitutes acceptance of those changes.
      </main>
    </PageWrapper>
  );
};

export default TermsandConditions;
