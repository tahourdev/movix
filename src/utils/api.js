import axios from 'axios';

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3/';

const headers = {
  Authorization: `bearer ${TMDB_TOKEN}`,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
