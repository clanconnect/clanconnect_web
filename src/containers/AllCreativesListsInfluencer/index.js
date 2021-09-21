import React from "react";
import Header from "components/DemoHeader";
import SideNav from "components/DemoSideNav";
import Breadcrumb from "components/Breadcrumb";
import CreativeTableInfluencer from "components/CreativeTableInfluencer";
import "./styles.scss";

const AllCreativesListsInfluencer = (props) => {
  return (
    <div className="main-wrapper">
      <Header />
      <div className="flex top-space-commom">
        <SideNav />
        <div className="content-wrapper">
          <Breadcrumb text={`All Creatives`} />

          <div className="list-wrapper">
            <div>
              <h2 className="title-w-bdr"><span>All Creatives</span></h2>
            </div>
            <CreativeTableInfluencer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCreativesListsInfluencer;
