import axios from "axios";
import React, { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import WithAxios from "../components/Common/WithAxios";
import { server_uri } from "../utils/constants/config";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState();

  const navigate = useNavigate();

  const logout = () => {
    axios
      .get(server_uri + "/users/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setToken(null);
          navigate("/");

          window.location.reload();
        }
      });
  };

  // const verifyUser = useCallback(() => {
  //   axios
  //     .post(
  //       server_uri + "/users/refresh-token",
  //       {},
  //       {
  //         withCredentials: true,
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     )
  //     .then(async (response) => {
  //       if (response.status == 200) {
  //         // const data = await response.json();

  //         setToken(response.data.token);
  //       } else {
  //         setToken(null);
  //       }

  //       // call refreshToken every 5 minutes to renew the authentication token.

  //       setTimeout(verifyUser, 5 * 60 * 1000);
  //     });
  // }, [setToken]);

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      <WithAxios>{children}</WithAxios>
    </AuthContext.Provider>
  );
}
