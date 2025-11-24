import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SignupCard = () => {
  return (
    <div className="w-[50%] h-auto flex flex-col p-5 items-center bg-yellow-100 rounded-md">
      <h1 className="font-bold text-[30px] flex justify-center">Log In</h1>
      <div className="flex flex-col  justify-between gap-x-5 w-full mt-[20px] p-5">
        <h1 className="text-[20px]">Name:</h1>
        <Input className="border-gray-500 p-3" />
      </div>
      <div className="flex flex-col  justify-between gap-x-5 w-full  p-5">
        <h1 className="text-[20px]">School Username or email:</h1>
        <Input className="border-gray-500 p-3" />
      </div>
      <div className="flex flex-col  justify-between gap-x-5 w-full  p-5">
        <h1 className="text-[20px]">Phone Number:</h1>
        <Input className="border-gray-500 p-3" />
      </div>
      <div className="flex flex-col  justify-between gap-x-5 w-full  p-5">
        <h1 className="text-[20px]">Username:</h1>
        <Input className="border-gray-500 p-3" />
      </div>
      <div className="flex flex-col  justify-between gap-x-5 w-full p-5">
        <h1 className="text-[20px]">Password:</h1>
        <Input type="password" className="border-gray-500 p-3" />
      </div>
      <div className="flex flex-col  justify-between gap-x-5 w-full p-5">
        <h1 className="text-[20px]">Confirm Password:</h1>
        <Input type="password" className="border-gray-500 p-3" />
      </div>
      <div className="w-full flex justify-around mt-[20px] items-center">
        <Button className="w-[40%]">
          <h1>Sign in</h1>
        </Button>
        <Button className="w-[40%] bg-white text-black">
          <h1>Sign up</h1>
        </Button>
      </div>
      <a>
        <h1 className="underline mt-[30px]">Forgot password?</h1>
      </a>
    </div>
  );
};
