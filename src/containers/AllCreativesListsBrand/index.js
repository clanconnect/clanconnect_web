import React, { useEffect } from "react";
import Header from "components/DemoHeader";
import SideNav from "components/DemoSideNav";
import Breadcrumb from "components/Breadcrumb";
import CreativeTable from "components/CreativeTable";
import { getAllCreativesAction } from "redux/brands/creatives/actions";
import { useSelector, useDispatch } from "react-redux";

import "./styles.scss";
import { useParams } from "react-router-dom";

const AllCreativesListsBrand = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allCreativeDetails = [], pagination = {} } = useSelector(
    (store) => store.creatives
  );
  useEffect(() => {
    let params = { include: "media,user,project", page: 1, perPage: 10 };
    dispatch(getAllCreativesAction({ params, id: id }));
  }, []);
  return (
    <div className="main-wrapper">
      <Header />
      <div className="flex top-space-commom">
        <SideNav />
        <div className="content-wrapper">
          <Breadcrumb text={`All Creatives`} />

          <div className="list-wrapper">
            <div>
              <h2 className="list-title">All Creatives</h2>
            </div>
            <CreativeTable
              allCreativeDetails={allCreativeDetails}
              pagination={pagination}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCreativesListsBrand;
