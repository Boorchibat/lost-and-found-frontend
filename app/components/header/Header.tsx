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
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { getSingleUser } from "@/lib/auth/getUser";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";

export const Header = () => {
  const router = useRouter();
  const { user, token, logout } = useUser();

  const [userLoading, setUserLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  const handleSignIn = () => router.push("/login");

  useEffect(() => {
    if (!user?._id) {
      setUserLoading(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const data = await getSingleUser(user._id);
        setUserData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, [token, user?._id]);

  const isAdmin = userData?.role === "admin";

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Lost", href: "/lost" },
    { label: "Found", href: "/found" },
     { label: "Report Found", href: "/report-lost" },
      { label: "Report Lost", href: "/report-found" },
    ...(user ? [{ label: "Search", href: "/search" }] : []),
  ];

  return (
    <header className="w-full bg-gradient-to-r from-blue-300 to-yellow-300 shadow-sm h-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-full">
          <Logo />
        </div>

        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant="ghost" className="text-sm hover:bg-white hover:text-black px-3 py-1">
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          {userLoading ? (
            <CircularProgress size={20} />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-10 h-10 p-0 rounded-full overflow-hidden bg-white shadow-sm">
                  {userData?.profileImage?.url ? (
                    <Image
                      src={userData.profileImage.url}
                      width={40}
                      height={40}
                      alt="Profile"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white font-bold text-sm">
                      {userData?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" className="w-40">
                <DropdownMenuItem>
                  <Link href={`/account-info/${user._id}`} className="block w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem>
                    <Link href={`/admin/${user._id}`} className="block w-full">
                      Admin
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Button
                    onClick={logout}
                    className="w-full justify-center bg-red-500 hover:bg-red-600 text-white"
                  >
                    Sign Out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={handleSignIn}
              className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1"
            >
              Sign In
            </Button>
          )}
        </div>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-gray-500 w-10 h-10">☰</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="w-48">
              {navLinks.map((link) => (
                <DropdownMenuItem key={link.href}>
                  <Link href={link.href} className="block w-full">
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              {user && (
                <>
                  <DropdownMenuItem>
                    <Link href={`/account-info/${user._id}`} className="block w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem>
                      <Link href={`/admin/${user._id}`} className="block w-full">
                        Admin
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Button
                      onClick={logout}
                      className="w-full justify-center bg-red-500 hover:bg-red-600 text-white"
                    >
                      Sign Out
                    </Button>
                  </DropdownMenuItem>
                </>
              )}
              {!user && (
                <DropdownMenuItem>
                  <Button
                    onClick={handleSignIn}
                    className="w-full justify-center bg-green-500 hover:bg-green-600 text-white"
                  >
                    Sign In
                  </Button>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
