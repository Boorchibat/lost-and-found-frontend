import { getItems } from "../getDataFromBackend";

export const getItemz = <T>(userId: string, ) => {
  return getItems<T>(`/item/user/${userId}`);
};
