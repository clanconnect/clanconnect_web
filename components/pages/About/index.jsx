'use client';
import React from 'react';
import PropTypes from 'prop-types';
import Banner from './Banner';
import Founders from './Founders';
import TeamMembersComponent from './TeamMembersComponent';
import { Helmet } from '@/lib/helmet';
import SEO from '../../SEO';

class StaticAboutPage extends React.Component {
  render() {
    return (
      <>
      <SEO title="Influencer Marketing Platform for company & agency | ClanConnect - About Us" url="https://www.clanconnect.ai/about" description="ClanConnect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers." image="https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/about.png" />
      <div className='page-about'>
        <div className='triangle-extend'>
          <Banner />
          <Founders />
        </div>
        <div className='ClanTeamBacground'>
          <div className='ClanTeamHeading'>Meet the Clan</div>
          <div className='TeamMember'>
            <div className='containerWrap'>
              <div className='teamMembers-center'>
                <TeamMembersComponent />
              </div>
            </div>
          </div>
        </div>
        {/* <Investors /> */}
      </div>
      </>
    );
  }
}

StaticAboutPage.propTypes = {
  greeting: PropTypes.string,
};
export default StaticAboutPage;
