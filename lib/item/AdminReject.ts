import { ItemProps } from "@/index";
import { updateItemStatus } from "../getDataFromBackend";

export const rejectItem = (itemId: string, token: string): Promise<ItemProps> => {
  return updateItemStatus<ItemProps>(`/item/admin/reject/${itemId}`, token);
};