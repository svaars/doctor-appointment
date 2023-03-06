import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
