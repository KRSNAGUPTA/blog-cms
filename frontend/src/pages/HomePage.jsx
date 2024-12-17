import Header from "@/components/Header";
import React, { useContext, useEffect } from "react";
import BlogPost from "@/components/BlogPost";
import { AuthContext } from "@/context/AuthContext";
function HomePage() {
  const topPost = [
    {
      id: 1,
      title: "The Art of Writing",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nostrum, odio sed illo voluptates ab quo, id nihil magni temp",
      authorUsername: "John Doe",
      likesCount: 12,
      dislikesCount: 6,
    },
    {
      id: 2,
      title: "The Power of React",
      content:
        "Discover how React empowers developers to create fast, dynamic, and scalable web apps.",
      authorUsername: "Jane Doe",
      likesCount: 20,
      dislikesCount: 3,
    },
    {
      id: 3,
      title: "The Future of AI",
      content:
        "Dive into the world of artificial intelligence and explore its transformative potential.",
      authorUsername: "John Smith",
      likesCount: 15,
      dislikesCount: 5,
    },
  ];
  const { user, loading } = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mt-64 ">
          {user ? (
            <h1 className="text-xl">
              Hello <span className="text-purple-600">{user.username}</span>
            </h1>
          ) : null}
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Welcome to Blog ki <span className="text-purple-500">mkc</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Idhr pe kuch toh badhiya likh lenge
          </p>
          <div className="flex items-center justify-center h-20 mt-6  mb-20">
            <div className="flex space-x-8">
              <svg
                className="w-10 h-10 "
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
                <path
                  d="M51.2 1L33.1 19L15.1 1L1 15.2L19 33.2L1 51.2L15.1 65.4L33.1 47.3L51.2 65.4L65.3 51.2L47.3 33.2L65.3 15.2L51.2 1Z"
                  stroke="#9D9D9D"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                className="w-10 h-10"
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
                <g opacity="0.3">
                  <path
                    d="M1 68L30.9 14.4L62.3 67.1L1 68Z"
                    fill="currentColor"
                  />
                  <path
                    d="M1 68L30.9 14.4L62.3 67.1L1 68Z"
                    fill="currentColor"
                    fillOpacity="0.2"
                  />
                </g>
                <path
                  d="M1.1001 54.5L31.0001 0.999999L62.5001 53.6L1.1001 54.5Z"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1.1001 54.5L31.0001 0.999999L62.5001 53.6L1.1001 54.5Z"
                  stroke="currentColor"
                  strokeOpacity="0.2"
                  strokeMiterlimit="10"
                />
              </svg>
              <svg
                className="w-10 h-10"
                viewBox="0 0 68 68"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M67.5889 46.2L67.5889 0L21.3889 0L21.3889 46.2L67.5889 46.2Z"
                  fill="currentColor"
                />
                <path
                  d="M67.5889 46.2L67.5889 0L21.3889 0L21.3889 46.2L67.5889 46.2Z"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
                <path
                  d="M49 67.5815H0V18.5815H49V67.5815ZM2.69995 64.7815H46.2V21.2815H2.69995V64.7815Z"
                  fill="currentColor"
                />
                <path
                  d="M49 67.5815H0V18.5815H49V67.5815ZM2.69995 64.7815H46.2V21.2815H2.69995V64.7815Z"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* SVG Decorative Design */}
        <div className="relative w-full h-24 mb-12">
          <svg
            className="absolute inset-x-0 bottom-0"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-36">
          {topPost.map((post) => (
            <BlogPost
              key={post.id}
              title={post.title}
              content={post.content}
              authorUsername={post.authorUsername}
              likesCount={post.likesCount}
              dislikesCount={post.dislikesCount}
            />
          ))}
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">
            Want to Share Your Story?
          </h2>
          <p className="text-gray-600 mb-6">
            Join our community of writers and share your insights with the
            world. Create your own blog today!
          </p>
          <button className="bg-blue-500 text-white py-3 px-8 rounded-lg font-medium transition-transform duration-300 hover:scale-105 hover:bg-blue-600">
            Start Writing
          </button>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
