import axios from "axios";
import { server_uri } from "../utils/constants/config";

export const GetAppointments = (from, to) => {
  return axios
    .get(server_uri + "/patients/appointments", { params: { from, to } })
    .then((res) => res)
    .catch((err) => {
      console.log(err);
    });
};
