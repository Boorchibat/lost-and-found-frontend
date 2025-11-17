import Image from "next/image";

export const Logo = () => {
  return (
    <div className="w-full h-full gap-x-5 flex items-center pl-[100px]">
      <Image src="../lost.svg" alt="image" width={80} height={80} />
      <h1 className="text-black text-[30px] font-bold">Lost and found</h1>
    </div>
  );
};
