'use client';
import React from 'react'
import Img from '@/components/ui/Img';
// Single source of truth: the optimizer derives AVIF/WebP per request, so the
// hand-maintained hero.avif/.webp variants are no longer referenced.
const heropng = '/assets/images/influencers-page/hero.png';
const appStore = '/assets/images/influencers-page/app-store.png';
const playStore = '/assets/images/influencers-page/play-store.png';
import { Link } from '@/lib/router'

const Banner = () => {
  return (
    <div className='infl-banner'>
        <div className='container'>
            <div className='infl-banner-text'>
            <h1>Launch Your Creator Journey</h1>
            <p>Be part of a growing community of<br/> 90,000+ influencers across India</p>
            <div className='infl-banner-buttons'>
                <Link to="">
                    <Img src={appStore} alt="App Store" />
                </Link>
                <Link to="">
                    <Img src={playStore} alt="Play Store" />
                </Link>
            </div>
        </div>
    </div>
        {/* .infl-banner picture { max-width: 884px; max-height: 587px } sizes
            this image, so the wrapper stays; only the <source> children go. */}
        <picture>
            <Img
                src={heropng}
                alt="Smiling woman using phone at a cafe"
                priority
            />
        </picture>
        
    </div>
  )
}

export default Banner