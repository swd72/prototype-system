import React, { useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

export default function SignOut(props) {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, [logout]);

  return <React.Fragment></React.Fragment>;
}
