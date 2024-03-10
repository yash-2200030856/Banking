import React from 'react';
import { Redirect } from 'react-router-dom';

const RequireLogin = ({ loggedIn, children }) => {
  // Check if user is logged in
  if (!loggedIn) {
    // If not logged in, redirect to login page
    return <Redirect to="/login" />;
  }

  // If logged in, render the child components
  return <>{children}</>;
}

export default RequireLogin;
