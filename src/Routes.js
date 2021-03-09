import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import routeConstant from 'common/routeConstants';

import Loader from 'components/Loader';

const loadable = (loader) =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  });

const ProjectDetails = loadable(() =>
  import(/* webpackChunkName: 'ProjectDetails' */ 'containers/ProjectDetails')
);

const AllCreativesLists = loadable(() =>
  import(
    /* webpackChunkName: 'AllCreativesLists' */ 'containers/AllCreativesLists'
  )
);

const Influencer = loadable(() =>
  import(/* webpackChunkName: 'InfluencerPage' */ 'containers/InfluencerPage')
);

const Routes = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <ToastContainer />
      {/* {isLoading && <Loader />} */}
      <Switch>
        <Route
          path={routeConstant.projectDetails}
          component={ProjectDetails}
          exact
        />
        <Route
          path={routeConstant.allCreativesLists}
          component={AllCreativesLists}
          exact
        />
        <Route
          path={routeConstant.influencerPage}
          component={Influencer}
          exact
        />
      </Switch>
    </>
  );
};

export default Routes;
