'use client'
import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import productApi from '../_utils/productApi'
function ProductSection() {
useEffect(() => {
  getProductsList()
},[]) 

const [productList, setProductList] = useState([])
  const getProductsList = async () => {
    productApi().then(res=>{
      console.log(res.data.data);
      setProductList(res.data.data)
    })
  }

  return (
    <div className='px-10 md:px-20'>
         <ProductList productList={productList}/>
    </div>
  )
}

export default ProductSection