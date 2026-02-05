import Image from "next/image";
import React from "react";

export const Info = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="flex justify-center order-1 lg:order-none">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/robo.jpg"
              alt="Robinson Secondary School"
              width={600}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        <div className=" rounded-2xl bg-white shadow-lg p-6 sm:p-8 md:p-10 space-y-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Robinson Secondary School
            <span className="block text-red-600 text-lg sm:text-xl md:text-2xl mt-2">
              Lost & Found Services
            </span>
          </h2>

          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
            Lost something on campus? Robinson Secondary School’s Lost & Found
            service helps students recover missing items that are found in
            classrooms, hallways, and common areas throughout the school.
          </p>

          <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
            <li className="flex flex-wrap gap-2">
              <span className="font-semibold text-red-600">📍 Location:</span>
              <span>Main Office / Student Services Desk</span>
            </li>
            <li className="flex flex-wrap gap-2">
              <span className="font-semibold text-red-600">🕒 Hours:</span>
              <span>During regular school hours</span>
            </li>
            <li className="flex flex-wrap gap-2">
              <span className="font-semibold text-red-600">🎒 Items:</span>
              <span>
                Clothing, backpacks, water bottles, electronics, and more
              </span>
            </li>
          </ul>

          <p className="text-xs sm:text-sm text-gray-600">
            💡 Tip: Label your belongings with your name to make recovery faster
            and easier.
          </p>
          <a href="/additional-information">
            <p className="underline">More info...</p>
          </a>
        </div>
      </div>
    </section>
  );
};
