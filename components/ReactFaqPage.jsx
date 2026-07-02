'use client';
import React from "react"
import PropTypes from "prop-types"

import FaqContainer from "./pages/Faq/Faq";


const StacticFaqPage = (props) => {
  return (
    <>
      <FaqContainer props={props}  />
      {/* <Investors /> */}
    </>
  );
}

StacticFaqPage.propTypes = {
  greeting: PropTypes.string
};
export default StacticFaqPage
