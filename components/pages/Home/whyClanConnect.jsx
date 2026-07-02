'use client';
import React, {useState} from 'react';
import Accordion from 'react-bootstrap/Accordion';

const WhyClanConnect = () => {
  return (
    <section className='sec-common sec-why-clanconnect'>
      <div className='container '>
        <h2 className='text-center'>Why Clanconnect</h2>
        <Accordion>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>
              For All Your Influencer Marketing Needs | Build Your Network,
              Build Your Clan
            </Accordion.Header>
            <Accordion.Body>
              In this era of fast marketing & split-second attention spans, it's
              absolutely necessary to build a relationship with your end-users.
              With the advent of rejection of mainstream marketing tactics,
              social media becomes the new television, newspaper & radio, and
              the sure-fire way for brands to establish contact & build
              connections with their users. But how does one do that? How does
              one identify the right brand to collaborate with or the right
              influencer with the right influence? How does a brand reach the
              influencer & vice-versa? The answer is simple, ClanConnect, an
              AI-driven influencer marketing campaign manager.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='1'>
            <Accordion.Header>
              Your One-stop Influencer Marketing Platform
            </Accordion.Header>
            <Accordion.Body>
              ClanConnect, in a nutshell, facilitates collaboration between
              content creators and marketers to optimise the value of their
              branded content. ClanConnect's proprietary AI-enabled tool
              analyses an influencer's digital footprint, audience reach,
              engagement, follower quality, audience demographics & more to
              offer the right recommendations to brands.
              <br />
              Find, within seconds, the right group of influencers who can check
              every box in your marketing objectives list & deliver the desired
              impact.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='2'>
            <Accordion.Header>
              What was the need for developing this influencer marketing
              company/agency?{' '}
            </Accordion.Header>
            <Accordion.Body>
              After extensive research about the influencer marketing space, it
              was found that it has incredible potential but is largely
              unorganized. We take out the guesswork from the whole influencer
              marketing activities. Social media is overflowing with options &
              choosing the right influencer is crucial. Hence, ClanConnect
              became the flagbearer of innovation in this sector to bridge the
              gap between brands & content creators.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='3'>
            <Accordion.Header>
              Unlock Your Real Potential with ClanConnect{' '}
            </Accordion.Header>
            <Accordion.Body>
              With ClanConnect both brands & influencers can gain multiple
              benefits. While ClanConnect helps brands discover the right
              influencers, it also helps influencers & content creators identify
              & connect with the right brands to collaborate with. Apart from
              this, with ClanConnect you can benefit in the following ways:
              <ul>
                <li>
                  Benefit from the power of 30+ insightful metrics, free
                  campaign briefs & more
                </li>
                <li>
                  Get insights on audience demographics, engagement analysis
                </li>
                <li>
                  Discover the optimum timings & the right mix of content to
                  post
                </li>
                <li>Directly collaborate with brands & influencers</li>
                <li>Gain knowledge about your own audience</li>
                <li>Learn from other brands & influencers </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </section>
  );
};

export default WhyClanConnect;
