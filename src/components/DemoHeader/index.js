import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../../redux/users/actions";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import routeConstants from "common/routeConstants";

import logo from "assets/images/logo.png";
import dummy from "assets/images/dummy.png";

import chatIcon from "assets/images/chat2.svg";
import folderIcon from "assets/images/folder.svg";
import filterIcon from "assets/images/filter.svg";
import logoutIcon from "assets/images/logout.svg";
import coinsIcon from "assets/images/money.svg";
import * as Icon from 'react-bootstrap-icons'
import { menu, talentPartnerMenu, agencyMenu } from '../../common/dataManager'

import "./styles.scss";

const DemoHeader = ({ user }) => {
  // useEffect(() => {
  //   dispatch();
  // }, []);

  const drodpdownMenu = menu.map((item, index) => {
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

  const talentdropDown = talentPartnerMenu.map((item, index) => {
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
  const agencydropDown = agencyMenu.map((item, index) => {
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

  const dropdownWhole = () => {
    return (
      <Menu>
        {user.user_type === "influencer"
          ? drodpdownMenu
          : user.user_type === "talent_partner"
          ? talentdropDown
          : user.user_type === "agency"
          ? agencydropDown
          : null}
      </Menu>
    );
  }

  const mobileToggleState = useSelector(state => state.mobileToggleReducer)
  const mobileToggleDispatch = useDispatch()

  const handleMobileToggle = () => {
    mobileToggleDispatch({ type: "MOBILE_TOGGLE" })

  }
  // const menu = (
  //   <Menu>
  //     <Menu.Item key="0">
  //       <Icon.InboxFill size={14} style={{ marginRight: '5px' }} />
  //       <a href={`${process.env.REACT_APP_WEB_HOST}/inbox`}>
  //         <p className="option-title">Inbox</p>
  //       </a>
  //     </Menu.Item>
  //     {/* <Menu.Item key="1">
  //       <Icon.Folder size={14} style={{ marginRight: '5px' }} />
  //       <a href={`${process.env.REACT_APP_WEB_HOST}/projects`}>
  //         <p className="option-title">Projects</p>
  //       </a>
  //     </Menu.Item> */}
  //     <Menu.Item key="3">
  //       <Icon.Person size={14} style={{ marginRight: '5px' }} />
  //       <a href={`${process.env.REACT_APP_WEB_HOST}/clan_profile`}>
  //         <p className="option-title">Profile Settings</p>
  //       </a>
  //     </Menu.Item>
  //     {/* <Menu.Item key="4">
  //       <Icon.Coin size={14} style={{ marginRight: '5px' }} />
  //       <p className="option-title">Clan Coins 0</p>
  //     </Menu.Item> */}
  //     <Menu.Item key="5">
  //       <Icon.DoorOpen size={14} style={{ marginRight: '5px' }} />
  //       <a href={`${process.env.REACT_APP_WEB_HOST}/users/sign_out`}>
  //         <p className="option-title no-b"> Logout</p>
  //       </a>
  //     </Menu.Item>
  //   </Menu>
  // );
  return (
    <header className="header">
      <div className="header-top">
        <a href="/">
          <img src={logo} alt="logo" className="logo" />
        </a>

        <div>
          <h1 className="header-title">
            {user?.user_type === "influencer"
              ? "Find projects. Influence. Earn"
              : "Discover. Partner. Influence"}
          </h1>
        </div>
        <div className="profile-dropdown">
          {/* <Link to={routeConstants.allCreativesLists}>
            <span className='mr-30 profile-name'>ALL CREATIVES</span>
          </Link> */}
          {user.brand && Object.keys(user?.brand).length !== 0 && (
            <div>
              <img
                src={
                  user?.brand?.logo
                    ? `https://irida-data.s3.amazonaws.com/uploads/brand_account/${user.brand._id}/logo/${user.brand.logo}`
                    : dummy
                }
                alt="logo"
                className="logo"
                className="brand-profile-img"
              />
            </div>
          )}
          <div className="user-info">
            {user?.brand?.name && (<span className="profile-name">{user?.brand?.name}</span>)}
            <span className="profile-name">{user?.name}</span>
            {(user.user_type == 'influencer' || user.user_type == 'talent_partner') && (user.subscription_plan_name == 'Free' || !user.subscription_plan_name) && (<div className="subs-header"><a href={`${process.env.REACT_APP_WEB_HOST}/influencer/orders/subscription`} target="_blank">Limited access, Go Premium</a></div>)}

            { (user.user_type == 'influencer' || user.user_type == 'talent_partner') && user.subscription_plan_name && user.subscription_plan_name !== 'Free' && (<div className="subs-header premium"> <span>Premium | { user.plan_validity } days left.</span><a href={`${process.env.REACT_APP_WEB_HOST}/influencer/orders/subscription`} target="_blank">Renew Now</a></div>)}
          </div>

          <Dropdown overlay={dropdownWhole} trigger={["click"]} placement="bottomCenter">
            <a
              className="ant-dropdown-link profile-link"
              onClick={(e) => e.preventDefault()}
            >
              <img
                src={user?.image ? user.image : dummy}
                alt="logo"
                className="logo"
                className="profile-img"
              />
            </a>
          </Dropdown>
        </div>
        <span className="mobile-toggle" onClick={handleMobileToggle}>
          <Icon.List size={20} />
        </span>
      </div>
    </header>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(DemoHeader);
