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
  import {
    Flag,
    FlagIcon,
    ForwardIcon,
    Menu,
    Share,
    Trash2,
    User2Icon,
    UserCircleIcon,
  } from "lucide-react";
  import { FeturesComingToast } from "@/utils/FeturesComingToast";
  import { Card, CardContent, CardTitle } from "@/components/ui/card";

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
        showToast(
          "Failed to load post",
          error.message || "An error occurred.",
          "destructive"
        );
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
        const res = await api.post(`/api/posts/${slug}/comment`, {
          content: newComment,
        });
        if (res.status === 201) {
          showToast("Comment added!");
          setPost((prev) => ({
            ...prev,
            comments: [
              ...prev.comments,
              { username: user.username, comment: newComment },
            ],
          }));
          setNewComment("");
          fetchPost();
        }
      } catch (error) {
        showToast(
          "Failed to add comment",
          error.message || "An error occurred.",
          "destructive"
        );
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
        showToast(
          "Failed to delete comment",
          error.message || "An error occurred.",
          "destructive"
        );
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

    const handleShare = async (title, slug ) => {
      const shareUrl = `${window.location.origin}/post/${slug}`; 
      try {
        if (navigator.share) {
          await navigator.share({
            title: title,
            text: "Check out this amazing post at BlogHub!",
            url: shareUrl,
          });
          toast({
            title: "Post shared successfully!",
            status: "success",
          });
        } else {
          throw new Error("Share API not supported");
        }
      } catch (error) {
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied to clipboard!",
          description: "You can now share it anywhere.",
          status: "info",
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
              <h1 className="text-4xl mx-auto font-extrabold">{post.title}</h1>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="p-2">
                    <Menu className="w-6 h-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-36 mr-4 rounded-xl p-2">
                  <ul className="space-y-0">
                    <li>
                      <Button
                        onClick={() => handleShare(post.title,post.slug)}
                        variant="ghost"
                        className="flex items-center justify-start w-full space-x-2"
                      >
                        <Share className="w-4 h-4 text-gray-600" />
                        <span>Share</span>
                      </Button>
                    </li>
                    {user?.role == "admin" ||
                    user?.username == post?.authorUsername ? (
                      <li>
                        <Button
                          onClick={FeturesComingToast}
                          variant="ghost"
                          className="flex items-center justify-start w-full space-x-2"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                          <span>Delete</span>
                        </Button>
                      </li>
                    ) : null}
                    <li>
                      <Button
                        onClick={FeturesComingToast}
                        variant="ghost"
                        className="flex items-center justify-start w-full space-x-2"
                      >
                        <FlagIcon className="w-4 h-4 text-red-600" />
                        <span>Report</span>
                      </Button>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center justify-center mt-4">
              <Button
                className="text-purple-500 p-0"
                onClick={() => navigate(`/u/${post.authorUsername}`)}
                variant="link"
              >
                <UserCircleIcon className="w-5 h-5 text-purple-500" />@
                {post.authorUsername}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(post.createdAt).toLocaleDateString()}{" "}
              {post.tags.map((tag) => `${tag ? "#" : ""}${tag}`).join(" ")}
            </p>
          </article>
          <section
            className="prose mx-auto mt-10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {/* <section className="flex justify-center">
            <Card className="mt-10 w-56">
              <CardContent>
                    
              </CardContent>
            </Card>
          </section> */}
          <section className="mt-10 max-w-3xl">
            <h3 className="text-lg font-semibold mb-5">Comments</h3>
            <div className="bg-white p-4 rounded-2xl shadow-md">
              {post.comments?.length > 0 ? (
                <ul className="space-y-4">
                  {post.comments.map((comment) => (
                    <li
                      key={comment._id}
                      className="border-b pb-2 last:border-b-0 last:pb-0"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <UserCircleIcon className="w-4 h-4 text-slate-500" />
                          <Button
                            variant="link"
                            className="text-slate-700 pl-2 "
                            onClick={() => navigate(`/u/${comment.username}`)}
                          >
                            @{comment.username}
                          </Button>
                        </div>

                        <>
                          <Popover>
                            <PopoverTrigger>...</PopoverTrigger>
                            <PopoverContent className="w-32 mr-12 mx-auto p-0 rounded-lg">
                              {comment?.username == user?.username ||
                              user?.role == "admin" ? (
                                <Button
                                  variant="ghost"
                                  className=" w-full flex flex-row items-center hover:bg-red-50 hover:text-red-500 p-0"
                                  onClick={() => handleDeleteComment(comment._id)}
                                >
                                  <Trash2 className="text-red-600 w-4 h-4 mr-2" />{" "}
                                  Delete
                                </Button>
                              ) : null}
                              <Button
                                variant="ghost"
                                className=" w-full flex flex-row items-center hover:bg-red-50 hover:text-red-500 p-0"
                                onClick={FeturesComingToast}
                              >
                                <Flag className="text-red-600 w-4 h-4 mr-2" />{" "}
                                Report
                              </Button>
                            </PopoverContent>
                          </Popover>
                        </>
                      </div>

                      <div
                        className="ml-6 text-gray-600 prose"
                        dangerouslySetInnerHTML={{ __html: comment.comment }}
                      />
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
                  className="rounded-full shadow"
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button
                  className="hover:bg-gray-100"
                  variant="ghost"
                  onClick={handleAddComment}
                >
                  <ForwardIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  };

  export default BlogPage;
