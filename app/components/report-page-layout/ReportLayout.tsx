import { ReportCard } from "../report-card/ReportCard";

type ReportLayoutProps = {
  title: String;
};

export const ReportLayout = (props: ReportLayoutProps) => {
  const title = props.title;
  return (
    <div className="w-full h-[1000px] flex flex-col items-center bg-gradient-to-r from-yellow-500 to-blue-400">
      <h1 className="text-[50px] font-bold mt-[30px]">{title}</h1>
      <ReportCard />
    </div>
  );
};
