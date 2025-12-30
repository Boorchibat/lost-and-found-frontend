import { getItems } from "../getDataFromBackend";

export const getSingleItem = <T>(itemId: string) => {
  return getItems<T>(`/item/${itemId}`);
};
