import React from 'react';

const AuthenticationInput = ({ icn, placeholder, type, name, setValue }) => {
  return (
    <div className='w-full pl-3 bg-black-light rounded-md shadow-sm flex items-center gap-2 text-gray-400'>
      {icn}
      <input
        autoComplete='false'
        onChange={(e) => setValue(e.target.value)}
        required
        type={type}
        name='hidden'
        className='py-4 w-full outline-none bg-transparent text-white placeholder:text-gray-400'
        placeholder={placeholder}
      />
    </div>
  );
};

export default AuthenticationInput;
