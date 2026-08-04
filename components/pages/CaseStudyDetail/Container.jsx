'use client';
import {Link} from '@/lib/router';
const emcure = '/assets/images/case-studies/2024/logo/emcure.png';

const caseStudyDetailemcure1 = '/assets/images/case-studies/2024/case-study-detail/emcure/image1.png';
const caseStudyDetailemcure2 = '/assets/images/case-studies/2024/case-study-detail/emcure/image2.png';
const caseStudyDetailemcure3 = '/assets/images/case-studies/2024/case-study-detail/emcure/image3.png';
const caseStudyDetailemcure4 = '/assets/images/case-studies/2024/case-study-detail/emcure/image4.png';
const caseStudyDetailemcure5 = '/assets/images/case-studies/2024/case-study-detail/emcure/image5.png';

import { BsFacebook, BsInstagram, BsLink45Deg, BsLinkedin, BsTwitterX, BsWhatsapp } from 'react-icons/bs';
import { Fragment, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Slider from 'react-slick';
import RetinaImage from '@/lib/RetinaImage';
import { ShareSocial } from 'react-share-social';
import { caseStudyDetailData } from '../../../data/data';
import { BASE_URL_WEB } from '../../../config/config';
import Img from '@/components/ui/Img';
const baseURL = BASE_URL_WEB;


const CaseStudiesDetailContainer = (props) => {
  const [prevPosts, setPrevPosts] = useState('')
  const [nextPosts, setNextPosts] = useState('')
  const [loading, setLoading] = useState(false);
  // The current case study id now comes from the route (passed in as a prop by
  // the [case_study_detail_id] page) instead of a query string.
  const value = props.detailData?.id;
  const previousPostId = Number(value) - 1;
  const nextPostId = Number(value) + 1;
  const [copySuccess, setCopySuccess] = useState('');

  const shareUrl = `${baseURL}/case_studies/case_study_detail/${value}`
  // const prev = () => {
  //   // Find the previous post
  //   const previousPost = caseStudyDetailData.find(post => post.id === previousPostId.toString());

  //   // If previous post is not found, it means we are at the first post, so loop to the last post
  //   if (!previousPost) {
  //     const lastPost = caseStudyDetailData[caseStudyDetailData.length - 1];
  //     setPrevPosts(lastPost); // Set the last post as the previous post
  //   } else {
  //     setPrevPosts(previousPost); // Set the found previous post
  //   }
  // };

  // const next = () => {
  //   // Find the next post
  //   const nextPost = caseStudyDetailData.find(post => post.id === nextPostId.toString());

  //   // If next post is not found, it means we are at the last post, so loop to the first post
  //   if (!nextPost) {
  //     const firstPost = caseStudyDetailData[0];
  //     setNextPosts(firstPost); // Set the first post as the next post
  //   } else {
  //     setNextPosts(nextPost); // Set the found next post
  //   }
  // };
  
  // useEffect(()=>{
  //   const loadPosts = async () => {
  //     setLoading(true); // Start loading
  //     prev();
  //     next();

  //     // Simulate a delay
  //     await new Promise(resolve => setTimeout(resolve, 1000)); // 500 ms delay
  //     setLoading(false); // End loading
  //   };

  //   loadPosts();
  // }, [previousPostId, nextPostId])
  // if (!prevPosts && !nextPosts) {
  //   return null;
  // }

useEffect(() => {
  let isMounted = true; // Track whether the component is still mounted

  const loadPosts = async () => {
    setLoading(true); // Start loading

    // Find previous and next posts
    const previousPost = caseStudyDetailData.find(post => post.id === previousPostId.toString());
    const nextPost = caseStudyDetailData.find(post => post.id === nextPostId.toString());

    // Simulate a delay (for demonstration purposes)
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (isMounted) {
      // If component is still mounted, update the states
      if (!previousPost) {
        const lastPost = caseStudyDetailData[caseStudyDetailData.length - 1];
        setPrevPosts(lastPost); // Set the last post if there's no previous post
        setCopySuccess("")
      } else {
        setPrevPosts(previousPost); // Set found previous post
        setCopySuccess("")
      }

      if (!nextPost) {
        const firstPost = caseStudyDetailData[0];
        setNextPosts(firstPost); // Set the first post if there's no next post
        setCopySuccess("")
      } else {
        setNextPosts(nextPost); // Set found next post
        setCopySuccess("")
      }
      
      setLoading(false); // Stop loading
    }
  };

  loadPosts(); // Invoke the function

  return () => {
    isMounted = false; // Cleanup: If the component unmounts, stop updating the state
  };
}, [previousPostId, nextPostId, caseStudyDetailData]); 



  // if (loading) {
  //   return <div>Loading...</div>; // Loading indicator
  // }

  var caseStudyFeed = {
    dots: false,
    arrows: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    accessibility: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  

  const getYouTubeVideoId = (url) => {
    const urlObj = new URL(url);

    // Handle youtube.com URLs
    if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
      if (urlObj.pathname === '/watch') {
        return urlObj.searchParams.get('v'); // Extract video ID from /watch URL
      } else if (urlObj.pathname.startsWith('/shorts/')) {
        return urlObj.pathname.split('/')[2]; // Extract video ID from /shorts URL
      }
    }

    // Handle youtu.be URLs (shortened form)
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.substring(1); // Extract video ID from youtu.be URL
    }

    return null; // Return null if the URL is not valid
  };
    const [videoId, setVideoId] = useState(null);

  const VideoPlayer = ({ url }) => {
    
    const videoId = getYouTubeVideoId(url);
    const youtubeUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    
  useEffect(() => {
    const id = getYouTubeVideoId(url);
    setVideoId(id);
  }, [url]); 

    return (
      videoId ? (
        <iframe
          width="100%"
          height=""
          style={{aspectRatio:'720/1305'}}
          src={youtubeUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Invalid YouTube URL</p>
      )
    );
  };


  
 

  const copyToClipBoard = async (copyMe, event) => {
    event.preventDefault();
    if (!copyMe) {
      console.error("No text to copy");
      setCopySuccess('Nothing to copy!');
       // Clear message after 2 seconds
      setTimeout(() => {
        setCopySuccess('');
      }, 2000);
      
    return;
      return;
    }

    try {
      // Use the modern Clipboard API if available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(copyMe);
        setCopySuccess('Link copied!');
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = copyMe;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopySuccess('Link copied!');
      }
       setTimeout(() => {
      setCopySuccess('');
    }, 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
      setCopySuccess('Failed to copy!');
       setTimeout(() => {
      setCopySuccess('');
    }, 1000);
    }
  };
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [props.detailData]);

  return (
    <div className="page-case-study-detail">
      {/* CASE STUDY BANNER Section */}
      <div className="page-case-study-banner">
        <div className="container">
          <div className="page-case-study-banner-left">
            <div className="page-case-study-logo">
              {
                !loading && (
                  <RetinaImage
                    src={[props.detailData.logoImg, props.detailData.logoImg2x]}
                    style={{ maxHeight: "50px" }}
                    alt={props.detailData.brandName}
                  />
                )
                // <Img style={{ maxHeight: '50px' }}
                //   src={props.detailData.logoImg}
                //   alt={props.detailData.brandName}
                // />
              }
              {loading && <Skeleton width={70} />}
            </div>
            <h1>{props.detailData.brandName}</h1>
          </div>
          <div
            className={`page-case-study-banner-right case-study-image-${
              props.detailData?.images?.length || 0
            }`}
          >
            {props.detailData?.images?.map((ima, index) => {
              const numberOfImages = props.detailData?.images?.length || 0;
              const specialClass = `case-study-image-${numberOfImages}`;
              return (
                <div
                  key={ima.id}
                  className={`case-study-banner-img case-study-banner-img${
                    index + 1
                  } ${specialClass}`}
                >
                  {!loading && (
                    <Img src={ima.img} alt={props.detailData.brandName} />
                  )}
                  {loading && (
                    <Skeleton
                      style={{ borderRadius: "10px", width: "100px" }}
                      height={350}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* CASE STUDY DETAILS SECTION */}
      <div className="page-case-study-info">
        {/* CASE STUDY DESCRIPTION */}
        <div className="page-case-study-desc">
          <div className="container">
            <div className="page-case-study-desc-left">
              {props.detailData.brandInfo?.slice(0, 4).map((y, index) => (
                <div className="brand-info" key={index}>
                  {y.brandInfoTitle && (
                    <strong className="title">{y.brandInfoTitle}</strong>
                  )}
                  <div className="description">
                    {y.brandInfoDescription1 ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: y.brandInfoDescription1,
                        }}
                      />
                    ) : null}


                    {y.brandInfoDescription2 ? (
                      <>{y.brandInfoDescription2}</>
                    ) : null}
                    {y.brandInfoDescription3 ? (
                      <>{y.brandInfoDescription3}</>
                    ) : null}
                    {y.brandInfoDescription4 ? (
                      <>{y.brandInfoDescription4}</>
                    ) : null}
                    {y.brandInfoDescription5 ? (
                      <>{y.brandInfoDescription5}</>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
            <div className="page-case-study-desc-right">
              {props.detailData.brandbox
                ?.filter(Boolean)
                .map((x, index) => (
                  <Fragment key={index}>
                    {x.brandBoxCount ? (
                      <div className="case-study-stats">
                        <strong>{x.brandBoxName}</strong>
                        <span className="count">
                          {x.brandBoxName === "CPV" && (
                            <i className="bi bi-currency-rupee"></i>
                          )}
                          {x.brandBoxCount}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </Fragment>
                ))
                .reverse()}
              <div className="case-study-social">
                <strong>Share</strong>
                <div className="social-icon" style={{ position: "relative" }}>
                  <ShareSocial
                    className="react-share"
                    url={shareUrl}
                    socialTypes={[
                      "facebook",
                      "twitter",
                      "linkedin",
                      "whatsapp",
                    ]}
                  />
                  <a
                    type="button"
                    className=""
                    onClick={(event) => copyToClipBoard(shareUrl, event)}
                  >
                    <BsLink45Deg />
                  </a>
                  <span
                    style={{
                      fontSize: "12px",
                      position: "absolute",
                      top: "100%",
                      right: "0",
                    }}
                  >
                    {copySuccess}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* CASE STUDY INSTAGRAM FEED */}
        <div className="case-study-feed-sec">
          <Slider className="" {...caseStudyFeed} key={key}>
            {props?.detailData?.feedURL &&
              props?.detailData?.feedURL.map((feed) => {
                return (
                  <Fragment key={feed.id}>
                    {feed.url.includes("instagram") ? (
                      <div
                        key={feed?.id || feed.url}
                        className="case-study-feed"
                      >
                        <div className="case-study-feed-video">
                          {!loading && (
                            <Link to={feed.url} target="_blank">
                              <Img src={feed.img} alt="" />
                            </Link>
                          )}
                          {loading && <Skeleton width={`100%`} height={500} />}
                          {/* <InstagramEmbed url={feed.url}  hideCaption={false}
        containerTagName="div" className='case-study-video'
        protocol=""   onLoad={() => setLoading(false)}
        onError={() => setLoading(false)} /> */}
                        </div>
                      </div>
                    ) : (
                      <div
                        key={feed?.id || feed.url}
                        className="case-study-feed"
                      >
                        <div className="case-study-feed-video">
                          {!loading && (
                            <Link to={feed.url} target="_blank">
                              <Img src={feed.img} alt="" />
                            </Link>
                          )}
                          {loading && <Skeleton width={`100%`} height={500} />}

                          {/* <YouTubeEmbed url={feed?.url} className='case-study-video' /> */}
                        </div>
                      </div>
                    )}
                  </Fragment>
                );
              })}
          </Slider>
        </div>
      </div>
      {/* CASE STUDY PREVIOUS / NEXT LINK SECTION */}
      <div className="sec-case-study-prev-next">
        {prevPosts && (
          <Link
            to={`${baseURL}/case_studies/case_study_detail/${prevPosts.id}`}
            className={`case-study-prev-next-btn ${
              loading ? "text-underline-none" : ""
            }`}
          >
            <span>Previous</span>
            <h2>
              {!loading ? prevPosts.brandName : <Skeleton width={`100%`} />}
            </h2>
            {!loading && (
              <RetinaImage
                src={[prevPosts.logoImg, prevPosts.logoImg2x]}
                style={{ maxHeight: "50px" }}
                alt={prevPosts?.brandName}
              />
            )}
            {loading && <Skeleton width={`100%`} height={50} />}
            {/* <Img src={prevPosts.logoImg} alt={prevPosts?.brandName} style={{maxHeight:'15px'}} /> */}
          </Link>
        )}
        {!prevPosts && (
          <span className="case-study-prev-next-btn disabled">
            <span>{prevPosts}</span>
          </span>
        )}
        {nextPosts && (
          <Link
            to={`${baseURL}/case_studies/case_study_detail/${nextPosts.id}`}
            className={`case-study-prev-next-btn ${
              loading ? "text-underline-none" : ""
            }`}
          >
            <span>Next</span>
            <h2>
              {!loading ? prevPosts.brandName : <Skeleton width={`100%`} />}
            </h2>
            {!loading && (
              <RetinaImage
                src={[nextPosts.logoImg, nextPosts.logoImg2x]}
                style={{ maxHeight: "50px" }}
                alt={nextPosts?.brandName}
              />
            )}
            {loading && <Skeleton width={`100%`} height={50} />}
            {/* <Img src={nextPosts?.logoImg} alt={nextPosts?.brandName} style={{ maxHeight: '50px' }} /> */}
          </Link>
        )}
        {!nextPosts && (
          <span className="case-study-prev-next-btn disabled">
            <span>{nextPosts} asdf</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default CaseStudiesDetailContainer;
