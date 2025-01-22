import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_PORT,
});

axiosInstance.interceptors.request.use((config) => {
  // console.log("Request made with config:", config);
  return config;
});

const baseFetchData = async (URL, options = {}) => {
  console.log(URL);
  try {
    const response = await axiosInstance.get(URL, {
      headers: {
        ...options.headers,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchData = async (URL) => baseFetchData(URL);

export const protectedFetchData = async (URL, token) =>
  baseFetchData(URL, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

const basePostData = async (URL, body, options = {}) => {
  try {
    const response = await axiosInstance.post(URL, body, {
      headers: {
        ...options.headers,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response;
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

const basePutData = async (URL, body, options = {}) => {
  console.log(body);
  try {
    const response = await axiosInstance.put(URL, body, {
      headers: {
        ...options.headers,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const putData = async (URL) => basePutData(URL);

export const protectedPutData = async (URL, body, token) =>
  basePutData(URL, body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
