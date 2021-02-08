import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routeConstant from 'common/routeConstants';

const Login = () => {
  return <h1>Setup with saga done :)</h1>;
};
const Routes = ({ location }) => {
  return (
    <Switch location={location}>
      <Route path={routeConstant.login} component={Login} />
    </Switch>
  );
};

export default Routes;
