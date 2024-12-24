import React, { useState } from "react";
import { Github, Menu, Search, User2Icon } from "lucide-react";
import { AuthContext } from "@/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
const Header = ({ toggleSidebar }) => {
  const { user, logout } = React.useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
  };
  const handleSearch = async()=>{
    try {
      if(!searchTerm){
        return;
      }
    } catch (error) {
      toast({
        title:"Failed to Search",
        description:`${error?.response?.message}`
      })
    }

  }

  return (
    <header className="bg-white shadow-md rounded-b-2xl transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          {/* <button
            onClick={toggleSidebar}
            className="sm:hidden mr-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md transition-all duration-300 ease-in-out"
          >
            <Menu size={24} />
          </button> */}
          <a href="/">
            <h1 className="text-2xl font-bold text-indigo-700">BlogHub</h1>
          </a>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <Input
            className="rounded-full shadow-lg hover:shadow-purple-300 transition-all ease-in-out duration-500"
            placeholder="Search "
            onChange={(e)=>{setSearchTerm(e.target.value); handleSearch()}}
          />
          <Search className="z-2 text-purple-500"/>
        </div>
        <nav>
          <ul className="flex space-x-6 items-center">
            {user?.role === "admin" ? (
              <li>
                <button
                  className="border-b-2 border-purple-200 hover:border-purple-500 transform ease-in-out duration-700 "
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </button>
              </li>
            ) : null}
            {user?.role !== "reader" ? (
              <li>
                <button
                  className="border-b-2 border-purple-200 hover:border-purple-500 transform ease-in-out duration-700 "
                  onClick={() => navigate("/create")}
                >
                  Create Post
                </button>
              </li>
            ) : null}
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
                  className="text-gray-600 px-4 py-2 font-bold text-center rounded-full 
                    border-2 border-gray-300 hover:border-purple-600
                    hover:bg-purple-600 hover:text-white 
                    transform transition-all duration-300 ease-in-out 
                    shadow-md hover:shadow-lg active:scale-90"
                >
                  Login
                </a>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
