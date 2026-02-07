"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HomeCards } from "./home/HomeCards";
import { Info } from "./home/Info";
import { PostedNumber } from "./home/PostedNumber";

const Home = () => {
  return (
    <div className="w-full bg-gradient-to-r from-yellow-500 to-blue-500">
      <section className="flex flex-col md:flex-row justify-center px-4 md:px-16 py-8 md:py-16 gap-8 md:gap-0">
        <div className="flex flex-col w-full md:w-1/2 px-4 sm:px-10 md:px-0 md:ml-[150px] mb-8 md:mb-0 text-center md:text-left">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-16 sm:mt-20 md:mt-[150px] mb-4 md:mb-6">
            Find & Recover with Efficiency
          </h1>
          <p className="text-lg xs:text-xl sm:text-2xl md:text-2xl text-white max-w-full md:max-w-lg mx-auto md:mx-0">
            Experience effortless recovery and relief with Lost and Found
          </p>
        </div>

        <div className="flex flex-col w-full md:w-1/2 justify-center items-center gap-4 sm:gap-6">
          <a href="/lost">
            <Button className="flex items-center justify-center gap-x-3 sm:gap-x-4 px-8 sm:px-10 py-4 sm:py-6 w-[280px] sm:w-48 text-xl xs:text-2xl bg-gradient-to-r from-red-500 to-red-300 hover:scale-105 transition-transform hover:bg-white hover:text-gray-800">
              <span>Lost</span>
              <Image width={40} height={40} src="/lost.svg" alt="Lost" />
            </Button>
          </a>

          <a href="/found">
            <Button className="flex items-center justify-center gap-x-3 sm:gap-x-4 px-8 sm:px-10 py-4 sm:py-6 w-[280px] sm:w-48 text-xl xs:text-2xl bg-gradient-to-r from-green-500 to-green-300 hover:scale-105 transition-transform hover:bg-white hover:text-gray-800">
              <span>Found</span>
              <Image width={40} height={40} src="/found.svg" alt="Found" />
            </Button>
          </a>

          <a href="/search">
            <Button className="flex items-center justify-center gap-x-3 sm:gap-x-4 px-8 sm:px-10 py-4 sm:py-6 w-[280px] sm:w-48 text-xl xs:text-2xl bg-gradient-to-r from-gray-500 to-gray-300 hover:scale-105 transition-transform hover:bg-white hover:text-gray-800">
              <span>Search</span>
              <Image width={40} height={40} src="/search.svg" alt="Search" />
            </Button>
          </a>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="w-full px-4 md:px-16 py-8 md:py-16 flex justify-center"
      >
        <PostedNumber />
      </motion.section>

<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: true, amount: 0.05 }} 
  className="w-full px-4 md:px-16 py-8 md:py-12 flex justify-center overflow-visible"
>
  <HomeCards />
</motion.section>


      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="w-full px-4 md:px-16 py-8 md:py-12 flex justify-center overflow-visible"
      >
        <Info />
      </motion.section>
    </div>
  );
};

export default Home;
