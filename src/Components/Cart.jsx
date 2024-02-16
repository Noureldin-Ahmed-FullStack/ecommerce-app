import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import Loading from './Loading';
import * as fa from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify';

export default function Cart() {
    const { cart, setCart } = useContext(MyContext);
    const [Pending, setPending] = useState(true)
    const headers = {
        'token': localStorage.getItem('token'),
    };
    const getCart = () => {
        axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers: headers })
            .then(response => {
                console.log('cart:', response.data.data);
                setCart(response.data.data)
                setPending(false)
            })
            .catch(error => {
                console.error('Error:', error);
                setPending(false)
            });
    }
    const removeFromCart = (prodID) => {
        console.log("id " + prodID);
        setPending(true)
        axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodID}`, { headers: headers })
            .then(response => {
                console.log('Response:', response.data);
                getCart()
                setPending(false)
                toast.success("Removed from cart successfuly!", {
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
    const UpdateQuantity = (prodID,count,op) => {
        setPending(true)
        const body = {
            'count': count + op,
        };
        axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodID}`,body, { headers: headers })
            .then(response => {
                console.log('Response:', response.data);
                getCart()
                setPending(false)
            })
            .catch(error => {
                console.error('Error:', error);
                setPending(false)
            });
    }
    useEffect(() => {
        getCart()
        return () => {
        }
    }, [])

    return (
        <>
            {Pending ? (
                <Loading />
            ) : (
                <></>
            )}
            <div className='container mt-4'>
                <div className="d-flex justify-content-between mt-4">
                    <h1> Your Cart</h1> <button className='btn btn-primary px-5 py-0'><FontAwesomeIcon className=' pe-2' icon={fa.faCartShopping} />Check out</button>
                </div>
                {cart ? (
                    <div>
                        {cart.products.map(item => (
                            <div key={item._id}>
                                <div className="row border-bottom my-3 d-flex align-items-center p-2 ng-star-inserted">
                                    <div className="col-4 col-md-2 ">
                                        <img className="w-100" src={item.product.imageCover} />
                                    </div>
                                    <div className="col-8 col-md-10  d-flex justify-content-between"><div>
                                        <h5>{item.product.title}</h5>
                                        <h6 className="text-success">{item.price} EGP</h6>
                                        <button onClick={() => removeFromCart(item.product._id)} className="btn btn-sm m-0 p-0 text-danger">
                                            <FontAwesomeIcon className='text-danger pe-2' icon={fa.faTrash} /> Remove
                                        </button>
                                    </div>
                                        <div className='d-flex align-items-center'>
                                            <div onClick={()=>UpdateQuantity(item.product._id,item.count,-1)} className='btn btn-outline-success mx-1'>-</div>
                                            <div className='px-3'>{item.count}</div>
                                            <div onClick={()=>UpdateQuantity(item.product._id,item.count,1)} className='btn btn-outline-success mx-1'>+</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div></div>
                )}
                <div className='d-flex w-100 justify-content-center'>
                    <button className='mt-2 mb-5 btn btn-outline-danger w-50'><FontAwesomeIcon className='pe-2' icon={fa.faTrash} />Clear you Cart</button>
                </div>
            </div>
        </>
    )
}
