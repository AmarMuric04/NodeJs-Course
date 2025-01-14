import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/light-logo.png";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import {
  setAuthData,
  setAuth,
  setSubmitting,
  setDisableButton,
} from "../storage/authSlice";
import { setNotification } from "../storage/notificationSlice";
import { Link } from "react-router-dom";
import { handlePostInput, loadAuthDataFromLocalStorage } from "../utility/util";
import { Spinner } from "../assets/icons";

const Auth = () => {
  const authOption = window.location.pathname.split("/").pop();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const { isSubmitting, disableButton } = useSelector((state) => state.auth);

  const [authError, setAuthError] = useState(null);
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  // const [about, setAbout] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (authError) {
      setTimeout(() => setAuthError(null), 3000);
    }
  }, [authError, dispatch]);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const handleAuth = async () => {
    dispatch(setSubmitting(true));
    dispatch(setDisableButton(true));
    try {
      let response;
      if (authOption === "signup") {
        const formData = new FormData();
        formData.append("fname", fname);
        formData.append("lname", lname);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("about", "Hello, I am " + fname + " " + lname);
        formData.append("image", image);
        response = await fetch("http://localhost:8080/users/signup", {
          method: "POST",
          body: formData,
        });
      } else {
        response = await fetch("http://localhost:8080/users/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, email }),
        });
      }

      if (!response.ok) {
        const error = await response.json();
        setAuthError(error);
        dispatch(setDisableButton(false));
        throw new Error("Authentication error.");
      }

      const data = await response.json();

      if (authOption === "signin") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());

        dispatch(
          setAuthData({
            token: data.token,
            userId: data.userId,
            expiryDate: expiryDate.toISOString(),
          })
        );
      }

      console.log("Notification");
      dispatch(setNotification(data));

      setTimeout(() => {
        if (authOption === "signin") {
          dispatch(setAuth(true));
          loadAuthDataFromLocalStorage(dispatch);
        } else navigate("/signin");
        dispatch(setDisableButton(false));
      }, 3000);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  const buttonText = authOption === "signin" ? "Sign In" : "Sign Up";

  return (
    <main className="bg-[#222] text-white h-auto min-h-screen w-full flex">
      <Link to="/" className="flex items-center absolute left-10 top-10 z-50">
        <img className="h-[5rem]" src={logo} alt="Logo" />
        <div>
          <p className="playwrite font-bold text-lg">Fullstack</p>
          <p className="text-sm text-gray-500">MERN Website</p>
        </div>
      </Link>

      <div className="w-1/3 gap-4 flex flex-col justify-center items-center relative">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleAuth();
          }}
          className="w-2/3 flex flex-col gap-4 relative"
        >
          {authError && (
            <div className="flex w-full absolute -top-[4rem]">
              <p className="bg-red-400 w-full text-center bg-opacity-50 border-2 border-red-600 py-2 px-4 rounded-md">
                {authError.message}
              </p>
            </div>
          )}
          <h1 className="text-4xl font-semibold">{buttonText}</h1>
          <p className="text-lg text-gray-200">
            Provide us with your infromation!
          </p>

          {authOption === "signup" && (
            <>
              <div className="flex gap-2 w-full">
                <Input
                  onErrorClass="border-red-600 bg-[#191919] text-white"
                  normalClass="bg-[#191919] border-[#191919] text-white"
                  error={authError}
                  type="text"
                  input="input"
                  placeholder="First Name"
                  name="fname"
                  value={fname}
                  label="First Name*"
                  onChange={(e) => setFName(e.target.value)}
                />
                <Input
                  error={authError}
                  onErrorClass="border-red-600 bg-[#191919] text-white"
                  normalClass="bg-[#191919] border-[#191919] text-white"
                  type="text"
                  input="input"
                  placeholder="Last Name"
                  name="lname"
                  value={lname}
                  label="Last Name*"
                  onChange={(e) => setLName(e.target.value)}
                />
              </div>
            </>
          )}
          <div
            className={
              authOption === "signup"
                ? "flex gap-2 w-full transition-all"
                : "flex flex-col w-full"
            }
          >
            <Input
              error={authError}
              onErrorClass="border-red-600 bg-[#191919] text-white"
              normalClass="bg-[#191919] border-[#191919] text-white"
              type="text"
              input="input"
              placeholder="Your Email"
              name="email"
              value={email}
              label="Your Email*"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              error={authError}
              onErrorClass="border-red-600 bg-[#191919] text-white"
              normalClass="bg-[#191919] border-[#191919] text-white"
              type="password"
              input="input"
              placeholder="Your Password"
              name="password"
              value={password}
              label="Your Password*"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {authOption === "signup" && (
            <>
              <Input
                error={authError}
                type="file"
                input="file"
                placeholder="Profile Picture"
                name="pfp"
                label="Profile Picture*"
                onChange={(e) =>
                  handlePostInput(
                    e.target.value,
                    e.target.files,
                    setImagePreview,
                    setImage
                  )
                }
              />
              <div>
                {!imagePreview && !fname && !lname && !email && (
                  <p>This is the preview.</p>
                )}
                <div className="flex gap-2 w-full justify-end items-center">
                  <div className="flex flex-col text-end">
                    <p className="font-semibold text-sm">
                      {fname && fname + ","} {lname && lname}
                    </p>
                    <p className="text-xs text-gray-500">{email && email}</p>
                  </div>
                  {imagePreview && (
                    <img
                      className="w-[4rem] h-[4rem] rounded-full object-cover"
                      src={imagePreview}
                      alt="Chosen profile picture."
                    />
                  )}
                </div>
              </div>
            </>
          )}
          {/* {authOption === "signup" && (
            <Input
              error={error}
              type="text"
              input="textarea"
              placeholder="About Yourself..."
              name="about"
              value={about}
              label="About You*"
              onChange={(e) => setAbout(e.target.value)}
            />
          )} */}
          <button
            disabled={authError || disableButton}
            className="bg-purple-500 hover:bg-orange-500 py-4 text-white font-semibold w-full rounded-[2rem] hover:rounded-none transition-all"
          >
            {isSubmitting ? (
              <div className="flex justify-center items-center gap-2">
                <p>
                  {buttonText.split(" ")[0]}ing {buttonText.split(" ")[1]}...
                </p>
                <Spinner />
              </div>
            ) : (
              buttonText
            )}
          </button>
        </form>
        <p>
          {authOption === "signin" ? "Already have" : "Don't have"} an account?{" "}
          <Link
            className="text-purple-500 hover:text-orange-500 transition-all font-semibold underline"
            to={authOption === "signin" ? "/signup" : "/signin"}
          >
            {authOption === "signin" ? "Sign Up" : "Sign In"}
          </Link>{" "}
          now!
        </p>
        <svg
          className="rotate-[270deg] absolute left-[28%] w-[100vh]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          fill="#222"
        >
          <path
            d="M0 0v99.7C62 69 122.4 48.7 205 66c83.8 17.6 160.5 20.4 240-12 54-22 110-26 173-10a392.2 392.2 0 0 0 222-5c55-17 110.3-36.9 160-27.2V0H0Z"
            opacity=".5"
          ></path>
          <path d="M0 0v74.7C62 44 122.4 28.7 205 46c83.8 17.6 160.5 25.4 240-7 54-22 110-21 173-5 76.5 19.4 146.5 23.3 222 0 55-17 110.3-31.9 160-22.2V0H0Z"></path>
        </svg>
      </div>
      <div className="bg-[#191919] w-2/3"></div>
    </main>
  );
};

export default Auth;
