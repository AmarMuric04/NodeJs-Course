import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { loadAuthDataFromLocalStorage } from "../utility/util";
import { setNotification } from "../storage/notificationSlice";

const Root = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.notification.message);
  const notifRef = useRef(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (message) {
      setShowNotification(false);

      if (notifRef.current) {
        clearTimeout(notifRef.current);
      }

      setTimeout(() => {
        setShowNotification(true);
      }, 50);

      notifRef.current = setTimeout(() => {
        dispatch(setNotification(null));
      }, 2200);
    }
  }, [message, dispatch]);

  useEffect(() => {
    loadAuthDataFromLocalStorage(dispatch);
  }, [dispatch]);

  return (
    <>
      {showNotification && message && (
        <div className="pop-in flex items-center fixed bottom-10 right-10 text-black">
          <div className="bg-purple-500 h-full w-[3rem] px-2 py-4 rounded-l-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M448 85.333V384H341.333v85.333L192 384H64V85.333z"
              />
            </svg>
          </div>
          <div className="px-8 relative bg-white py-4 rounded-r-lg font-semibold rounded-br-none">
            <p className="text-[0.6rem] text-gray-400 font-normal absolute top-1 left-1">
              NOTIFICATION
            </p>
            {message.message}
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Root;
