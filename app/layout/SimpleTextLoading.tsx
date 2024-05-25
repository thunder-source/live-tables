import React from 'react';

export default function SimpleTextLoading() {
  return (
    <div className="flex h-screen w-screen select-none items-center justify-center bg-black text-center  text-white">
      <div className="text-6xl sm:text-9xl">Loading...</div>
    </div>
  );
}
