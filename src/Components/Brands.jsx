import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function Brands() {
    
    const [Brands, setBrands] = useState([])
    useEffect(() => {
        axios.get('https://ecommerce.routemisr.com/api/v1/brands')
            .then(function (response) {
                // handle success
                setBrands(response.data.data);
                console.log(response.data.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, []); 
    return (
        <div className='container my-5'>
            <div className='mt-4 w-100 d-flex justify-content-center'>
            <input placeholder='search' type="search" className='form-control w-75' />
            </div>

            <div className='mt-5' >
                <div className='row g-4'>
                   {
                    Brands.map((brand) => (
                        <div key={brand._id} className='col-md-6 col-lg-3 rounded-2 myCard'>
                        <div className="card">
                            <div>
                                <img className="card-img-top CardImgHeight" src={brand.image} alt="Card image" />
                                <div className="card-body d-flex justify-content-center">
                                    <p className="card-title twoLinesMax">{brand.name}</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    ))
                   }
                   
                   
                   
                </div>
            </div>
        </div >
    )
}
