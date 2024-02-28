import axios from 'axios';
import { useFormik, validateYupSchema } from 'formik';
import { React, useState } from 'react'
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import * as fa from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Register() {
  const [loading, setloading] = useState(false)
  const [userDataErrors, setuserDataErrors] = useState("")
  let nav = useNavigate()

  const signUpSchemaValidation = Yup.object().shape({
    name: Yup.string().min(2, "Name must be at least 2 characters").max(20, "Name must cant be more than 20 characters").required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required").matches(/[A-Z][a-z0-9]{3,16}$/,"Enter a strong password"),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Confirmation password is required"),
    phone: Yup.string().required("Phone is required").matches(/^01[1250][0-9]{8}$/,"phone not valid"),
  });
  let RegistrationForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }, validationSchema: signUpSchemaValidation,
    validate: () => { },
    onSubmit: (data) => {
      signUp(data)
    }
  })
const signUp = async(data)=>{
  setloading(true)
  let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,data).catch((err)=>{
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
    console.log(res);
    toast.success("Registered!", {
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
    nav('/login')
  }
}


  return (
    <div className='container d-flex justify-content-center'>
      <div className='w-100 p-3 mt-5'>
        <h1 className=''>Register now!</h1>        
        <div className='bg-danger-subtle rounded-3'>
        {userDataErrors?(<h4 className='text-danger-emphasis p-2'>{userDataErrors}!</h4>):(<></>)}
          
        </div>
        <form onSubmit={RegistrationForm.handleSubmit} className='w-100'>
          <label htmlFor="name">Name:</label>
          <input onChange={RegistrationForm.handleChange} className='form-control' name='name' type="text" />
          <p className='text-danger-emphasis m-0'>{RegistrationForm.errors.name}</p>

        <label htmlFor="name">Email:</label>
        <input onChange={RegistrationForm.handleChange} className='form-control' name='email' type="email" />
        <p className='text-danger-emphasis m-0'>{RegistrationForm.errors.email}</p>
        <label htmlFor="name">password:</label>
        <input onChange={RegistrationForm.handleChange} className='form-control' name='password' type="password" />
        <p className='text-danger-emphasis m-0'>{RegistrationForm.errors.password}</p>
        <label htmlFor="name">confirmation password:</label>
        <input onChange={RegistrationForm.handleChange} className='form-control' name='rePassword' type="password" />
        <p className='text-danger-emphasis m-0'>{RegistrationForm.errors.rePassword}</p>
        <label htmlFor="name">Phone:</label>
        <input onChange={RegistrationForm.handleChange} className='form-control' name='phone' type="tel" />
        <p className='text-danger-emphasis m-0'>{RegistrationForm.errors.phone}</p>
        <div className='w-100 d-flex justify-content-end'>
          {!loading?(<button className='btn btn-outline-secondary mt-2' type='submit'>Register</button>):(
            <button className='btn btn-secondary mt-2' type='button'>
              <FontAwesomeIcon className=' spinning' icon={fa.faSpinner} />
            </button>
          )}          
        </div>
      </form>
    </div>
    </div>
  )
}
