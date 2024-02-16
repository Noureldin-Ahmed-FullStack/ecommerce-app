
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context
export let MyContext = createContext();


export default function MyContextProvider(props) {
  const [userObj, setUserObj] = useState();
  const [wishlist, setWishlist] = useState();
  const [cart, setCart] = useState();


  const contextValue = {
    userObj,
    setUserObj,
    wishlist,
    setWishlist,
    cart,
    setCart
  };
 
  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  )
}
