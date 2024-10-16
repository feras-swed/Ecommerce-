"use client";
import productApi from "@/app/_utils/productApi";
import { useState, useEffect } from "react";
import BreadCrumb from "@/app/_components/BreadCrumb";
import ProductInfo from "@/app/Product-Details/[ProductID]/_components/ProductInfo";
import PrudactBaner from "@/app/Product-Details/[ProductID]/_components/PrudactBaner";
import ProductList from "@/app/_components/ProductList";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

interface Product {
  id: number;
  title: string;
  category: {
    data: {
      id: number;
      // ... other category properties
    };
  };
  // ... other product properties
}
interface Params {
  ProductID: string; // Or number, depending on your route setup
}

export default function ProductDetails({ params }: { params: Params }) {
  const path = usePathname();
  const pathArra = path?.split("/");

  const [ProductDetails, setProductDetails] = useState<Product | null>(null);
  const [ProductLestcategory, setProductLestcategory] = useState([]);

  //  لفّ  getProductById  باستخدام  useCallback
  const getProductById = useCallback(() => {
    productApi
      .gitProductById(params?.ProductID)
      .then((res) => setProductDetails(res.data.data));
  }, [params.ProductID]); //  تُراقب  params.ProductID  فقط

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getProductById();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
    fetchData();
  }, [params.ProductID, getProductById]);

 //  لفّ  getProductsListBycategory  باستخدام  useCallback
 const getProductsListBycategory = useCallback(async () => {
  productApi
    .gitProductByCategory(ProductDetails?.category)
    .then((res) => setProductLestcategory(res.data.data));
}, [ProductDetails?.category]); //  تُراقب  ProductDetails?.category  فقط




useEffect(() => {
  // useEffect جديدة
  if (ProductDetails) {
    // تأكد من وجود productDetails
    getProductsListBycategory();
  }
}, [ProductDetails, getProductsListBycategory]); //  لا تزال  getProductsListBycategory  كتبعية



  return (
    <div className="px-10 md:px-20 py-8 ">
      <BreadCrumb path={[pathArra[1], ProductDetails?.id]} />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10   md:flex-row justify-around  gap-10">
        <PrudactBaner ProductD={ProductDetails} />
        <ProductInfo ProductD={ProductDetails} />
      </div>

      <h2 className="mt-24 texet-xl text-black">Simlir Product</h2>

      <ProductList productList={ProductLestcategory} />
    </div>
  );
}
