import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadAuthDataFromLocalStorage } from "../utility/util";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      await loadAuthDataFromLocalStorage(dispatch);
      setIsLoading(false);
    };

    loadAuth();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
