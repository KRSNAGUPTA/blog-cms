import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "../context/AuthContext.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowBigDownDash, GoalIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useContext(AuthContext); 
  const onSubmit = async (event) => {
    event.preventDefault();

    if (!usernameOrEmail || !password) {
      toast({
        title: "Missing Fields",
        description: "Please provide your username/email and password.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post("/api/auth/login", {
        username: usernameOrEmail.includes("@") ? undefined : usernameOrEmail,
        email: usernameOrEmail.includes("@") ? usernameOrEmail : undefined,
        password,
      });

      if (response.status === 200) {
        toast({
          title: "Login Successful",
          description: "Redirecting to BlogHub...",
        });
        const { token } = response.data;
        login(token);
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[450px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">
            Log <span className="text-purple-500">In</span>
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          {/* Google Login Button */}
          <div className="grid grid-cols-1 gap-6">
            <Button variant="outline" className="w-full">
              <GoalIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Username/Email Input */}
          <div className="flex flex-col space-y-2">
            <Label
              htmlFor="usernameOrEmail"
              className="text-left text-muted-foreground"
            >
              Email or Username
            </Label>
            <Input
              id="usernameOrEmail"
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="Enter your email or username"
              className="rounded-lg shadow hover:shadow-inner"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col space-y-2">
            <Label
              htmlFor="password"
              className="text-left text-muted-foreground"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="rounded-lg shadow hover:shadow-inner"
            />
          </div>

          <div className="text-muted-foreground text-sm">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="underline font-semibold text-purple-600"
            >
              Sign Up
            </a>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" onClick={onSubmit} disabled={isLoading}>
            {isLoading && (
              <ArrowBigDownDash className="mr-2 h-4 w-4 animate-spin" />
            )}
            Log In
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  );
};

export default Login;
