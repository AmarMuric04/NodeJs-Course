import { loader } from "../general_view.js";
const storageAccounts = JSON.parse(localStorage.getItem("SolveBox-users"));
let lang = localStorage.getItem("SolveBox-current-language");

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
  authElement.textContent = isSignin
    ? lang === "english"
      ? "Home Page"
      : "Почетна страница"
    : lang === "english"
    ? "Let's sign in!"
    : "Хајде да се пријавимо!";

  parent.appendChild(authElement);
  if (lang === "english")
    button.textContent = isSignin ? "Signing you in..." : "Signing you up...";
  else
    button.textContent = isSignin ? "Пријављујемо те..." : "Региструјемо те...";

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
    form.classList += " mb-[3.5rem] sm:mb-[5.5rem] xl:mb-[7.5rem]";
    button.remove();
    orText.remove();
    formBody.innerHTML = "";

    const title = document.createElement("h1");
    const text = document.createElement("p");

    title.classList =
      "text-[1rem] sm:text-[1.5rem] 2xl:text-[2.5rem] font-bold text-center lg:text-start";
    text.classList =
      "my-0 mb-2 sm:my-4 2xl:my-8 text-xs sm:text-sm 2xl:text-[1rem] 3xl:text-lg text-gray-300 lg:text-gray-700 text-center lg:text-start";

    if (isSignin) {
      if (lang === "english") {
        title.textContent = "🎉 Welcome Back, Puzzle Master!";
        text.textContent =
          "Ready to tackle more brain-busting challenges? Let’s dive in and solve the unsolvable!";
      } else {
        title.textContent = "🎉 Добродошли назад, Мастер Загонетки!";
        text.textContent =
          "Спремни сте за нове изазове? Хајде да решавамо оно што је неиздрживо!";
      }
    } else {
      if (lang === "english") {
        title.textContent = "🔓 Access Granted!";
        text.textContent =
          "Welcome to the world of logic, riddles, and solutions. Let’s solve the unsolvable!";
      } else {
        title.textContent = "🔓 Приступ одобрен!";
        text.textContent =
          "Добродошли у свет логике, загонетки и решења. Хајде да решавамо оно што је неиздрживо!";
      }
    }

    formBody.prepend(text);
    formBody.prepend(title);
    formBody.classList.replace("opacity-0", "opacity-100");
  }, 3200);
}

/* This function would be used instead of findStorageUser, but since you can't edit the
password of the json users this function simply wouldn't work. */
export async function findAccount(email) {
  try {
    const jsonUsersRes = await fetch("./assets/accounts.json");

    if (!jsonUsersRes.ok) {
      throw new Error("Failed to fetch users.");
    }

    const jsonUsers = await jsonUsersRes.json();
    const users = [...jsonUsers, ...storageAccounts];

    const user = users.find((user) => user.email === email);
    return user;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function findJSONUser(email) {
  try {
    const jsonUsersRes = await fetch("./assets/accounts.json");

    if (!jsonUsersRes.ok) {
      throw new Error("Failed to fetch users.");
    }

    const jsonUsers = await jsonUsersRes.json();

    const user = jsonUsers.find((user) => user.email === email);
    return user;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function findStorageUser(email) {
  const users = JSON.parse(localStorage.getItem("SolveBox-users")) || [];
  return users.find((user) => user.email === email);
}

export async function correctCredentials(inputs) {
  try {
    const accountsResponse = await fetch("../assets/accounts.json");

    const jsonAccounts = await accountsResponse.json();
    const users = [...jsonAccounts, ...storageAccounts];

    const user = users.find(
      (user) => user.email === inputs.email && user.password === inputs.password
    );

    if (user) {
      return {
        user,
        foundUser: true,
      };
    }

    return {
      user: null,
      foundUser: false,
    };
  } catch (error) {
    console.error(error);
  }
}
