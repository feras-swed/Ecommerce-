"use client"
import React from 'react'
import { AlertOctagon, ShoppingCart,BadgeCheck } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import productApi from "@/app/_utils/productApi"
import { useCartContext } from '@/app/_context/CardContext';
function ProductInfo({ProductD}) {
    const {user} = useUser();
    const ruter = useRouter();
    const { cartCount, updateCartCount } = useCartContext();
    const HandleAddToCart = ()=>{
        if(!user){
            ruter.push('/sign-in')
            
        }
        else{
            const data = {
              data:{

                  username : user.fullName,
                    products: [ProductD?.documentId],
                    email: user.primaryEmailAddress.emailAddress
                }
            }
            productApi.addToCarde(data).then( () =>{console.log(cartCount)
                updateCartCount(); 
            }).catch(err => console.log("error:" + err));
        }
    }

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

      <button onClick={() => HandleAddToCart(ProductD?.documentId)} className='flex gap-2 items-center bg-primary px-4 py-3 text-sm font-medium text-white shadow hover:bg-primary/50 focus:outline-none focus:ring active:bg-green-600 rounded-lg '>
        <ShoppingCart/>
        Add to Cart
      </button>

        </div>

        )}



    </div>
  )
}

export default ProductInfo