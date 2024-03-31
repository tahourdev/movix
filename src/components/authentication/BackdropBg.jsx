import React from 'react';

const BackdropBg = ({ onClose, showAuth }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed z-40 top-0 left-0 w-full ${
        showAuth
          ? 'bg-gray-900/70 opacity-100 backdrop-blur-md'
          : 'opacity-0 backdrop-blur-0 pointer-events-none'
      } min-h-screen bottom-0 transition-all duration-200 ease-in-out overflow-y-hidden`}></div>
  );
};

export default BackdropBg;
