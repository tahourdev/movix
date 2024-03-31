import React from 'react';
import AuthenticationInput from './AuthenticationInput';
import { MdLockReset } from 'react-icons/md';
import { SiMinutemailer } from 'react-icons/si';

function ResetPass() {
  return (
    <form className='w-full'>
      <AuthenticationInput type='email' placeholder='enter your email' icn={<SiMinutemailer />} />
      <button
        type='submit'
        className='w-full flex justify-center p-3.5 hover:bg-blue-900 bg-black-lighter 
      transition-all duration-300 ease-linear rounded-md mt-4 font-semibold text-white'>
        <div className='flex items-center gap-2'>
          <MdLockReset />
          <span>Forgot</span>
        </div>
      </button>
    </form>
  );
}

export default ResetPass;
