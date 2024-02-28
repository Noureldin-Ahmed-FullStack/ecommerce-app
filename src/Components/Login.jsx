import axios from 'axios';
import { useFormik, validateYupSchema } from 'formik';
import { React,useContext, useState } from 'react'
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import * as fa from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MyContext } from './ContextProvider';

import { jwtDecode } from "jwt-decode";
export default function Login() {
  const [loading, setloading] = useState(false)
  const [userDataErrors, setuserDataErrors] = useState("")
  
  const { userObj, setUserObj } = useContext(MyContext);
  let nav = useNavigate()
  const signUpSchemaValidation = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required").matches(/[A-Z][a-z0-9]{3,16}$/,"Enter a strong password, passwords need to start with an uppercase character"),
  });
  let RegistrationForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    }, validationSchema: signUpSchemaValidation,
    validate: () => { },
    onSubmit: (data) => {
      signUp(data)
    }
  })
const signUp = async(data)=>{
  setloading(true)
  let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,data).catch((err)=>{
    setuserDataErrors(err.response.data.message)
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
    setloading(false)
  })
  // https://ecommerce.routemisr.com/api/v1/auth/signup
  if (res) {
    console.log(res.data.token);
    toast.success("Logged in!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setloading(false)
    localStorage.setItem('token',res.data.token)
    try {
      
      const decoded = jwtDecode(res.data.token)
      setUserObj(decoded)
      console.log(decoded);
    } catch (error) {
      setUserObj(null)
      
    }
    nav('/home')
  }
}


  return (
    <div className='container d-flex justify-content-center'>
      <div className='w-100 p-3 mt-5'>
        <h1 className=''>Login now!</h1>        
        <div className='bg-danger-subtle rounded-3'>
        {userDataErrors?(<h4 className='text-danger-emphasis p-2'>{userDataErrors}!</h4>):(<></>)}
          
        </div>
        <form onSubmit={RegistrationForm.handleSubmit} className='w-100'>
         
        <label htmlFor="name">Email:</label>
        <input onChange={RegistrationForm.handleChange} className='form-control' name='email' type="email" />
        <p className='text-danger-emphasis m-0'>{RegistrationForm.errors.email}</p>
        <label htmlFor="name">password:</label>
        <input onChange={RegistrationForm.handleChange} className='form-control' name='password' type="password" />
        <p className='text-danger-emphasis m-0'>{RegistrationForm.errors.password}</p>
        <div className='w-100 mt-3 d-flex justify-content-between align-items-center'>
          <Link to={"/forgotPassword"} className='ForgotPassword'>Forgot your Password?</Link>
          {!loading?(<button className='btn btn-outline-secondary mt-2' type='submit'>Log in</button>):(
            <button className='btn btn-secondary mt-2' type='button'>
              <FontAwesomeIcon className='spinning' icon={fa.faSpinner} />
            </button>
          )} 
        </div>
      </form>
    </div>
    </div >
  )
}
