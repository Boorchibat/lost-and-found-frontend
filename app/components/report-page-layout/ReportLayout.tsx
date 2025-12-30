import { useUser } from "@/app/context/UserContext";
import { ReportCard } from "../report-card/ReportCard";
import { Button } from "@/components/ui/button";

type ReportLayoutProps = {
  title: string;
  isFound: "Found" | "In progress";
};

export const ReportLayout = ({ title, isFound }: ReportLayoutProps) => {
  const { token } = useUser();
  return (
    <div className="w-full h-auto flex flex-col items-center bg-gradient-to-r from-yellow-500 to-blue-400">
      {token ? (
        <div className="w-full h-auto flex flex-col items-center mb-[40px]">
          <h1 className="text-4xl lg:text-[50px] font-bold mt-[30px]">
            {title}
          </h1>
          <ReportCard isFound={isFound} />
        </div>
      ) : (
        <div className="w-full h-screen gap-x-5 flex flex-col items-center justify-center bg-gradient-to-r from-yellow-500 to-blue-400">
          <h1 className="text-[80px] font-bold text-red-500 mb-[20px]">Sorry</h1>
          <div className="flex w-[50%] justify-center items-center gap-x-10">
            <h1 className="font-bold text-[20px]">
              User's must log in or Sign up before creating a claim
            </h1>
            <a href="/login">
              <Button className="bg-red-400 hover:bg-green-400 p-3 ">
                Log in here
              </Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
