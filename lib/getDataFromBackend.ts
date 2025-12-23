import { axiosInstance } from "../lib/axios-instance";

export const getData = async <T>(endpoint: string, payload?: any): Promise<T> => {
  const res = await fetch(endpoint, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  if (!res.ok) throw new Error("Request failed");

  return res.json() as Promise<T>;
};

export const postData = async <T, D>(
  endpoint: string,
  payload: D
): Promise<T> => {
  const { data } = await axiosInstance.post<T>(endpoint, payload);
  return data;
};

export const putData = async <T, D>(
  endpoint: string,
  payload: D
): Promise<T> => {
  const { data } = await axiosInstance.put<T>(endpoint, payload);
  return data;
};

export const deleteData = async <T>(endpoint: string): Promise<T> => {
  const { data } = await axiosInstance.delete<T>(endpoint);
  return data;
};
