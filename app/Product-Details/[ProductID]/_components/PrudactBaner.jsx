import React from 'react'
import Image from 'next/image'
function PrudactBaner({ProductD}) {
  return (
    <div>
    
    {ProductD?.banner?.url ?
 
        //  التحقق من وجود رابط البانر
        <Image 
          src={`http://localhost:1337${ProductD.banner.url}`}
          alt="product"
          width={600}
          height={400}
          className="rounded-lg h-[350px]  object-cover"
        />

    :
    
    <div className='h-[350px] w-[600px] bg-slate-200 rounded-lg animate-pulse' ></div>
    }
       
    </div>

  )
}

export default PrudactBaner