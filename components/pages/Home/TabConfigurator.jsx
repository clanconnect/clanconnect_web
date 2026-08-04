'use client';
import React from 'react';
// The optimizer derives WebP/AVIF per request, so the hand-exported .webp
// variant is no longer referenced.
const ConfigImg = '/assets/images/clan_connect/configurator-img.png';
import {Link} from '@/lib/router';
import Img from '@/components/ui/Img';

const TabConfigurator = () => {
  return (
    <section className='sec-common sec-common-config'>
      <div className='triangle-arrow-sec'>
        <span className='triangle-bg triangle2'></span>
        <span className='triangle-bg triangle3'></span>
        <span className='triangle-bg triangle4'></span>
        <span className='triangle-bg triangle5'></span>
        <span className='triangle-bg triangle6'></span>
        <span className='triangle-bg triangle7'></span>
        <span className='triangle-bg triangle8'></span>
        <span className='triangle-bg triangle9'></span>'
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-12 sec-config-text text-center'>
            <h2>Let Clan configure</h2>
          </div>
          <div className='col-12 sec-config-img'>
            <picture>
              <Img
                src={ConfigImg}
                alt='How ClanConnect configures a campaign'
                className='lozad'
                sizes='(max-width: 991px) 100vw, 1140px'
              />
            </picture>
          </div>
          <div className='col-12 d-flex justify-content-center mt-5 flex-column text-center'>
            <p className='text-white fs-18'>
              Design the best campaign for your brand with 3 easy inputs and get
              campaign level
              <br /> insights on Reach, Location and Gender.
            </p>
            <Link
              to='https://app.clanconnect.ai'
              target='_blank'
              className='btn btn-black btn-wide align-self-center'
            >
              Try now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabConfigurator;
