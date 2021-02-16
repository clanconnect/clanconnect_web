import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routeConstant from 'common/routeConstants';

//components
import ProjectDetails from 'containers/ProjectDetails';
import AllCreativesLists from 'containers/AllCreativesLists';
import Influencer from 'containers/InfluencerPage';

const Routes = ({ location }) => {
  return (
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
      <Route path={routeConstant.influencerPage} component={Influencer} exact />
    </Switch>
  );
};

export default Routes;
