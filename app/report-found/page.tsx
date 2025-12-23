"use client";

import { ReportLayout } from "../components/report-page-layout/ReportLayout";
import { useUser } from "../context/UserContext";

const Page = () => {
  const { user, loading } = useUser();

  if (loading) return null;
  if (!user) return null;

  return (
    <ReportLayout
      title="Report a Found Item"
      isFound="Found"
    />
  );
};

export default Page;
