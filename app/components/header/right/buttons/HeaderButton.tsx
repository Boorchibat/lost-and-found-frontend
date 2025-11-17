import { Button } from "@/components/ui/button";

type HeaderButtonProps = {
  label: string;
};

export const HeaderButton = ({label}: HeaderButtonProps) => {
  return (
    <div>
      <Button className="hover:bg-gray-500 hover:border-1 hover:border-black hover:text-white text-black transition bg-transparent">{label}</Button>
    </div>
  );
};
