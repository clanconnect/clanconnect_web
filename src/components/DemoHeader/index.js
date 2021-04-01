import React, { useEffect } from "react";
import { connect } from "react-redux";
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

import "./styles.scss";

const DemoHeader = (props) => {
  useEffect(() => {
    props.dispatch();
  }, []);
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <img src={chatIcon} className="icon" alt="icon" />
        <a href="https://cheetah.irida-test.c66.me/inbox">
          <p className="option-title">Inbox</p>
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <img src={folderIcon} className="icon" alt="icon" />
        <a href="https://cheetah.irida-test.c66.me/projects">
          <p className="option-title">Projects</p>
        </a>
      </Menu.Item>
      <Menu.Item key="3">
        <img src={filterIcon} className="icon" alt="icon" />
        <a href="https://cheetah.irida-test.c66.me/clan_profile">
          <p className="option-title">Profile Settings</p>
        </a>
      </Menu.Item>
      <Menu.Item key="4">
        <img src={coinsIcon} className="icon" alt="icon" />
        <p className="option-title">Clan Coins 0</p>
      </Menu.Item>
      <Menu.Item key="5">
        <img src={logoutIcon} className="icon" alt="icon" />
        <a href="https://cheetah.irida-test.c66.me/users/sign_out">
          <p className="option-title no-b"> Logout</p>
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <header className="header">
      <div className="header-top">
        <a href="/">
          <img src={logo} alt="logo" className="logo" />
        </a>

        <div>
          <h1 className="header-title">
            {props?.user?.user_type === "influencer"
              ? "Discover. Partner. Influence"
              : "Find projects. Influence. Earn"}
          </h1>
        </div>
        <div className="profile-dropdown">
          {/* <Link to={routeConstants.allCreativesLists}>
            <span className='mr-30 profile-name'>ALL CREATIVES</span>
          </Link> */}
          <span className="profile-name">{props?.user?.name}</span>
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link profile-link"
              onClick={(e) => e.preventDefault()}
            >
              <img
                src={props?.user?.image ? props.user.image : dummy}
                alt="logo"
                className="logo"
                className="profile-img"
              />
            </a>
          </Dropdown>
        </div>
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
