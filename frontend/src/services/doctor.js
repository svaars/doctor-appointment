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

export const GetDoctor = (id) => {
  return axios
    .get(server_uri + "/doctors/" + id)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};

export const GetSessions = (id, date) => {
  date && (date = date.toDateString());

  return axios
    .get(server_uri + "/doctors/" + id + "/sessions", { params: { date } })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};
