'use client';
import React from "react"
import PropTypes from "prop-types"
import Banner from "./pages/About/Banner";
import Founders from "./pages/About/Founders";
import TeamMembersComponent from "./pages/About/TeamMembersComponent";


class StaticAboutPage extends React.Component {
  render() {
    return (
      <>
        <div className="triangle-extend">
          <Banner />
          <Founders />
        </div>
        <div className="ClanTeamBacground">
          <div className="ClanTeamHeading">Meet the Clan</div>
          <div className="TeamMember">
            <div className="containerWrap">
              <div className="teamMembers-center">
                <TeamMembersComponent />
              </div>
            </div>
          </div>
        </div>
        {/* <Investors /> */}
      </>
    );
  }
}

StaticAboutPage.propTypes = {
  greeting: PropTypes.string
};
export default StaticAboutPage
