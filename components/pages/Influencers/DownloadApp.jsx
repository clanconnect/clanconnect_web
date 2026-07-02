'use client';
import React from 'react'
const appStore = '/assets/images/influencers-page/app-store.png';
const playStore = '/assets/images/influencers-page/play-store.png';
import { Link } from '@/lib/router'

const DownloadApp = () => {
  return (
    <section className='download-app-sec'>
        <div className='container'>
            <h2 className='text-center'>Download the app</h2>
            <div className='infl-banner-buttons'>
                <Link to="">
                    <img src={appStore} alt="App Store" />
                </Link>
                <Link to="">
                    <img src={playStore} alt="Play Store" />
                </Link>
            </div>
        </div>
    </section>
  )
}

export default DownloadApp