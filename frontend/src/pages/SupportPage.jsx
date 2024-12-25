import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { Github, Linkedin, Mail } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function SupportPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-50">
      <Header />
      <Toaster />
      <main className="container mx-auto px-6 py-12">
        <Card>
          <CardTitle>Support</CardTitle>
          <CardDescription>
            The Website is currently in development. Some feature may not work.
          </CardDescription>
          <CardDescription className="flex flex-row">
            Contact on{" "}
            <a href="https://github.com/KRSNAGUPTA" target="_blank">
              <Github />
            </a>
            <a href="https://linkedin.com/in/krishnaagupta" target="_blank">
              <Linkedin />
            </a>
            <a href="mailto:up.krishnagupta@gmail.com">
              <Mail />
            </a>
          </CardDescription>
        </Card>
      </main>
    </div>
  );
}

export default SupportPage;
