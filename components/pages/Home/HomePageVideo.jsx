'use client';
import React from 'react'

import { HomeBannerData } from '../../../data/data';
export const HomePageVideo = (props) => {
    return (
        <div className='homepage-video-sec'>
            <video playsInline autoPlay controls muted loop poster="polina.jpg" id="bgvid">
                <source src={props.homepageBackgroundVideo} type="video/mp4" />
            </video>
        </div>
    )
}
