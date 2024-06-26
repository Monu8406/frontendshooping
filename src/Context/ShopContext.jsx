import React, { createContext } from "react";
import { useState } from "react";

import { useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
  let cart = {};
  for(let index  = 0 ; index< 300 +1 ; index++){
    cart[index] = 0;
  }
  return cart;   
 }

export const ShopContextProvider = (props)=>{
  const [all_product,setall_product] = useState([]);
  const [cartItems,setcartItems] = useState(getDefaultCart());
  useEffect(()=>{
   fetch('https://backendshopping-qwex.onrender.com/allproducts')
   .then((response)=>response.json())
   .then((data)=>setall_product(data))

   
   if(localStorage.getItem('auth-token'))
   {
       fetch('https://backendshopping-qwex.onrender.com/getcart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },

        body:""
       }).then((response)=>response.json())
       .then((data)=>setcartItems(data))
   }
   },[])
  
   const addToCart = (itemId) =>{
    
       setcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
       console.log(cartItems);
      if(localStorage.getItem('auth-token')){
        fetch('https://backendshopping-qwex.onrender.com/addtocart',{
          method:'POST',
          headers:{
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
          },
          body:JSON.stringify({"itemId":itemId})
        })
        .then((response)=>response.json())
        .then((data)=>console.log(data))
      }
     }
     const removeFromCart = (itemId) =>{
     setcartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
      if(localStorage.getItem('auth-token')){
         fetch('https://shoppey-4.onrender.com',{
          method:'POST',
          headers:{
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
          },
          body:JSON.stringify({"itemId":itemId}),
         })
         .then((response)=>response.json())
         .then((data)=>console.log(data))
      }
     }


     
     const getTotalCartAmount = () =>{
      let totalAmount = 0;
      for(const item in cartItems)
      {
         if(cartItems[item]>0)
        {                
          let itemInfo = all_product.find((product)=>product.id===Number(item));
          console.log(itemInfo);
          totalAmount+= itemInfo.new_price * cartItems[item];
          }
        }    
      return totalAmount;
     }
     
    const getTotalCartItems = ()=>{
       let totalItem =0;
       for(const item in cartItems)
       {
        if(cartItems[item]>0)
        {
          totalItem += cartItems[item];
        }
       }
      return totalItem;
    }

     const contextValue = { getTotalCartItems,getTotalCartAmount,all_product , cartItems,addToCart,removeFromCart};
      console.log(cartItems);
     return (
        <ShopContext.Provider  value={contextValue}>
        {props.children}
        </ShopContext.Provider>
      )
}




