import React, { createContext, useState, useEffect, useContext } from "react";
import api from "@/api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserData = async () => {
      try {
        if (token) {
          const response = await api.get("/api/user/getuser", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = response.data;
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        logout(); // Clear invalid token or user data
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
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
      throw error;
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
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
