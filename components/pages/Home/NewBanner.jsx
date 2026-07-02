'use client';
import React, {useEffect, useState} from 'react';
// import ReactPlayer from 'react-player';
// import {HomeBannerModalVideoData} from '../../../data/data';
import NewBannerMob from './NewBannerMob';
import {AnimatePresence, motion} from 'framer-motion';

const NewBanner = (props) => {
  // const [playVideo, setPlayVideo] = useState(false);
  // const [videoEnded, setVideoEnded] = useState(false);
  // const [showElement, setShowElement] = useState(false);

  // const handleVideoEnded = () => {
  //   setVideoEnded(true);
  //   setPlayVideo(false);
  //   setShowElement(false);
  // };

  // const handleClickPlay = () => {
  //   setPlayVideo(true);
  //   setVideoEnded(false);
  //   setShowElement(true);
  // };

  // // const handleStop = () => {
  // //     setPlayVideo(false);
  // //     setVideoEnded(true);
  // // };

  // const handleClose = () => {
  //   setPlayVideo(false);
  //   setVideoEnded(false);
  //   setShowElement(false);
  // };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowElement(true);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);
  const videoVars = {
    initial: {
      opacity: 0,
      width: 0,
      right: 0,
      height: 0,
      transformOrigin: 'right top',
    },
    animate: {
      opacity: 1,
      y: 0,
      right: 0,
      width: '100%',
      height: '100%',
      transition: {
        duration: 0.5,
        ease: [0.45, 0, 0.55, 1],
      },
    },
    exit: {
      opacity: 0,
      right: 0,
      transformOrigin: 'right top',
      transition: {
        duration: 0.5,
        delay: 0.15,
        ease: [0.45, 0, 0.55, 1],
      },
    },
  };
  return (
    <AnimatePresence>
      {/* <section className={`homepage-banner-combined ${videoEnded ? 'video-ended-parent' : ''}`}> */}
      <section className='homepage-banner-combined'>
        {/* <motion.section
          style={{
            height: showElement ? '100vh' : '0vh',
            transformOrigin: 'right top',
          }}
          className={`homepage-video-banner eleContainer d-none d-md-flex ${
            videoEnded ? 'video-ended' : ''
          }`}
        >
          <motion.div
            className='homepage-video-sec'
            variants={videoVars}
            initial='initial'
            animate={showElement ? 'animate' : 'exit'}
            exit='exit'
          >
            <span className='homepage-video-close' onClick={handleClose}>
              <i className='bi bi-x-lg'></i>
            </span>

            <motion.div className='ratio ratio-16x9'>
              <div className='player-wrapper'>
                <ReactPlayer
                  id='homepage-video-wrapper'
                  className='react-player'
                  url={HomeBannerModalVideoData.videoURL}
                  muted={true}
                  controls={true}
                  playing={() => setplayVideo(!playVideo)}
                  onEnded={handleVideoEnded}
                  playsinline={true}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.section> */}

        {/* <NewBannerMob showElement={showElement} videoEnded={videoEnded} handleClickPlay={handleClickPlay} /> */}
        <NewBannerMob />
      </section>
    </AnimatePresence>
  );
};

export default NewBanner;
