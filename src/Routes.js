import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute";
import ResourceNotFound from "components/ResourceNotFound";
import routeConstant from "common/routeConstants";
import { ACTIONS } from "redux/users/actions";
import { useDispatch } from "react-redux";

import Loader from "components/Loader";

const loadable = (loader) =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  });

const ProjectDetails = loadable(() =>
  import(/* webpackChunkName: 'ProjectDetails' */ "containers/ProjectDetails")
);

const AllCreativesListsBrand = loadable(() =>
  import(
    /* webpackChunkName: 'AllCreativesListsBrand' */ "containers/AllCreativesListsBrand"
  )
);

const Influencer = loadable(() =>
  import(/* webpackChunkName: 'InfluencerPage' */ "containers/InfluencerPage")
);

const AllCreativesListsInfluencer = loadable(() =>
  import(
    /* webpackChunkName: 'AllCreativesListsInfluencer' */ "containers/AllCreativesListsInfluencer"
  )
);

const Routes = ({ location }) => {
  const [isLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ACTIONS.GET_USER });
  }, []);

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <Switch>
        <ProtectedRoute
          path={routeConstant.projectDetails}
          component={ProjectDetails}
          exact
          user_type="agency,advertiser"
        />
        <ProtectedRoute
          path={routeConstant.allCreativesListsBrand}
          component={AllCreativesListsBrand}
          exact
          user_type="agency,advertiser"
        />
        <ProtectedRoute
          path={routeConstant.influencerPage}
          component={Influencer}
          exact
          user_type="influencer"
        />
        <ProtectedRoute
          path={routeConstant.allCreativesListsInfluencer}
          component={AllCreativesListsInfluencer}
          exact
          user_type="influencer"
        />
        <Route path="/*" component={ResourceNotFound} />
        {/* <Route
          path="*"
          component={() => {
            window.location.href = `${process.env.REACT_APP_WEB_HOST}/error`;
            return null;
          }}
        /> */}
      </Switch>
    </>
  );
};

export default Routes;
