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
import { ArrowBigDownDash, GoalIcon, Spline } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate(); 
  async function onSubmit(event) {
    event.preventDefault();
    console.log("Logging in...");

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[450px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">
            Log <span className="text-purple-500">In</span>
          </CardTitle>
          <CardDescription>Details daal ke sign in karlo</CardDescription>
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

          {/* Email Input */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="email" className="text-left text-muted-foreground">
              Email or Username
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="me@blog.com"
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
          <div className="text-muted-foreground text-sm ">
            don't have account ?{" "}
            <a href="/signup" className="underline font-semibold text-purple-600">
              Sign Up
            </a>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" onClick={onSubmit}>
            {isLoading && (
              <ArrowBigDownDash className="mr-2 h-4 w-4 animate-spin" />
            )}
            Log In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
