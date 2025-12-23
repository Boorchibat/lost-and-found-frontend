import { ReportCard } from "../report-card/ReportCard";

type ReportLayoutProps = {
  title: string;
  isFound: "Found" | "In progress";
};

export const ReportLayout = ({ title, isFound }: ReportLayoutProps) => {
  return (
    <div className="w-full h-auto flex flex-col items-center bg-gradient-to-r from-yellow-500 to-blue-400">
      <h1 className="text-4xl lg:text-[50px] font-bold mt-[30px]">
        {title}
      </h1>
      <ReportCard isFound={isFound} />
    </div>
  );
};

