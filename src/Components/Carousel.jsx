import React, { useState } from 'react';

import * as fa from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <div className="carousel">
            <img className='rounded-3' src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
            <div className='d-flex justify-content-center mt-2'>
                <div className='glow cursor-pointer text-success rounded-5 px-1 mx-2' onClick={prevSlide}><FontAwesomeIcon icon={fa.faArrowLeft} /></div>
                <div className='glow cursor-pointer text-success rounded-5 px-1 mx-2' onClick={nextSlide}><FontAwesomeIcon icon={fa.faArrowRight} /></div>
            </div>

        </div>
    );
};

export default Carousel;
