import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CheckOutSession() {

    const { id } = useParams();

    const headers = {
        'token': localStorage.getItem('token'),
    };
    const baseUrl = window.location.origin;
    const HandleSubmit = async (event) => {
        event.preventDefault();
        const body = {
            shippingAddress:{
                "details": event.target[0].value,
                "phone": event.target[1].value,
                "city": event.target[2].value
                }
        };

        let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${baseUrl}/%23`, body,{ headers: headers }).catch((err) => {
            toast.error(err.response.data.message, {
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
        if (res) {

            console.log(res.data.session.url);
            window.location.href = res.data.session.url
            
        }
    }
    return (
        <div>

            <div className="container mt-5">
                <h2>please enter your Information</h2>
                <form onSubmit={HandleSubmit} className="">
                    <div className="align-items-center mb-3">
                        <label className='mt-2' htmlFor="details">Details </label>{/**/}
                        <input type="text" id='details' placeholder="details" className="py-2 my-2 form-control" />

                        <label className='mt-2' htmlFor="phone">Phone </label>{/**/}
                        <input type="text" id='phone' placeholder="phone" className="py-2 my-2 form-control" />

                        <label className='mt-2' htmlFor="city">City </label>{/**/}
                        <input type="text" id='city' placeholder="city" className="py-2 my-2 form-control" />

                    </div>
                    <button type="submit" className="btn btn-lg w-100 me-auto btn-outline-info">Pay now</button>
                </form>
            </div>
        </div>
    )
}
