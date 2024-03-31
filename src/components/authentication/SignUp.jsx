import React, { useState } from 'react';
import { FaSignInAlt, FaRegUserCircle } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiMinutemailer } from 'react-icons/si';
import AuthenticationInput from './AuthenticationInput';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const signupHandler = (e) => {
    e.preventDefault();
    // Basic email validation
    if (!email.includes('@gmail')) {
      setError('Please enter a valid Gmail address');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        setError('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <form autoComplete='off' onSubmit={signupHandler} className='w-full'>
      <div className='space-y-4 w-full'>
        <AuthenticationInput
          icn={<FaRegUserCircle />}
          placeholder='Username'
          type='text'
          setValue={setUsername}
        />
        <AuthenticationInput icn={<SiMinutemailer />} placeholder='Email' type='email' setValue={setEmail} />
        <AuthenticationInput
          icn={<RiLockPasswordLine />}
          placeholder='Password'
          type='password'
          setValue={setPassword}
        />
        <AuthenticationInput
          icn={<RiLockPasswordLine />}
          placeholder='Confirm Password'
          type='password'
          setValue={setConfirmPassword}
        />
      </div>
      {error && <p className='text-sm text-red-500 mt-3'>{error}</p>}
      <button
        type='submit'
        className='w-full flex justify-center p-3.5 bg-black-lighter hover:bg-blue-900
      transition-all duration-300 ease-linear rounded-md mt-6 font-semibold text-white'>
        <div className='flex items-center gap-2'>
          <FaSignInAlt />
          <span>Sign Up</span>
        </div>
      </button>
    </form>
  );
};

export default SignUp;
