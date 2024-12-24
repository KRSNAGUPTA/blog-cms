import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import api from "@/api/api";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import LoadingComponent from "@/components/Loading";
import { Verified } from "lucide-react";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const Profile = () => {
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
        if (error.status === "404") {
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
    <div className="min-h-screen w-auto mx-auto bg-gray-50">
      <Header />

      <div className="mt-8 bg-white shadow-xl rounded-lg p-8 flex flex-col items-center space-y-10">
        {/* User Avatar */}
        <img
          src={userData?.avatar || "https://via.placeholder.com/150"}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-purple-600 shadow-md"
        />

        {/* Username */}
        <h2 className="text-3xl font-extrabold text-gray-800 flex items-center">
          {userData?.username || "Username"}{" "}
          {userData?.role !== "reader" && (
            <Verified className="text-indigo-500 ml-1" />
          )}
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

        {/* Request Blogger Status */}
        {userData?.role === "reader" &&
          userData?.username === routeUsername && (
            <p>
              Want to post your <span className="text-purple-500">Blog</span>?
              Request to be a{" "}
              <Button
                onClick={reqEditor}
                className="text-gray-600 px-4 py-2 font-bold rounded-full border-2 border-gray-300 hover:border-purple-600 hover:bg-purple-600 hover:text-white transform transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:scale-90"
              >
                Blogger
              </Button>{" "}
              and Get Verified!
            </p>
          )}

        {/* User Posts Table */}
        <div className="w-full max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            All Posts
          </h3>
          {userPost.length > 0 ? (
            <Table className="w-full ">
              <thead className="bg-gray-200 text-gray-700 ">
                <tr>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Posted</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {userPost.map((post) => (
                  <tr
                    key={post._id}
                    className="border-b hover:bg-gray-100 cursor-pointer text-center"
                    onClick={() => navigate(`/post/${post.slug}`)}
                  >
                    <td className="px-4 py-2">{post.title}</td>
                    <td className="px-4 py-2">
                      {moment(post.createdAt).fromNow()}
                    </td>
                    <td className="px-4 py-2">
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/post/${post.slug}`)}
                        className="text-purple-600 hover:bg-purple-200"
                      >
                        View Post
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-gray-600 text-center">No posts available.</p>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Profile;
