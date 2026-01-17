"use client";

import { useUser } from "@/app/context/UserContext";
import { ReportCard } from "../report-card/ReportCard";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ReportLayoutProps = {
  title: string;
  isFound: "Found" | "In progress";
};

export const ReportLayout = ({ title, isFound }: ReportLayoutProps) => {
  const { token } = useUser();
  const [showAI, setShowAI] = useState(false);
  const aiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile && aiRef.current && !aiRef.current.contains(event.target as Node)) setShowAI(false);
    };

    if (showAI) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAI]);

  return (
    <div className="w-full h-auto flex items-center bg-gradient-to-r from-yellow-500 to-blue-400">
      {token ? (
        <div className="w-full flex justify-center items-center mb-[40px]">
          <div className="w-[90%] flex flex-col items-center">
            <div className="relative w-full flex justify-center">
              <ReportCard title={title} isFound={isFound} />

              <AnimatePresence>
                {showAI && (
                  <motion.div
                    ref={aiRef}
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 20, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute bottom-[100px] h-fit lg:left-250 flex justify-center lg:w-[400px] w-[350px] overflow-hidden z-20"
                  >
                    <iframe
                      src="https://www.playlab.ai/embedded/cmk4owbr001cvj10ugn0zz3hx"
                      className="w-full h-[440px] rounded-xl shadow-xl"
                      allow="clipboard-write"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                onClick={() => setShowAI(prev => !prev)}
                className="absolute lg:bottom-8 lg:right-80 right-5 bottom-7 w-[50px] h-[50px] rounded-full hover:bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold hover:scale-105 transition-transform duration-300 z-30"
              >
                AI
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-yellow-500 to-blue-400 gap-5">
          <h1 className="text-[80px] font-bold text-red-500 mb-[20px]">Sorry</h1>
          <div className="flex w-[50%] justify-center items-center gap-x-10">
            <h1 className="font-bold text-[20px]">Users must log in or Sign up before creating a claim</h1>
            <a href="/login">
              <Button className="bg-red-400 hover:bg-green-400 p-3">Log in here</Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
