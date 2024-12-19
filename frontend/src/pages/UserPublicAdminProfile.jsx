import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import api from "@/api/api";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import moment from "moment";

const UserPublicAdminPage = () => {
  const navigate = useNavigate();
  const { username: routeUsername } = useParams();
  const [userData, setUserData] = useState({});
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await api.get(`/api/user/u/${routeUsername}`);
        setUserData(userResponse.data.user);

        const postsResponse = await api.get(`/api/posts/u/${routeUsername}`);
        setUserPost(postsResponse.data.posts || []);
      } catch (error) {
        if (error.status == "404") {
          toast({
            title: "User hasn't posted yet!",
            
          });
          return;
        }
        toast({ title: "Failed to load profile or posts." ,
            variant:"destructive"
        });
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [routeUsername]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
      <Header />

      <div className="mt-8 bg-white shadow-lg rounded-lg p-8 flex flex-col items-center space-y-10">
        {/* User Avatar */}
        <img
          src={userData?.avatar || "https://via.placeholder.com/150"}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-purple-600 shadow-md"
        />

        {/* Username */}
        <h2 className="text-3xl font-bold text-gray-800">
          {userData?.username || "Username"}
        </h2>

        {/* User Details */}
        <div className="w-full max-w-2xl space-y-6">
          {[
            { label: "Role", value: userData?.role || "User" },
            { label: "Full Name", value: userData?.name || "N/A" },
            { label: "Email", value: userData?.email || "N/A" },
            {
              label: "Joined on",
              value: userData?.createdAt
                ? moment(userData.createdAt).format("LL")
                : "N/A",
            },
            { label: "Total Posts", value: userPost.length || "0" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              <h4 className="font-semibold text-lg text-gray-700">{item.label}</h4>
              <p className="text-gray-600 mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        {/* User Posts */}
        <div className="w-full">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            All Posts
          </h3>
          {userPost.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPost.map((post) => (
                <Card
                  key={post._id}
                  className="p-6 border border-gray-200 shadow-md rounded-lg hover:shadow-lg transition cursor-pointer"
                  onClick={() => navigate(`/post/${post.slug}`)}
                >
                  <CardTitle className="text-lg font-bold text-gray-800 mb-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {moment(post.createdAt).fromNow()}
                  </CardDescription>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No posts available.</p>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default UserPublicAdminPage;
