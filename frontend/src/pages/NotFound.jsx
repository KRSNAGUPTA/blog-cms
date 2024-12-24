import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-50 bg-cover bg-no-repeat">
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 flex justify-center items-center h-screen flex-col">
        <div className="text-center w-full max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
            404 <span className="text-purple-500 block sm:inline">Page Not Found</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex items-center justify-center h-16 sm:h-20 mt-4 sm:mt-6 mb-12 sm:mb-20">
            <div className="flex space-x-4 sm:space-x-8">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10"
                viewBox="0 0 68 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M53.4998 14.7002L35.4998 32.7002L17.3998 14.7002L3.2998 28.8002L21.2998 46.9002L3.2998 64.9002L17.3998 79.0002L35.4998 61.0002L53.4998 79.0002L67.5998 64.9002L49.5998 46.9002L67.5998 28.8002L53.4998 14.7002Z"
                  fill="currentColor"
                />
                <path
                  d="M53.4998 14.7002L35.4998 32.7002L17.3998 14.7002L3.2998 28.8002L21.2998 46.9002L3.2998 64.9002L17.3998 79.0002L35.4998 61.0002L53.4998 79.0002L67.5998 64.9002L49.5998 46.9002L67.5998 28.8002L53.4998 14.7002Z"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
              </svg>
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10"
                viewBox="0 0 64 68"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 68L30.9 14.4L62.3 67.1L1 68Z" fill="currentColor" />
                <path
                  d="M1 68L30.9 14.4L62.3 67.1L1 68Z"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 sm:mt-16">
          <button
            onClick={() => {
              console.log("Button clicked!");
              navigate("/");
            }}
            className="bg-purple-400 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full font-medium transition-transform duration-300 hover:scale-105 hover:bg-purple-700 cursor-pointer z-20 text-sm sm:text-base"
          >
            Go Back Home
          </button>
        </div>

        <div className="fixed bottom-0 left-0 right-0">
          <svg
            className="w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            fill="currentColor"
          >
            <path
              fillOpacity="1"
              d="M0,128L1440,224L1440,320L0,320Z"
              className="text-gray-200"
            ></path>
          </svg>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
