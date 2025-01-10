import {
  setAuthData,
  setAuth,
  clearAuthData,
  setUser,
} from "../storage/authSlice";

export const loadAuthDataFromLocalStorage = async (dispatch) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const expiryDate = localStorage.getItem("expiryDate");

  if (!token || !userId || !expiryDate) {
    dispatch(clearAuthData());
    return;
  }

  const expiryTime = new Date(expiryDate).getTime();
  const currentTime = new Date().getTime();

  const currentUser = await getUser(userId);
  dispatch(setUser(currentUser.user));

  if (expiryTime <= currentTime) {
    dispatch(clearAuthData());
    return;
  }
  dispatch(
    setAuthData({
      token,
      userId,
      expiryDate,
    })
  );
  dispatch(setAuth(true));

  setAutoLogout(dispatch, expiryTime - currentTime);
};

export const setAutoLogout = (dispatch, expiryTime) => {
  console.log(`Auto-logout in ${(expiryTime / 1000 / 60).toFixed(0)} minutes`);
  setTimeout(() => {
    logoutUser(dispatch);
  }, expiryTime);
};

export const logoutUser = (dispatch) => {
  console.log("Logging out user");
  localStorage.clear();
  dispatch(clearAuthData());
  dispatch(setAuth(false));
};

export const generateBase64FromImage = (imageFile) => {
  const reader = new FileReader();
  const promise = new Promise((resolve, reject) => {
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (err) => reject(err);
  });

  reader.readAsDataURL(imageFile);
  return promise;
};

export const getUser = async (id) => {
  try {
    const response = await fetch("http://localhost:8080/users/" + id);

    if (!response.ok) {
      throw new Error("Failed while fetching user.");
    }

    const user = await response.json();

    return user;
  } catch (error) {
    console.error(error);
  }
};

export const handlePostInput = async (value, files, cbPreview, cbImage) => {
  try {
    if (files && files[0]) {
      const file = files[0];

      const b64 = await generateBase64FromImage(file);
      if (cbPreview) cbPreview(b64);
      if (cbImage) cbImage(file);
    } else {
      console.error("No file selected.");
    }
  } catch (error) {
    console.error(error);
  }
};
