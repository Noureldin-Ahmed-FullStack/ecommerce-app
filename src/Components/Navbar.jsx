import React, { useContext, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/myStyleSheet.css'
import { MyContext } from './ContextProvider'

export default function Navbar() {

    const { userObj, setUserObj } = useContext(MyContext);
    const logOut = ()=>{
        setUserObj(null)
        localStorage.clear('token')
    }
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand ps-2 ms-5 d-flex align-content-center" >
                <FontAwesomeIcon className='myNavIcon me-1' icon={fa.faCartShopping} />
                <NavLink className="nav-link" to=""><h3>fresh cart</h3></NavLink>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse justify-content-evenly " id="navbarNavAltMarkup">{/*bg-primary*/}
                <div></div>
                <ul className="navbar-nav ">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="Home">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="cart">cart</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="wishlist">wishlist</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="products">products</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="catrgories">catrgories</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="brands">brands</NavLink>
                    </li>
                </ul>
                <div className='d-flex justify-content-center'>
                    <ul className="navbar-nav d-flex align-items-center">
                        <li className='text-center'>
                            <div className="position-relative">
                                <FontAwesomeIcon className='cartIcon' icon={fa.faCartShopping} />
                                <i className="fas fa-bell"></i>
                                <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                                    3
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </div>
                        </li>
                        {userObj ? (
                            <li className='text-center mt-2 ms-4'>
                                <button onClick={logOut} className="btn">log out</button>
                            </li>

                        ) : (
                            <>
                                <li className='text-center mt-2 ms-4'>
                                    <NavLink className="nav-link" to="logIn">Log In</NavLink>
                                </li>
                                <li className='text-center mt-2 ms-4'>
                                    <NavLink className="nav-link" to="Register">Register</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>




    )
}
