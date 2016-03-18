import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { App, Home, AuthorizedArea, Login } from 'containers';

export default () => (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={AuthorizedArea}>
        <IndexRoute component={Home} />
      </Route>
      <Route path ="login" component={Login} />
    </Route>
  </Router>
);
