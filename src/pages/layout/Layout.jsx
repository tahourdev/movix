import React from 'react';
import { Footer, Header } from '../../components';
import { Outlet } from 'react-router-dom';
import ContextProvider from '../../hooks/ContextProvider';

const Layout = () => {
  return (
    <ContextProvider>
      <Header />
      <Outlet />
      <Footer />
    </ContextProvider>
  );
};

export default Layout;
