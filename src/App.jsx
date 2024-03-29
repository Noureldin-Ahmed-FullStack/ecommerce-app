import { useState,useContext,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { NavLink, RouterProvider, createHashRouter } from 'react-router-dom'
import Layout from './Components/Layout'
import PageMissing from './Components/PageMissing'
import MainPage from './Components/MainPage.jsx'
import Catrgories from './Components/Catrgories.jsx'
import FashionBrowser from './Components/FashionBrowser.jsx'
import Brands from './Components/Brands.jsx'
import MyContextProvider, { MyContext } from './Components/ContextProvider.jsx'
import { ToastContainer } from 'react-toastify'
import Register from './Components/Register.jsx'
import Login from './Components/Login.jsx'
import Product from './Components/Product.jsx'
import Wishlist from './Components/Wishlist.jsx'
import Cart from './Components/Cart.jsx'
import ForgotPassword from './Components/ForgotPassword.jsx'
import ResetPassword from './Components/ResetPassword.jsx'
import CheckOutSession from './Components/CheckOutSession.jsx'
import AllOrders from './Components/AllOrders.jsx'

function App() {
  
  
  let Routes = createHashRouter([
    {
      path: '/', element: <Layout />, children: [
        { path: "/", element: <MainPage /> },
        { path: "home", element: <MainPage /> },
        { path: "products", element: <FashionBrowser /> },
        { path: "Product", element: <Product /> },
        { path: "brands", element: <Brands /> },
        { path: "wishlist", element: <Wishlist /> },
        { path: "Cart", element: <Cart /> },
        { path: "catrgories", element: <Catrgories /> },
        { path: "checkOutSession/:id", element: <CheckOutSession /> },
        { path: "allorders", element: <AllOrders /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "forgotPassword", element: <ForgotPassword /> },
        { path: "ResetPassword", element: <ResetPassword /> },
        { path: "*", element: <PageMissing /> },
        
      ]
    },


  ])
  return (
    <MyContextProvider>
      <ToastContainer />
    <div>
      <RouterProvider router={Routes} />
    </div>
    </MyContextProvider>
  )
}

export default App
