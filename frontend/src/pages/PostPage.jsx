import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/api";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "../hooks/use-toast";
import Header from "@/components/Header";
import { ToastAction } from "@/components/ui/toast";

const BlogPage = () => {
  const { slug } = useParams(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
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
          description: error?.message || "Something went wrong while fetching the post.",
          variant: "destructive",
        });
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // If loading, show a loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-3xl">Loading...</span>
      </div>
    );
  }

  // If no post is found
  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-xl text-gray-500">Post not found</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <Toaster />

        {/* Blog Title and Metadata */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-800">{post.title}</h1>
          <p className="text-xl text-gray-500 mt-4">{post.authorUsername}</p>
          <p className="text-md text-gray-400 mt-2">
            {new Date(post.createdAt).toLocaleDateString()} · {post.tags.join(", ")}
          </p>
        </div>

        {/* Blog Content */}
        <div className="prose mt-8">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        
      </main>
    </div>
  );
};

export default BlogPage;
