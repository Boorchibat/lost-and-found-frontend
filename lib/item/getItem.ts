import { getItem } from "../getDataFromBackend";

export const getItemz = <T>(userId: string, token: string) => {
  return getItem<T>(`/item/${userId}`, token);
};
