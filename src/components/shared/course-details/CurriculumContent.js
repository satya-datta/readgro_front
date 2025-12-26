"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CurriculumContent = ({ id }) => {
  const [topics, setTopics] = useState([]);
  // Removed expandedTopic state as we're removing dropdown functionality
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`http://localhost:5000/gettopics/${id}`)
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

  // Add ScreenPal script to the document head
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://go.screenpal.com/player/appearance/cTXnjjnFbf1';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const getEmbedUrl = (url) => {
    if (!url) return '';
    try {
      const urlObj = new URL(url);

      // Handle ScreenPal URLs
      if (urlObj.hostname.includes('screenpal.com')) {
        // Extract the video ID from the path
        const pathParts = urlObj.pathname.split('/');
        const videoId = pathParts[pathParts.length - 1];
        if (videoId) {
          // Added title=0&controls=0 to hide title and controls
          return `https://go.screenpal.com/player/${videoId}?width=100%&height=100%&ff=1&title=0&controls=0`;
        }
      }

      // Handle YouTube URLs
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


  const playVideo = (videoUrl, title, index) => {
    const embedUrl = getEmbedUrl(videoUrl);
    if (embedUrl) {
      const newVideo = { url: embedUrl, title };
      setCurrentVideo(newVideo);
      setIsFullscreen(true);
      // Lock orientation to landscape on mobile when video plays
      if (typeof window !== 'undefined' && window.screen.orientation && window.screen.orientation.lock) {
        window.screen.orientation.lock('landscape').catch(error => {
          console.log('Orientation lock failed: ', error);
        });
      }
    } else {
      window.open(videoUrl, "_blank");
    }
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    // Unlock orientation when exiting fullscreen
    if (typeof window !== 'undefined' && window.screen.orientation && window.screen.orientation.unlock) {
      window.screen.orientation.unlock();
    }
  };

  // Close fullscreen when clicking outside the video
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFullscreen && !event.target.closest('.video-container')) {
        closeFullscreen();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isFullscreen]);

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
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 relative">
      {/* Fullscreen Video Overlay */}
      {isFullscreen && currentVideo && (
        <div className="fixed inset-0 bg-black z-50">
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={closeFullscreen}
              className="bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors"
              aria-label="Close fullscreen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="w-full h-full">
            <div className="sp-embed-player w-full h-full" data-id={currentVideo.url.split('/').pop().split('?')[0]}>
              <iframe
                src={`${currentVideo.url}&autoplay=1`}
                title={currentVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Main Video Player */}
      <div id="video-player" className="mb-6 sm:mb-8 bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
        <div className="relative pt-[56.25%] bg-gray-900">
          {currentVideo ? (
            <div className="absolute inset-0">
              <div className="sp-embed-player w-full h-full" data-id={currentVideo.url.split('/').pop().split('?')[0]}>
                <iframe
                  src={currentVideo.url}
                  title={currentVideo.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  webkitallowfullscreen="true"
                  mozallowfullscreen="true"
                ></iframe>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white bg-gray-800 p-4 text-center">
              <p className="text-sm sm:text-base">Select a video to start learning</p>
            </div>
          )}
        </div>
      </div>

      {/* Course Content */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden">

        {/* Topics List */}
        <div className="divide-y divide-gray-200">
          {topics.map((topic, index) => (
            <div key={index} className="group">
              <div className="w-full px-3 sm:px-4 py-3 sm:py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center mr-2 sm:mr-3">
                    <span className="text-gray-500 text-sm sm:text-base font-medium">{index + 1}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">{topic.topic_name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      {topic.video_url ? 'Video' : 'Reading'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => playVideo(topic.video_url, topic.topic_name, index)}
                  className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md flex items-center transition-colors whitespace-nowrap ${currentVideo?.title === topic.topic_name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  {currentVideo?.title === topic.topic_name ? 'Playing' : 'Play'}
                </button>
              </div>
              {index === topics.length - 1 && (
                <div className="mt-4 px-3 sm:px-6 pb-4">
                  {/* <button
                        onClick={() => router.push(`/user/generate-certificate/${id}`)}
                        className="w-full sm:w-1/2 py-2 px-4 bg-green hover:bg-green text-white font-medium rounded-lg shadow-md transition-colors flex items-center justify-center space-x-2 text-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Generate Certificate</span>
                      </button> */}
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
