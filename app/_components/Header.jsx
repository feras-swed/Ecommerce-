'use client'
import React from 'react'
import Image from 'next/image'
import { UserButton, useUser } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCartContext } from '@/app/_context/CardContext'; // هنا التغيير الرئيسي
import Cart from './Cart';
function Header() {
  const [isLogeing, setIsLogeing] = useState(false);
  const { cartCount } = useCartContext();
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    setIsLogeing(window.location.href.toString().includes('sign-in'));
  },[]);

const {user} = useUser();
  return ! isLogeing && (
    <div>
        <header className="bg-white">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 shadow-md">
    <div className="flex h-16 items-center justify-between">
      <div className="md:flex md:items-center md:gap-12">
        <a className="block text-teal-600" href="#">
          <span className="sr-only">Home</span>
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
        </a>
      </div>

      <div className="hidden md:block">
        <nav aria-label="Global">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Home </a>
            </li>

            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Explore </a>
            </li>

            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </a>
            </li>

            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About Us </a>
            </li>

            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Content Us </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-4">
       {!user ?
        <div className="sm:flex sm:gap-4">
          <a
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-primary/50"
            href="http://localhost:3000/sign-in"
          >
            Login
          </a>

          <div className="hidden sm:flex">
            <a
              className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
              href="#"
            >
              Register
            </a>
          </div>
        </div>
        :
        <div className="flex items-center gap-4">
          <h2 className='text-black flex gap-1 cursor-pointer text-sm font-bold'><ShoppingCart onClick={() => setOpenCart(!openCart) } />({cartCount?.data?.length})</h2>

        <UserButton afterSwitchSessionUrl='/'/>
        {openCart && <Cart/>}
        
        </div>
        }
        
        <div className="block md:hidden">
          <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</header>        

    </div>
  )
}

export default Header