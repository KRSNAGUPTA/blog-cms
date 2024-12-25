import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { GitHub, LinkedIn, Mail } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

function SupportPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-50 flex flex-col">
      <Header />
      <Toaster />
      <main className="flex-grow container mx-auto px-6 py-12 flex flex-col items-center justify-center">
        <Card
          className="w-full max-w-3xl shadow-2xl p-8 bg-white rounded-2xl transform transition-all hover:scale-105"
        >
          <CardTitle className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Support Blog<span className="text-purple-500">Hub</span>
          </CardTitle>
          <CardDescription className="text-center text-gray-600 mb-6">
            The website is currently in development. Some features may not work.
          </CardDescription>
          <CardDescription className="flex flex-row justify-center gap-8 text-gray-600 mb-6">
            <a
              href="https://github.com/KRSNAGUPTA"
              target="_blank"
              rel="noopener noreferrer"
              className="transition transform hover:scale-105 hover:text-black"
            >
              <GitHub className="w-8 h-8 text-gray-800 hover:text-black" />
            </a>
            <a
              href="https://linkedin.com/in/krishnaagupta"
              target="_blank"
              rel="noopener noreferrer"
              className="transition transform hover:scale-105 hover:text-blue-600"
            >
              <LinkedIn className="w-8 h-8 text-gray-800 hover:text-blue-600" />
            </a>
            <a
              href="mailto:up.krishnagupta@gmail.com"
              className="transition transform hover:scale-105 hover:text-red-500"
            >
              <Mail className="w-8 h-8 text-gray-800 hover:text-red-500" />
            </a>
          </CardDescription>
          <div className="mt-6 flex justify-center">
            <Button variant="ghost" className="rounded-full border" onClick={() => navigate("/")}>Go Back</Button>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default SupportPage;
