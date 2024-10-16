"use client"
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import productApi from '@/app/_utils/productApi';
import { useCartContext } from '@/app/_context/CardContext'; 
const CheckoutForm = ({amount}) => {

        const {cart, setCart} = useCartContext();
        const { user } = useUser();
        const stripe = useStripe();
        const elements = useElements();
        const [ setErrorMessage] = useState();
        const [ setLoading] = useState(false);

        const handleSubmit = async (event) => {
         
          // We don't want to let default form submission happen here,
          // which would refresh the page.
          event.preventDefault();
          
          if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form s  ubmission until Stripe.js has loaded.
            return;
          }
          const handleError = (error) => {
            setLoading(false);
            setErrorMessage(error.message);
          }

      // Create Order
          AddOrder();

     // Send Email
     await SendEmail({
      to: user.primaryEmailAddress.emailAddress,
      subject: 'تأكيد الطلب',
      firstName: user.firstName,
    }); 
    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

          const res = await fetch(`/api/create-intent`, {
            method: "POST",
            body: JSON.stringify({
              amount: amount,
            }),
          })

          const clientSecret = await res.json();
          const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            clientSecret,
            elements,
            confirmParams: {
              return_url: "http://localhost:3000/payment-confirm",
            },
          });
      
          if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
          } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
          }
        };
       async function deletCartItem(id){
          productApi.deleteCart(id).then( () =>{console.log(id)
              updateCartCount(); 
          }).catch(err => console.log("error:" + err));
      }

      async function AddOrder() {
        let productIDs = [];
      
        console.log(cart?.data);
        cart?.data.forEach(el => {
          console.log("هذا ايدي المنتج: " + el?.product?.documentId)
          productIDs.push(el?.product?.documentId)
        })
        const data = {
          data: {
            username: user.fullName,
            products: productIDs,
            email: user.primaryEmailAddress.emailAddress,
            amount
          }
        }
      
        try {
          const res = await productApi.AddOrder(data);
          if (res) {
            // انتظار انتهاء جميع عمليات الحذف
            await Promise.all(cart?.data.map(async (el) => {
              console.log("هذا ايدي السلة:  " + el?.documentId)
              await deletCartItem(el?.documentId); // انتظار انتهاء كل عملية حذف
            }));
      
            // تحديث حالة السلة بعد انتهاء جميع عمليات الحذف
            setCart();
      
            // إعادة التوجيه إلى صفحة إتمام الدفع
            // ...
          }
        } catch (error) {
          console.error("حدث خطأ أثناء إضافة الطلب أو حذف العناصر من السلة:", error);
          // معالجة الخطأ، مثل عرض رسالة خطأ للمستخدم
        }
      }


      async function SendEmail(userData) {
        try {
          const res = await fetch('/api/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
      
          if (res.ok) {
            console.log('تم إرسال البريد الإلكتروني بنجاح');
          } else {
            console.error('حدث خطأ أثناء إرسال البريد الإلكتروني');
          }
        } catch (error) {
          console.error('حدث خطأ أثناء إرسال البريد الإلكتروني:', error);
        }
      }
      


  return (
    <form onSubmit={handleSubmit}>
        <div className='mx-32 md:mx-[320px] mt-12'>

      <PaymentElement />

      <button className='bg-primary text-white px-4 py-2 rounded-md w-full mt-4'>Submit</button>
        </div>
    </form>
  );
};

export default CheckoutForm;