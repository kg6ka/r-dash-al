import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
<<<<<<< HEAD
import { App, Home, AuthorizedArea, Login, Dashboard, Reports } from 'containers';
=======
import { App, Home, AuthorizedArea, Login, Dashboard, AnomaliesPage } from 'containers';
>>>>>>> a94618b63103b007f158c37f9a39216c946fef8f

export default () => (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/dashboard" component={Dashboard} />
<<<<<<< HEAD
        <Route path="/reports" component={Reports} />
=======
      <Route path="/anomalies" component={AnomaliesPage} />
>>>>>>> a94618b63103b007f158c37f9a39216c946fef8f
      <Route path="/" component={AuthorizedArea}>
        <IndexRoute component={Home} />
      </Route>
      <Route path ="login" component={Login} />
    </Route>
  </Router>
);
