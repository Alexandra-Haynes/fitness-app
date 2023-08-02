'use client'

import { signOut, useSession } from "next-auth/react";
import React from 'react'
import Link from 'next/link'
import {BiSolidUserCheck} from 'react-icons/bi'
import UserAvatar from "./UserAvatar";

const AuthProfileMenu = () => {
const { data: session } = useSession();
console.log('session', session)
const isLoggedIn = !!session?.user;
   

  return (
    <>
      {!isLoggedIn && (
        <ul className="flex flex-ro items-center justify-center gap-2">
          <li className="bg-secondary p-2 rounded-full px-4 hover:translate-y-1">
            <Link href="/login">Login</Link>
          </li>
          <li className="bg-primary p-2 px-4 rounded-full hover:translate-y-1 whitespace-nowrap">
            <Link href="/register">Sign Up</Link>
          </li>
        </ul>
      )}

      {isLoggedIn && (
        <ul className="flex flex-ro items-center justify-center gap-2">
          <li> <UserAvatar avatarUrl={session.user.avatar}/> </li>
          <li className="flex flex-row gap-1 items-center justify-center p-2  px-4 rounded-sm
          border-l-highlights border-r-secondary border-t-highlights border-b-secondary border">
            <BiSolidUserCheck /> {session.user.email} 
          </li>
          <li className="bg-red-500 p-2 px-4 rounded-full hover:translate-y-1 whitespace-nowrap">
            <button 
            onClick={()=> signOut()}>Logout</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default AuthProfileMenu
