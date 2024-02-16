import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import useEmblaCarousel from 'embla-carousel-react'
import '../css/myStyleSheet.css'
import '../css/embla.css'
import Autoplay from 'embla-carousel-autoplay';
export default function carousel() {
    const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()])

    return (
        <div className='container'>
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    <div className="embla__slide"><img className='embla__slide__img' src="/images/1.jpg" /></div>
                    <div className="embla__slide"><img className='embla__slide__img' src="/images/2.png" /></div>
                    <div className="embla__slide"><img className='embla__slide__img' src="/images/3.png" /></div>
                    <div className="embla__slide"><img className='embla__slide__img' src="/images/4.png" /></div>
                    <div className="embla__slide"><img className='embla__slide__img' src="/images/5.png" /></div>
                    <div className="embla__slide"><img className='embla__slide__img' src="/images/6.png" /></div>
                    <div className="embla__slide"><img className='embla__slide__img' src="/images/7.png" /></div>
                    <div className="embla__slide"><img className='embla__slide__img' src="/images/8.png" /></div>
                    <div className="embla__slide"><img className='embla__slide__img' src="/images/9.jpeg" /></div>
                    <div className="embla__slide"><img className='embla__slide__img' src="/images/10.jpeg" /></div>
                </div>
            </div>
        </div>
    )
}