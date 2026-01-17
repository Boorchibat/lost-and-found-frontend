import { postItems } from "../getDataFromBackend";

export interface ItemPayload {
  itemname: string;
  isFound: "Found" | "In progress";
  User: string;
  mainImage: { url: string; public_id: string };
  images: { url: string; public_id: string }[];
  description: string;
  location: string;
  contactNumber: number;
  contactEmail: string;
  name: string;
  color: string[];
  physical: string[];
}

export const PostItem = (payload: ItemPayload, token: string) => {
  return postItems("/item", payload, token);
};
