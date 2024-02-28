import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ForgotPassword() {
    
  let nav = useNavigate()
    const HandleSubmit = async (event) => {
        const body = {
            'email': event.target[0].value
        };
        // https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords

        let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, body).catch((err) => {
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
            console.log(res);
            toast.success(`${res.data.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            document.getElementById("ResetForm").classList.remove("d-none")
            document.getElementById("ForgetForm").classList.add("d-none")
            // nav('/home')
        }
    }
    const HandleResetSubmit = async (event) => {
        const body = {
            'resetCode': event.target[0].value
        };

        let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, body).catch((err) => {
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
            console.log(res);
            toast.success(`Reset your password!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            nav('/ResetPassword')
        }
    }
    return (
        <>
        <div id='ForgetForm' className='mt-5'>
            <div className="container">
                <h2>please enter your Email</h2>
                <form onSubmit={HandleSubmit} className="">
                    <div className="d-flex align-items-center mb-3">
                        <label htmlFor="floatingInput">Email </label>{/**/}
                        <input type="email" id='floatingInput' placeholder="name@example.com" className="py-2 ms-3 form-control" />
                    </div>
                    <button type="submit" className="btn btn-lg me-auto btn-outline-success">verify</button>
                </form>
            </div>

        </div>
        <div id='ResetForm' className='mt-5 d-none'>
        <div className="container">
                <h2>please enter your verification code</h2>
                <form onSubmit={HandleResetSubmit} className="">
                    <div className="d-flex align-items-center mb-3">
                        <label htmlFor="floatingInput">Cpde </label>{/**/}
                        <input type="text" id='floatingInput' placeholder="Code" className="py-2 ms-3 form-control" />
                    </div>
                    <button type="submit" className="btn btn-lg me-auto btn-outline-success">verify</button>
                </form>
            </div>
        </div>
        </>
    )
}
