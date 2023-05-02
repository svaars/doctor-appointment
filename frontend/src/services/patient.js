import axios from "axios";
import { server_uri } from "../utils/constants/config";
import { notification } from "antd";

export const GetAppointments = (from, to) => {
  return axios
    .get(server_uri + "/patients/appointments", { params: { from, to } })
    .then((res) => res)
    .catch((err) => {
      console.log(err);
    });
};

export const GetPatient = (id) => {
  return axios.get(server_uri + "/patients/" + id).catch((err) => {
    console.log(err);
    return null;
  });
};

export const GetReports = (id) => {
  return axios.get(server_uri + "/patients/" + id + "/reports").catch((err) => {
    console.log(err);
    return null;
  });
};

export const WriteAReport = (id, content) => {
  return axios
    .post(server_uri + "/patients/" + id + "/reports", { content })
    .then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    })
    .catch((err) => {
      console.log(err);
      notification.open({ message: "Failed to write report" });
      return null;
    });
};
