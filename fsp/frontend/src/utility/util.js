import { setAuthData, setAuth, clearAuthData } from "../storage/authSlice";

export const loadAuthDataFromLocalStorage = (dispatch) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const expiryDate = localStorage.getItem("expiryDate");

  if (!token || !userId || !expiryDate) {
    dispatch(clearAuthData());
    return;
  }

  const expiryTime = new Date(expiryDate).getTime();
  const currentTime = new Date().getTime();

  if (currentTime >= expiryTime) {
    setAutoLogout(dispatch, expiryDate);
    localStorage.clear();
    dispatch(clearAuthData());
  } else {
    dispatch(
      setAuthData({
        token,
        userId,
        expiryDate,
      })
    );
    dispatch(setAuth(true));
  }
};

export const setAutoLogout = (dispatch, expiryDate) => {
  const expiryTime = new Date(expiryDate).getTime() - new Date().getTime();
  setTimeout(() => {
    localStorage.clear();
    dispatch(clearAuthData());
    dispatch(setAuth(false));
  }, expiryTime);
};

export const logoutUser = (dispatch) => {
  localStorage.clear();
  dispatch(clearAuthData());
  dispatch(setAuth(false));
};
