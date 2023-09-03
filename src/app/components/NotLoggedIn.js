import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

const NotLoggedIn = () => {
  return (
    <div
      className="bg-white/20 shadow-xl px-4 py-8 rounded-sm 
    flex flex-row items-center justify-center gap-1"
    >
      <Image src="/assets/login.png" width={50} height={50} alt="login" />
     
      <Link href='/login' className='p-2 opacity-80'> 
      Please <span className='font-semibold'>login </span> to continue </Link> 
    </div>
  );
}

export default NotLoggedIn
