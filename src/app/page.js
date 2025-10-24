'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import HOMEMAIN from "@/components/layout/main/HOMEMAIN";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const referralCode = searchParams.get('referralcode');
    const course = searchParams.get('course');

    if (referralCode || course) {
      // Store in localStorage
      if (referralCode) {
        localStorage.setItem('referralCode', referralCode);
      }
      
      if (course) {
        // Clean and encode the course name
        const cleanedCourse = course.trim();
        localStorage.setItem('courseName', cleanedCourse);
        
        // Redirect to checkout with the course parameter
        router.replace(`/checkout?course=${encodeURIComponent(cleanedCourse)}`);
      } else if (referralCode) {
        // If only referral code is provided, still go to checkout
        router.replace('/checkout');
      }
    }
  }, [searchParams, router]);

  // If there are referral parameters, show loading state while redirecting
  if (searchParams.get('referralcode') || searchParams.get('course')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryColor mx-auto mb-4"></div>
          <p className="text-lg">Redirecting to checkout...</p>
        </div>
      </div>
    );
  }

  // Normal home page if no referral parameters
  return (
    <PageWrapper>
      <main>
        <HOMEMAIN />
      </main>
    </PageWrapper>
  );
}
