'use client';
import React, { useRef } from 'react'
import Slider from 'react-slick';
const testimonialImage = '/assets/images/influencers-page/testimonial-img.png';
import {
    BsChevronLeft,
    BsChevronRight
} from 'react-icons/bs';
import { Rating, ThinStar } from '@smastrom/react-rating';
import Img from '@/components/ui/Img';
const Testimonials = () => {
    const myStyles = {
        itemShapes: ThinStar,
        activeFillColor: '#ffb700',
        // inactiveFillColor: '#f0b92cff',

    }
    const sliderRef = useRef(null);
    var settings = {
        dots: true,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,

        appendDots: dots => (
            <div className="nav-container">
                <div className="prev-wrapper">
                    <button className="slick-prev-custom" onClick={() => sliderRef.current.slickPrev()}>
                        <BsChevronLeft />
                    </button>
                </div>

                <div className="dots-wrapper">
                    <ul>{dots}</ul>
                </div>

                <div className="next-wrapper">
                    <button className="slick-next-custom" onClick={() => sliderRef.current.slickNext()}>
                        <BsChevronRight />
                    </button>
                </div>
            </div>
        ),
        customPaging: i => <div className="custom-dot"></div>,
    };

    return (
        <section className='testimonial-sec'>
            <div className='container'>
                <h2 className='text-center'>Real Experiences, Real Results</h2>
                <div className='testimonial-slider'>
                    <Slider ref={sliderRef} {...settings}>
                        <div>
                            <div className='testimonial-card-container'>
                                <div className='testimonial-card'>
                                    <div className='testimonial-card-left'>
                                        <Img src={testimonialImage} alt='testimonial-image' />
                                    </div>
                                    <div className='testimonial-card-right'>
                                        <div className='rating-sec'>
                                            <Rating readOnly value={2.42} itemStyles={myStyles} />
                                        </div>
                                        <p>"Working with ClanConnect has been a transformative experience for me.  I am confident that ClanConnect will continue to thrive and make a lasting impact in the influencer marketing industry, thanks to the incredible efforts of team members."</p>
                                        <div className='author-info'>
                                            <span className='author-name'>Jay Varia</span>
                                            <span className='author-designation'>Manager to Ridhiema Tiwari (@ridtiwari)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='testimonial-card-container'>
                                <div className='testimonial-card'>
                                    <div className='testimonial-card-left'>
                                        <Img src={testimonialImage} alt='testimonial-image' />
                                    </div>
                                    <div className='testimonial-card-right'>
                                        <div className='rating-sec'>
                                            <Rating readOnly value={4} itemStyles={myStyles} />
                                        </div>
                                        <p>"Working with ClanConnect has been a transformative experience for me.  I am confident that ClanConnect will continue to thrive and make a lasting impact in the influencer marketing industry, thanks to the incredible efforts of team members."</p>
                                        <div className='author-info'>
                                            <span className='author-name'>Jay Varia</span>
                                            <span className='author-designation'>Manager to Ridhiema Tiwari (@ridtiwari)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='testimonial-card-container'>
                                <div className='testimonial-card'>
                                    <div className='testimonial-card-left'>
                                        <Img src={testimonialImage} alt='testimonial-image' />
                                    </div>
                                    <div className='testimonial-card-right'>
                                        <div className='rating-sec'>
                                            <Rating readOnly value={2.42} itemStyles={myStyles} />
                                        </div>
                                        <p>"Working with ClanConnect has been a transformative experience for me.  I am confident that ClanConnect will continue to thrive and make a lasting impact in the influencer marketing industry, thanks to the incredible efforts of team members."</p>
                                        <div className='author-info'>
                                            <span className='author-name'>Jay Varia</span>
                                            <span className='author-designation'>Manager to Ridhiema Tiwari (@ridtiwari)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Slider>

                </div>
            </div>
        </section>
    )
}

export default Testimonials