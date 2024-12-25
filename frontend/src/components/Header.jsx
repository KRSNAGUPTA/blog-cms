import React, { useState } from "react";
import { Github, Menu, Search, User2Icon, X } from "lucide-react";
import { AuthContext } from "@/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";

const Header = ({ toggleSidebar }) => {
  const { user, logout } = React.useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleSearch = async () => {
    try {
      if (!searchTerm) {
        return;
      }
      toast({
        title: "Search feature coming soon!",
      });
    } catch (error) {
      toast({
        title: "Failed to Search",
        description: `${error?.response?.message}`,
      });
    }
  };

  return (
    <header className="bg-white shadow-md rounded-b-2xl transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <a href="/">
            <h1 className="text-2xl font-bold text-indigo-700">BlogHub</h1>
          </a>
        </div>

        <div className="hidden sm:flex justify-center items-center space-x-2">
          <Input
            className="rounded-full shadow-lg hover:shadow-purple-300 transition-all ease-in-out duration-500"
            placeholder="Search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
            <Search
              onClick={() => handleSearch()}
              className="z-2 text-purple-500 cursor-pointer"
            />
        </div>

        <nav className="hidden sm:flex">
          <ul className="flex space-x-6 items-center">
            {user?.role === "admin" && (
              <li>
                <button
                  className="border-b-2 border-purple-200 hover:border-purple-500 transform ease-in-out duration-700"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </button>
              </li>
            )}
            {user?.role !== "reader" && (
              <li>
                <button
                  className="border-b-2 border-purple-200 hover:border-purple-500 transform ease-in-out duration-700"
                  onClick={() => navigate("/create")}
                >
                  Create Post
                </button>
              </li>
            )}
            <li>
              <a
                href="https://github.com/KRSNAGUPTA/blog-cms"
                target="_blank"
                className="text-gray-600 hover:text-indigo-700 transition-all duration-300 ease-in-out"
              >
                <Github size={24} />
              </a>
            </li>
            <li>
              {user ? (
                <div className="flex space-x-4 items-center">
                  <a href={`/u/${user.username}`}>
                    <User2Icon
                      className="text-gray-600 hover:text-indigo-700 transition-all duration-300 ease-in-out"
                      size={24}
                    />
                  </a>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 px-4 py-2 font-bold text-center rounded-full border-2 border-gray-300 hover:border-purple-600 hover:bg-purple-600 hover:text-white transform transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:scale-90"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <a
                  href="/login"
                  className="text-gray-600 px-4 py-2 font-bold text-center rounded-full border-2 border-gray-300 hover:border-purple-600 hover:bg-purple-600 hover:text-white transform transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:scale-90"
                >
                  Login
                </a>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {menuOpen && (
        <div className="sm:hidden bg-white shadow-md rounded-lg py-4 px-6">
          <ul className="space-y-4">
            {user?.role === "admin" && (
              <li>
                <button onClick={() => navigate("/dashboard")}>
                  Dashboard
                </button>
              </li>
            )}
            {user?.role !== "reader" && (
              <li>
                <button onClick={() => navigate("/create")}>Create Post</button>
              </li>
            )}
            <li>
              <a
                href="https://github.com/KRSNAGUPTA/blog-cms"
                target="_blank"
                className="text-gray-600 hover:text-indigo-700"
              >
                GitHub
              </a>
            </li>
            <li>
              {user ? (
                <div>
                  <a href={`/u/${user.username}`}>Profile</a>
                  <button onClick={handleLogout} className="block mt-2">
                    Logout
                  </button>
                </div>
              ) : (
                <a href="/login">Login</a>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
