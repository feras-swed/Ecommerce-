import React from 'react'
import Image from 'next/image'
import { List } from 'lucide-react'
function ProductItem({product}) {
  return (

<div className=" p-1 hover:cursor-pointer hover:shadow-lg hover:rounded-lg hover:border-primary hover:border-2">

      {product?.banner?.url && ( //  التحقق من وجود رابط البانر
        <Image 
          src={`http://localhost:1337${product.banner.url}`}
          alt="product"
          width={400}
          height={350}
          className="rounded-t-lg h-[170px] object-cover"
        />
      )}

<div className="bg-slate-100 flex justify-between items-center p-3 ">


      <div className=''>
        <h2 className="text-[14px] font-bold text-black line-clamp-1"   >
          {product?.title}
        </h2>
        <h2 className="text-[10px] font-bold text-gray-400 flex gap-1 items-center">
        <List className='h-4 w-4' />
          {product?.category}</h2>
      </div>

      <h2 className="text-[14px] font-bold text-black">{product?.price}</h2>


</div>
    </div>
  )
}

export default ProductItem