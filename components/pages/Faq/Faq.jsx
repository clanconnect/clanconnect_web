'use client';
import React, {useState, useEffect} from 'react';
import {Accordion, Tab, Tabs} from 'react-bootstrap';
import {Link, useParams} from '@/lib/router';
import {faqData} from '../../../data/data';
import { Helmet } from '@/lib/helmet';

const FaqContainer = (props) => {
  const [faqList, setfaqList] = useState(faqData);

  useEffect(() => {
    setfaqList(faqList);
  }, [faqList]);
  useEffect(() => {
    const addClass = document.querySelector('body');
    addClass.classList.add('common-bg-page');

    // Cleanup function to remove the class when the component is unmounted
    return () => {
      addClass.classList.remove('common-bg-page');
    };
  }, []);
  return (
    <>
      <Helmet>
        <title>ClanConnect - Faqs</title>
        <link rel="canonical" href="https://www.clanconnect.ai/faqs" />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content="https://www.clanconnect.ai/faqs" />
        <meta property="og:title" content="ClanConnect - Faqs" />
        <meta property="og:description" content="Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers." />
        <meta property="og:image" content="https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/faqs.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
      </Helmet>
    <section className='sec-accordion'>
      {/* <div className="banner-innerpage">
                <div className='banner-content'>
                    <h1 className='banner-innerpage-heading title-w-bdr'><span>FAQs</span></h1>
                </div>
            </div> */}
      <div className='homeBanner homeBannerLatest inner news'>
        <div className='container'>
          <div className='banner-content'>
            <h1 className='banner-innerpage-heading'>FAQs</h1>
          </div>
        </div>
      </div>
      <div className='sec-accordion-content'>
        <div className='container'>
          {faqList &&
            faqList?.map((faq, index) => {
              return (
                <React.Fragment key={index}>
                  {' '}
                  <Tabs
                    // defaultActiveKey={props.userType == 'advertiser' ? "brands" : "influencers"}
                    className='mb-3'
                  >
                    <Tab eventKey='influencers' title='Influencers'>
                      <Accordion>
                        {faq?.influencerData?.map((inflData) => {
                          return (
                            <Accordion.Item
                              eventKey={inflData.id}
                              key={inflData.id}
                              id={`insta-${inflData.id}`}
                            >
                              <Accordion.Header>
                                {inflData.faqTitle}
                              </Accordion.Header>
                              <Accordion.Body>
                                {inflData.faqSubtitleDescriptionList && (
                                  <ul>
                                    {inflData.faqSubtitleDescriptionList &&
                                    inflData.faqSubtitleDescriptionList
                                      ? inflData.faqSubtitleDescriptionList.map(
                                          (faqsdl, index) => {
                                            return <li>{faqsdl.listDesc}</li>;
                                          }
                                        )
                                      : ''}
                                  </ul>
                                )}
                                {/* {inflData.faqsd && inflData.faqsd.faqSubtitleDescriptionList
                                        <ul>
                                            {inflData.faqsd.faqSubtitleDescriptionList && inflData.faqsd.faqSubtitleDescriptionList ? inflData.faqsd.faqSubtitleDescriptionList.map(faqsdl => {
                                                return <li>{faqsdl.listDesc}</li>
                                            }) : ""}
                                        </ul>
                                    } */}
                                {inflData?.faqInnerDescription &&
                                inflData?.faqInnerDescription ? (
                                  <>
                                    <p>
                                      {inflData?.faqDescription &&
                                        inflData?.faqDescription}
                                    </p>
                                    <ul>
                                      {inflData?.faqInnerDescription &&
                                        inflData?.faqInnerDescription.faqInnerDescriptionList.map(
                                          (faqInnerDesc, index) => {
                                            return (
                                              <li key={index}>
                                                {faqInnerDesc.listDesc}
                                              </li>
                                            );
                                          }
                                        )}
                                    </ul>
                                  </>
                                ) : null}
                                {!inflData?.faqInnerDescription &&
                                  inflData?.faqDescription && (
                                    <p>
                                      {inflData?.faqDescription &&
                                        inflData?.faqDescription}
                                    </p>
                                  )}
                                <>
                                  <p>{inflData?.faqSubtitleDescription}</p>
                                  {inflData?.faqSubDescription &&
                                  inflData?.faqSubDescription
                                    ? inflData?.faqSubDescription.map(
                                        (faqse) => {
                                          return (
                                            <>
                                              <strong>
                                                {faqse.faqSubtitle}
                                              </strong>
                                              <p>
                                                {faqse.faqSubtitleDescription}
                                              </p>
                                            </>
                                          );
                                        }
                                      )
                                    : ''}
                                  <p>{inflData?.faqInnerDescription?.desc}</p>
                                </>
                              </Accordion.Body>
                            </Accordion.Item>
                          );
                        })}
                      </Accordion>
                      <p className='fs-14 font-italic'>
                        <strong>Please note:</strong> ClanConnect is an
                        influencer marketplace where we bring influencers and
                        brands on a common plane in the most transparent manner.
                        The selection of influencers for campaigns is the sole
                        prerogative of the brand and ClanConnect has no role in
                        this. Also, it is advisable to have a minimum of 1000
                        followers/subscribers to apply for a campaign.
                      </p>
                    </Tab>
                    <Tab eventKey='brands' title='Brands'>
                      <Accordion>
                        {faq?.brandsData?.map((branData) => {
                          return (
                            <Accordion.Item
                              eventKey={branData.id}
                              key={branData.id}
                              id={`insta-${branData.id}`}
                            >
                              <Accordion.Header>
                                {branData.faqTitle}
                              </Accordion.Header>
                              <Accordion.Body>
                                {branData.faqDescriptionWithInlineImageDesc ? (
                                  <p>
                                    {branData.faqDescriptionWithInlineImageDesc}
                                    <img
                                      src={
                                        branData.faqDescriptionWithInlineImageImg
                                      }
                                      alt=''
                                      width='25'
                                      style={{
                                        marginLeft: '5px',
                                        marginRight: '5px',
                                      }}
                                    />
                                    {
                                      branData.faqDescriptionWithInlineImageDesc1
                                    }
                                  </p>
                                ) : (
                                  ''
                                )}
                                {branData.faqSubtitleDescriptionList && (
                                  <ul>
                                    {branData.faqSubtitleDescriptionList &&
                                    branData.faqSubtitleDescriptionList
                                      ? branData.faqSubtitleDescriptionList.map(
                                          (faqsdl, index) => {
                                            return (
                                              <li key={index}>
                                                {faqsdl.listDesc}
                                              </li>
                                            );
                                          }
                                        )
                                      : ''}
                                  </ul>
                                )}
                                {/* {branData.faqsd && branData.faqsd.faqSubtitleDescriptionList
                                                            <ul>
                                                                {branData.faqsd.faqSubtitleDescriptionList && branData.faqsd.faqSubtitleDescriptionList ? branData.faqsd.faqSubtitleDescriptionList.map(faqsdl => {
                                                                    return <li>{faqsdl.listDesc}</li>
                                                                }) : ""}
                                                            </ul>
                                                        } */}
                                {branData?.faqInnerDescription &&
                                branData?.faqInnerDescription ? (
                                  <>
                                    <p>
                                      {branData?.faqDescription &&
                                        branData?.faqDescription}
                                    </p>
                                    <ul>
                                      {branData?.faqInnerDescription &&
                                        branData?.faqInnerDescription.faqInnerDescriptionList.map(
                                          (faqInnerDesc, index) => {
                                            return (
                                              <li key={index}>
                                                {faqInnerDesc.listDesc}
                                              </li>
                                            );
                                          }
                                        )}
                                    </ul>
                                  </>
                                ) : null}
                                {!branData?.faqInnerDescription &&
                                  branData?.faqDescription && (
                                    <>
                                      <p>
                                        {branData?.faqDescription &&
                                          branData?.faqDescription}
                                      </p>
                                    </>
                                  )}
                                <>
                                  <p>{branData?.faqSubtitleDescription}</p>
                                  {branData?.faqSubDescription &&
                                  branData?.faqSubDescription
                                    ? branData?.faqSubDescription.map(
                                        (faqse, index) => {
                                          return (
                                            <>
                                              <strong>
                                                {faqse.faqSubtitle}
                                              </strong>
                                              <p>
                                                {faqse.faqSubtitleDescription}
                                              </p>
                                            </>
                                          );
                                        }
                                      )
                                    : ''}
                                  <p>{branData?.faqInnerDescription?.desc}</p>
                                </>
                                {branData?.img && (
                                  <img
                                    src={branData.img}
                                    style={{
                                      width: '240px',
                                      marginBottom: '15px',
                                    }}
                                  />
                                )}
                              </Accordion.Body>
                            </Accordion.Item>
                          );
                        })}
                      </Accordion>
                    </Tab>

                    <Tab
                      id='CampaignsTab'
                      eventKey='instagram'
                      title='Campaigns'
                    >
                      <Accordion>
                        {faq?.instagramData?.map((insData) => {
                          return (
                            <Accordion.Item
                              eventKey={insData.id}
                              key={insData.id}
                              id={`insta-${insData.id}`}
                            >
                              <Accordion.Header>
                                {insData.faqTitle}
                              </Accordion.Header>
                              <Accordion.Body>
                                {insData.faqSubtitleDescriptionList && (
                                  <ul>
                                    {insData.faqSubtitleDescriptionList &&
                                    insData.faqSubtitleDescriptionList
                                      ? insData.faqSubtitleDescriptionList.map(
                                          (faqsdl, index) => {
                                            return (
                                              <li key={index}>
                                                {faqsdl.listDesc}
                                              </li>
                                            );
                                          }
                                        )
                                      : ''}
                                  </ul>
                                )}
                                {/* {insData.faqsd && insData.faqsd.faqSubtitleDescriptionList
                                            <ul>
                                                {insData.faqsd.faqSubtitleDescriptionList && insData.faqsd.faqSubtitleDescriptionList ? insData.faqsd.faqSubtitleDescriptionList.map(faqsdl => {
                                                    return <li>{faqsdl.listDesc}</li>
                                                }) : ""}
                                            </ul>
                                        } */}
                                {insData?.faqInnerDescription &&
                                insData?.faqInnerDescription ? (
                                  <>
                                    <p>
                                      {insData?.faqDescription &&
                                        insData?.faqDescription}
                                    </p>
                                    <ul>
                                      {insData?.faqInnerDescription &&
                                        insData?.faqInnerDescription.faqInnerDescriptionList.map(
                                          (faqInnerDesc, index) => {
                                            return (
                                              <li key={index}>
                                                {faqInnerDesc.listDesc}
                                              </li>
                                            );
                                          }
                                        )}
                                    </ul>
                                  </>
                                ) : null}
                                {!insData?.faqInnerDescription &&
                                  insData?.faqDescription && (
                                    <p>
                                      {insData?.faqDescription &&
                                        insData?.faqDescription}
                                    </p>
                                  )}
                                <>
                                  <p>{insData?.faqSubtitleDescription}</p>
                                  {insData?.faqSubDescription &&
                                  insData?.faqSubDescription
                                    ? insData?.faqSubDescription.map(
                                        (faqse) => {
                                          return (
                                            <>
                                              <strong>
                                                {faqse.faqSubtitle}
                                              </strong>
                                              <p>
                                                {faqse.faqSubtitleDescription}
                                              </p>
                                            </>
                                          );
                                        }
                                      )
                                    : ''}
                                  <p>{insData?.faqInnerDescription?.desc}</p>
                                </>
                              </Accordion.Body>
                            </Accordion.Item>
                          );
                        })}
                      </Accordion>
                    </Tab>
                  </Tabs>
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </section>
    </>
  );
};

export default FaqContainer;
