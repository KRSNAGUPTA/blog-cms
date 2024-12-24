import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import api from "@/api/api.js";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateInput = (value, fieldName) => {
    if (!value) {
      toast({
        title: `${fieldName} is required`,
        description: `Please enter a valid ${fieldName}.`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !validateInput(fullName, "Full Name") ||
      !validateInput(email, "Email") ||
      !validateInput(username, "Username") ||
      !validateInput(password, "Password")
    ) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/api/auth/signup", {
        name: fullName,
        email,
        password,
        username,
      });

      toast({
        title: "Success",
        description: "Account created successfully. Redirecting to login...",
        variant: "success",
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            Sign <span className="text-purple-500">Up</span>
          </CardTitle>
          <CardDescription>Create an account to start your journey</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            <Button variant="outline" className="w-full">
              <GoalIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2">Or sign up with</span>
              </div>
            </div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
            />
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="me@example.com"
            />
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johndoe"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={onSubmit} disabled={isLoading} className="w-full">
            {isLoading ? (
              <ArrowBigDownDash className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </CardFooter>
        <CardFooter>
          <span>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="underline text-purple-500"
            >
              Log In
            </button>
          </span>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  );
};

export default SignUp;
