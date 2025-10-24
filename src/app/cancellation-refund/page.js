"use client";
import { useSearchParams } from "next/navigation";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

const CancelAndRefund = () => {
  const searchParams = useSearchParams();
  const packagename = searchParams.get("package");

  console.log("Package Name:", packagename);

  return (
    <PageWrapper>
      <main className="max-w-4xl mx-auto px-4 py-8 text-sm md:text-base leading-7 space-y-6">
        <h1 className="text-2xl font-bold">Cancel & Refund Policy</h1>

        <h2 className="text-xl font-semibold">Overview</h2>
        <p>
          Our refund and returns policy lasts <strong>24 hours</strong>. If 24
          hours have passed since your purchase, we can’t offer you a full
          refund or exchange.
        </p>
        <p>
          Amount will be refunded after deducting{" "}
          <strong>Payment Gateway charges</strong>.
        </p>
        <p>
          To complete your refund, we require a{" "}
          <strong>receipt or proof of purchase</strong>.
        </p>

        <h2 className="text-xl font-semibold">Cancel & Refund Policy</h2>
        <p>
          Our cancel and refund policy is valid for <strong>24 hours</strong> if
          you have not viewed the course. If 24 hours have passed or if the
          course has been viewed, we cannot offer a refund.
        </p>
        <p>
          To be eligible for a refund, your course must be{" "}
          <strong>unseen</strong>.
        </p>
        <p>
          To complete your return, we require a{" "}
          <strong>receipt or proof of purchase</strong>.
        </p>

        <h2 className="text-xl font-semibold">Refunds</h2>
        <p>
          Since the website offers non-tangible, irrevocable goods, we do not
          provide refunds after the product is purchased, which you acknowledge
          prior to purchasing any product on the website.
        </p>
        <p>
          We do have a fully functioning <strong>365-day trial</strong>{" "}
          available which is identical to the product that you may download and
          try before making a purchase.
        </p>
        <p>
          Once your refund request is received and inspected, we will send you
          an email to notify you of the approval or rejection of your refund.
        </p>
        <p>
          If approved, your refund will be processed, and a credit will
          automatically be applied to your original method of payment within a
          few days.
        </p>

        <h2 className="text-xl font-semibold">Late or Missing Refunds</h2>
        <p>If you haven’t received a refund yet:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>First, check your bank account again.</li>
          <li>
            Then contact your credit card company. It may take some time before
            your refund is officially posted.
          </li>
          <li>
            Next, contact your bank. There is often some processing time before
            a refund is posted.
          </li>
        </ul>
        <p>
          If you’ve done all of this and still have not received your refund
          yet, please contact us at <strong>info@readgro.in</strong>.
        </p>

        <h2 className="text-xl font-semibold">How to Request a Refund</h2>
        <p>
          For a refund, you need to mail us at <strong>info@readgro.in</strong>{" "}
          using your registered email ID in the following format:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Full Name –</strong> Your full name
          </li>
          <li>
            <strong>Registered Email ID –</strong> The email you used to
            register
          </li>
          <li>
            <strong>Registration Date –</strong> The date of your purchase
          </li>
        </ul>

        <h2 className="text-xl font-semibold">Contacting Us</h2>
        <p>
          If you have any questions, concerns, or complaints regarding this
          refund policy, we encourage you to contact us at:
        </p>
        <p>
          <strong>readgroofficial@gmail.com</strong>
        </p>
      </main>
    </PageWrapper>
  );
};

export default CancelAndRefund;
