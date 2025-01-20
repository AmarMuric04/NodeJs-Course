export function displayErrorMessage(error) {
  const errorVisible = document.getElementById("error-parent");
  if (errorVisible) errorVisible.remove();

  const errorParent = document.createElement("div");
  errorParent.classList =
    "absolute w-full transition-all opacity-0 -top-16 flex flex-col text-sm my-4 background rounded-xl p-4 font-semibold text-center mt-12 lg:mt-0 z-50";
  errorParent.setAttribute("id", "error-parent");

  const errorMessage = document.createElement("p");
  errorMessage.classList = "flex items-center text-red-400";
  errorMessage.setAttribute("id", "email-check");
  errorMessage.textContent = error;

  errorParent.appendChild(errorMessage);

  const formBody = document.getElementById("form-body");
  formBody.prepend(errorParent);

  setTimeout(() => {
    errorParent.classList.replace("opacity-0", "opacity-100");
  }, 10);
  setTimeout(() => {
    errorParent.classList.replace("opacity-100", "opacity-0");
  }, 1500);
  setTimeout(() => {
    errorParent.remove();
  }, 1700);
}

export function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isLongEnough(input) {
  return input.length >= 6;
}

export function hasSpecialChar(input) {
  return /[!@#$%^&*(),.?":{}|<>]/.test(input);
}

export function hasUppercase(input) {
  return /[A-Z]/.test(input);
}

export function doPasswordsMatch(password, confirmPsw) {
  return password === confirmPsw && confirmPsw !== "";
}

export function isPasswordValid(password) {
  return (
    isLongEnough(password) && hasSpecialChar(password) && hasUppercase(password)
  );
}

export function isInputEmpty(input) {
  return input === "";
}

export function isValidPhoneNumber(phone) {
  const pattern =
    /^\+?[1-9]\d{0,3}[-\s.]?\(?\d{1,4}\)?[-\s.]?\d{1,4}[-\s.]?\d{1,9}$/;
  return pattern.test(phone);
}

export function invalidateInput(element) {
  element.classList.remove("error-input");
  void element.offsetWidth;
  element.classList.add("error-input");
}

export function removeInvalidations(parent) {
  const errorFields = parent.querySelectorAll(".error-input");

  errorFields.forEach((element) => element.classList.remove("error-input"));
}

/* regex za formu */
export function isFirstNameValid(str) {
  return /^[A-Z].{0,15}$/.test(str);
}

export function isLastNameValid(str) {
  return /^[A-Z].{0,20}$/.test(str);
}

export function isMontenegroEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.me$/.test(email);
}

export function isLessThanOrEqualTo255WithoutNumbers(str) {
  return /^(?!.*\d).{0,255}$/.test(str);
}
