import React from "react";
import { Github, LightbulbIcon, Menu, SunIcon, User2Icon } from "lucide-react";
import { AuthContext } from "@/context/AuthContext.jsx";

const Header = ({ toggleSidebar }) => {
  const { user, logout } = React.useContext(AuthContext);
  return (
    <header className="bg-white shadow-md rounded-b-2xl transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="sm:hidden mr-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md transition-all duration-300 ease-in-out"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold text-indigo-700">BlogHub</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://github.com/KRSNAGUPTA/blog-cms"
                target="_blank"
                className="text-gray-600 hover:text-indigo-700 transition-all duration-300 ease-in-out"
              >
                <Github />
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className="text-gray-600 hover:text-indigo-700 transition-all duration-300 ease-in-out"
              >
                <User2Icon />
              </a>
            </li>
            <li>
              {user ? (
                <div>Profile</div>
              ) : (
                <a
                  href="/login"
                  className="text-gray-600 px-4 py-2 font-bold text-center rounded-full 
             border-2 border-gray-300 hover:border-purple-600
             hover:bg-purple-600 hover:text-white 
             transform transition-all duration-300 ease-in-out 
             shadow-md hover:shadow-lg active:scale-80"
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
