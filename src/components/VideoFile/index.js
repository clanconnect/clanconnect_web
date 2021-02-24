import React from 'react';
import Ex from 'assets/images/ex.mp4';
import VideoPlayer from '../Videojs';
import './styles.scss';

const VideoFile = ({ className }) => {
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    preload: 'auto',
    loop: false,

    sources: [
      {
        src: Ex,
        type: 'video/mp4',
      },
    ],
  };
  return <VideoPlayer {...videoJsOptions} className={className} />;
};

export default VideoFile;
