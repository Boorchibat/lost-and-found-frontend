import { Image } from "@/index";
import { postItems } from "../getDataFromBackend";


export interface DescriptionPayload {
  itemname: string;
  Images: Image[]; 
}

export const GenerateDescription = (payload: DescriptionPayload, token: string) => {

  return postItems<{ description: string }, DescriptionPayload>(
    "/item/generate",
    payload,
    token
  ).then(res => {
    if (res.description.startsWith('"') && res.description.endsWith('"')) {
      return res.description.slice(1, -1);
    }
    return res.description;
  }); 
};