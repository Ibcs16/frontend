import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Preferences from '../pages/Preferences';
import ContentDetail from '../pages/ContentDetail';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Preferences} />
    <Route path="/content/:id" component={ContentDetail} />
    <Route path="/dashboard" component={Dashboard} />
  </Switch>
);

export default Routes;
