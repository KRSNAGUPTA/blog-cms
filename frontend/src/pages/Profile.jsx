import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import api from "@/api/api";
const ProfilePage = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-6">
          <p className="text-gray-500">Loading your profile...</p>
        </div>
      </div>
    );
  }
  const reqEditor = async () => {
    try {
      const res = await api.post("/api/user/reqtoedit");
      toast({
        title: res.data.message,
        status: "success",
      });
  
    } catch (error) {
      console.error("Error sending request:", error);
  
      toast({
        title: "Something went wrong!",
        description: error.response?.data?.message || "Unable to process request.",
        status: "error", // Indicating failure
      });
    }
  };
  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4">
        <Header />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-8">
        <img
          src={user?.avatar || "https://via.placeholder.com/150"}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-indigo-600"
        />

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          {user?.username || "Username"}
        </h2>

        <div className="w-full max-w-2xl space-y-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h4 className="font-semibold text-lg text-gray-700">Role</h4>
            <p className="text-gray-600">{user?.role || "User"}</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h4 className="font-semibold text-lg text-gray-700">Full Name</h4>
            <p className="text-gray-600">{user?.name || "User Name"}</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h4 className="font-semibold text-lg text-gray-700">Email</h4>
            <p className="text-gray-600">{user?.email || "user@example.com"}</p>
          </div>
        </div>
        {user.role == "reader" ? (
          <p>
            Want to be post your <span className="text-purple-500">Blog</span>.
            Request to be a {" "}
            <button onClick={reqEditor} className="text-gray-600 px-4 py-2 font-bold text-center rounded-full border-2 border-gray-300 hover:border-purple-600 hover:bg-purple-600 hover:text-white transform transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:scale-90">
              Blogger!
            </button>
          </p>
        ) : null}
      </div>
      <Toaster />
    </div>
  );
};

export default ProfilePage;
