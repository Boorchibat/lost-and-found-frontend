import { HeaderButton } from "./buttons/HeaderButton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const HeaderInfo = () => {
   const router = useRouter();

  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
    router.refresh(); 
  };

  return (
    <div className="w-full bg-red-500 h-full flex items-center justify-evenly">
      <div className="flex w-[80%] justify-evenly">
        <a href="/">
          <HeaderButton label="Home" />
        </a>
        <a href="/lost">
          <HeaderButton label="Lost" />
        </a>
        <a href="/report-lost">
          <HeaderButton label="Report Lost" />
        </a>
        <a href="/found">
          <HeaderButton label="Found" />
        </a>
        <a href="/report-found">
          <HeaderButton label="Report Found" />
        </a>
        <a href="/account-info">
          <HeaderButton label="Profile" />
        </a>
        <a href="/search">
          <HeaderButton label="Search" />
        </a>
      </div>
      <div className=" flex w-[20%] ml-[40px]">
        {isLoggedIn ? (
          <Button
            onClick={handleSignOut}
            className="bg-gray-500 w-[70%] flex justify-center"
          >
            Sign Ous
          </Button>
        ) : (
          <Button
            className="bg-green-500 w-[70%] flex justify-center"
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};
4;
