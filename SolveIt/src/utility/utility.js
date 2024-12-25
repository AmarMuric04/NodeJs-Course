export const get = async (address) => {
  try {
    const response = await fetch(address);

    const fetched = await response.json();

    return fetched;
  } catch (err) {
    console.error("An error occured whilst looking for reviews. " + err);
  }
};

export function disableButton(button) {
  button.disabled = true;

  setTimeout(() => {
    button.disabled = false;
  }, 600);
}

export function checkStatus() {
  const user = JSON.parse(localStorage.getItem("SolveBox-signed-in"));

  return user;
}

export function signTheUserOut() {
  localStorage.removeItem("SolveBox-signed-in");
}

export function retrieveFormData(event) {
  const form = event.target;
  const formData = new FormData(form);

  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  return data;
}

export function removeClassOnClick(element, cl) {
  const removeErrorClass = () => {
    element.classList.remove(cl);
    element.removeEventListener("click", removeErrorClass);
  };
  element.addEventListener("click", removeErrorClass);
}

export function updateButtonStatus(
  button,
  text = button.innerHTML + "ing",
  disable = false
) {
  button.innerHTML = text;
  console.log(button);

  /* For enabling just call it again with disabled -> true */

  if (disable) button.disabled = true;
  else button.disabled = false;
}

export function transformText(text) {
  let transformed = text[0].toUpperCase() + text.slice(1);

  transformed = transformed.replaceAll("_", " ");
  let parts = transformed.split(" ");
  for (let i = 1; i < parts.length; i++) {
    parts[i] = parts[i][0].toUpperCase() + parts[i].slice(1);
  }
  transformed = parts.join(" ");

  return transformed;
}
