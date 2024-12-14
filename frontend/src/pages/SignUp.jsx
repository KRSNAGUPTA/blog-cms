import React from "react";
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
import api from "@/api/api";
const SignUp = async() => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  async function onSubmit(event) {
    event.preventDefault();
    toast({
      title: "Creating account...",
    });
    const res = api.get("/")
    console.log(res)
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created successfully",
      });
    }, 3000);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[450px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">
            Sign <span className="text-purple-500">Up</span>
          </CardTitle>
          <CardDescription>
            Create an account to start your journey
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
                Or sign up with
              </span>
            </div>
          </div>

          {/* Name Input */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name" className="text-left text-muted-foreground">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="rounded-lg shadow hover:shadow-inner"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="email" className="text-left text-muted-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="me@blog.com"
              className="rounded-lg shadow hover:shadow-inner"
            />
          </div>

          {/* Username Input */}
          <div className="flex flex-col space-y-2">
            <Label
              htmlFor="username"
              className="text-left text-muted-foreground"
            >
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="johndoe"
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
              className="rounded-lg shadow hover:shadow-inner"
              placeholder="********"
            />
          </div>
        </CardContent>

        <CardFooter className="text-center">
          <span className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")} // Redirect to login
              className="underline font-semibold text-purple-500 hover:text-purple-600"
            >
              Log In
            </button>
          </span>
        </CardFooter>
        <CardFooter>
          <Button className="w-full" onClick={onSubmit}>
            {isLoading && (
              <ArrowBigDownDash className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  );
};

export default SignUp;
