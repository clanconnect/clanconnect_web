'use client';
import React, {useState, useRef, useEffect} from 'react';
import Slider from 'react-slick';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

const imgGetDiscovered = '/assets/images/img-get-discovered-3d.png';
const imgApply = '/assets/images/img-apply-3d.png';
const imgInvoicing = '/assets/images/img-invoicing-3d.png';
import {TabData} from '../../../data/data';
import lozad from 'lozad';

const TabInfluencers = () => {
  const [key, setKey] = useState('Influencers');
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const {observe} = typeof document === 'undefined' ? { observe: () => {} } : lozad('[data-use-lozad]', {
    loaded: (el) => {
      el.classList.add('lozad-fade');
    },
  });

  useEffect(() => {
    observe();
  }, [observe]);
  return (
    <section className='sec-common sec-common-infl'>
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
          <h2 className=''>Influencers</h2>
          <p>
            Only influencer marketing platform that lets you directly collaborate and communicate<br/> with your favourite brands at ease.
          </p>
        </div>
        <div className='sec-common-tab-sec'>
          <div className='row d-none d-md-flex'>
            <div className='col-md-4'>
              <Slider
                className='sec-common-tab-left'
                asNavFor={nav2}
                ref={(slider1) => setNav2(slider1)}
                autoplay='true'
                slidesToShow={4}
                vertical={true}
                focusOnSelect={true}
              >
                {TabData.map((tabData) => {
                  return tabData?.influencers?.map((brandData) => {
                    return (
                      <div key={brandData.id} className='sec-common-tab-desc'>
                        <span>{brandData.title}</span>
                        {/* <p>{brandData.description}</p> */}
                        {brandData.description &&
                    <p>{brandData.description}</p>
                    }
                    {brandData.list &&
                    <ul>
                     {brandData.list.map((li, index) => (
                       <li key={index}>{li}</li>
                     ))}</ul>
                    }
                      </div>
                    );
                  });
                })}
              </Slider>
            </div>

            <div className='col-md-8'>
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
                  return tabData?.influencers?.map((brandData) => {
                    return (
                      <div key={brandData.id}>
                        <picture>
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
                      </div>
                    );
                  });
                })}
              </Slider>
            </div>
          </div>
          <div className='row d-block d-md-none'>
            {TabData.map((tabData) => {
              return tabData?.influencers?.map((brandData) => {
                return (
                  <div
                    key={brandData.id}
                    className='sec-common-tab-desc mob-content'
                  >
                    <span>{brandData.title}</span>
                    {brandData.description &&
                    <p>{brandData.description}</p>
                    }
                    {brandData.list &&
                    <ul>
                     {brandData.list.map((li, index) => (
                       <li key={index}>{li}</li>
                     ))}</ul>
                    }
                    <picture>
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
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabInfluencers;
