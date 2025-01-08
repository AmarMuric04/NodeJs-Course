import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/fs.png";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import {
  setAuthData,
  setAuth,
  setError,
  setSuccess,
  setSubmitting,
  setDisableButton,
} from "../storage/authSlice";
import { Link } from "react-router-dom";

const Auth = () => {
  const authOption = window.location.pathname.split("/").pop();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, success, isSubmitting, disableButton } = useSelector(
    (state) => state.auth
  );

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [about, setAbout] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (error) {
      setTimeout(() => dispatch(setError(null)), 3000);
    }
    if (success) {
      setTimeout(() => dispatch(setSuccess(null)), 3000);
    }
  }, [error, success, dispatch]);

  const handleAuth = async () => {
    dispatch(setSubmitting(true));
    dispatch(setDisableButton(true));
    try {
      let response;
      if (authOption === "signup") {
        response = await fetch("http://localhost:8080/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fname, lname, about, password, email }),
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
        console.log(error);
        dispatch(setError(error));
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

      dispatch(setSuccess(data));

      if (authOption === "signin") {
        dispatch(setAuth(true));
      }

      setTimeout(() => {
        navigate(authOption === "signin" ? "/" : "/signin", {
          replace: true,
        });
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
    <main className="bg-blue-100 h-auto min-h-screen w-full flex">
      <Link to="/" className="flex items-center absolute left-10 top-10">
        <img className="h-[5rem]" src={logo} alt="Logo" />
        <div>
          <p className="playwrite font-bold text-lg">Fullstack</p>
          <p className="text-sm text-gray-500">MERN Website</p>
        </div>
      </Link>
      <div className="w-1/3 gap-4 flex flex-col justify-center items-center">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleAuth();
          }}
          className="w-2/3 flex flex-col gap-4 relative"
        >
          {error && (
            <div className="flex w-full absolute -top-[4rem]">
              <p className="bg-red-400 w-full text-center bg-opacity-50 border-2 border-red-600 py-2 px-4 rounded-md">
                {error.message}
              </p>
            </div>
          )}
          {success && (
            <div className="flex w-full absolute -top-[4rem]">
              <p className="bg-green-400 w-full text-center bg-opacity-50 border-2 border-green-600 py-2 px-4 rounded-md">
                {success.message}
              </p>
            </div>
          )}
          <h1 className="text-2xl font-semibold">{buttonText}</h1>
          <p className="text-lg text-gray-500">
            Provide us with your infromation!
          </p>
          {authOption === "signup" && (
            <div className="flex gap-2 w-full">
              <Input
                error={error}
                type="text"
                input="input"
                placeholder="First Name"
                name="fname"
                value={fname}
                label="First Name*"
                onChange={(e) => setFName(e.target.value)}
              />
              <Input
                error={error}
                type="text"
                input="input"
                placeholder="Last Name"
                name="lname"
                value={lname}
                label="Last Name*"
                onChange={(e) => setLName(e.target.value)}
              />
            </div>
          )}
          <Input
            error={error}
            type="text"
            input="input"
            placeholder="Your Email"
            name="email"
            value={email}
            label="Your Email*"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            error={error}
            type="password"
            input="input"
            placeholder="Your Password"
            name="password"
            value={password}
            label="Your Password*"
            onChange={(e) => setPassword(e.target.value)}
          />
          {authOption === "signup" && (
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
          )}
          <button
            disabled={disableButton}
            className="bg-gray-800 py-4 text-white font-semibold w-full rounded-[2rem] hover:rounded-none transition-all"
          >
            {isSubmitting
              ? `${buttonText.split(" ")[0]}ing ${buttonText.split(" ")[1]}...`
              : buttonText}
          </button>
        </form>
        <p>
          {authOption === "signin" ? "Already have" : "Don't have"} an account?{" "}
          <Link
            className="text-orange-400 font-semibold underline"
            to={authOption === "signin" ? "/signup" : "/signin"}
          >
            {authOption === "signin" ? "Sign Up" : "Sign In"}
          </Link>{" "}
          now!
        </p>
      </div>
      <div className="bg-blue-200 w-2/3"></div>
    </main>
  );
};

export default Auth;
