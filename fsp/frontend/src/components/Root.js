import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { loadAuthDataFromLocalStorage } from "../utility/util";

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadAuthDataFromLocalStorage(dispatch);
  }, [dispatch]);

  return <Outlet />;
};

export default Root;
