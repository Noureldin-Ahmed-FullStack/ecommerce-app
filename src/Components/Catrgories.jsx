import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'

export default function Catrgories() {
    const [catrgories, setCatrgories] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCatrgories, setSelectedCatrgories] = useState([])
    const [selectedCatrgorieName, setSelectedCatrgorieName] = useState([])
    const filteredData = catrgories.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleSearch = (event) => {
        setSearchQuery(event.target.value); // Update search query state
    };
    useEffect(() => {
        axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            .then(function (response) {
                // handle success
                setCatrgories(response.data.data);
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

    const handleSubCatClick = async (id, name) => {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
            // handle success
            setSelectedCatrgories(response.data.data);
            setSelectedCatrgorieName(name)
            console.log(response.data.data);
        } catch (error) {
            // handle error
            console.error(error);
        } finally {
            // always executed
            console.log("Request completed");
        }
    };
    return (
        <div className='container'>
            <input type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className='form-control mt-4' />

            <div className='mt-5' >
                <div className='row g-4'>
                    {
                        filteredData.map((catrgories) => (
                            <div key={catrgories._id} onClick={() => handleSubCatClick(catrgories._id, catrgories.name)} className='col-md-6 col-lg-3 rounded-2 myCard'>
                                <div className="card p-3">
                                    <div>
                                        <img className="card-img-top CardImgHeight" src={catrgories.image} alt="Card image" />
                                        <div className="card-body lineHeight ">
                                            <h3 className="card-title text-center text-success cursor-pointer">{catrgories.name}</h3>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='w-100 mt-5 d-flex justify-content-center align-items-center '>
                <h1 className='text-success'>{selectedCatrgorieName}</h1>
            </div>
            <div className='my-5'>
                <div className='row g-4'>
                    {
                        selectedCatrgories.map((selectedCatrgories) => (
                            <div key={selectedCatrgories._id} className='col-md-6 col-lg-3 rounded-2 myCard cursor-pointer'>
                                <div className="card">
                                    <div>
                                        <div className="card-body d-flex align-items-center justify-content-center lineHeight ">
                                            <h3 className="card-title text-center">{selectedCatrgories.name}</h3>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div >
        </div>
    )
}
