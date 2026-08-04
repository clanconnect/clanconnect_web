'use client';
import React from 'react';
import FoundersData from './FoundersData';
import Img from '@/components/ui/Img';

const Founders = () => {
  return (
    <section className='sec-founders'>
      <div className='containerWrap'>
        <div className='triangle-arrow-sec'>
          <span className='triangle-bg triangle3'></span>
          <span className='triangle-bg triangle4'></span>
          <span className='triangle-bg triangle5'></span>
          <span className='triangle-bg triangle6'></span>
          <span className='triangle-bg triangle7'></span>
          <span className='triangle-bg triangle8'></span>
          <span className='triangle-bg triangle9'></span>
        </div>
        <h1 className='Founders-Heading Founders-Row'>Founders</h1>
        <div className='founder-sec'>
          {FoundersData.map((data, index) => (
            <React.Fragment key={index}>
              <div className='founder-info'>
                <div className='founder-img'>
                  <Img src={data?.founderImg} alt={data?.founderName} />
                </div>
                <div className='founder-detail'>
                  <h2>{data?.founderName}</h2>
                  <h3>{data?.founderDesignation}</h3>
                  <p>{data?.founderInfoPara1}</p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Founders;
