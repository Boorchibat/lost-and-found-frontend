export const ItemOrder = () => {
  return (
    <div className="flex bg-gray-500 rounded-t-md border-black border-b">
      <div className="w-[30%] flex items-center p-2 border-r border-black">
        <h1 className="font-bold text-[20px] text-white">Name:</h1>
      </div>
      <div className="w-[30%] flex items-center p-2 border-r border-black">
        <h1 className="font-bold text-[20px] text-white">Item name:</h1>
      </div>
      <div className="w-[10%] flex items-center p-2 border-r border-black">
        <h1 className="font-bold text-[20px] text-white">Item preview</h1>
      </div>
      <div className="w-[30%] flex items-center p-2 justify-center">
        <h1 className="font-bold text-[20px] text-white">Accept or reject</h1>
      </div>
    </div>
  );
};
