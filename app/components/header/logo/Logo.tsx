import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 justify-center  sm:justify-start">
      <div className="w-12 sm:w-16 max-w-[64px] flex justify-center items-center">
        <Image
          src="/lost.svg"
          alt="Lost and Found logo"
          width={64}
          height={64}
          className="w-full h-auto"
          priority
        />
      </div>

      <h1 className="hidden sm:block text-sm sm:text-3xl font-bold text-black whitespace-nowrap">
        Lost and Found
      </h1>
    </div>
  );
};
