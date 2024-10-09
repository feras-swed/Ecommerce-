import React from 'react'
import ProductItem from './ProductItem'
function ProductList( {productList}) {
  return (
    <div>
    <h2 className='text-2xl font-bold text-black'  >Product List</h2>
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3' >
      {productList.map(product =>(
        <div key={product?.id} >
          <ProductItem product={product} />
          </div>))}
    </div>
          </div>
  )
}

export default ProductList