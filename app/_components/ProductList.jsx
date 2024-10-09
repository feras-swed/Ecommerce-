import React from 'react'
import ProductItem from './ProductItem'
import Link from 'next/link';

function ProductList({ productList }) {
  return (
    <div>
      <h2 className='text-2xl font-bold text-black'>Product List</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
        {productList.map((product) => (
          <Link href={`/Product-Details/${product.documentId}`} key={product?.id}> 
            <div> {/* استخدم div كعنصر قابل للنقر */}
              <ProductItem product={product} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
