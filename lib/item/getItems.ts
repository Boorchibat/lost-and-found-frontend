import { getItems} from "../getDataFromBackend";


export const getItemzz = () => {
  return getItems("/item");
};

