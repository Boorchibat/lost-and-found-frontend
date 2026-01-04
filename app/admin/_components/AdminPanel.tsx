import { useEffect, useState } from "react";
import { ItemPanel } from "./ItemPanel";
import { ItemOrder } from "./ItemOrder";
import { ItemProps } from "@/index";
import { getItems } from "@/lib/getDataFromBackend";
import { useUser } from "@/app/context/UserContext";

export const AdminPanel = () => {
  const [items, setItems] = useState<ItemProps[]>([]);
  const {loading} = useUser()

  useEffect(() => {
    getItems<ItemProps[]>("/item")
      .then((data) => {
        setItems(data.filter((item) => item.status === "pending"));
      })
      .catch(console.error);
  }, []);

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="w-[70%] h-auto bg-white rounded-md flex flex-col">
      <ItemOrder />

        {loading ? (
        <p className="text-center py-4">Loading items...</p>
      ) : items.length === 0 ? (
        <p className="text-center py-4 text-gray-500 font-semibold">
          No new items need approval
        </p>
      ) : (
        items.map((item) => (
          <ItemPanel key={item._id} data={item} onUpdate={handleRemove} />
        ))
      )}
    </div>
  );
};
