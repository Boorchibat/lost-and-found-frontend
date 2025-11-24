import { Button } from "@/components/ui/button";
import { Searchbar } from "./components/search/Searchbar";
import { ReportCard } from "./components/card/ReportCard";

type ReportProps = {
  title: String;
};

export const ReportPage = (props: ReportProps) => {
  const title = props.title;
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="h-[50%] w-full flex flex-col justify-center items-center">
        <h1 className="text-[80px] font-bold mb-[30px] flex justify-center">
          {title}
        </h1>
        <div className="w-full max-w-[900px] flex items-center justify-between px-4">
          <div className="flex justify-center w-full">
            <Searchbar />
          </div>
          <Button className="ml-4 h-[50px] w-[150px]">Report</Button>
        </div>
      </div>
      <div className="h-[50%] flex  gap-x-5">
        <ReportCard />
        <ReportCard />
        <ReportCard />
        <ReportCard />
      </div>
      <div className="flex justify-end w-full">
        <a href="/lost-list">
          <p className="flex justify-end mr-[122px]">View More...</p>
        </a>
      </div>
    </div>
  );
};
