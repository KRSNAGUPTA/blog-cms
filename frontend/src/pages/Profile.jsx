import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import api from "@/api/api";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import moment from "moment";
import LoadingComponent from "@/components/Loading";
import { Verified } from "lucide-react";

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
        toast({
          title: "Failed to load profile or posts.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [routeUsername]);

  const reqEditor = async () => {
    try {
      const res = await api.post("/api/user/reqtoedit");
      toast({
        title: res.data.message,
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description:
          error.response?.data?.message || "Unable to process request.",
        status: "error",
      });
    }
  };

  if (loading) return <LoadingComponent />;

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
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          {userData?.username || "Username"}{" "}
          {userData?.role != "reader" ? (
            <span>
              <Verified className="text-indigo-500 ml-1" />
            </span>
          ) : null}
        </h2>

        {/* User Details */}
        <div className="w-full max-w-2xl space-y-6">
          {[
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
              <h4 className="font-semibold text-lg text-gray-700">
                {item.label}
              </h4>
              <p className="text-gray-600 mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        {(userData?.role && userData?.username == routeUsername)  == "reader" ? (
          <p>
            Want to be post your <span className="text-purple-500">Blog</span>.
            Request to be a{" "}
            <button
              onClick={reqEditor}
              className="text-gray-600 px-4 mx-2 py-2 font-bold text-center rounded-full border-2 border-gray-300 hover:border-purple-600 hover:bg-purple-600 hover:text-white transform transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:scale-90"
            >
              Blogger!
            </button>
            and Get Verified
          </p>
        ) : null}

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
