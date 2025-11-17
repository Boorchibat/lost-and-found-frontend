import { Logo } from "./logo/Logo";
import { HeaderInfo } from "./right/HeaderInfo";

export const Header = () => {
  return (
    <div className="flex bg-gradient-to-r from-blue-300 to-yellow-300 justify-center gap-x-10 w-full h-[80px]">
      <div className="w-[40%]">
        <Logo />
      </div>
      <div className="w-[60%]">
        <HeaderInfo />
      </div>
    </div>
  );
};
