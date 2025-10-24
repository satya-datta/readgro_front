"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/UserContext";
import CurriculumContentRestricted from "@/components/shared/course-details/CurriculamContentRestricted";
import { FiClock, FiAward, FiUser, FiCalendar, FiCheckCircle, FiPlay, FiBookOpen, FiBarChart2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const CertificateModal = ({ isOpen, onClose, course, user, onRequestCertificate }) => {
  const [formData, setFormData] = useState({
    startDate: new Date().toISOString().split('T')[0],
    durationMonths: 3,
    userName: user?.name || '',
    userEmail: user?.email || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, modalRef]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/certificateRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.userId,
          courseId: course?.id,
          ...formData,
          courseName: course?.name,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to request certificate');
      }

      onRequestCertificate(data.certificateUrl);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        ref={modalRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-900">Request Certificate</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiAward className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{course?.name}</h4>
                <p className="text-sm text-gray-600">Certificate of Completion</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (months)</label>
                <select
                  name="durationMonths"
                  value={formData.durationMonths}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="1">1 Month</option>
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="12">12 Months</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors flex items-center justify-center space-x-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Request Certificate'
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const CourseDetailsPrimary = ({ id, type }) => {
  const { user } = useUserContext();
  const [course, setCourse] = useState({ course: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [activeTab, setActiveTab] = useState('curriculum');
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef();
  const router = useRouter();

  // Handle scroll for sticky sidebar
  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const stickyOffset = stickyRef.current.offsetTop;
        setIsSticky(window.scrollY > stickyOffset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRequestCertificate = (url) => {
    setCertificateUrl(url);
    setShowCertificateModal(false);
    // Here you can add a success notification
    alert('Certificate requested successfully! You will receive it via email.');
  };

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/getspecific_course/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCourse(data);
          console.log(data);
        } else {
          setError("Course details not found");
        }
      })
      .catch(() => setError("Failed to load course details"))
      .finally(() => setLoading(false));
  }, [id]);

  // Check enrollment for logged-in users: get user's package -> get mapped courses -> check contains this course id
  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        if (!user?.userId || !course?.course?.id) return;
        const res = await fetch(
          `http://localhost:5000/getuser_details/${user.userId}`
        );
        if (!res.ok) return;
        const data = await res.json();
        const packageId = data?.user?.packageId;
        if (!packageId) return;
        const mapRes = await fetch(
          `http://localhost:5000/getcoursemappings/${packageId}`
        );
        const mappings = await mapRes.json();
        if (Array.isArray(mappings)) {
          const ids = mappings.map((c) => c.course_id);
          setIsEnrolled(ids.includes(Number(course.course.id)));
        }
      } catch (_) {
        // ignore
      }
    };
    checkEnrollment();
  }, [user?.userId, course?.course?.id]);

  const isUserLoggedIn = Boolean(user?.userId);

  const handleButtonClick = () => {
    if (!isUserLoggedIn) {
      window.location.href = `/checkout?course=${encodeURIComponent(
        course?.course?.name || ""
      )}`;
      return;
    }
    if (isEnrolled) {
      router.push(`/user/user-enrolled-courses/${course.course.id}`);
    } else {
      router.push(`/checkout?course=${encodeURIComponent(course.course.name)}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-gray-800">
          Error Loading Course
        </h3>
        <p className="text-gray-600 mt-2">{error.message || 'An error occurred while loading the course.'}</p>
      </div>
    );
  }

  if (!course?.course) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-gray-800">
          Course not found
        </h3>
        <p className="text-gray-600 mt-2">
          The requested course could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen">
      {/* Certificate Modal */}
      <CertificateModal 
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        course={course?.course}
        user={user}
        onRequestCertificate={handleRequestCertificate}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={course?.course?.image || '/images/course-bg.jpg'} 
            alt="Course background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6">
              <span className="text-sm font-medium">{course?.course?.category || 'Professional Course'}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {course?.course?.name || 'Master Course'}
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              {course?.course?.description || 'Transform your career with our comprehensive course designed by industry experts.'}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <FiUser className="w-5 h-5" />
                <span>{course?.course?.instructor || 'Expert Instructor'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <FiClock className="w-5 h-5" />
                <span>{course?.course?.duration || '10+ Hours'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <FiBarChart2 className="w-5 h-5" />
                <span>{course?.course?.level || 'All Levels'}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleButtonClick}
                className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
                <FiPlay className="w-5 h-5" />
              </button>
              
              {isEnrolled && (
                <button
                  onClick={() => setShowCertificateModal(true)}
                  className="px-6 py-4 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <FiAward className="w-5 h-5" />
                  Request Certificate
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Course Tabs */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('curriculum')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'curriculum' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    <FiBookOpen className="w-4 h-4" />
                    Curriculum
                  </button>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    <FiBookOpen className="w-4 h-4" />
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('instructor')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'instructor' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    <FiUser className="w-4 h-4" />
                    Instructor
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {activeTab === 'curriculum' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Course Content</h3>
                    <CurriculumContentRestricted id={id} onCompleteCourse={() => setShowCertificateModal(true)} />
                  </div>
                )}
                
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">About This Course</h3>
                    <div className="prose max-w-none text-gray-600">
                      <p className="mb-4">
                        {course?.course?.description || 'This comprehensive course is designed to take you from beginner to advanced level. You will learn the latest industry practices and gain hands-on experience through real-world projects.'}
                      </p>
                      <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">What You'll Learn</h4>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {[1, 2, 3, 4].map((item) => (
                          <div key={item} className="flex items-start">
                            <FiCheckCircle className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span>Key learning point {item} that will help students understand the value</span>
                          </div>
                        ))}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Requirements</h4>
                      <ul className="list-disc pl-5 space-y-2 mb-6">
                        <li>Basic computer skills</li>
                        <li>Internet connection</li>
                        <li>Willingness to learn and practice</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {activeTab === 'instructor' && (
                  <div>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600">
                        {course?.course?.instructor?.charAt(0) || 'I'}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{course?.course?.instructor || 'Instructor Name'}</h3>
                        <p className="text-blue-600 font-medium">Senior Instructor</p>
                        <p className="text-gray-600 mt-2">
                          With over 10 years of experience in the industry, our instructor brings real-world knowledge and expertise to help you succeed in your learning journey.
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center text-yellow-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="ml-2 text-gray-600 text-sm">4.9 (1,234 reviews)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div 
              ref={stickyRef}
              className={`bg-white rounded-xl shadow-sm overflow-hidden ${isSticky ? 'lg:fixed lg:w-[calc(33.333333%_-_1.5rem)] lg:top-6' : ''}`}
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <FiClock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{course?.course?.duration || '10+ hours'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                      <FiCalendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium">{new Date(course?.course?.created_time || new Date()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-50 rounded-lg text-green-600">
                      <FiAward className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Certificate</p>
                      <p className="font-medium">Available on completion</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Price</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Original Price:</span>
                    <span className="text-gray-900 font-medium line-through">₹{course?.course?.course_price || '9,999'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Discounted Price:</span>
                    <span className="text-2xl font-bold text-green-600">₹{course?.course?.discount_price || '6,999'}</span>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={handleButtonClick}
                      className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
                      <FiPlay className="w-4 h-4" />
                    </button>
                    
                    {isEnrolled && (
                      <button
                        onClick={() => setShowCertificateModal(true)}
                        className="w-full mt-3 py-3 px-6 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <FiAward className="w-4 h-4" />
                        Request Certificate
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">What's Included</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-gray-600">
                      <FiCheckCircle className="w-5 h-5 text-green-500" />
                      <span>Full lifetime access</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FiCheckCircle className="w-5 h-5 text-green-500" />
                      <span>Certificate of completion</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FiCheckCircle className="w-5 h-5 text-green-500" />
                      <span>Access on mobile and TV</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FiCheckCircle className="w-5 h-5 text-green-500" />
                      <span>Downloadable resources</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4 mt-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiClock className="w-5 h-5 text-primaryColor" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiAward className="w-5 h-5 text-primaryColor" />
                    <span>Certificate of completion</span>
                  </div>
                      {/* <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                          />
                        </svg>
                        <span>Downloadable resources</span>
                      </div> */}
                    </div>
                    {/* CTA Button */}
                    <button
                      onClick={handleButtonClick}
                      className="mt-4 w-full bg-primaryColor text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                    >
                      {!isUserLoggedIn
                        ? "Buy Now"
                        : isEnrolled
                        ? "Explore Your Course"
                        : "Buy Now"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructor Section */}
        {activeTab !== 'instructor' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-8">
            <div className="p-6 md:p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                About the Instructor
              </h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <span className="text-3xl text-gray-700 font-medium">
                    {course.course.instructor?.charAt(0) || "S"}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {course.course.instructor || "Satya Nanda"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    AI Expert with 10+ years of experience in machine learning and
                  generative AI. Former lead engineer at major tech companies
                  and passionate educator.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>25,000+ students</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    <span>15 courses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseDetailsPrimary;
