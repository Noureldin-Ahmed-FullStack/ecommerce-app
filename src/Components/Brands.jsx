import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyModal from './MyModal'

export default function Brands() {

    const [Brands, setBrands] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [brandName, setBrandName] = useState("");
    const openModal = (brand) => {
        setBrandName(brand)
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
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

            <h1 className='text-success text-center'>All Brands</h1>

            <div className='mt-5' >
                <div>
                    <MyModal isOpen={modalIsOpen} closeModal={closeModal} brand={brandName}/>
                    
                </div>
                <div className='row g-4'>
                    {
                        Brands.map((brand) => (
                            <div key={brand._id} onClick={()=>openModal(brand)} className='col-md-6 col-lg-3 rounded-2 brandCard myCard'>
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
