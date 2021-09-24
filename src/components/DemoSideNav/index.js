import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { ACTIONS } from "../../redux/users/actions";
import { Menu, Dropdown } from "antd";
import { menu } from '../../common/dataManager'

import "./styles.scss";

//bootstrap icons
import * as Icon from 'react-bootstrap-icons';

const DemoSideNav = ({ user }) => {

  const drodpdownMenu = menu.slice(0, 1).map((item, index) => {
    // let IconName = `Icon.${item.Icon}`;
    const { [item.icon]: IconName } = Icon
    return (
      <Menu.Item key={item.id}>
        <IconName size={20} style={{ marginRight: '5px' }} />
        <a href={`${process.env.REACT_APP_WEB_HOST}/${item.link}`}>
          <p className="option-title">{item.menuTitle}</p>
        </a>
      </Menu.Item>
    )

  })

  const drodpdownMenuBottom = menu.slice(2, 3).map((item, index) => {
    // let IconName = `Icon.${item.Icon}`;
    const { [item.icon]: IconName } = Icon
    return (
      <Menu.Item key={item.id}>

        <IconName size={12} style={{ marginRight: '5px' }} />
        <a href={`${process.env.REACT_APP_WEB_HOST}/${item.link}`}>
          <p className="option-title">{item.menuTitle}</p>
        </a>
      </Menu.Item>
    )

  })


  const mobileToggleState = useSelector(state => state.mobileToggleReducer.isMobileMenuOpen)
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
      <nav className={mobileToggleState ? "sidenav sidenav-active" : "sidenav"}>
        <div className="right-menu">
          <div className="right-menu-top">
            <div class="right-menu-userinfo">
              <a
                className="ant-dropdown-link profile-link"
                onClick={(e) => e.preventDefault()}
              >
                <a href={`${process.env.REACT_APP_WEB_HOST}/clan_profile`}>
                  <img
                    src={user?.image ? user.image : "https://via.placeholder.com/100"}
                    alt="logo"
                    className="logo profile-img"
                  />
                </a>
                <div className="prof-right-content">
                  <a className="prof-name" href={`${process.env.REACT_APP_WEB_HOST}/clan_profile`}>
                    {user?.brand?.name && (<span className="profile-name">{user?.brand?.name}</span>)}

                    <span className="profile-name">{user?.name}</span>
                  </a>
                  {user.user_type == 'influencer' && user.subscription_plan_name == 'Free' && (<div className="subs-header"><a href={`${process.env.REACT_APP_WEB_HOST}/influencer/orders/subscription`} target="_blank">Limited access, Go Premium</a></div>)}

                  {user.user_type == 'influencer' && user.subscription_plan_name && user.subscription_plan_name !== 'Free' && (<div className="subs-header premium"> <span>Premium {user.plan_validity} days left.</span><a href={`${process.env.REACT_APP_WEB_HOST}/influencer/orders/subscription`} target="_blank">Renew Now</a></div>)}
                </div>
              </a>
            </div>
            <Menu>{drodpdownMenu}</Menu>
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
          <div className="right-menu-bottom">
            <Menu>{drodpdownMenuBottom}</Menu>
          </div>
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
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: () => dispatch({ type: ACTIONS.GET_USER }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DemoSideNav);
