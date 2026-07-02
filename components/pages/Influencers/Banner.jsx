'use client';
import React from 'react'
const heroAvif = '/assets/images/influencers-page/hero.avif';
const herowebp = '/assets/images/influencers-page/hero.webp';
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
                    <img src={appStore} alt="App Store" />
                </Link>
                <Link to="">
                    <img src={playStore} alt="Play Store" />
                </Link>
            </div>
        </div>
    </div>
        <picture>
            <source srcset={heroAvif} type="image/avif" />
            <source srcset={herowebp} type="image/webp" />
            <source srcset={heropng} type="image/png" />
            <img src={heropng} alt="Smiling woman using phone at a cafe" />
        </picture>
        
    </div>
  )
}

export default Banner