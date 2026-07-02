'use client';
import React from 'react'
const appStore = '/assets/images/influencers-page/app-store.png';
const playStore = '/assets/images/influencers-page/play-store.png';
import { Link } from '@/lib/router'
const dmAutomationAvif = '/assets/images/influencers-page/dm-automation.avif';
const dmAutomationwebp = '/assets/images/influencers-page/dm-automation.webp';
const dmAutomationpng = '/assets/images/influencers-page/dm-automation.png';
const commentAutomationAvif = '/assets/images/influencers-page/comment-automation.avif';
const commentAutomationwebp = '/assets/images/influencers-page/comment-automation.webp';
const commentAutomationpng = '/assets/images/influencers-page/comment-automation.png';
const ComingSoon = () => {
    const images = {
  comment: {
    avif: commentAutomationAvif,
    webp: commentAutomationwebp,
    png: commentAutomationpng,
  },
  dm: {
    avif: dmAutomationAvif,
    webp: dmAutomationwebp,
    png: dmAutomationpng,
  },
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
                    <source srcset={automationImage.avif} type="image/avif" />
                    <source srcset={automationImage.webp} type="image/webp" />
                    <source srcset={automationImage.png} type="image/png" />
                    <img src={automationImage.png} alt="Smiling woman using phone at a cafe" />
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
                    <source srcset={commentAutomationAvif} type="image/avif" />
                    <source srcset={commentAutomationwebp} type="image/webp" />
                    <source srcset={commentAutomationpng} type="image/png" />
                    <img src={commentAutomationpng} alt="Smiling woman using phone at a cafe" />
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
                    <source srcset={dmAutomationAvif} type="image/avif" />
                    <source srcset={dmAutomationwebp} type="image/webp" />
                    <source srcset={dmAutomationpng} type="image/png" />
                    <img src={dmAutomationpng} alt="Smiling woman using phone at a cafe" />
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