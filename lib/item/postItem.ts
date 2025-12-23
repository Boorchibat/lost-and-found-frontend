import axios from "axios";

export const PostItem = async (payload: any) => {
  const token = localStorage.getItem("token");

  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/item/create`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
