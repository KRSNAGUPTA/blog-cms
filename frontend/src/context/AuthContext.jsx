import React, { createContext, useState, useEffect } from "react";
import api from "@/api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/api/user/getuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const userData = response.data;
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false once done
        });
    } else {
      setLoading(false); // If no token, set loading to false
    }
  }, []);

  const login = async (token) => {
    try {
      localStorage.setItem("token", token);
      const response = await api.get("/api/user/getuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
