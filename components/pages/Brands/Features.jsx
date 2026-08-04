'use client';
import React from 'react'
import Img from '@/components/ui/Img';
const discoverInfluencer = '/assets/images/brands-page/discover-influencers.png';
const brandSecurityCompliance = '/assets/images/brands-page/brand-security-compliance.png';
const campaignManagement = '/assets/images/brands-page/campaign-management.png';
const realTime = '/assets/images/brands-page/real-time.png';

const Features = () => {
  return (
   <section className='features-sec brands-page'>
    <div className='container'>
        <h2 className='text-center'>Features</h2>
        <div className='features-boxes'>
            <div className='features-box features-box-blue'>
                <div className='features-box-text'>
                    <h3>Discover Influencers</h3>  
                    <ul>
                        <li>AI-driven influencer search
                    </li>
                        <li>Filters (followers, engagement, region, niche)</li>
                    </ul>
                </div>
                <div className='features-box-img'>
                    <Img src={discoverInfluencer} alt="Discover Influencers" width={301} height={236} />
                </div>
            </div>
            <div className='features-box features-box-pink  features-box-2x '>
                <div className='features-box-text'>
                    <h3>Brand Security &amp; Compliance</h3>  
                    <ul>
                    
                        <li>Secure contracts
                    </li>
                        <li>Verified influencers</li>
                    </ul>
                </div>
                <div className='features-box-img'>
                    <Img src={brandSecurityCompliance} alt="brandSecurityCompliance" width={729} />
                    
                </div>
            </div>
              <div className='features-box features-box-2x features-box-purple'>
                <div className='features-box-text'>
                    <h3>Campaign Management</h3>  
                    <ul>
                        <li>End-to-end campaign workflow</li>
                        <li>Creative approvals & influencer communication</li>
                        
                    </ul>
                </div>
                <div className='features-box-img'>
                    <Img src={campaignManagement} alt="Campaign Management" />
                    
                </div>
            </div>
            <div className='features-box features-box-blue'>
                <div className='features-box-text'>
                    <h3>Real-Time Reports & Analytics</h3>  
                    <ul>
                        <li>Performance tracking dashboard</li>
                        <li>ROI calculations & insights</li>
                    </ul>
                </div>
                <div className='features-box-img'>
                    <Img src={realTime} alt="Get Discovered" width={367} />
                </div>
            </div>
        </div>
    </div>
   </section>
  )
}

export default Features