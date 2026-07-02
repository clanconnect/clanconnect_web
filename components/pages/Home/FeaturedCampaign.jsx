'use client';
import React, {useRef, useState, useEffect} from 'react';
import Slider from 'react-slick';
import {campaignData} from '../../../data/data';

// import ReactPlayer from 'react-player'
import ReactPlayer from 'react-player';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {Modal} from 'react-bootstrap';
import {Link} from '@/lib/router';

const PlayIcon = () => (
  <svg
    stroke='currentColor'
    fill='currentColor'
    strokeWidth='0'
    viewBox='0 0 512 512'
    className='react-jinke-music-player-play-icon'
    height='5em'
    width='5em'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z'></path>
  </svg>
);

const PauseIcon = () => (
  <svg
    stroke='currentColor'
    fill='currentColor'
    strokeWidth='0'
    viewBox='0 0 512 512'
    className='react-jinke-music-player-pause-icon'
    height='5em'
    width='5em'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z'></path>
  </svg>
);
const FeaturedCampaign = () => {
  const playerRef = useRef(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const [campId, setCampId] = useState([]);
  const handleShow = (campaignId) => () => {
    const campid = campaignData.find((camp) => {
      if (camp.id === campaignId) {
        setPlaying(true);
      }
      return camp.id === campaignId;
    });
    console.log(campid);
    setCampId(campid);
    setShow(true);
  };

  const [playing, setPlaying] = useState(false);
  const [isPause, setPause] = useState(true);

  // set playing to the given id
  const play = (playerId) => setPlaying();

  const [isPlaying, setIsPlaying] = useState(false);
  const playVideo = (i) => {
    setIsPlaying(i);
    setPlaying(true);
  };
  const pauseVideo = (i) => {
    setIsPlaying(false);
    setPlaying(false);
    setPause(false);
  };

  const [isMusic, isMusicSet] = React.useState(false);

  // ReactPlayer renders nothing on the server but real markup on the client,
  // which causes a hydration mismatch. Only render it after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMusic = (i) => {
    const isMusicToggle = !isMusic;
    if (isMusicToggle) {
      setIsPlaying(i);
      setPlaying(true);
    } else {
      setIsPlaying(false);
      setPlaying(false);
    }
    isMusicSet(isMusicToggle);
  };
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    arrows: true,
    beforeChange: () => {
      setIsPlaying(false);
      setPlaying(false);
      isMusicSet(false);
    },
    afterChange: () => {
      setIsPlaying(false);
      setPlaying(false);
      isMusicSet(false);
    },
  };
  return (
    <section className='featured-campaign'>
      <div className='container-fluid pr-0 position-relative'>
        <div className='triangle-arrow-sec'>
          <span className='triangle-bg triangle2'></span>
          <span className='triangle-bg triangle3'></span>
          <span className='triangle-bg triangle4'></span>
          <span className='triangle-bg triangle5'></span>
          <span className='triangle-bg triangle6'></span>
          <span className='triangle-bg triangle7'></span>
          <span className='triangle-bg triangle8'></span>
          <span className='triangle-bg triangle9'></span>
        </div>
        <Slider {...settings}>
          {campaignData.map((campaign) => {
            return (
              <section key={campaign.id}>
                <div id={campaign.id} className='featured-campaign-slide'>
                  {' '}
                  <div className='row'>
                    <div className='col-md-8 d-flex'>
                      <div className='featured-campaign-slide-content'>
                        <h3>Clan Campaigns</h3>

                        <div className='featured-campaign-slide-title'>
                          <h4>{campaign.campaignBrandName}</h4>
                          <h2>{campaign.campaignHashtag}</h2>
                        </div>
                        <ul>
                          <li>
                            <span>Influencers</span>
                            <span>
                              <strong>{campaign.influencerCount}</strong>
                            </span>
                          </li>

                          <li>
                            <span>Engagement</span>
                            <span>
                              <strong>{campaign?.EnggCount}</strong>
                            </span>
                          </li>
                          <li>
                            <span>Reach</span>
                            <span>
                              <strong>{campaign?.reach}</strong>
                            </span>
                          </li>
                        </ul>
                        <div className='d-flex flex-wrap align-items-center pt-5'>
                          <span
                            className='btn btn-black mb-2 w-100 d-block d-md-none'
                            onClick={handleShow(campaign?.id)}
                          >
                            View video
                          </span>

                          <Link
                            to='/case_studies'
                            className='btn btn-black w-100'
                          >
                            View all case studies
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4 pe-0 position-relative'>
                      <span
                        className='group play-btn'
                        title='Click to play'
                        onClick={() => toggleMusic(campaign?.id)}
                      >
                        {playing ? <PauseIcon /> : <PlayIcon />}
                      </span>
                      <div className='embed-responsive embed-responsive-1by1'>
                        {mounted && (
                          <ReactPlayer
                            className='embed-responsive-item lozad'
                            playing={isPlaying === campaign.id}
                            onPause={() => pauseVideo(campaign.id)}
                            autoPlay={false}
                            width='100%'
                            height='100%'
                            url={campaign.campaignVideoUrl}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </Slider>
      </div>

      <Modal
        className='modal-featured-campaign'
        id={`modal-${campId.id}`}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton={true}></Modal.Header>
        <Modal.Body>
          <video
            preload='none'
            width='100%'
            height='100%'
            controls
            className='lozad'
          >
            <source src={campId.campaignVideoUrl} type='video/mp4' />
          </video>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default FeaturedCampaign;
