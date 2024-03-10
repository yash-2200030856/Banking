
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import RequireLogin from './RequireLogin';

const AccountInfo = ({ loggedIn, handleLogout }) => { // Make sure handleLogout is passed as a prop
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  const fetchAccountInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8081/accountInfo?username=${loggedIn.username}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      const data = await response.json();
      setAccountInfo(data.accountInfo);
    } catch (error) {
      console.error('Error fetching account info:', error);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Account">Account</Link></li>
          <li><Link to="/Transactions">Transactions</Link></li>
          <li><Link to="/LinkAccountNumber">Link Account Number</Link></li> {/* Add LinkAccountNumber here */}
          <li><Link to="/AccountInfo">AccountInfo</Link></li>
          {loggedIn ? (
            <>
              <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
      
      <h2>Account Information</h2>
      {accountInfo ? (
        <div>
          <p>Username: {accountInfo.username}</p>
          <p>Account Number: {accountInfo.accountNumber}</p>
          <p>Balance: {accountInfo.balance}</p>
        </div>
      ) : (
        <p>Loading account information...</p>
      )}
    </div>
  );
};

export default AccountInfo;
