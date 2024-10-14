"use client";
import { createContext, useState, useContext, useEffect } from 'react';
import { useUser } from '@clerk/nextjs'
import productApi from '@/app/_utils/productApi';


// 1. إنشاء سياق
export const CartContext = createContext({
  cartCount: {}, // القيمة الافتراضية
  updateCartCount: () => {}, // دالة فارغة كقيمة افتراضية
});




// 2. إنشاء مكون المُزود (Provider)
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(CartContext);
  const {user} = useUser();

  //  استخدام useEffect للحصول على عدد المنتجات من قاعدة البيانات  عند تحميل الصفحة.
  useEffect(() => {
    const fetchCartCount = async () => {
        //يجب التأكد من أن window موجود، وهذا يحدث فقط في بيئة المتصفح.
            try {
                
                const data = await productApi.getCart(user.primaryEmailAddress.emailAddress);
                console.log("هذه هي بيانات الكارد "+data.data)
                setCartCount(data.data);
            } catch (error) {
                console.error('خطأ أثناء جلب عدد المنتجات من الخادم:', error);
            }
        
    };
    if (user) { // احصل على  عدد  المنتجات فقط إذا كان  المستخدم  مسجلاً  الدخول.
      fetchCartCount();
    }

  }, [user]); // سيتحرك الـ useEffect مرة واحدة فقط عند تحميل  الصفحة.


  const updateCartCount = async () => {try {
    const data = await productApi.getCart(user.primaryEmailAddress.emailAddress);
    setCartCount(data.data ?? 0)
    console.log(" تم تحديث  بيانات الكارد "+data.data); // باستخدام optional chaining و nullish coalescing operator
} catch (error) {
    console.error('خطأ أثناء جلب عدد المنتجات:', error);
    //معالجة   الأخطاء،   مثل    وضع     رسالة   خطأ   للمستخدم
}
    };

  const value = { cartCount, updateCartCount };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
      throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
  };
