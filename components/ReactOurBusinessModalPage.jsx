'use client';
import React from "react"
import PropTypes from "prop-types"

import FaqContainer from "./pages/Faq/Faq";
import OurBusinessModalBrands from "./pages/OurBusinessModal/OurBusinessModalBrands";


class StacticOurBusinessModalPage extends React.Component {
  render() {
    return (
      <>
        <OurBusinessModalBrands />
        
      </>
    );
  }
}

StacticOurBusinessModalPage.propTypes = {
  greeting: PropTypes.string
};
export default StacticOurBusinessModalPage
