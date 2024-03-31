import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchDataFromApi } from './utils/api';
import { useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres, getCountries } from './store/homeSlice';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Details, SearchResults, Explore, PageNotFound, Home, Layout } from './pages';
import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: '/',
        index: true,
        element: <Home />,
      },
      {
        path: ':mediaType/:id',
        element: <Details />,
      },
      {
        path: ':mediaType',
        element: <Explore />,
      },
      {
        path: '/genre/:mediaType',
        element: <Explore />,
      },
      {
        path: 'search/:query',
        element: <SearchResults />,
      },
    ],
  },
]);

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
    genreCall();
    countriesCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi('configuration').then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      };
      dispatch(getApiConfiguration(url));
      // console.log(res);
    });
  };

  const genreCall = async () => {
    let promise = [];
    let endpoints = ['tv', 'movie'];
    let allGenres = {};

    endpoints.forEach((url) => {
      return promise.push(fetchDataFromApi(`genre/${url}/list`));
    });
    const data = await Promise.all(promise);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };

  const countriesCall = async () => {
    let allCountries = [];
    const data = await fetchDataFromApi('configuration/countries').then((res) => res);
    data.forEach((country) => {
      allCountries.push(country);
    });
    dispatch(getCountries(allCountries));
  };

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
