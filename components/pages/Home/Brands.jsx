'use client';
import {useEffect, Fragment} from 'react';
import './Brand.css';

import SectionTitle from '../../section_title';
import {brandData} from '../../../data/data';
import lozad from 'lozad';
import Img from '@/components/ui/Img';

const Brands = () => {
  const {observe} = typeof document === 'undefined' ? { observe: () => {} } : lozad('[data-use-lozad]', {
    loaded: (el) => {
      el.classList.add('lozad-fade');
    },
  });

  useEffect(() => {
    observe();
  }, [observe]);
  return (
    <>
      <div className='homepage-brands'>
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
        <SectionTitle headingText='BRANDS WE HAVE WORKED WITH' />
        <div className='homepage-brand-images'>
          {brandData.map((c, index) => {
            return (
              <Fragment key={index}>
                <picture className='homepage-brands-logo'>
                  <Img
                    src={c.brandLogo}
                    alt={c.title || ''}
                    className='lozad img-fluid'
                  />
                </picture>
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Brands;
