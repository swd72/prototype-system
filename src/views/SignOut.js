import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function SignOut(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("token", "");
    dispatch({ type: "SET_VALUE", name: "token", value: {} });
    history.push("/login");
  }, [dispatch, history]);

  return <React.Fragment></React.Fragment>;
}
