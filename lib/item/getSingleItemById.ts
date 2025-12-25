import { getItems } from "../getDataFromBackend";

export const getSingleItem = <T>(itemId: string, token: string) => {
  return getItems<T>(`/item/${itemId}`, token);
};
