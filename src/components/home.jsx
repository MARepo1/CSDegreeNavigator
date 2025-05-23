"use client"; // Ensure this is a client component

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Used for navigation
import { Moon, Sun } from "lucide-react"; // Import the icons
import { useTheme } from "next-themes"; // Import the useTheme hook

export default function HomeForm({ children }) {
  const router = useRouter();

  // Theme toggle function
  const { setTheme, theme } = useTheme();

  // Prevent hydration mismatch on SSR
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation bar */}
      <header className="bg-[#6E3061] text-white p-4 shadow-md fixed top-0 left-0 w-full z-[999] dark:bg-[#6E3061]">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left side logo */}
          <div className="flex items-center space-x-4">
            <img src="/headerLogo1.png" className="h-10" />
            <h1 className="text-xl font-bold">CSDegreeNavigator</h1>
          </div>

          {/* Center navigation menu */}
          <nav className="navbar hidden md:flex space-x-6 text-lg">
            <Link href="/" className="hover:text-secondary transition">
              Home
            </Link>
            <Link href="/contact" className="hover:text-secondary transition">
              Contact
            </Link>
            <Link href="/feedback" className="hover:text-secondary transition">
              Feedback
            </Link>
          </nav>

          {/* Right side Login / Sign Up buttons */}
          <div className="flex items-center space-x-4">
            {/* Login Button */}
            <Button className="bg-yellow-500 text-[#6E3061] font-semibold" onClick={() => router.push("/login")}>
              Login
            </Button>
            {/* Sign Up Button */}
            <Button className="bg-yellow-500 text-[#6E3061] font-semibold" onClick={() => router.push("/signup")}>
              Sign Up
            </Button>

            {/* Theme Toggle Button */}
            {mounted && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <section
        className="relative h-[600px] w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/wcu02.jpg')" }}
      >
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center z-10 bg-white/60 px-8 py-6 rounded-xl shadow-lg backdrop-blur-sm">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#6E3061]">
            Welcome to <span className="text-[#6E3061]">CSDegreeNavigator!</span>
          </h1>
          <p className="text-base md:text-lg text-gray-800 leading-relaxed">
            This tool helps WCU CS students visualize their degree progress, plan semesters,
            and stay on track for graduation.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#6E3061] w-full h-10 flex items-center justify-center text-xs text-white fixed bottom-0 left-0 z-50 shadow-md dark:bg-[#6E3061]">
        <p>&copy; {new Date().getFullYear()} CSDegreeNavigator. All rights reserved.</p>
      </footer>
    </div>
  );
}
