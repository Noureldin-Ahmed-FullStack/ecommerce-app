import React, { useContext, useEffect, useState } from 'react'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loading from './Loading'
import { MyContext } from './ContextProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
export default function Wishlist() {

  const { wishlist, setWishlist } = useContext(MyContext);
  const [Pending, setPending] = useState(true)
  const headers = {
    'token': localStorage.getItem('token'),
  };

  useEffect(() => {
    getWishlist()
  }, [])

  const getWishlist = async() => {
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
  const removeFromWishlist = (prodID) => {
    setPending(true)
    axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodID}`, { headers: headers })
      .then(response => {
        console.log('Response:', response.data);
        getWishlist()
        setPending(false)
        toast.success("Removed from Wishlist successfuly!", {
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
  // if (Pending) {
  //   return (
  //     <Loading />
  //   )
  // }
  return (
    <>
    {Pending?(
      <Loading />
    ):(
      <></>
    )}
    <div className='container'>
      <div className="d-flex justify-content-between mt-4 mb-4">
        <h1> My wish List</h1>
      </div>
      {wishlist ? (
        <div>
          {wishlist.map(item => (
            <div key={item.id}>
              <div className="row border-bottom my-3 d-flex align-items-center p-2 ng-star-inserted">
                <div className="col-md-2">
                  <img className="w-100" src={item.imageCover} />
                </div><div className="col-md-10 d-flex justify-content-between"><div>
                  <h5>{item.title}</h5>
                  <h6 className="text-success">{item.price} EGP</h6>
                  <button onClick={() => removeFromWishlist(item.id)} className="btn btn-sm m-0 p-0 text-danger">
                    <FontAwesomeIcon className='text-danger pe-2' icon={fa.faTrash} /> Remove
                  </button>
                </div>
                  <div>
                    <button className="btn-count btn-outline-success btn btn-lg d-block mx-auto"> add To Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
    </>
  )
}
