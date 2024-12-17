import React, { useState, useContext } from "react";
import { Editor } from "@toast-ui/react-editor";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "../hooks/use-toast";
import Header from "@/components/Header"; // Assuming Header already has the logo and navigation

const CreatePostPage = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const editorRef = React.useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = editorRef.current.getInstance().getMarkdown();
    const newPost = {
      title,
      content,
      author: user._id,
      authorUsername: user.username,
      tags: tags.split(","),
    };

    try {
      toast({
        message: "Creating Post...",
      });
      // Simulate post submission
      console.log("Post created", newPost);
      navigate("/posts"); // Redirect to posts page
    } catch (error) {
      toast({
        title: error?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-50">
      <div className="container mx-auto">
        {/* Header Component */}
        <Header />

        <header className="text-center my-10">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Create a New Blog Post
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Share your thoughts and ideas with the world!
          </p>
        </header>

        {/* Toaster Notification */}
        <Toaster />

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-12">
          {/* Post Title */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Post Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Content Editor */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Content
            </label>
            <Editor
              initialValue="Write your content here..."
              previewStyle="vertical"
              height="400px"
              initialEditType="markdown"
              useCommandShortcut={true}
              ref={editorRef} // Use the ref to access the editor instance
            />
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="e.g. React, JavaScript, Web Development"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-8 rounded-lg font-medium transition-transform duration-300 hover:scale-105 hover:bg-blue-600"
            >
              Publish Post
            </button>
          </div>
        </form>

        {/* Footer Section */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600">
            Have questions? Reach out to us for support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
    