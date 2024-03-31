import React, { useEffect, useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaRegUserCircle, FaSignInAlt } from 'react-icons/fa';
import { SiMinutemailer } from 'react-icons/si';
import AuthenticationInput from './AuthenticationInput';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../hooks/ContextProvider';

const SignIn = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { dispatch, setShowAuth } = useGlobalContext();

  // const currentUser = auth.currentUser;

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Sign in
        const user = userCredential.user;
        dispatch({ type: 'LOGIN', payload: user });
        setShowAuth(false);
        navigate('/');
        setLoading(false);

        setError(false);
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <form autoComplete='off' className='w-full' onSubmit={handleLogin}>
      <div className='space-y-4 w-full'>
        <AuthenticationInput
          setValue={setEmail}
          icn={<SiMinutemailer />}
          placeholder='Email'
          name='email'
          type='email'
        />
        <AuthenticationInput
          setValue={setPassword}
          icn={<RiLockPasswordLine />}
          placeholder='Password'
          name='password'
          type='password'
        />
      </div>
      {error && <p className='text-red-500 mt-3 text-sm'>Email and password is invalid</p>}
      <button
        type='submit'
        className='w-full flex justify-center p-3.5 hover:bg-blue-900 bg-black-lighter 
      transition-all duration-300 ease-linear rounded-md mt-4 font-semibold text-white'>
        <div className='flex items-center gap-2'>
          <FaSignInAlt />
          <span>Sign In</span>
        </div>
      </button>
      {loading && <p className='text-center text-white mt-3'>loading...</p>}
    </form>
  );
};

export default SignIn;
