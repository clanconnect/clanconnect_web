'use client';
import React, {useEffect, useState,useRef} from 'react';
import {Link, NavLink} from '@/lib/router';
import Img from '@/components/ui/Img';
const clanLogo = '/assets/images/clan-logo.png';
import { gsap } from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
gsap.registerPlugin(Physics2DPlugin);
export const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [storeLink, setStoreLink] = useState('');
    const [burst, setBurst] = useState(false);
    const emitterRef = useRef(null);
    const leftEmitterRef = useRef(null);
const rightEmitterRef = useRef(null);

  const handleToggle = () => setToggle((prev) => !prev);

  // Handle menu active state
  useEffect(() => {
    const menuActiveClass = document.documentElement;
    toggle
      ? menuActiveClass.classList.add("menuActive")
      : menuActiveClass.classList.remove("menuActive");
  }, [toggle]);

  const handleNavLinkClick = () => setToggle(false);
 
  return (
    <>
    
    <header
        className="site-header"
      >
      <div className='container d-flex align-items-center'>
        <Link className='logo' to='/'>
          {/* Sitewide masthead: always above the fold, so it is preloaded. */}
          <Img className='img-fluid' src={clanLogo} alt='ClanConnect' priority />
        </Link>

        <span
          className={
            toggle ? 'menu-toggle-static active' : 'menu-toggle-static'
          }
          onClick={handleToggle}
        >
          <span></span>
        </span>
        <nav
          className={
            toggle ? 'nav-menu d-lg-block active' : 'nav-menu d-lg-block'
          }
        >
          <Link onClick={handleNavLinkClick} className='d-md-none logo' to='/'>
            <Img className='img-fluid' src={clanLogo} alt='ClanConnect' />
          </Link>
          <ul>
            <li>
              <NavLink onClick={handleNavLinkClick} to='/'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink onClick={handleNavLinkClick} to='/about_us'>
                About
              </NavLink>
            </li>
             {/* <li>
              <NavLink onClick={handleNavLinkClick} to='/influencers'>
                Influencers
              </NavLink>
            </li>
            <li>
              <NavLink onClick={handleNavLinkClick} to='/brands'>
                Brands
              </NavLink>
            </li> */}
            <li>
              <NavLink onClick={handleNavLinkClick} to='/case_studies'>
                Case Studies
              </NavLink>
            </li>
            <li>
              <NavLink onClick={handleNavLinkClick} to='/blogs'>
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink onClick={handleNavLinkClick} to='/news'>
                In News
              </NavLink>
            </li>
          </ul>
          <ul className='d-md-none login-btns'>
            <li>
              <Link to='https://app.clanconnect.ai/login' target='_blank'>
                Login
              </Link>
            </li>
            <li>
              <Link to='https://app.clanconnect.ai' target='_blank'>
                Sign Up
              </Link>
            </li>
            {/* <li>
              <Link className='request_demo_btn' to='/request_demo'>
                Request a demo
              </Link>
            </li> */}
          </ul>
        </nav>
        <ul className='ml-auto site-header-right'>
          <li className='req-demo-btn'>
            <Link className='btn request_demo_btn' to='https://www.app.clanconnect.ai/request-a-demo'>
              Request a demo
            </Link>
          </li>
          <li>
            <Link
              to='https://app.clanconnect.ai'
              className='ml-3'
              target='_blank'
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link to='https://app.clanconnect.ai/login' target='_blank'>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </header>
    </>
  );
};
