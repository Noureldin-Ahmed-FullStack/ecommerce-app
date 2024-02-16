import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Carousel from './Carousel';
import axios from 'axios';
import * as fa from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MyContext } from './ContextProvider';
import { toast } from 'react-toastify';
import Loading from './Loading';

export default function Product() {

    const { cart, setCart } = useContext(MyContext);
    const { wishlist, setWishlist } = useContext(MyContext);
    const [Pending, setPending] = useState(false)
    const [prod, setProd] = useState()
    const [pics, setpics] = useState()
    const location = useLocation();
    useEffect(() => {
        if (location.state && location.state.prod) {
            setProd(location.state.prod)
            console.log(location.state.prod);
            const arr = []
            for (let i = 0; i < location.state.prod.images.length; i++) {
                arr.push(location.state.prod.images[i])
            }
            setpics(arr)
        }
    }, [location])
    const headers = {
        'token': localStorage.getItem('token'),
    };
    function checkWishlist(array, insertedId) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === insertedId) {
                return true; // Return true if the inserted ID matches any ID in the array
            }
        }
        return false; // Return false if no match is found
    }
    const getWishlist = () => {
        axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers: headers })
          .then(response => {
            console.log('wishlist:', response.data.data);
            setWishlist(response.data.data)
            setPending(false)
          })
          .catch(error => {
            console.error('Error:', error);
            setPending(false)
          });
      }
    const addToWishlist = (data) => {
        setPending(true)
        const body = {
            productId: data
        }
        console.log(body);
        axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', body, { headers: headers })
            .then(response => {
                console.log('Response:', response.data);
                getWishlist()
                toast.success("Added to Wishlist!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
            })
            .catch(error => {
                console.error('Error:', error);
                setPending(false)
            });
    }
    const getCart = () => {
        axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers: headers })
          .then(response => {
            console.log('cart:', response.data.data);
            setCart(response.data.data)
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    const addToCart = (data) => {
        setPending(true)
        const body = {
            productId: data
        }
        console.log(body);
        axios.post('https://ecommerce.routemisr.com/api/v1/cart', body, { headers: headers })
            .then(response => {
                console.log('Response:', response.data);
                getCart()
                toast.success("Added to cart!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  setPending(false)
            })
            .catch(error => {
                setPending(false)
                console.error('Error:', error);
            });
    }
    
    const removeFromWishlist = (prodID) => {
        axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodID}`, { headers: headers })
          .then(response => {
            console.log('Response:', response.data);
            getWishlist()
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    return (
        <>
        {Pending?(
          <Loading />
        ):(
          <></>
        )}
        <div className='container'>
            <div className='d-flex justify-content-center align-items-center  '>
                <div className=' w-100 row'>
                    <div className='col-sm-4 '>
                        {/* <img className='w-100' src={prod.images[0]} alt="" /> */}
                        {pics ? (<Carousel images={pics} />) : (<></>)}

                    </div>
                    <div className='col-sm-8 '>
                        <div className='h-100 w-100 d-flex align-items-center'>
                            <div className='w-100'>
                                <h1>{prod?.title}</h1>
                                <p>{prod?.description}</p>
                                <div className='d-flex justify-content-between'>
                                    <p>{prod?.price} Egp.</p>
                                    <p><FontAwesomeIcon className='gold pe-2' icon={fa.faStar} />{prod?.ratingsAverage}</p>
                                </div>
                                <div className='d-flex justify-content-between mt-4'>
                                    <p></p>
                                    <button onClick={() => addToCart(prod?._id)} className='btn btn-success px-5' >+ Add to cart</button>
                                    
                                    <h2><FontAwesomeIcon onClick={() => addToWishlist(prod?._id)} className='text-dark cursor-pointer pe-2' icon={fa.faHeart} /></h2>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
