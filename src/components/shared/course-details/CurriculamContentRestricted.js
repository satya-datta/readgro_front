"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CurriculumContentRestricted = ({ id, hasPurchased, onCompleteCourse }) => {
  const [topics, setTopics] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showLockedPopup, setShowLockedPopup] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [packageNames, setPackageNames] = useState([]);
  const [completedTopics, setCompletedTopics] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetch(`https://readgro-backend-new.onrender.com/gettopics/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.topics)) {
            setTopics(data.topics);
          } else {
            console.error(`Topics data for course ${id} is not an array`, data);
          }
        })
        .catch((error) =>
          console.error(`Error fetching topics for course ${id}:`, error)
        );

      fetch(`https://readgro-backend-new.onrender.com/getpackagebycourse/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.packages)) {
            setPackageNames(data.packages.map((pkg) => pkg.package_name));
          } else {
            console.error(
              `Package data for course ${id} is not an array`,
              data
            );
          }
        })
        .catch((error) =>
          console.error(`Error fetching packages for course ${id}:`, error)
        );
    }
  }, [id]);

  const getEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      if (
        urlObj.hostname === "www.youtube.com" ||
        urlObj.hostname === "youtube.com"
      ) {
        return `https://www.youtube.com/embed/${urlObj.searchParams.get("v")}`;
      } else if (urlObj.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${urlObj.pathname.substring(1)}`;
      }
      return url;
    } catch (error) {
      console.error("Invalid YouTube URL:", url);
      return "";
    }
  };

  const handleVideoClick = (index, youtubeLink) => {
    const isLocked = !hasPurchased && index !== 0;

    if (isLocked) {
      setShowLockedPopup(true);
      return;
    }

    // Mark the topic as completed
    if (!completedTopics.includes(index)) {
      const updatedCompletedTopics = [...completedTopics, index];
      setCompletedTopics(updatedCompletedTopics);

      // Check if this was the last topic
      if (updatedCompletedTopics.length === topics.length - 1 && onCompleteCourse) {
        onCompleteCourse();
      }
    }

    const embedUrl = getEmbedUrl(youtubeLink);
    if (embedUrl) {
      setSelectedVideo(embedUrl);
      setShowVideoModal(true);
    } else {
      window.open(youtubeLink, "_blank");
    }
  };

  return (
    <div>
      <ul className="divide-y border rounded-lg">
        {topics.map((topic, index) => {
          const isLocked = !hasPurchased && index !== 0;

          return (
            <li
              key={index}
              onClick={() => handleVideoClick(index, topic.video_url)}
              className={`flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                isLocked ? "opacity-70" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 flex items-center justify-center border rounded-full 
        ${
          isLocked
            ? "border-gray-300 text-gray-400"
            : "border-blue-500 text-blue-600 bg-white"
        }`}
                >
                  <i className="icofont-play-alt-2 text-sm"></i>
                </div>

                <span className="text-sm font-medium text-gray-800">
                  {topic.topic_name} : {index + 1}
                </span>
              </div>

              {isLocked && (
                <i className="icofont-lock text-gray-400 text-lg"></i>
              )}
            </li>
          );
        })}
      </ul>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative w-full max-w-2xl">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
              onClick={() => setShowVideoModal(false)}
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold mb-4">Now Playing</h3>
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
              <iframe
                src={selectedVideo}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Locked Content Popup */}
      {showLockedPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center relative w-96">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowLockedPopup(false)}
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4">BUY COURSE</h2>
            <p className="text-md mb-2 text-gray-600">
              This course is available in:
            </p>

            <ul className="list-disc text-left pl-6 mb-4 text-gray-800">
              {packageNames.length > 0 ? (
                packageNames.map((pkg, index) => (
                  <li key={index} className="text-lg font-medium">
                    {pkg}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No packages available</li>
              )}
            </ul>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
              onClick={() => {
                setShowLockedPopup(false);
                router.push("/packages");
              }}
            >
              View Plans
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurriculumContentRestricted;
