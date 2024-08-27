import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart
}
export const ShopContextProvider = (props) => {

  const [all_product, setAll_Product] = useState([])
  const [cartItems, setCartItems] = useState(getDefaultCart())

  useEffect(() => {
    fetch('https://ecommerce-projeto-aulaa.vercel.app/allproducts')
    .then((response) => response.json())
    .then((data) => setAll_Product(data))

    if(localStorage.getItem('auth-token')){
      fetch('https://ecommerce-projeto-aulaa.vercel.app/getcart', {
        method: "POST",
        headers:{
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: ""
      }).then((response) => response.json())
      .then((data) => setCartItems(data))
    }
  },[])


  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if(localStorage.getItem('auth-token')){
      fetch ('https://ecommerce-projeto-aulaa.vercel.app/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({"itemId": itemId})
      })
      .then((response) => response.json())
      .then((data) => console.log(data));
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if(localStorage.getItem('auth-token')){
      fetch ('https://ecommerce-projeto-aulaa.vercel.app/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({"itemId": itemId})
      })
      .then((response) => response.json())
      .then((data) => console.log(data));
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo && !isNaN(itemInfo.new_price) && !isNaN(cartItems[item])) {
          totalAmount += itemInfo.new_price * cartItems[item];
        } else {
          console.error("Erro: Valor não numérico encontrado em itemInfo.newprice ou cartItems[item]");
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () =>{
    let totalItem = 0
    for(const item in cartItems){
      if(cartItems[item]>0){
        totalItem+=cartItems[item]
      }
      console.log(totalItem)

    }
    return totalItem
  }
  

  const contextValue = { getTotalCartItems,all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount }

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
