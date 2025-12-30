"use client";
import { ReportLayout } from "../components/report-page-layout/ReportLayout";
import { useUser } from "../context/UserContext";

const Spinner = () => (
  <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
);

const Page = () => {
  const { loading } = useUser();

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-yellow-500 to-blue-400">
        <Spinner />
      </div>
    );
  }

  return (
    <ReportLayout
      title="Report a Found Item"
      isFound="Found"
    />
  );
};

export default Page;
    

