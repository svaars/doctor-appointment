import axios from "axios";

import { server_uri } from "../utils/constants/config";

const GetAllCities = () => {
  return axios.get(server_uri + "/doctors/cities");
};

export { GetAllCities };
