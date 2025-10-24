const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://readgro-backend-new.onrender.com';

export const API_ENDPOINTS = {
  COURSE: (id) => `${API_BASE_URL}/getspecific_course/${id}`,
  USER_DETAILS: (userId) => `${API_BASE_URL}/getuser_details/${userId}`,
  COURSE_MAPPINGS: (packageId) => `${API_BASE_URL}/getcoursemappings/${packageId || 'default'}`,
  CERTIFICATE_REQUEST: `${API_BASE_URL}/certificateRequest`,
};

export default API_ENDPOINTS;
