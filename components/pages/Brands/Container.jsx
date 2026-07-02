'use client';
import React from 'react'
import Banner from './Banner'
import Highlight from './Highlight'
import Features from './Features'
import Testimonials from './Testimonials'
import DownloadApp from './DownloadApp'
import OurBusinessModel from './OurBusinessModel'
import OurBusinessModalBrands from '../OurBusinessModal/OurBusinessModalBrands'

const BrandContainer = () => {
  return (
    <section className='page-brands'>
    <Banner />
    <Highlight />
    <Testimonials />
    <Features />
    <OurBusinessModalBrands />
    <DownloadApp />
    </section>
  )
}

export default BrandContainer