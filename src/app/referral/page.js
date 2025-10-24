'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ReferralHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Get referral code and course from URL parameters
    const referralCode = searchParams.get('referralcode');
    const course = searchParams.get('course');

    // Store in localStorage if they exist
    if (referralCode) {
      localStorage.setItem('referralCode', referralCode);
    }
    
    if (course) {
      localStorage.setItem('courseName', course);
    }

    // Navigate to checkout page with course parameter if it exists
    if (course) {
      router.push(`/checkout?course=${encodeURIComponent(course)}`);
    } else {
      // If no course parameter, just go to home or any other default page
      router.push('/');
    }
  }, [searchParams, router]);

  // Show loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryColor mx-auto mb-4"></div>
        <p className="text-lg">Redirecting to checkout...</p>
      </div>
    </div>
  );
}
