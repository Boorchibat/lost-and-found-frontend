
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface SearchbarProps {
  setQuery: (val: string) => void;
}

export const Searchbar = ({ setQuery }: SearchbarProps) => {
  return (
    <div className="relative w-[80%] md:w-full max-w-2xl h-[30px] flex items-center">
      <Input
        onChange={(e) => setQuery(e.target.value)} 
        className="pr-12 p-5 border-1 border-black bg-white"
        placeholder="Search..."
      />
      <Image
        src="../search.svg"
        alt="search"
        width={22}
        height={22}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
      />
    </div>
  );
};
