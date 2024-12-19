import React, { useContext, useEffect, useState } from "react";
import Header from "@/components/Header";
import { AuthContext } from "@/context/AuthContext";
import api from "@/api/api";
import { useNavigate } from "react-router-dom";
const userStats = {
  totalUser: 5,
  totalPost: 7,
  totalAdmin: 2,
};

function AdminDashboard() {
  const { user, loading } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        const response = await api.get("/api/admin/webstatus");
        const websiteStats = response.data.websiteStats;
        setAllPosts(websiteStats.postList);
        setAllUsers(websiteStats.userList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWebsiteData();
  }, []);

  useEffect(() => {
    console.log("Updated allUsers:", allUsers);
  }, [allUsers]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mt-12 mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Welcome,
            <span className="text-purple-600">
              {" "}
              {user ? user.username : "Admin"}
            </span>{" "}
            !
          </p>
        </div>
        <div className="flex justify-around">
          <div className="flex flex-col justify-center">
            <div>
              <h2>All Users</h2>
              <h4>{allUsers.length}</h4>
            </div>
            <div>
              <h2>Total Posts</h2>
              <h4>{allPosts.length}</h4>
            </div>
            <div>Manage Role</div>
            <div>Blogger Request</div>
          </div>
          <div className="flex flex-col justify-center">
            <div>Chart-</div>
            <div>
              <table className="border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-2 py-1">Avatar</th>
                    <th className="border border-gray-400 px-2 py-1">
                      Username
                    </th>
                    <th className="border border-gray-400 px-2 py-1">
                      Full Name
                    </th>
                    <th className="border border-gray-400 px-2 py-1">Role</th>
                    <th className="border border-gray-400 px-2 py-1">Email</th>
                    <th className="border border-gray-400 px-2 py-1">
                      Total Posts
                    </th>
                    <th className="border border-gray-400 px-2 py-1">
                      Joined On
                    </th>
                    <th className="border border-gray-400 px-2 py-1">
                      Last Login
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 px-2 py-1">
                        <img
                          src={user.avatar}
                          alt="avatar"
                          height={30}
                          width={30}
                        />
                      </td>
                      <td
                        className="border border-gray-400 px-2 py-1 hover:cursor-pointer"
                        onClick={() => navigate(`/u/${user.username}`)}
                      >
                        {user.username}
                      </td>
                      <td className="border border-gray-400 px-2 py-1">
                        {user.name}
                      </td>
                      <td className="border border-gray-400 px-2 py-1">
                        {user.role}
                      </td>
                      <td className="border border-gray-400 px-2 py-1">
                        {user.email}
                      </td>
                      <td className="border border-gray-400 px-2 py-1">
                        {user.totalPosts}
                      </td>
                      <td className="border border-gray-400 px-2 py-1">
                        {user.createdAt}
                      </td>
                      <td className="border border-gray-400 px-2 py-1">
                        {user.lastLogin}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
