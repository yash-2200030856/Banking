

import React, { useState } from 'react';
import './App.css';
import Home from './components/home';
import Login from './components/Login';
import Signup from './components/Signup';
import Account from './components/Account';
import Wallpaper from './components/wallpaper1.mp4';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Transactions from './components/Transactions';
import AccountInfo from './components/AccountInfo';
import LinkAccountNumber from './components/LinkAccountNumber';
import LinkBankAccountForm from './components/LinkBankAccountForm'; // Import LinkBankAccountForm
import RequireLogin from './components/RequireLogin'; // Import RequireLogin

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogout = () => {
    setLoggedIn(false);
  };
  return (
    <div className="App">
      <div className="background-video">
        <video autoPlay loop muted playsInline>
          <source src={Wallpaper} type="video/mp4" />
        </video>
      </div>
      <Router>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" render={(props) => <Home {...props} loggedIn={loggedIn} handleLogout={handleLogout} />} />
        <Route path="/login" render={(props) => <Login {...props} setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" component={Signup} />
        <Route path="/Transactions" render={(props) => <Transactions {...props} loggedIn={loggedIn} handleLogout={handleLogout} />} />
        <Route path="/Account" render={(props) => <Account {...props} loggedIn={loggedIn} handleLogout={handleLogout} />} />
        <Route path="/AccountInfo" render={(props) => <RequireLogin loggedIn={loggedIn}><AccountInfo {...props} loggedIn={loggedIn} handleLogout={handleLogout} /></RequireLogin>} />
        <Route path="/LinkAccountNumber" render={(props) => <RequireLogin loggedIn={loggedIn}><LinkAccountNumber {...props} loggedIn={loggedIn} handleLogout={handleLogout} /></RequireLogin>} />
        <Route path="/LinkBankAccountForm" render={(props) => <LinkBankAccountForm {...props} loggedIn={loggedIn} handleLogout={handleLogout} />} /> {/* Include LinkBankAccountForm route */}
      </Router>
    </div>
  );
}

export default App;
