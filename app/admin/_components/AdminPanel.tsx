import React, { useEffect, useState } from "react";
import { ItemPanel } from "./ItemPanel";
import { ItemOrder } from "./ItemOrder";
import { ItemProps } from "@/index";
import { getItems } from "@/lib/getDataFromBackend";

export const AdminPanel = () => {
  const [items, setItems] = useState<ItemProps[]>([]);

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

      {items.map((item) => (
        <ItemPanel key={item._id} data={item} onUpdate={handleRemove} />
      ))}
    </div>
  );
};
