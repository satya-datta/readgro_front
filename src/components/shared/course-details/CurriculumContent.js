"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CurriculumContent = ({ id }) => {
  const [topics, setTopics] = useState([]);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`https://readgro-backend-new.onrender.com/gettopics/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.topics)) {
            setTopics(data.topics);
            // Set first topic as expanded by default if available
            if (data.topics.length > 0) {
              setExpandedTopic(0);
              setCurrentVideo({
                url: getEmbedUrl(data.topics[0].video_url),
                title: data.topics[0].topic_name
              });
            }
          } else {
            console.error(`Topics data for course ${id} is not an array`, data);
          }
        })
        .catch((error) => {
          console.error(`Error fetching topics for course ${id}:`, error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const getEmbedUrl = (url) => {
    if (!url) return '';
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname === 'youtu.be') {
        const videoId = urlObj.hostname === 'youtu.be' 
          ? urlObj.pathname.substring(1)
          : urlObj.searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autohide=1&showinfo=0`;
      }
      return url;
    } catch (error) {
      console.error("Error processing video URL:", url, error);
      return '';
    }
  };

  const toggleTopic = (index) => {
    setExpandedTopic(expandedTopic === index ? null : index);
  };

  const playVideo = (videoUrl, title, index) => {
    const embedUrl = getEmbedUrl(videoUrl);
    if (embedUrl) {
      setCurrentVideo({ url: embedUrl, title });
      setExpandedTopic(index);
      // Smooth scroll to video player
      document.getElementById('video-player')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.open(videoUrl, "_blank");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (topics.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No topics available for this course yet.</p>
      </div>
    );
  }

  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Main Video Player */}
      <div id="video-player" className="mb-8 bg-black rounded-xl overflow-hidden shadow-xl">
        <div className="relative pt-[56.25%] bg-gray-900">
          {currentVideo ? (
            <>
              <iframe
                src={currentVideo.url}
                title={currentVideo.title}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white text-lg font-semibold">{currentVideo.title}</h3>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white bg-gray-800">
              <p>Select a video to start learning</p>
            </div>
          )}
        </div>
      </div>

      {/* Course Content */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Course Content</h2>
        </div>

        {/* Topics Accordion */}
        <div className="divide-y divide-gray-200">
          {topics.map((topic, index) => (
            <div key={index} className="group">
              <button
                onClick={() => toggleTopic(index)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                aria-expanded={expandedTopic === index}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center mr-3">
                    {expandedTopic === index ? (
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">{topic.topic_name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {topic.video_url ? 'Video' : 'Reading'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playVideo(topic.video_url, topic.topic_name, index);
                    }}
                    className="ml-4 p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                    title="Play video"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </button>
              
              {expandedTopic === index && (
                <div className="px-6 pb-4 pt-2 bg-gray-50">
                  <div className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{topic.topic_name}</h4>
                        <p className="text-xs text-gray-500">
                          {topic.video_url ? 'Video' : 'Reading'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => playVideo(topic.video_url, topic.topic_name, index)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md flex items-center transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      {currentVideo?.title === topic.topic_name ? 'Now Playing' : 'Play'}
                    </button>
                  </div>
                  {index === topics.length - 1 && (
                    <div className="mt-4 pl-2">
                      <button
                        onClick={() => router.push(`/user/generate-certificate/${id}`)}
                        className="w-1/2 py-2 px-4 bg-green hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-colors flex items-center justify-center space-x-2 text-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Generate Certificate</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default CurriculumContent;
