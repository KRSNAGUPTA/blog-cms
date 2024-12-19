import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import ProfilePage from "./pages/Profile";
import ProtectedRoute from "./utils/ProtectedRoute";
import CreateBlogPage from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import AdminRoute from "./utils/AdminRoutes";
import AdminDashboard from "./pages/AdminDashboard";
import UserPublicAdminProfile from "./pages/UserPublicAdminProfile";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/post/:slug" element={<PostPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/u/:username"
              element={
                  <UserPublicAdminProfile />
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateBlogPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
