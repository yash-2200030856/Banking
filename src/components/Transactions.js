

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RequireLogin from './RequireLogin';
import TransactionForm from './TransactionForm';
import AccountInfo from './AccountInfo'; // Import AccountInfo component
import LinkAccountNumber from './LinkAccountNumber'; // Import LinkAccountNumber component

const Transactions = ({ loggedIn, handleLogout }) => {
  const [accountInfo, setAccountInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch account information when component mounts
    fetchAccountInfo();
  }, []);

  const fetchAccountInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8081/accountInfo?username=${loggedIn.username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you have implemented token-based authentication
        },
      });
      console.log('Response:', response);
      const data = await response.json();
      console.log('Data:', data);
      setAccountInfo(data.userInfo);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching account information:', error);
    }
  };
  

  const handleTransaction = async (receiverBankAccountNumber, amount) => {
    try {
      const response = await fetch('http://localhost:8081/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you have implemented token-based authentication
        },
        body: JSON.stringify({ receiverBankAccountNumber, amount }),
      });
      const data = await response.json();
      console.log(data.message);
      // Refresh account information after transaction
      fetchAccountInfo();
    } catch (error) {
      console.error('Error performing transaction:', error);
    }
  };

  return (
    <RequireLogin loggedIn={loggedIn}>
      <div className="App">
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Account">Account Info</Link></li>
            <li><Link to="/Transactions">Transactions</Link></li>
            <li><Link to="/LinkAccountNumber">Link Account Number</Link></li> {/* Add LinkAccountNumber link */}
            <li><Link to="/AccountInfo">Account Info</Link></li> {/* Add AccountInfo link */}
            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
          </ul>
        </nav>
        <header className="Transactions Page">
          <h1>Transactions Page</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <TransactionForm handleTransaction={handleTransaction} />
              <p>Current Balance: {accountInfo.balance}</p>
              {/* Add your transaction history display logic here */}
            </>
          )}
        </header>
      </div>
    </RequireLogin>
  );
};

export default Transactions;
