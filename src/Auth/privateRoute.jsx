import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ component, ...args }) {
  const { isAuthenticated, profile } = useSelector((state) => state.auth);

  const hasAccess = profile.user_metadata && profile.user_metadata.hasAccess;

  // Route users back to homepage if not authenticated
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  // Route users to error page if registered users are
  // not allowed to have data access
  if (isAuthenticated) {
    if (!hasAccess) {
      return <Redirect to="/error" />;
    }
  }

  return (
    <Route
      component={component}
      {...args}
    />
  );
}

export default PrivateRoute;
