'use client';
import React from "react"
import PropTypes from "prop-types"
import NewsContainer from "./pages/News";


class StaticNewsPage extends React.Component {
  render() {
    return (
      <>
        <NewsContainer />
        {/* <Investors /> */}
      </>
    );
  }
}

StaticNewsPage.propTypes = {
  greeting: PropTypes.string
};
export default StaticNewsPage
