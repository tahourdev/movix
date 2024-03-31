import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { auth } from '../firebase';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
};

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

function ContextProvider({ children }) {
  const [showAuth, setShowAuth] = useState(false);
  const [genreType, setGenreType] = useState([]);

  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <GlobalContext.Provider
      value={{
        setGenreType,
        genreType,
        showAuth,
        setShowAuth,
        currentUser: state.currentUser,
        dispatch,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default ContextProvider;
