import { ItemProps } from "@/index";
import { update } from "../getDataFromBackend";

export const UpdateItem = (
  payload: Partial<ItemProps>,
  itemId: string,
  token: string
): Promise<ItemProps> => {
  return update<ItemProps, Partial<ItemProps>>(`/item/${itemId}`, payload, token);
};
