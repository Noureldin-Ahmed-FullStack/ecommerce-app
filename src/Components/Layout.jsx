import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import MyCarousel from './MyCarousel'
import EmblaCarousel from '../js/EmblaCarousel.jsx'
import { MyContext } from './ContextProvider.jsx'

import { jwtDecode } from "jwt-decode";
import axios from 'axios'




export default function Layout() {
  const { userObj, setUserObj } = useContext(MyContext);
  const { wishlist, setWishlist } = useContext(MyContext);
  useEffect(() => {
    const token = localStorage.getItem('token');
    try {

      const decoded = jwtDecode(token)
      setUserObj(decoded)
      console.log(decoded);
    } catch (error) {
      setUserObj(null)
      console.log("error: user not logged");

    }
    const headers = {
      'token': token,
    };
    axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers: headers })
      .then(response => {
        console.log('wishlist:', response.data.data);
        setWishlist(response.data.data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [])
  const imageData = [
    { id: 1, imageUrl: 'url_to_image_1.jpg', caption: 'First Image' },
    { id: 2, imageUrl: 'url_to_image_2.jpg', caption: 'Second Image' },
    // Add more image objects as needed
  ];
  return (
    <div>
      <Navbar />
      <Outlet />

    </div>
  )
}
