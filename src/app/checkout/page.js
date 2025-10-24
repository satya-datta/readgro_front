"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutMain from "@/components/layout/main/ecommerce/CheckoutMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

const Checkout = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [coursename, setCoursename] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // First check URL parameters
    const courseFromUrl = searchParams.get("course");
    
    if (courseFromUrl) {
      setCoursename(courseFromUrl);
      setIsLoading(false);
    } else if (typeof window !== 'undefined') {
      // If no course in URL, check localStorage
      const courseFromStorage = localStorage.getItem('courseName');
      if (courseFromStorage) {
        // Clear the course name from localStorage after reading it
        localStorage.removeItem('courseName');
        // Redirect to include the course in the URL for better UX and sharing
        router.replace(`/checkout?course=${encodeURIComponent(courseFromStorage)}`);
        return;
      } else {
        // No course specified, redirect to home or courses page
        router.push('/courses');
        return;
      }
    }
    setIsLoading(false);
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryColor"></div>
      </div>
    );
  }

  return (
    <PageWrapper>
      <main>
        <CheckoutMain coursename={coursename} />
      </main>
    </PageWrapper>
  );
};

export default Checkout;
