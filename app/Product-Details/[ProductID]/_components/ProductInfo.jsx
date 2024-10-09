import React from 'react'
import { AlertOctagon, ShoppingCart,BadgeCheck } from 'lucide-react'

function ProductInfo({ProductD}) {
  return (
    <div className="">
        
        {ProductD?.description && (

        <div className="flex flex-col bg-slate-100 justify-between place-items-start p-5  ">
      <div className=''>
        <h2 className="text-[14px] font-bold text-black line-clamp-1"   >
          {ProductD?.title}
        </h2>
        <h2 className="text-[10px] font-bold text-gray-400 flex gap-1 items-center">
          {ProductD?.category}</h2>
      </div>
      <h2 className="text-[14px] font-bold text-black">
        {ProductD?.description[0]?.children[0]?.text}
      </h2>
      <h2 className='text-gray-500'>
        {ProductD?.instantDelivery? 
          <BadgeCheck className='text-green-800'/>: <AlertOctagon className='text-red-900'/>}
        Eligible For Instant Delvivery
        </h2>
      <h2 className="text-2xl font-bold text-primary">{`$ ${ProductD?.price}`}</h2>

      <button className='flex gap-2 items-center bg-primary px-4 py-3 text-sm font-medium text-white shadow hover:bg-primary/50 focus:outline-none focus:ring active:bg-green-600 rounded-lg '>
        <ShoppingCart/>
        Add to Cart
      </button>

        </div>

        )}



    </div>
  )
}

export default ProductInfo