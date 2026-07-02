'use client';
import React, {useState, useRef, useEffect} from 'react';
import Slider from 'react-slick';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
const imgDiscover = '/assets/images/img-discover-3d.png';
const imgEngage = '/assets/images/img-engage-3d.png';
const imgExecute = '/assets/images/img-execute-3d.png';
const imgAnalyse = '/assets/images/img-analyse-3d.png';
import RequestaDemo from '../../RequestaDemo';
import {TabData, brandData} from '../../../data/data';
import lozad from 'lozad';
import {Link} from '@/lib/router';

const TabBrands = () => {
  const [key, setKey] = useState('Brands');
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const [requestademoShow, setrequestademoShow] = useState(false);

  const handlerequestademoClose = () => setrequestademoShow(false);
  const handlerequestademoShow = () => setrequestademoShow(true);
  const {observe} = typeof document === 'undefined' ? { observe: () => {} } : lozad('[data-use-lozad]', {
    loaded: (el) => {
      el.classList.add('lozad-fade');
    },
  });

  useEffect(() => {
    observe();
  }, [observe]);
  // const settings = {
  //     dots: false,
  //     infinite: true,
  //     speed: 3000,
  //     loop: true,
  //     arrows: false,
  //     autoplay: true,
  //     autoplaySpeed: 1000,
  //     cssEase: 'linear',
  //     variableWidth: true,
  //     pauseOnHover: false 
  //   };

  return (
    <>
    <section className='sec-common sec-common-brands' id='section-brands'>
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
      <div className='container'>
        <div className='sec-common-heading-sec'>
          <h2 className=''>Brands</h2>
          <p>
            The only platform in the world to provide maximum engagement
            options,
            <br /> with the influencers, totally free of cost.
          </p>
        </div>
        <div className='sec-common-tab-sec'>
          <div className='row d-none d-md-flex'>
            <div className='col-md-5 col-lg-4 d-flex flex-column justify-content-between'>
              <Slider
                className='sec-common-tab-left'
                asNavFor={nav2}
                ref={(slider1) => setNav2(slider1)}
                slidesToShow={4}
                vertical={true}
                focusOnSelect={true}
              >
                {TabData.map((tabData) => {
                  return tabData?.brands?.map((brandData) => {
                    return (
                      <div key={brandData.id} className='sec-common-tab-desc'>
                        <span>{brandData.title}</span>
                        <p>{brandData.description}</p>
                      </div>
                    );
                  });
                })}
              </Slider>
              <div className='d-flex mt-auto mb-5'>
                <Link
                  to='https://www.app.clanconnect.ai'
                  target='_blank'
                  className='btn btn-outline-black btn-wide request_demo_btn'
                >
                  Sign Up
                </Link>
              </div>
            </div>

            <div className='col-md-7 col-lg-8 align-self-center'>
              <Slider
                className='sec-common-tab-right'
                asNavFor={nav1}
                ref={(slider2) => setNav2(slider2)}
                slidesToShow={1}
                swipeToSlide={false}
                swipe={false}
                focusOnSelect={false}
                arrows={false}
                fade={true}
              >
                {TabData.map((tabData) => {
                  return tabData?.brands?.map((brandData, index) => {
                    return (
                      <div className={`sec-common-tab-right-img sec-common-tab-right-img-${index}`} key={brandData.id}>
                        <picture className='sec-common-tab-right-img-large'>
                          <source
                            type='image/webp'
                            srcSet={brandData.webpImg}
                            loading='lazy'
                            className='lozad'
                            data-use-lozad
                          />
                          <source
                            type='image/jpeg'
                            srcSet={brandData.img}
                            loading='lazy'
                            className='lozad'
                            data-use-lozad
                          />
                          <img
                            src={brandData.img}
                            alt=''
                            loading='lazy'
                            className='lozad'
                            data-use-lozad
                          />
                        </picture>
                        <picture className='sec-common-tab-right-img-small'>
                          <source
                            type='image/webp'
                            srcSet={brandData.webpImg1}
                            loading='lazy'
                            className='lozad'
                            data-use-lozad
                          />
                          <source
                            type='image/jpeg'
                            srcSet={brandData.img1}
                            loading='lazy'
                            className='lozad'
                            data-use-lozad
                          />
                          <img
                            src={brandData.img1}
                            alt=''
                            loading='lazy'
                            className='lozad'
                            data-use-lozad
                          />
                        </picture>
                      </div>
                    );
                  });
                })}
              </Slider>
            </div>
          </div>
          <div className='row d-block d-md-none'>
            {TabData.map((tabData) => {
              return tabData?.brands?.map((brandData, index) => {
                return (
                  <div key={index} className='sec-common-tab-desc mob-content'>
                    <span>{brandData.title}</span>
                    <p>{brandData.description}</p>
                    {/* <picture>
                      <source
                        type='image/webp'
                        srcSet={brandData.webpImg}
                        loading='lazy'
                        className='lozad'
                        data-use-lozad
                      />
                      <source
                        type='image/jpeg'
                        srcSet={brandData.img}
                        loading='lazy'
                        className='lozad'
                        data-use-lozad
                      />
                      <img
                        src={brandData.img}
                        alt=''
                        loading='lazy'
                        className='lozad'
                        data-use-lozad
                      />
                    </picture> */}
                    <div className={`sec-common-tab-right-img sec-common-tab-right-img-${index}`}>
                      <picture className='sec-common-tab-right-img-large'>
                        <source
                          type='image/webp'
                          srcSet={brandData.webpImg}
                          loading='lazy'
                          className='lozad'
                          data-use-lozad
                        />
                        <source
                          type='image/jpeg'
                          srcSet={brandData.img}
                          loading='lazy'
                          className='lozad'
                          data-use-lozad
                        />
                        <img
                          src={brandData.img}
                          alt=''
                          loading='lazy'
                          className='lozad'
                          data-use-lozad
                        />
                      </picture>
                      <picture className='sec-common-tab-right-img-small'>
                        <source
                          type='image/webp'
                          srcSet={brandData.webpImg1}
                          loading='lazy'
                          className='lozad'
                          data-use-lozad
                        />
                        <source
                          type='image/jpeg'
                          srcSet={brandData.img1}
                          loading='lazy'
                          className='lozad'
                          data-use-lozad
                        />
                        <img
                          src={brandData.img1}
                          alt=''
                          loading='lazy'
                          className='lozad'
                          data-use-lozad
                        />
                      </picture>
                    </div>
                  </div>
                );
              });
            })}
            <div className='col-12 d-flex flex-column align-items-center'>
              <Link
                to='https://www.app.clanconnect.ai'
                target='_blank'
                className='btn btn-outline-black btn-wide request_demo_btn'
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <RequestaDemo
        handlerequestademoClose={handlerequestademoClose}
        requestademoShow={requestademoShow}
        handlerequestademoShow={handlerequestademoShow}
      />
    </section>
    </>
  );
};

export default TabBrands;
