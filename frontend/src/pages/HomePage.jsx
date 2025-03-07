import Header from "@/components/Header";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import api from "@/api/api";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { PanelTopOpen } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

function HomePage() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const topPost = async () => {
      try {
        const res = await api.get("/api/posts/");
        setPosts(res?.data.posts);
      } catch (error) {
        topPost();
      }
    };

    topPost();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-50">
      <Header />
      <Toaster/>
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mt-24 sm:mt-32 lg:mt-64">
          {user ? (
            <h1 className="text-xl">
              Hello <span className="text-purple-600">{user.username}</span>
            </h1>
          ) : null}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Welcome to Blog<span className="text-purple-500">Hub</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Write & Share your thoughts...
          </p>
          <div className="flex items-center justify-center h-20 mt-6 mb-20">
            <div className="flex space-x-8"></div>
          </div>
        </div>

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
          {posts.map((post) => (
            <Card
              key={post?.slug}
              className="p-2 cursor-pointer hover:shadow-lg transition-all ease-in-out duration-500"
              onClick={() => navigate(`/post/${post.slug}`)}
            >
              <CardTitle className="text-center mt-2 mb-2">
                {post?.title}
              </CardTitle>
              <CardDescription>
                {
                  <p
                    className="p-2"
                    dangerouslySetInnerHTML={{
                      __html: post.content.slice(0, 300) + "...",
                    }}
                  />
                }
              </CardDescription>
              {/* <CardFooter className="flex justify-center mt-4">{""}</CardFooter> */}
            </Card>
          ))}
        </div>

        {!user && (
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">
              Want to Share Your Story?
            </h2>
            <p className="text-gray-600 mb-6">
              Join our community of writers and share your insights with the
              world. Create your own blog today!
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-purple-500 rounded-full text-white py-3 px-8 font-medium transition-transform duration-300 hover:scale-105 hover:bg-purple-600"
            >
              Start Writing
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePage;
