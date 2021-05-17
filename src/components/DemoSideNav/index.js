import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ACTIONS } from "../../redux/users/actions";
import "./styles.scss";

import icon1 from "../../assets/images/dashboard-icon.png";
import icon2 from "../../assets/images/list-icon.png";
import icon3 from "../../assets/images/Review-icon.png";
import icon4 from "../../assets/images/project-icon.png";
import icon5 from "../../assets/images/arwo-sidebar-icon.png";

const DemoSideNav = ({ user }) => {
  if (user?.user_type === "agency") {
    return (
      <nav className="sidenav">
        <div className="right-menu">
          <ul>
            <li className="link-li">
              <img className="icon" src={icon1} alt="icon" />
              <a
                href={`/home-agency?brand_account_id=${user?.current_selected_brand}`}
                className="link-item"
              >
                Search Influencer
              </a>
            </li>
            <li className="link-li">
              <img className="icon" src={icon3} alt="icon" />
              <a href="/clan_brand_list" className="link-item">
                My lists
              </a>
            </li>
            <li className="link-li">
              <img className="icon" src={icon2} alt="icon" />
              <a href="/clan_create_project" className="link-item">
                Create a Campaign
              </a>
            </li>
            <li className="link-li">
              <img className="icon" src={icon4} alt="icon" />
              <a
                href={`/agency/switch_brand_inbox?brand_account_id=${user?.current_selected_brand}`}
                className="link-item"
              >
                Inbox
              </a>
            </li>
            <li className="link-li">
              <img className="icon" src={icon5} alt="icon" />
              <a href="/" className="link-item">
                Billing
              </a>
            </li>
            <li className="link-li">
              <img className="icon" src={icon2} alt="icon" />
              <a
                href={`/agency/projects?brand_account_id=${user?.current_selected_brand}`}
                className="link-item"
              >
                Projects
              </a>
            </li>
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
              <img className="icon" src={icon1} alt="icon" />
              <a href="/projects" className="link-item">
                Projects
              </a>
            </li>
            <li className="link-li">
              <img className="icon" src={icon3} alt="icon" />
              <a href="/clan_brand_list" className="link-item">
                My lists
              </a>
            </li>
            <li className="link-li">
              <img className="icon" src={icon2} alt="icon" />

              <a href="/clan_create_project" className="link-item">
                Create a project
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else {
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
