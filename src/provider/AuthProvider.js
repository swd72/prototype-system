import React, { createContext, useState } from "react";
// import jwt_decode from "jwt-decode";

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (username, password) => {
          try {
            console.log(username, password)
          } catch (e) {
            // setLoading(false);
            console.log(e);
          }
        },
        register: async (username, password) => {
          try {
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
          } catch (e) {
            console.error(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
