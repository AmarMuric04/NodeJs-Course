export const get = async (address) => {
  try {
    const response = await fetch(address);

    const fetched = await response.json();

    return fetched.reviews;
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

export function isUserSignedIn() {
  return JSON.parse(localStorage.getItem("SolveBox-signed-in"));
}

export function signTheUserOut() {
  localStorage.removeItem("SolveBox-signed-in");
}
