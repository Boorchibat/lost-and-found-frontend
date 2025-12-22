import { AdminPanel } from "./_components/AdminPanel";

const page = () => {
  return (
    <div className="bg-gradient-to-b from-yellow-500 to-blue-400 h-auto  min-h-screen w-full flex flex-col  items-center">
      <div>
        <h1 className="font-bold text-[40px]">Admin panel</h1>
      </div>
      <div className="w-full flex flex-col justify-center items-center mb-[30px] rounded-md mt-[30px]">
        <AdminPanel />
      </div>
    </div>
  );
};
export default page;
