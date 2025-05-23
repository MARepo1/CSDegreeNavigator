"use client"; 
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle"; 
import { useTheme } from "next-themes"; 
import { Moon, Sun } from "lucide-react";
import { signIn } from "next-auth/react"; 

export function SignUpForm() {
  const { setTheme, theme } = useTheme(); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [yearStarted, setYearStarted] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !yearStarted) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          yearStarted,  
        }),
      });

      if (res.ok) {
    
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          setError("Error signing in.");
        } else {
          router.push("/");
        }
      } else {
        setError("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen relative ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`} 
    >
      {/* Toggle Button for Theme */}
      <div className="absolute top-4 right-4">
        <Toggle
          aria-label="Toggle theme"
          onClick={handleThemeToggle} 
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-gray-400" />
          )}
        </Toggle>
      </div>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              {/* Full Name Field */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Year Started Input Field */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="yearStarted">Year Started</Label>
                <Input
                  id="yearStarted"
                  type="text"
                  placeholder='e.g., "Fall 2021"'
                  value={yearStarted}
                  onChange={(e) => setYearStarted(e.target.value)} 
                  />
              </div>


              {/* Error Message */}
              {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {error}
                </div>
              )}
            </div>
            <CardFooter className="flex justify-between mt-4">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit">Sign Up</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUpForm;
