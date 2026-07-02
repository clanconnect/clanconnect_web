'use client';
import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';

const imgGetDiscovered = '/assets/images/img-get-discovered-3d.png';
const imgApply = '/assets/images/img-apply-3d.png';
const imgInvoicing = '/assets/images/img-invoicing-3d.png';
import { brandData, TestimonialBrandData, TestimonialData } from '../../../data/data';
import lozad from 'lozad';
import { Link } from '@/lib/router';
import { createPortal } from 'react-dom';
import { Modal } from 'react-bootstrap';
const DummyTestimonialImage = '/assets/images/testimonial-img/dummy-testimonial1.png';
import RetinaImage from '@/lib/RetinaImage';


const Testimonials = () => {
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
  var brandTestimonialSetting = {
    dots: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    accessibility: false,
  };
  var influencerTestimonialSetting = {
    dots: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    accessibility: false,
  };

  // portals can only render in the browser; SSR skips them until mounted
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const [openBrandTestimonialModal, setOpenBrandTestimonialModal] = useState(false)
  const [openInflunecerTestimonialModal, setOpenInflunecerTestimonialModal] = useState(false)
  const [testimonialId, setTestimonialId] = useState("")
  const [testimonialModalData, setTestimonialModalData] = useState([])
  const [testimonialInfluencerModalData, setTestimonialtestimonialModalData] = useState([])

  const handleTestimonialDetail = (id)=>{
    setOpenBrandTestimonialModal(true)
    setTestimonialId(id)
    const testimonialBrandDataId = TestimonialBrandData.filter(testimonial =>{
      return testimonial?.id === id
    })
    setTestimonialModalData(testimonialBrandDataId)
  }
  const handleInfluencerTestimonialDetail = (id) => {
    setOpenInflunecerTestimonialModal(true)
    setTestimonialId(id)
    const testimonialInfluencerDataId = TestimonialData.filter(testimonial => {
      return testimonial?.id === id
    })
    setTestimonialtestimonialModalData(testimonialInfluencerDataId)
  }
  const handleCloseTestimonialDetail = () => {
    setOpenBrandTestimonialModal(false)
    const bodyClass = document.getElementsByTagName('html')[0];
    if (bodyClass) {
      bodyClass.classList.remove("custom-drawer-modal-open");
    }
  }
  const handleCloseInfluencerTestimonialDetail = () => {
    setOpenInflunecerTestimonialModal(false)
    const bodyClass = document.getElementsByTagName('html')[0];
    if (bodyClass) {
      bodyClass.classList.remove("custom-drawer-modal-open");
    }
  }
  return (
    <>
      <div className='brand-carousel'>
        <div className='container'>
          <div className='brand-carousel-left'>
            <h3 className='text-right text-md-left'>Trusted <br className='d-md-none' />by:</h3>
          </div>
          <div className='brand-carousel-right'>
            <div className='brand-carousel-right-inner'>
              <React.Fragment>
                {brandData.map((c, index) => {
                  return (
                    <React.Fragment key={index}>
                      <picture className='homepage-brands-logo' key={index}>
                        <RetinaImage className="homepage-brands-logo"
                          src={[c.brandLogo, c.brandLogo2x, c.brandLogo3x]} alt={c.title} />
                      </picture>
                    </React.Fragment>
                  );
                })}
                {/* Double for infinite sliding */}
                {brandData.map((c, index) => {
                  return (
                    <React.Fragment key={index}>
                      <picture className='homepage-brands-logo' key={index}>                       
                        <RetinaImage className="homepage-brands-logo"
                          src={[c.brandLogo, c.brandLogo2x, c.brandLogo3x]} alt={c.title} />
                      </picture>
                    </React.Fragment>
                  );
                })}

              </React.Fragment>
            </div>
          </div>

        </div>
      </div>
    <section className='sec-common sec-common-testimonials testimonial-brand'>
      <div className='triangle-arrow-sec'>
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
          <h2 className=''>Real Experiences, Real Results</h2>
        </div>
        <div className=''>
          <div className="slider-container">
            <div className='testimonial-main-slider'>
              <div className='row'>
                <div className='col-md-6'>
                    <div className='testimonial-bg testimonial-bg-brand mb-md-0'>
                      <h3 className='testimonial-title'>Brands</h3>
                    <Slider className='' {...brandTestimonialSetting}>
                      {TestimonialBrandData && TestimonialBrandData.map(testimonial => {
                        const maxLength = 260;
                        const content = testimonial && testimonial?.content || '';

                        const truncatedContent = content.length > maxLength
                          ? `${content.substring(0, maxLength)}...`
                          : content;
                        return <div className='testimonial-container'>
                          <div className='testimonial-container-inner'>
                            <div className='testimonial-img-sec'>
                              <div className='testimonial-img-brand'>
                                <img className='testimonial-thumbnail' src={testimonial?.logoImg} />
                              </div>
                              {testimonial?.personImg &&
                              <div className='testimonial-img-person'>
                                <img className='testimonial-thumbnail' src={testimonial?.personImg} />
                              </div>
                              }
                            </div>
                            <div className='testimonial-description'>
                              <p>{truncatedContent}{content.length > 260 && <span className='btn btn-text-link' onClick={() => handleTestimonialDetail(testimonial?.id)} style={{ marginLeft: '4px', fontSize: '0.875rem' }}>more</span>}</p>
                            
                            </div>
                            <div className='testimonial-bottom-sec'>
                              <strong>{testimonial?.name}</strong>
                              {testimonial?.designation &&
                                <span className='designation'>
                                  {testimonial?.designation}
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
                <div className='col-md-6'>
                  <div className='testimonial-bg'>
                    <h3 className='testimonial-title'>Influencers</h3>
                    <Slider className='' {...influencerTestimonialSetting}>
                      {TestimonialData && TestimonialData.map(testimonial => {
                        const maxLength = 260;
                        const content = testimonial && testimonial?.content || '';

                        const truncatedContent = content.length > maxLength
                          ? `${content.substring(0, maxLength)}...`
                          : content;
                        return <div className='testimonial-container'>
                          <div className='testimonial-container-inner'>
                            <div className='testimonial-img-sec'>
                              <div className='testimonial-img-person'>
                                <img className='testimonial-thumbnail' src={testimonial?.logoImg} />
                              </div>

                            </div>
                            <div className='testimonial-description'>
                              <p>{truncatedContent}{content.length > 260 && <span className='btn btn-text-link' onClick={()=>handleInfluencerTestimonialDetail(testimonial.id)} style={{ marginLeft: '4px', fontSize: '0.875rem' }}>more</span>}</p>

                            </div>
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
          </div>
        </div>
      </div>
    </section>
    {mounted && testimonialModalData && <>
        {createPortal(<Modal size='lg' className='modal-testimonial' centered show={openBrandTestimonialModal} onHide={handleCloseTestimonialDetail}>
          <div className='testimonial-container'>
          <Modal.Header closeButton className='popup-header'>
            
          </Modal.Header>
            <Modal.Body><div className='testimonial-container-inner'>
              <div className='testimonial-img-sec'>
                <div className='testimonial-img-brand'>
                  <img className='testimonial-thumbnail' src={testimonialModalData[0]?.logoImg} />
                </div>

                <div className='testimonial-img-person'>
                  <img className='testimonial-thumbnail' src={testimonialModalData[0]?.personImg} />
                </div>
              </div>
              <div className='testimonial-description'>
                <p>{testimonialModalData[0]?.content}</p>

              </div>
              <div className='testimonial-bottom-sec'>
                <strong>{testimonialModalData[0]?.name}</strong>
                {testimonialModalData[0]?.designation &&
                  <span className='designation'>
                    {testimonialModalData[0]?.designation}
                  </span>
                }
                {testimonialModalData[0]?.designation1 &&
                                <span className='designation'>
                                  {testimonialModalData[0]?.designation1}
                                </span>}
                              {testimonialModalData[0]?.designation2 &&
                                <span className='designation'>
                                  {testimonialModalData[0]?.designation2}
                                </span>
                              }
                {(testimonialModalData[0]?.instaId) &&
                  <Link target='_blank' to={testimonialModalData[0]?.instaId} className='designation '>
                    @{testimonialModalData[0]?.instaName}
                  </Link>
                }
              </div>
            </div>
          </Modal.Body>
          </div>
        </Modal>, document.body)}
    </>}
      {mounted && testimonialInfluencerModalData && <>
        {createPortal(<Modal size='lg' className='modal-testimonial' centered show={openInflunecerTestimonialModal} onHide={handleCloseInfluencerTestimonialDetail}>
          <div className='testimonial-container'>
            <Modal.Header closeButton className='popup-header'>

            </Modal.Header>
            <Modal.Body><div className='testimonial-container-inner'>
              <div className='testimonial-img-sec'>
                <div className='testimonial-img-person'>
                  <img className='testimonial-thumbnail' src={testimonialInfluencerModalData[0]?.logoImg} />
                </div>
              </div>
              <div className='testimonial-description'>
                <p>{testimonialInfluencerModalData[0]?.content}</p>

              </div>
              <div className='testimonial-bottom-sec'>
                <strong>{testimonialInfluencerModalData[0]?.name}</strong>
                {testimonialInfluencerModalData[0]?.designation &&
                  <span className='designation'>
                    {testimonialInfluencerModalData[0]?.designation}
                  </span>
                }
                {testimonialInfluencerModalData[0]?.designation1 &&
                  <span className='designation'>
                    {testimonialInfluencerModalData[0]?.designation1}
                  </span>}
                {testimonialInfluencerModalData[0]?.designation2 &&
                  <span className='designation'>
                    {testimonialInfluencerModalData[0]?.designation2}
                  </span>
                }
                {(testimonialInfluencerModalData[0]?.instaId) &&
                  <Link target='_blank' to={testimonialInfluencerModalData[0]?.instaId} className='designation '>
                    @{testimonialInfluencerModalData[0]?.instaName}
                  </Link>
                }
              </div>
            </div>
            </Modal.Body>
          </div>
        </Modal>, document.body)}
      </>}
      
    </>
  );
};

export default Testimonials;
