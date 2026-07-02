'use client';
import React from 'react';
import {Link, NavLink} from '@/lib/router';
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
  BsWhatsapp,
} from 'react-icons/bs';
const clanLogo = '/assets/images/clan-logo.png';
const clanLogoWebp = '/assets/images/clan-logo.webp';

const fsLogo = '/assets/images/f&Slogo.svg';
const fsGradient = '/assets/images/f&S_gradient.svg';
const verifiedIcon = '/assets/images/icon-verified_user.svg'; 
const Footer = () => {
  const [iframeSrc, setIframeSrc] = React.useState(
    "https://dunsregistered.dnb.com/SealAuthentication.aspx?Cid=1"
  );

  React.useEffect(() => {
    if (window.location.protocol === "http:") {
      setIframeSrc("http://dunsregistered.dnb.com/SealAuthentication.aspx?Cid=1");
    }
  }, []);
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <section className="sec-have-ques">
          <div className="container">
            <div className="sec-have-ques-row">
              <div className="sec-have-ques-left">
                <h2>Have questions about our platform?</h2>
                <p>
                  We'll be pleased to walk you through the platform with one of
                  our product consultants.
                </p>
              </div>
              <Link
                className="btn btn-black ms-auto request_demo_btn"
                to="https://www.app.clanconnect.ai/request-a-demo"
              >
                Request a demo
              </Link>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="footer-sec-top">
            <Link to="/" className="site-logo">
              <picture>
                <source srcSet={clanLogoWebp} type="image/webp" />
                <source srcSet={clanLogo} type="image/png" />
                <img alt="ClanConnect" src={clanLogo} />
              </picture>
            </Link>
          </div>
          <div className="footer-sec">
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 footer-logo-sec">
              <div className="footer-info">
                <div className="award-info">
                  <img src={fsLogo} alt="Frost & Sullivan" />
                  <h3>
                    COMPETITIVE STRATEGY
                    <br /> LEADERSHIP AWARD 2023
                  </h3>
                  <p>
                    Identified as best in class in the global
                    <br /> creator economy industry
                  </p>
                </div>
                <div className="verified-info">
                  <span className="verified_meta">
                    <img src={verifiedIcon} alt="Google verified & secured" />
                    <span>Secure &amp; Verified by Google &amp; Meta</span>
                  </span>
                  <div>
                    <iframe
                      id="Iframe1"
                      src={iframeSrc}
                      width="114"
                      height="97"
                      frameBorder="0"
                      scrolling="no"
                      style={{ background: "transparent" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 footer-location-sec">
              <div className="footer-info">
                <h3 className="footer-info-title">Locations</h3>
                <ul className="footer-info-loc">
                  <li>
                    <div className="footer-info-loc-title">DE</div>
                    <address className="footer-info-address">
                      2nd Floor, 249, Phase III, Okhla Industrial Estate, South
                      Delhi, Delhi, India, 110020
                    </address>
                  </li>
                  <li>
                    <div className="footer-info-loc-title">DE</div>
                    <address className="footer-info-address">
                      Ground Floor, 43B, Phase III, Okhla Industrial Area, South
                      Delhi, Delhi 110020
                    </address>
                  </li>
                  <li>
                    <div className="footer-info-loc-title">BE</div>
                    <address className="footer-info-address">
                      8/2, Novel Office Centre, Vibgyor Net Connections,
                      Halasuru Road, Bangalore, Bengaluru Urban,Karnataka 560042
                    </address>
                  </li>
                  <li>
                    <div className="footer-info-loc-title">MU</div>
                    <address className="footer-info-address">
                      2nd Floor, Office No 201-202, Santacurz West, Swami Vivekanand Marg, Old Mahehwar Villa, Business Stites 9, Mumbai,
                      Mumbai Suburban, Maharashtra - 400054
                    </address>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
              <div className="footer-info me-5">
                <h3 className="footer-info-title">Company</h3>
                <div className="footer-links">
                  <NavLink to="/about_us"> About</NavLink>
                  <NavLink to="/case_studies"> Case Studies</NavLink>
                  <Link to="/our_business_models/1"> Our Business Models</Link>
                  <NavLink to="/blogs"> Blogs</NavLink>
                  <NavLink to="/news"> In News</NavLink>
                  <NavLink to="/pricing"> Pricing</NavLink>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
              <div className="footer-info">
                <h3 className="footer-info-title">Policies</h3>
                <div className="footer-links">
                  <Link to="/terms_condition"> Terms &amp; Conditions</Link>
                  <Link to="/privacy_policy/"> Privacy Policy</Link>
                  <Link to="/pricing_policy"> Pricing Policy</Link>
                  <Link to="/refund_cancellation_policy">
                    Refund &amp; Cancellation Policy
                  </Link>
                </div>
                <h3 className="footer-info-title mt-3 mb-1">
                  <Link className="ftr_contact_menu" to="/contact_us">
                    Contact Us
                  </Link>
                </h3>
                <h3 className="footer-info-title">
                  <Link className="ftr_contact_menu" to="/faqs">
                    FAQs
                  </Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="footer-sec btm">
            <div className="footer-btm-left">
              <p>
                &copy; {new Date().getFullYear()} ClanConnect.
                <br />A product of Irida Interactive Private Limited. All Rights
                Reserved.
              </p>
            </div>
            <div className="footer-btm-right">
              <h3 className="footer-info-title mt-3">Follow Us</h3>
              <div className="social-icon">
                <Link
                  to="https://www.facebook.com/clanconnectai"
                  target="_blank"
                >
                  <BsFacebook />
                </Link>
                <Link
                  to="https://www.instagram.com/clan_connect/"
                  target="_blank"
                >
                  <BsInstagram />
                </Link>
                <Link to="https://twitter.com/ClanConnect1" target="_blank">
                  <BsTwitterX />
                </Link>
                <Link
                  to="https://www.linkedin.com/company/clanconnect/mycompany/"
                  target="_blank"
                >
                  <BsLinkedin />
                </Link>
                <Link
                  to="https://api.whatsapp.com/send?phone=9289315858"
                  target="_blank"
                >
                  <BsWhatsapp />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
