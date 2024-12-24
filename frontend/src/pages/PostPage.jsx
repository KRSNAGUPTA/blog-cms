import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/api";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "../hooks/use-toast";
import Header from "@/components/Header";
import { ForwardIcon, Menu, Share, Trash2Icon, User2Icon } from "lucide-react";
import LoadingComponent from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BlogPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/api/posts/${slug}`);
        if (res.status === 200) {
          setPost(res.data.post);
        }
      } catch (error) {
        toast({
          title: "Failed to load post",
          description:
            error?.message || "Something went wrong while fetching the post.",
          variant: "destructive",
        });
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <span className="text-xl text-gray-500">Post not found</span>
      </div>
    );
  }

  const handleComments = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!newComment.trim()) {
      toast({
        title: "Enter a comment",
      });
      return;
    }

    try {
      const res = await api.post(`/api/posts/${slug}/comment`, {
        content: newComment,
      });
      if (res.status === 201) {
        toast({ title: "Comment added!" });
        setPost((prevPost) => ({
          ...prevPost,
          comments: [
            ...prevPost.comments,
            {
              username: user.username, // Add username here
              comment: newComment,
            },
          ],
        }));
        setNewComment("");
      }
    } catch (error) {
      toast({
        title: "Failed to comment",
        description: error?.message || "Something went wrong while commenting.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <Toaster />
        <article className="text-center">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-gray-900">
              {post.title}
            </h1>
            {/* Popover for quick actions */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="p-2">
                  <Menu className="w-6 h-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <ul className="space-y-2">
                  <li>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                      onClick={() => toast({ title: "Share feature coming soon!" })}
                    >
                      <Share className="w-4 h-4 text-gray-600" />
                      <span>Share</span>
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                      onClick={() => toast({ title: "Report feature coming soon!" })}
                    >
                      <Trash2Icon className="w-4 h-4 text-red-600" />
                      <span>Report</span>
                    </Button>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex justify-center items-center mt-4">
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
        <section className="prose mx-auto mt-10">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </section>
        <section className="mt-10">
          <h3 className="text-lg font-semibold text-gray-800">Comments</h3>
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            {post.comments && post.comments.length > 0 ? (
              <ul className="space-y-4">
                {post.comments.map((comment) => (
                  <li
                    key={comment._id}
                    className="border-b pb-2 text-gray-600 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center space-x-0">
                      <User2Icon className="w-4 h-4 text-gray-500" />
                      <Button
                        variant="link"
                        className="p-2"
                        onClick={() => navigate(`/u/${comment.username}`)}
                      >
                        {comment.username}
                      </Button>
                    </div>
                    <div
                      className="text-gray-600 ml-6"
                      dangerouslySetInnerHTML={{ __html: comment.comment }}
                    ></div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Be the first to comment.</p>
            )}
            <div className="flex items-center mt-4 space-x-2">
              <Input
                placeholder="Add a comment"
                aria-label="Comment input"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                aria-label="Submit comment"
                className="rounded-full hover:text-purple-700 hover:bg-purple-100"
                variant="outline"
                onClick={handleComments}
              >
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
  