import React from "react";

import "./styles.scss";

import icon1 from "../../assets/images/dashboard-icon.png";
import icon2 from "../../assets/images/list-icon.png";
import icon3 from "../../assets/images/Review-icon.png";

const DemoSideNav = (props) => {
  if (!window.location.pathname.includes("influencer")) {
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

export default DemoSideNav;
