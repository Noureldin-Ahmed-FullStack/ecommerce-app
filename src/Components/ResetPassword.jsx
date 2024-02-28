import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  
  let nav = useNavigate()
  const HandleResetSubmit = async (event) => {
    const body = {
        'email': event.target[0].value,
        'newPassword': event.target[1].value
    };

    let res = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, body).catch((err) => {
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
        toast.success(`Password Reset successfully`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        nav('/login')

    }
}
  return (
    <div id='ForgetForm' className='mt-5'>
            <div className="container">
                <h2>Reset your Password!</h2>
                <form onSubmit={HandleResetSubmit} className="">
                    <div className=" align-items-center mb-3">
                        <label htmlFor="floatingInput">Email </label>
                        <input type="email" id='floatingInput' placeholder="name@example.com" className="py-2 my-2 form-control" />
                    
                        <label htmlFor="newPassword">newPassword </label>
                        <input type="password" id='newPassword' placeholder="Name1234" className="py-2 my-2 form-control" />
                    
                    </div>
                    <button type="submit" className="btn btn-lg me-auto btn-outline-success">verify</button>
                </form>
            </div>

        </div>
  )
}
