import { createSlice } from '@reduxjs/toolkit';

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    url: {},
    genres: {},
    countries: {},
    watchLists: [],
    bookmark: [],
    cart: [],
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
    getCountries: (state, action) => {
      state.countries = action.payload;
    },
    getWatchLists: (state, action) => {
      state.watchLists = action.payload;
    },
    addMovieToCart: (state, action) => {
      const newMovie = action.payload;
      const existingMovieIndex = state.cart.findIndex((movie) => movie.id === newMovie.id);

      if (existingMovieIndex === -1) {
        state.cart.push(newMovie);
      }
    },

    removeMovieFromCart: (state, action) => {
      const movieId = action.payload;
      state.cart = state.cart.filter((movie) => movie.id !== movieId);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getApiConfiguration,
  getGenres,
  getCountries,
  getWatchLists,
  bookmark,
  cart,
  addMovieToCart,
  removeMovieFromCart,
} = homeSlice.actions;

export default homeSlice.reducer;
