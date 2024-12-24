import React, { useContext, useEffect, useState } from "react";
import Header from "@/components/Header";
import { AuthContext } from "@/context/AuthContext";
import api from "@/api/api";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "../hooks/use-toast";
import {
  Search,
  Users,
  FileText,
  UserPlus,
  Loader2,
  LucideTrash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatDate from "@/utils/FormatData";
import LoadingComponent from "@/components/Loading";

const Loading = () => {
  return <LoadingComponent />;
};

const StatsSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-10 w-1/3" />
  </div>
);

const TableRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-8 w-8 rounded-full" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-24" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-32" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-6 w-16" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-40" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-12" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-24" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-24" />
    </TableCell>
  </TableRow>
);

const RequestRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-4 w-24" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-40" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-24" />
    </TableCell>
    <TableCell>
      <div className="flex gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    </TableCell>
  </TableRow>
);

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [bloggerReq, setBloggerReq] = useState([]);
  const [username, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState({
    websiteData: true,
    userSearch: false,
    roleUpdate: false,
    bloggerRequests: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchWebsiteData();
    fetchBloggerRequests();
  }, []);

  const fetchWebsiteData = async () => {
    try {
      const response = await api.get("/api/admin/webstatus");
      setAllPosts(response.data.websiteStats.postList);
      setAllUsers(response.data.websiteStats.userList);
    } catch (error) {
      toast({
        title: "Error fetching website data",
        description: error.response?.data?.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, websiteData: false }));
    }
  };

  const handleBloggerAccept = async (username) => {
    try {
      const data = { username };
      const res = await api.post("/api/admin/upgrade-accept", data);
      if (res) {
        toast({
          title: "Role changed to editor",
        });
      }
      fetchBloggerRequests();
      fetchWebsiteData();
    } catch (error) {
      toast({
        title: "Failed to Accept",
        description: error.response?.data?.message || "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleBloggerReject = async (username) => {
    try {
      const data = { username };
      const res = await api.post("/api/admin/upgrade-reject", data);
      if (res.status == "200") {
        toast({
          title: "Request rejected successfully",
        });
      }
      fetchWebsiteData();
      fetchBloggerRequests();
    } catch (error) {
      toast({
        title: "Failed to Reject",
        description: error.response?.data?.message || "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleRoleChange = async () => {
    if (!username.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter a username",
        variant: "destructive",
      });
      return;
    }

    setIsLoading((prev) => ({ ...prev, userSearch: true }));
    try {
      const res = await api.get(`/api/user/u/${username.trim()}`);
      if (res.status === 200 && res.data.user) {
        setUserData(res.data.user);
        setRole(res.data.user.role);
      }
    } catch (error) {
      toast({
        title: "User Not Found",
        description: `No user found with username: ${username}`,
        variant: "destructive",
      });
      setUserData(null);
      setRole("");
    } finally {
      setIsLoading((prev) => ({ ...prev, userSearch: false }));
    }
  };

  const roleChange = async () => {
    if (!role || !username || !userData) {
      toast({
        title: "Invalid Operation",
        description: "Please select a role and ensure user is valid",
        variant: "destructive",
      });
      return;
    }

    if (role === userData.role) {
      toast({
        title: "No Change Required",
        description: "User already has this role",
      });
      return;
    }

    setIsLoading((prev) => ({ ...prev, roleUpdate: true }));
    try {
      const res = await api.patch("/api/admin/updaterole", { username, role });
      if (res.status === 200) {
        toast({
          title: "Success",
          description: `Updated ${username}'s role to ${role}`,
        });
        setUserData({ ...userData, role });
        fetchWebsiteData();
      }
    } catch (error) {
      toast({
        title: "Failed to Update Role",
        description: error.response?.data?.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, roleUpdate: false }));
    }
  };

  const fetchBloggerRequests = async () => {
    try {
      const res = await api.get("/api/admin/request");
      setBloggerReq(res.data.requests || []);
    } catch (error) {
      toast({
        title: "Error fetching requests",
        description: "Failed to load blogger requests",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, bloggerRequests: false }));
    }
  };
  const handleDeleteUser = async (userName) => {
    try {
      if (!userName) {
        return toast({
          title: "User not found",
        });
      }
      if (userName == user.username) {
        return toast({
          title: "You can't delete yourself!",
          variant: "destructive",
        });
      }
      toast({
        title: "Deleting user",
        description: `Deleting user ${userName}`,
      });
      const res = await api.delete("/api/admin/delete-user", {
        data: { username: userName },
      });
      if (res.status == 200) {
        toast({
          title: `User deleted!`,
          description: `${userName} deleted successfully`,
        });
      }
      fetchWebsiteData();
    } catch (error) {
      toast({
        title: "Error deleting user",
        description: `Failed to delete the ${userName}`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-50">
        <Header />
        <Toaster />
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <section className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Welcome back,{" "}
                <span className="text-purple-600 font-semibold">
                  {user?.username}
                </span>
              </p>
              <Button
                onClick={() => {
                  fetchWebsiteData();
                }}
                variant="outline"
                className="mt-4 rounded-full shadow-lg hover:shadow-inner hover:bg-purple-500 hover:text-white active:scale-75 transition-all duration-500"
              >
                Refresh
              </Button>
            </section>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading.websiteData ? (
                    <StatsSkeleton />
                  ) : (
                    <>
                      <div className="text-3xl font-bold">
                        {allUsers.length}
                      </div>
                      <p className="text-sm text-gray-500">
                        Total registered users
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Posts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading.websiteData ? (
                    <StatsSkeleton />
                  ) : (
                    <>
                      <div className="text-3xl font-bold">
                        {allPosts.length}
                      </div>
                      <p className="text-sm text-gray-500">
                        Total published posts
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading.bloggerRequests ? (
                    <StatsSkeleton />
                  ) : (
                    <>
                      <div className="text-3xl font-bold">
                        {bloggerReq.length}
                      </div>
                      <p className="text-sm text-gray-500">
                        Pending blogger requests
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Manage User Roles</CardTitle>
                <CardDescription>
                  Search for users and modify their roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter username to search"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        onClick={handleRoleChange}
                        disabled={isLoading.userSearch}
                      >
                        {isLoading.userSearch ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {userData && (
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          Current Role:{" "}
                          <span className="font-semibold">{userData.role}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Email: {userData.email}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>New Role</Label>
                        <Select value={role} onValueChange={setRole}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select new role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="reader">Reader</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        onClick={roleChange}
                        className="w-full"
                        disabled={isLoading.roleUpdate}
                      >
                        {isLoading.roleUpdate ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Update Role"
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blogger Requests</CardTitle>
                <CardDescription>
                  Pending requests for blogger roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading.bloggerRequests ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[1, 2, 3].map((_, index) => (
                        <RequestRowSkeleton key={index} />
                      ))}
                    </TableBody>
                  </Table>
                ) : bloggerReq.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bloggerReq.map((request, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            <Button
                              variant="link"
                              onClick={() => navigate(`/u/${request.username}`)}
                            >
                              {request.username}
                            </Button>
                          </TableCell>
                          <TableCell>{request.email}</TableCell>
                          <TableCell>{formatDate(request.createdAt)}</TableCell>
                          <TableCell>
                            <Button
                              className="rounded-full mx-2"
                              onClick={() =>
                                handleBloggerAccept(request.username)
                              }
                            >
                              Accept
                            </Button>
                            <Button
                              variant="outline"
                              className="rounded-full mx-2"
                              onClick={() =>
                                handleBloggerReject(request.username)
                              }
                            >
                              Reject
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    No pending requests
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>
                  Complete list of registered users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Avatar</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Posts</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead> </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading.websiteData
                        ? // Show 5 skeleton rows while loading
                          [...Array(5)].map((_, index) => (
                            <TableRowSkeleton key={index} />
                          ))
                        : allUsers.map((user, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <img
                                  src={user.avatar}
                                  alt="avatar"
                                  className="h-8 w-8 rounded-full"
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="link"
                                  onClick={() =>
                                    navigate(`/u/${user.username}`)
                                  }
                                >
                                  {user.username}
                                </Button>
                              </TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    user.role === "admin"
                                      ? "bg-purple-100 text-purple-800"
                                      : user.role === "editor"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {user.role}
                                </span>
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.totalPosts}</TableCell>
                              <TableCell>
                                {formatDate(user.createdAt)}
                              </TableCell>
                              <TableCell>
                                {formatDate(user.lastLogin)}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    handleDeleteUser(user.username)
                                  }
                                  className="hover:bg-red-100"
                                >
                                  <LucideTrash2 className=" text-red-400 hover:text-red-700" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminDashboard;
