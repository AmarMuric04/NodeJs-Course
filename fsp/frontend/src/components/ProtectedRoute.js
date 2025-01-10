import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadAuthDataFromLocalStorage } from "../utility/util";
import { setNotification } from "../storage/notificationSlice";
import { Spinner } from "../assets/icons";

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
    return (
      <div className="bg-[#222] grid place-items-center w-screen h-screen">
        <Spinner />
      </div>
    );
  }

  if (!isAuth) {
    dispatch(setNotification({ message: "You're not signed in!" }));
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
