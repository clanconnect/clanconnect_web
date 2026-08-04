'use client';
import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';

const imgGetDiscovered = '/assets/images/img-get-discovered-3d.png';
const imgApply = '/assets/images/img-apply-3d.png';
const imgInvoicing = '/assets/images/img-invoicing-3d.png';
import { TestimonialData } from '../../../data/data';
import lozad from 'lozad';
import { Link } from '@/lib/router';
import Img from '@/components/ui/Img';

const TestimonialsInfluencers = () => {
  const { observe } = typeof document === 'undefined' ? { observe: () => {} } : lozad('[data-use-lozad]', {
    loaded: (el) => {
      el.classList.add('lozad-fade');
    },
  });

  useEffect(() => {
    observe();
  }, [observe]);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let slider1 = useRef(null);
  let slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, []);
  
  var InfluencerTestimonialSetting = {
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <section className='sec-common sec-common-testimonials testimonial-influencer'>
      <div className='triangle-arrow-sec'>
        {/* <span className='triangle-bg triangle1'></span> */}
        <span className='triangle-bg triangle2'></span>
        <span className='triangle-bg triangle3'></span>
        <span className='triangle-bg triangle4'></span>
        <span className='triangle-bg triangle5'></span>
        <span className='triangle-bg triangle6'></span>
        <span className='triangle-bg triangle7'></span>
        <span className='triangle-bg triangle8'></span>
        <span className='triangle-bg triangle9'></span>
      </div>
      <div className='container container-custom'>
        <div className='sec-common-heading-sec'>
          <h2 className=''>What they say about us</h2>
        </div>
        <div className=''>
          <div className="slider-container">
            <div className='testimonial-main-slider'>
              <Slider className='' {...InfluencerTestimonialSetting}>
                {TestimonialData && TestimonialData.map(testimonial => {
                  return <div className='testimonial-container'>
                    <div className='testimonial-container-inner'>
                      <div className='testimonial-img-sec'>
                        <div className='testimonial-img-person'>
                          <Img className='testimonial-thumbnail' src={testimonial?.logoImg} />
                        </div>

                      </div>
                      <p dangerouslySetInnerHTML={{ __html: testimonial?.content }} />
                      <div className='testimonial-bottom-sec'>
                        <strong>{testimonial?.name}</strong>
                        {testimonial?.designation &&
                          <span className='testimonial-designation'>
                            {testimonial?.designation}
                          </span>
                        }
                        {testimonial?.designation1 &&
                          <span className='testimonial-designation'>
                            {testimonial?.designation1}
                          </span>}
                        {testimonial?.designation2 &&
                          <span className='testimonial-designation'>
                            {testimonial?.designation2}
                          </span>
                        }
                        {(testimonial?.instaId) &&
                          <Link target='_blank' to={testimonial?.instaId} className='designation '>
                            @{testimonial?.instaName}
                          </Link>
                        }
                      </div>
                    </div>
                   
                  </div>
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsInfluencers;
