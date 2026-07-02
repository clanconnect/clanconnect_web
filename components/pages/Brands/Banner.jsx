'use client';
import React from 'react'
const bannerAvif = '/assets/images/influencers-page/banner.avif';
const bannerwebp = '/assets/images/influencers-page/banner.webp';
const bannerpng = '/assets/images/influencers-page/banner.png';
const bannerjpg = '/assets/images/influencers-page/banner.jpg';
const appStore = '/assets/images/influencers-page/app-store.png';
const playStore = '/assets/images/influencers-page/play-store.png';
import { Link } from '@/lib/router'

const Banner = () => {
  return (
    <div className='infl-banner'>
        <picture>
            <source srcset={bannerAvif} type="image/avif" />
            <source srcset={bannerwebp} type="image/webp" />
            <source srcset={bannerpng} type="image/png" />
            <img src={bannerjpg} alt="Smiling woman using phone at a cafe" />
        </picture>
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
    </div>
  )
}

export default Banner