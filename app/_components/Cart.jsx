"use client"
import React from 'react'
import { useCartContext } from '@/app/_context/CardContext'; // هنا التغيير الرئيسي
import Link from 'next/link';
function Cart() {
    const { cartCount } = useCartContext();

    cartCount?.data?.map((product) => ( console.log(product.products[0].banner.url)));
    return (
    <div className='h-[400px] w-[350px] bg-gray-100 z-10 rounded-md border shadow-sm absolute mx-10 right-100 top-12 p-5 overflow-auto'>
        <div
  className="relative w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
  aria-modal="true"
  role="dialog"
  tabIndex="-1"
>
  <button className="absolute end-4 top-4 text-gray-600 transition hover:scale-110">
    <span className="sr-only">Close cart</span>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <div className="mt-4 space-y-6">
    <ul className="space-y-4">
        {cartCount?.data?.map((product) => (
                  <li key={product.id} className="flex items-ce{nter gap-4">
                  <img
                    src={`http://localhost:1337${product?.products[0]?.banner?.url}`}
                    alt=""
                    className="size-16 rounded object-cover"
                  />
          
                  <div>
                    <h3 className="text-sm text-gray-900 line-clamp-1">{product?.products[0]?.title}</h3>
          
                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt className="inline">Category:</dt>
                        <dd className="inline">{product?.products[0]?.category}</dd>
                      </div>
          
                      <div>
                        <dt className="inline">Price:</dt>
                        <dd className="inline">{product?.products[0]?.price}</dd>
                      </div>
                    </dl>
                  </div>
                </li>
            
        ))}

    </ul>

    <div className="space-y-4 text-center">
   

      <Link
        href="/cart"
        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
      >
        View my cart ({cartCount?.data?.length})
      </Link>

      <a
        href="#"
        className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
      >
        Continue shopping
      </a>
    </div>
  </div>
</div>
    </div>
  )
}

export default Cart