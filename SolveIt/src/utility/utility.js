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
