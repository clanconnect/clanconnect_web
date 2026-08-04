'use client';
import React from 'react'
import Img from '@/components/ui/Img';
const appStore = '/assets/images/influencers-page/app-store.png';
const playStore = '/assets/images/influencers-page/play-store.png';
import { Link } from '@/lib/router'
// Only the source format is referenced now; the optimizer derives AVIF/WebP.
const dmAutomationpng = '/assets/images/influencers-page/dm-automation.png';
const commentAutomationpng = '/assets/images/influencers-page/comment-automation.png';
const ComingSoon = () => {
    const images = {
  comment: commentAutomationpng,
  dm: dmAutomationpng,
};
    const [automationImage, setAutomationImage] = React.useState(images.comment)
    const [activeAutomation, setActiveAutomation] = React.useState("comment")

    const handleAutomationImage = (e) => {
        if (e.currentTarget.querySelector('strong').textContent === "Comment Automation") {
            setAutomationImage(images.comment)
            setActiveAutomation("comment")
        } else {
            setAutomationImage(images.dm)
            setActiveAutomation("dm")
        }
    }

  return (
    <>
    <section className='launching-soon-sec d-none d-md-flex'>
        <div className='container'>
            <div className='launching-soon-image'>
                <picture>
                    <Img src={automationImage} alt="Comment and DM automation preview" />
                </picture>
            </div>
            <div className='launching-soon-content'>
                <h2 className=''>Launching soon</h2>
                <div className='automation-text-sec'>
                    <div className={`automation-text ${activeAutomation === "comment" ? "active" : ""}`} onMouseOver={handleAutomationImage}>
                        <strong>Comment Automation</strong>
                        <p>Never miss an engagement! Automatically respond to comments with smart, personalised replies that keep your audience connected and conversations alive.</p>
                    </div>
                    <div className={`automation-text ${activeAutomation === "dm" ? "active" : ""}`} onMouseOver={handleAutomationImage}>
                        <strong>DM Automation</strong>
                        <p>Scale your creator journey with ease. Automate DMs to welcome new followers, share campaign details, or answer FAQs—saving you time while staying personal.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className='launching-soon-sec d-md-none d-flex'>
        <div className='container flex-column'>
             <h2 className=''>Launching soon</h2>
            <div className='launching-soon-image'>
                <picture>
                    <Img src={commentAutomationpng} alt="Comment automation preview" />
                </picture>
            </div>
            <div className='launching-soon-content'>
               
                <div className='automation-text-sec'>
                    <div className={`automation-text ${activeAutomation === "comment" ? "active" : ""}`} onMouseOver={handleAutomationImage}>
                        <strong>Comment Automation</strong>
                        <p>Never miss an engagement! Automatically respond to comments with smart, personalised replies that keep your audience connected and conversations alive.</p>
                    </div>
                    
                </div>
            </div>
            <div className='launching-soon-image'>
                <picture>
                    <Img src={dmAutomationpng} alt="DM automation preview" />
                </picture>
            </div>
            <div className='launching-soon-content'>
               
                <div className='automation-text-sec'>
                    
                    <div className={`automation-text ${activeAutomation === "dm" ? "active" : ""}`} onMouseOver={handleAutomationImage}>
                        <strong>DM Automation</strong>
                        <p>Scale your creator journey with ease. Automate DMs to welcome new followers, share campaign details, or answer FAQs—saving you time while staying personal.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default ComingSoon