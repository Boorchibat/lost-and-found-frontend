
import { ItemProps } from "@/index";
import { updateItemStatus } from "../getDataFromBackend";

export const approveItem = (itemId: string, token: string): Promise<ItemProps> => {
  return updateItemStatus<ItemProps, Partial<ItemProps>>(`/item/admin/approve/${itemId}`, token);
};
