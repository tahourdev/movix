import React, { useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ResetPass from './ResetPass';
import { useGlobalContext } from '../../hooks/ContextProvider';

const AuthenticationForm = () => {
  const [login, setLogin] = useState(true);
  const [resetPass, setResetPass] = useState(false);
  const { showAuth, setShowAuth } = useGlobalContext();

  return (
    <div className='bg-black relative ring-offset-white ring-1 px-6 shadow-md rounded-md py-8'>
      <p className='text-2xl font-bold text-white'>
        {!resetPass ? (login ? 'Sign In' : 'Sign Up') : 'Forgot Password'}
      </p>

      <div className='w-full items-start flex flex-col mt-6'>
        {resetPass ? <ResetPass /> : login ? <SignIn /> : <SignUp />}
      </div>

      {login && !resetPass && (
        <button onClick={() => setResetPass(true)} className='mt-3 text-slate-300 text-sm'>
          Forgot Password?
        </button>
      )}

      <div className='w-full text-sm text-center p-3.5 bg-white rounded-md mt-6 text-white'>
        <span className='text-gray-500'>
          {resetPass ? 'Back to' : login ? "Don't have an account?" : 'Already have an account?'}{' '}
        </span>
        <button
          onClick={() => {
            setLogin((prev) => !prev), setResetPass(false);
            if (resetPass) {
              setLogin(true);
            }
          }}
          className='text-black-lighter font-bold'>
          {!resetPass ? (login ? 'Sign Up' : 'Sign In') : 'Sign In'}
        </button>
      </div>

      <button
        onClick={() => setShowAuth(false)}
        className='absolute top-2 right-3 rounded-full ring-blue-400/50 ring-2 text-white hover:text-slate-200 text-3xl'>
        <IoCloseCircle />
      </button>
    </div>
  );
};

export default AuthenticationForm;
