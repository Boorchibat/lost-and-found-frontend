"use client";

import { Logo } from "./logo/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Header = () => {
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Lost", href: "/lost" },
    { label: "Report Lost", href: "/report-lost" },
    { label: "Found", href: "/found" },
    { label: "Report Found", href: "/report-found" },
    { label: "Profile", href: "/account-info" },
    { label: "Search", href: "/search" },
  ];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  return (
    <header className="w-full bg-gradient-to-r from-blue-300 to-yellow-300 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[80px] px-4 sm:px-6 lg:px-8">
        <div className="w-[50%] flex justify-center md:justify-start">
          <Logo />
        </div>
        <nav className="hidden md:flex items-center gap-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="inline-block">
              <Button variant="ghost">{item.label}</Button>
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex ml-[30px]">
          {isLoggedIn ? (
            <Button
              onClick={handleSignOut}
              className="bg-gray-500 w-[70%] flex justify-center"
            >
              Sign Out
            </Button>
          ) : (
            <Button
              onClick={handleSignIn}
              className="bg-green-500 w-[70%] flex justify-center"
            >
              Sign In
            </Button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-gray-500">Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="bottom"
              className="w-40
             animate-in fade-in-0 slide-in-from-top-2
             animate-out fade-out-0 slide-out-to-top-2
             duration-300"
            >
              {menuItems.map((item) => (
                <DropdownMenuItem key={item.href}>
                  <Link href={item.href} className="w-full block">
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem>
                {isLoggedIn ? (
                  <Button
                    onClick={handleSignOut}
                    className="bg-gray-500 w-[70%] flex justify-center"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    onClick={handleSignIn}
                    className="bg-green-500 w-[70%] flex justify-center"
                  >
                    Sign In
                  </Button>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
