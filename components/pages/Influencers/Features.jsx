'use client';
import React from 'react'
import Img from '@/components/ui/Img';
const getDiscovered = '/assets/images/influencers-page/get-discovered.png';
const getDiscovered1 = '/assets/images/influencers-page/get-discovered1.png';
const findBrandCollaboration = '/assets/images/influencers-page/find-brand-collaboration.png';
const performanceInsights = '/assets/images/influencers-page/performance-insights.png';
const paymentDetails = '/assets/images/influencers-page/payment-details.png';
const invoice = '/assets/images/influencers-page/invoice.png';

const Features = () => {
  return (
   <section className='features-sec'>
    <div className='container'>
        <h2 className='text-center'>Features</h2>
        <div className='features-boxes'>
            <div className='features-box features-box-2x features-box-blue'>
                <div className='features-box-text'>
                    <h3>Get Discovered</h3>  
                    <ul>
                        <li>Create your profile instantly using your Instagram or<br/> YouTube account
                    </li>
                        <li>Get discovered by top brands</li>
                    </ul>
                </div>
                <div className='features-box-img'>
                    <Img src={getDiscovered} alt="Get Discovered" width={221} />
                    <Img src={getDiscovered1} alt="Get Discovered1" width={221} height={422} />
                </div>
            </div>
            <div className='features-box features-box-pink'>
                <div className='features-box-text'>
                    <h3>Find Brand Collaborations</h3>  
                    <ul>
                        <li>Browse available brand campaigns
                    </li>
                        <li>Apply to collaborations</li>
                    </ul>
                </div>
                <div className='features-box-img'>
                    <Img src={findBrandCollaboration} alt="Get Discovered" width={221} />
                    
                </div>
            </div>
              <div className='features-box features-box-purple'>
                <div className='features-box-text'>
                    <h3>Performance Insights & Analytics</h3>  
                    <ul>
                        <li>Detailed Influencer profile insights
                    </li>
                        <li>Engagement & reach tracking</li>
                    </ul>
                </div>
                <div className='features-box-img'>
                    <Img src={performanceInsights} alt="Get Discovered" width={221} />
                    
                </div>
            </div>
            <div className='features-box features-box-2x features-box-blue'>
                <div className='features-box-text'>
                    <h3>Earnings & Payments</h3>  
                    <ul>
                        <li>Transparent payment system
                    </li>
                        <li>Inbuilt invoicing feature</li>
                    </ul>
                </div>
                <div className='features-box-img'>
                    <Img src={invoice} alt="Get Discovered" width={221} />
                    <Img src={paymentDetails} alt="Get Discovered1" width={221} height={422} />
                </div>
            </div>
        </div>
    </div>
   </section>
  )
}

export default Features