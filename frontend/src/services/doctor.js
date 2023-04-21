import axios from "axios";
import { server_uri } from "../utils/constants/config";

export const SearchDoctors = (queries) => {
  return axios
    .get(server_uri + "/doctors/search", { params: queries })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};
