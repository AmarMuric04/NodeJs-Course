export const fetchData = async (URL) => {
  try {
    const response = await fetch(URL);

    if (!response.ok) throw new Error("Something went wrong with: " + URL);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const protectedFetchData = async (URL, token) => {
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer" + token,
      },
    });

    if (!response.ok) throw new Error("Something went wrong with: " + URL);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const basePostData = async (URL, body, options = {}) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      body,
      headers: {
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData.message || "An error occurred");
      error.status = response.status;
      error.data = errorData.data;
      throw error;
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error.status
      ? error
      : { status: 500, message: "Network error or server unavailable" };
  }
};

export const postData = (URL, body, options) =>
  basePostData(URL, body, options);

export const protectedPostData = (URL, body, token) =>
  basePostData(URL, body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
