import { notification } from "antd";
import axios from "axios";
const { server_uri } = require("../utils/constants/config");

export const getSession = (
  date,
  populate = { doctor: false, appointments: false }
) => {
  return axios
    .get(server_uri + "/sessions", { params: { date, populate } })
    .catch((err) => {
      notification.open({
        message: "Error!",
        description: "Could not get session! ",
      });
    });
};

export const createSession = (session) => {
  return axios
    .post(server_uri + "/sessions", session)
    .then((res) => {
      if (res.status === 200) {
        notification.open({
          message: "New session created!",
          description: "Successfully created new session!",
        });
      }
      return res.data.session;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const bookSession = (id) => {
  return axios
    .post(server_uri + "/sessions/" + id + "/appointments")
    .then((res) => {
      if (res.status === 200) {
        notification.open({ message: "Booking successfull!" });
        return res;
      }
    })
    .catch((err) => {
      console.error(err);
      if (err.response.status === 400) {
        notification.open({
          message: "Error!",
          description: err.response.data.more.details,
        });
      }
      return false;
    });
};
