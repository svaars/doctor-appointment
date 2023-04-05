import axios from "axios";
import React, { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import WithAxios from "../components/WithAxios";

export const AuthContext = createContext();

const base_uri = "http://localhost:5000";

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  const verifyUser = useCallback(() => {
    axios
      .post(
        base_uri + "/users/refresh-token",
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(async (response) => {
        if (response.status == 200) {
          // const data = await response.json();

          setToken(response.data.token);
        } else {
          setToken(null);
        }

        // call refreshToken every 5 minutes to renew the authentication token.

        setTimeout(verifyUser, 5 * 60 * 1000);
      });
  }, [setToken]);

  return (
    <AuthContext.Provider value={{ token, setToken, verifyUser }}>
      <WithAxios>
        {children}
      </WithAxios>
    </AuthContext.Provider>
  );
}
