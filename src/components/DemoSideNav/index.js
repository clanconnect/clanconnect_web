import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { ACTIONS } from "../../redux/users/actions";

import "./styles.scss";

//bootstrap icons
import * as Icon from 'react-bootstrap-icons';

import icon1 from "../../assets/images/dashboard-icon.png";
import icon2 from "../../assets/images/list-icon.png";
import icon3 from "../../assets/images/Review-icon.png";
import icon4 from "../../assets/images/project-icon.png";
import icon5 from "../../assets/images/arwo-sidebar-icon.png";

const DemoSideNav = ({ user, toggleHandler }) => {

  const mobileToggleState = useSelector(state => state.mobileToggleReducer)
  if (user?.user_type === "agency") {
    return (

      <nav className="sidenav">
        <div className="right-menu">
          <ul>
            <li className="link-li">
              <a href={`/home-agency?brand_account_id=${user?.current_selected_brand}`} className="link-item">
                <Icon.Search size={20} />
                Search Influencer
              </a>
            </li>
            <li className="link-li">
              <a href="/clan_brand_list" className="link-item">
                <Icon.ListUl size={20} />
                My lists
              </a>
            </li>
            <li className="link-li">
              <a href="/clan_create_project" className="link-item">
                <Icon.Sticky size={20} />
                Create a Campaign
              </a>
            </li>
            <li className="link-li">
              <a href={`/agency/projects?brand_account_id=${user?.current_selected_brand}`} className="link-item">
                <Icon.Grid3x3Gap size={20} />
                Campaigns
              </a>
            </li>
            <li className="link-li">
              <a href={`/agency/switch_brand_inbox?brand_account_id=${user?.current_selected_brand}`} className="link-item">
                <Icon.Inbox size={20} />
                Inbox
              </a>
            </li>
            {
              // <li className="link-li">
              //   <img className="icon" src={icon5} alt="icon" />
              //   <a href="/" className="link-item">
              //     Billing
              //   </a>
              // </li>
            }
          </ul>
        </div>
      </nav>
    );
  } else if (user?.user_type === "advertiser") {
    return (
      <nav className="sidenav">
        <div className="right-menu">
          <ul>
            <li className="link-li">
              <a href="/projects" className="link-item">
                <Icon.Grid3x3Gap size={20} />
                Campaigns
              </a>
            </li>
            <li className="link-li">
              <a href="/clan_brand_list" className="link-item">
                <Icon.ListUl size={20} />
                My lists
              </a>
            </li>
            <li className="link-li">
              <a href="/clan_create_project" className="link-item">
                <Icon.Sticky size={20} />
                Create a Campaign
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  else if (user?.user_type === "influencer") {
    return (

      <nav className={toggleHandler ? "sidenav" : "sidenav  sidenav-active"}>
        <div className="right-menu">
          <ul>
            <li className="link-li">
              <a href="/home_creator" className="link-item">
                <Icon.Grid3x3Gap size={20} />
                Browse
              </a>
            </li>
            <li className="link-li">
              <a href="/projects" className="link-item">
                <Icon.Folder2Open size={20} />
                My Campaigns
              </a>
            </li>
            <li className="link-li">
              <a href="/finance/invoicing" className="link-item">
                <Icon.PiggyBank size={20} />
                Invoicing
              </a>
            </li>
            <li className="link-li">
              <a href="/influencer/view_profile" className="link-item">
                <Icon.Person size={20} />
                <span class="inner-menu-text">
                  View profile
                  <span>
                    (as seen by brands)
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  else {
    return <></>;
  }
};

// export default DemoSideNav;

const mapStateToProps = ({ user }) => {
  return {
    user: user.user,
  };
};

export default connect(mapStateToProps)(DemoSideNav);
