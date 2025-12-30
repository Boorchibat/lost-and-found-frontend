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
export const postItems = async <T, D>(
  endpoint: string,
  payload: D,
  token: string
): Promise<T> => {
  if (!token) throw new Error("Authentication token is required");

  const { data } = await axiosInstance.post<T>(endpoint, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const update = async <T, D>(
  endpoint: string,
  payload: D,
  token: string
): Promise<T> => {
  if (!token) throw new Error("Authentication token is required");

  const { data } = await axiosInstance.put<T>(endpoint, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const updateItemStatus = async <T, D>(
  endpoint: string,
  token: string
): Promise<T> => {
  if (!token) throw new Error("Authentication token is required");

  const { data } = await axiosInstance.put<T>(
    endpoint,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const getItems = async <T>(
  endpoint: string,
): Promise<T> => {
  const { data } = await axiosInstance.get<T>(endpoint);

  return data;
};

export const getUser = async <T>(
  endpoint: string
): Promise<T> => {
 

  const { data } = await axiosInstance.get<T>(endpoint);

  return data;
};

export const getItem = async <T>(endpoint: string, token: string): Promise<T> => {

  if (!token) throw new Error("Authentication token is required");

  const { data } = await axiosInstance.get<T>(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`, 
      "Content-Type": "application/json",
    },
  });

  return data;
};




export const putData = async <T, D>(
  endpoint: string,
  payload: D
): Promise<T> => {
  const { data } = await axiosInstance.put<T>(endpoint, payload);
  return data;
};

export const Delete = async <T>(
  endpoint: string,
  token: string
): Promise<T> => {
  if (!token) throw new Error("Authentication token is required");

  const { data } = await axiosInstance.delete<T>(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return data;
};
