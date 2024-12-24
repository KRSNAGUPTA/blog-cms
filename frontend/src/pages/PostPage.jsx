import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/api";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import LoadingComponent from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ForwardIcon, Menu, Share, Trash2, User2Icon } from "lucide-react";

const BlogPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  const showToast = (title, description = "", variant = "default") => {
    toast({ title, description, variant });
  };

  const fetchPost = async () => {
    try {
      const res = await api.get(`/api/posts/${slug}`);
      if (res.status === 200) {
        setPost(res.data.post);
        document.title = res.data.post.title;
      }
    } catch (error) {
      showToast("Failed to load post", error.message || "An error occurred.", "destructive");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const handleAddComment = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!newComment.trim()) {
      showToast("Please enter a comment.");
      return;
    }

    try {
      const res = await api.post(`/api/posts/${slug}/comment`, { content: newComment });
      if (res.status === 201) {
        showToast("Comment added!");
        setPost((prev) => ({
          ...prev,
          comments: [...prev.comments, { username: user.username, comment: newComment }],
        }));
        setNewComment("");
        fetchPost();
      }
    } catch (error) {
      showToast("Failed to add comment", error.message || "An error occurred.", "destructive");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!user || user.role !== "admin") {
      showToast("You are not authorized to delete this comment.");
      return;
    }

    try {
      await api.delete(`/api/posts/${slug}/comment/${commentId}`);
      setPost((prev) => ({
        ...prev,
        comments: prev.comments.filter((comment) => comment._id !== commentId),
      }));
      showToast("Comment deleted!");
    } catch (error) {
      showToast("Failed to delete comment", error.message || "An error occurred.", "destructive");
    }
  };

  if (loading) return <LoadingComponent />;
  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <span className="text-xl text-gray-500">Post not found</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <Toaster />
        <article className="text-center">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-extrabold">{post.title}</h1>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="p-2">
                  <Menu className="w-6 h-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <ul className="space-y-2">
                  <li>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Share className="w-4 h-4 text-gray-600" />
                      <span>Share</span>
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Trash2 className="w-4 h-4 text-red-600" />
                      <span>Report</span>
                    </Button>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center justify-center mt-4">
            <User2Icon className="w-5 h-5 text-purple-500 mr-2" />
            <button
              className="text-purple-500 hover:underline"
              onClick={() => navigate(`/u/${post.authorUsername}`)}
            >
              {post.authorUsername}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {new Date(post.createdAt).toLocaleDateString()} ·{" "}
            {post.tags.map((tag) => `#${tag}`).join(" ")}
          </p>
        </article>
        <section className="prose mx-auto mt-10" dangerouslySetInnerHTML={{ __html: post.content }} />
        <section className="mt-10 max-w-3xl">
          <h3 className="text-lg font-semibold">Comments</h3>
          <div className="bg-white p-4 rounded-lg shadow-md">
            {post.comments?.length > 0 ? (
              <ul className="space-y-4">
                {post.comments.map((comment) => (
                  <li key={comment._id} className="border-b pb-2 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <User2Icon className="w-4 h-4 text-gray-500" />
                        <button
                          className="text-gray-700 hover:underline ml-2"
                          onClick={() => navigate(`/u/${comment.username}`)}
                        >
                          {comment.username}
                        </button>
                      </div>
                      {(user?.username === comment.username || user?.role === "admin") && (
                        <button onClick={() => handleDeleteComment(comment._id)}>
                          <Trash2 className="text-gray-400 w-5 h-5 hover:text-red-500" />
                        </button>
                      )}
                    </div>

                    <div className="ml-6 text-gray-600 prose" dangerouslySetInnerHTML={{ __html: comment.comment }} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Be the first to comment.</p>
            )}
            <div className="flex items-center mt-4 space-x-2">
              <Input
                placeholder="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button variant="outline" onClick={handleAddComment}>
                <ForwardIcon />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPage;
