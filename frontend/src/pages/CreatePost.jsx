import React, { useState, useContext } from "react";
import { Editor } from "@toast-ui/react-editor";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "../hooks/use-toast";
import Header from "@/components/Header";
import api from "@/api/api";
import { ToastAction } from "@/components/ui/toast";

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
      status: "publish",
    };

    try {
      toast({
        message: "Creating Post...",
      });
      const res = await api.post("/api/posts", newPost);
      if (res.status === 201) {
        toast({
          title: "Post created successfully",
        });
        console.log(res.data);
        navigate(`/post/${res.data.post.slug}`);
      }
      console.log(`Got Response ${res}`);
    } catch (error) {
      if (error.status === 403) {
        toast({
          title: "Reader can't post",
          description: "Change your role through Profile",
          variant: "destructive",
          action: (
            <ToastAction
              altText="Try again"
              onClick={() => navigate("/profile")}
            >
              Profile
            </ToastAction>
          ),
        });
        return;
      }
      toast({
        title: error?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6  py-12 relative">
        <div className="text-center mt-10 z-10 relative">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Create Your New Blog Post
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Share your thoughts and ideas with the world!
          </p>
        </div>

        {/* Toast Notification */}
        <Toaster />

        {/* Blog Post Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-12 z-10 relative">
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
              initialValue="Write here...."
              previewStyle="vertical"
              height="400px"
              initialEditType="markdown"
              useCommandShortcut={true}
              ref={editorRef}
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
              className="w-full p-3 border border-gray-300 rounded-lg active:shadow-lg"
              placeholder="#Blog #Content"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-400 text-white py-3 px-8 rounded-full font-medium transition-transform ease-in-out duration-300 active:scale-90"
            >
              Publish Post
            </button>
          </div>
        </form>

        {/* Footer Section */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 pb-4">
            Have questions? Reach out to us for{" "}
            <a href="/support" className="text-purple-500">
              Customer Support
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
};

export default CreatePostPage;
