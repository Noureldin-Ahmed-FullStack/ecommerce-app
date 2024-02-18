import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Loading from './Loading'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { MyContext } from './ContextProvider'

export default function FashionBrowser() {
    const { cart, setCart } = useContext(MyContext);
    const { wishlist, setWishlist } = useContext(MyContext);
    const [products, setProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [Pending, setPending] = useState(false)
    const headers = {
        'token': localStorage.getItem('token'),
    };
    useEffect(() => {
        setPending(true)
        axios.get('https://ecommerce.routemisr.com/api/v1/products')
            .then(function (response) {
                // handle success
                setProducts(response.data.data);
                setPending(false)
                console.log(response.data.data);
            })
            .catch(function (error) {
                // handle error
                setPending(false)
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, []);
    const filteredData = products.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleSearch = (event) => {
        setSearchQuery(event.target.value); // Update search query state
    };
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
                const cartObj = response.data.data
                cartObj.numOfCartItems = response.data.numOfCartItems
                setCart(cartObj)
                setPending(false)
            })
            .catch(error => {
                console.error('Error:', error);
                setPending(false)
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



    let navigate = useNavigate();
    const goToProductPage = (prod) => {
        navigate("/Product", { state: { prod: prod } });
    };
    return (
        <>
            {Pending ? (
                <Loading />
            ) : (
                <></>
            )}
            <div className='container my-5'>
                {Pending ? (
                    <Loading />
                ) : (
                    <></>
                )}
                <div className='mt-4 w-100 d-flex justify-content-center'>
                    <input type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch} className='form-control w-75' />
                </div>

                <div className='mt-5' >
                    <div className='row g-4'>
                        {
                            filteredData.map((product) => (
                                <div key={product._id} className='col-md-6 col-lg-3 rounded-2 myCard'>
                                    <div className="card p-3">
                                        <div>
                                            <img onClick={() => goToProductPage(product)} className="card-img-top cursor-pointer CardImgHeight" src={product.imageCover} alt="Card image" />
                                            <div className="card-body">
                                                <p className="card-text text-success">{product.category.name}</p>
                                                <h3 onClick={() => goToProductPage(product)} className="card-title cursor-pointer twoLinesMax">{product.title}</h3>
                                                <div className='d-flex justify-content-between pb-3'><span className="card-text">{product.price} egp.</span><span className="card-text"><FontAwesomeIcon className='RatingStar' icon={fa.faStar} />{product.ratingsAverage}</span></div>
                                                <div className='w-100 d-flex'>
                                                    <button href="#" onClick={() => addToCart(product?._id)} className="btn btn-success w-75">+ Add to cart</button>
                                                    <div className='w-25 d-flex justify-content-center align-items-center'>
                                                        <span><FontAwesomeIcon onClick={() => addToWishlist(product?._id)} className='heart' icon={fa.faHeart} /></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }



                    </div>
                </div>
            </div >
        </>
    )
}
