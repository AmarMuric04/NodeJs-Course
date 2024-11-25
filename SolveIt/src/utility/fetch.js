export const get = async (address) => {
  try {
    const response = await fetch(address);

    const fetched = await response.json();

    console.log(fetched);

    return fetched.reviews;
  } catch (err) {
    console.error(err);
  }
};
