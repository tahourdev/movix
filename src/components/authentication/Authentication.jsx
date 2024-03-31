import React from 'react';
import BackdropBg from './BackdropBg';
import AuthenticationForm from './AuthenticationForm';
import { useGlobalContext } from '../../hooks/ContextProvider';

const Authentication = () => {
  const { showAuth, setShowAuth } = useGlobalContext();
  const onClose = () => {
    setShowAuth(false);
  };
  return (
    <>
      <div
        className={`${
          showAuth ? 'top-28' : 'top-10 opacity-0 pointer-events-none'
        } max-w-[30rem] w-full fixed left-1/2 -translate-x-1/2
         z-50 mx-auto transform px-4 transition-all duration-300 ease-in`}>
        <AuthenticationForm />
      </div>
      <BackdropBg onClose={onClose} showAuth={showAuth} />
    </>
  );
};

export default Authentication;
