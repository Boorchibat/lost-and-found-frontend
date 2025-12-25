import { getItems } from "../getDataFromBackend";

export const getItemz = <T>(userId: string, token: string) => {
  return getItems<T>(`/item/user/${userId}`, token);
};
