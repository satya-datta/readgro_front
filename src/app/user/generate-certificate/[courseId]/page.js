"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useUserContext } from '@/contexts/UserContext';
import axios from 'axios';

const GenerateCertificate = () => {
  const router = useRouter();
  const { courseId } = useParams();
  const { user } = useUserContext();
  const [months, setMonths] = useState(1);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [error, setError] = useState('');
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getspecific_course/${courseId}`);
        if (response.success) {
          setCourseName(response.course.name);
        }
      } catch (err) {
        console.error('Error fetching course details:', err);
        setError('Failed to load course details');
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const calculateEndDate = (start, months) => {
    const date = new Date(start);
    date.setMonth(date.getMonth() + parseInt(months));
    return date.toISOString().split('T')[0];
  };

  const handleGenerateCertificate = async () => {
    try {
      setLoading(true);
      setError('');

      const endDate = calculateEndDate(startDate, months);

      const response = await axios.post('http://localhost:5000/certificateRequest', {
        userId: user.userId,
        courseId,
        courseName,
        startDate,
        durationMonths: parseInt(months),
        userName: user.name,
        userEmail: user.email
      });

      if (response.data.success) {
        setCertificateData({
          ...response.data.certificate,
          endDate
        });
      } else {
        setError(response.data.message || 'Failed to generate certificate. Please try again.');
      }
    } catch (err) {
      console.error('Error generating certificate:', err);
      setError(err.response?.data?.message || 'An error occurred while generating the certificate.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Please login to generate certificate</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Generate Certificate
        </h1>

        {!certificateData ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Internship Duration (Months)
              </label>
              <select
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Month' : 'Months'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date (Calculated)
              </label>
              <input
                type="text"
                value={calculateEndDate(startDate, months)}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm mt-2">{error}</div>
            )}

            <div className="pt-4">
              <button
                onClick={handleGenerateCertificate}
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                {loading ? 'Generating...' : 'Generate Certificate'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Certificate Generated Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your certificate has been generated and will be sent to your email address: <span className="font-medium">{user.email}</span>
            </p>
            <div className="bg-gray-50 p-4 rounded-lg text-left space-y-2">
              <p><span className="font-medium">Certificate ID:</span> {certificateData.certificateId}</p>
              <p><span className="font-medium">Course ID:</span> {courseId}</p>
              <p><span className="font-medium">Issued To:</span> {user.name}</p>
              <p><span className="font-medium">Duration:</span> {months} {months === 1 ? 'Month' : 'Months'}</p>
              <p><span className="font-medium">Start Date:</span> {new Date(startDate).toLocaleDateString()}</p>
              <p><span className="font-medium">End Date:</span> {new Date(certificateData.endDate).toLocaleDateString()}</p>
            </div>
            <div className="mt-8">
              <button
                onClick={() => router.push('/user/user-enrolled-courses')}
                className="px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateCertificate;
