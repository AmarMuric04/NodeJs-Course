import { loader } from "../general_view.js";
const storageUsers = JSON.parse(localStorage.getItem("SolveBox-users"));

export function displayAuthFlow(isSignin) {
  const parent = document.getElementById("signup-parent");
  const authElement = document.createElement("a");
  const form = document.getElementById(
    isSignin ? "signin-form" : "signup-form"
  );
  const button = document.getElementById(isSignin ? "signin" : "signup");
  const formBody = document.getElementById("form-body");
  const orText = document.getElementById(isSignin ? "or-signup" : "or-signin");

  authElement.classList =
    "transition-all absolute bg-[#fa1c9a] w-full h-full left-0 top-full flex items-center justify-center";
  authElement.setAttribute("href", isSignin ? "./index.html" : "./signin.html");
  authElement.setAttribute("id", isSignin ? "signup" : "signin");
  authElement.textContent = isSignin ? "Home Page" : "Let's sign in!";

  parent.appendChild(authElement);

  button.textContent = isSignin ? "Signing you in..." : "Signing you up...";
  button.innerHTML += loader();
  button.classList.remove("cursor-pointer");
  button.disabled = true;

  setTimeout(() => {
    button.disabled = false;
    authElement.classList.replace("top-full", "top-0");
    formBody.classList.add("opacity-0");
    orText.classList.add("opacity-0");
  }, 3000);

  setTimeout(() => {
    form.classList.add("mb-[5rem]");
    button.remove();
    orText.remove();
    formBody.innerHTML = "";

    const title = document.createElement("h1");
    const text = document.createElement("p");

    title.classList = "text-[2rem] font-semibold";
    text.classList = "my-8 text-xl text-gray-700";

    if (isSignin) {
      title.textContent = "🎉 Welcome Back, Puzzle Master!";
      text.textContent =
        "Ready to tackle more brain-busting challenges? Let’s dive in and solve the unsolvable!";
    } else {
      title.textContent = "🔓 Access Granted!";
      text.textContent =
        "Welcome to the world of logic, riddles, and solutions. Let’s solve the unsolvable!";
    }

    formBody.prepend(text);
    formBody.prepend(title);
    formBody.classList.replace("opacity-0", "opacity-100");
  }, 3200);
}

export async function doesAccountExist(email) {
  try {
    const jsonUsersRes = await fetch("../assets/accounts.json");

    if (!jsonUsersRes.ok) {
      throw new Error("Failed to fetch users.");
    }

    const jsonUsers = await jsonUsersRes.json();
    const users = [...jsonUsers, ...storageUsers];

    return users.some((user) => user.email === email);
  } catch (error) {
    console.error(error);
    return false;
  }
}
