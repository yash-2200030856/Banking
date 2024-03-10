
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './popup.css';

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful');
        // Set loggedIn state here
        setLoggedIn({ username }); // Assuming only username is needed
        history.push('/home');
      } else {
        setPopupMessage('Invalid username or password');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setPopupMessage('An error occurred during login. Please try again later.');
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleOkButtonClick = () => {
    setShowPopup(false);
    history.push('/signup');
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Register</Link></li>
        </ul>
      </nav>
      <div className="login-page">
        <h1>Enter Details to Login</h1>
        <div className="login-container">
          <div className="form-group">
            <label htmlFor="username"><b>Username:</b></label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password"><b>Password:</b></label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={handleLogin} className="login-btn">Login</button>
        </div>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <span className="popup-close" onClick={handlePopupClose}>X</span>
              <p>{popupMessage}</p>
              <button onClick={handleOkButtonClick}>OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;

/*
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './popup.css';

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1); // Step 1: Enter username and password, Step 2: Enter verification code
  const history = useHistory();

  const handleLogin = async () => {
    try {
      if (step === 1) {
        // Step 1: Verify username and password
        const response = await fetch('http://localhost:8081/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Login successful');
          setStep(2); // Move to step 2: Enter verification code
        } else {
          setPopupMessage('Invalid username or password');
          setShowPopup(true);
        }
      } else if (step === 2) {
        // Step 2: Verify verification code
        // Here you would typically send the verification code to the server for validation
        // For demonstration purposes, assume the verification code is "123456"
        const serverVerificationCode = "123456"; // Replace this with the actual verification code sent by the server
        if (verificationCode === serverVerificationCode) {
          console.log('Verification successful');
          // Set loggedIn state here
          setLoggedIn({ username }); // Assuming only username is needed
          history.push('/home');
        } else {
          setPopupMessage('Invalid verification code');
          setShowPopup(true);
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setPopupMessage('An error occurred during login. Please try again later.');
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleOkButtonClick = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Register</Link></li>
        </ul>
      </nav>
      <div className="login-page">
        {step === 1 ? (
          <>
            <h1>Enter Details to Login</h1>
            <div className="login-container">
              <div className="form-group">
                <label htmlFor="username"><b>Username:</b></label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="password"><b>Password:</b></label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button onClick={handleLogin} className="login-btn">Login</button>
            </div>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </>
        ) : (
          <>
            <h1>Enter Verification Code</h1>
            <div className="verification-container">
              <div className="form-group">
                <label htmlFor="verificationCode"><b>Verification Code:</b></label>
                <input type="text" id="verificationCode" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
              </div>
              <button onClick={handleLogin} className="login-btn">Verify</button>
            </div>
          </>
        )}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <span className="popup-close" onClick={handlePopupClose}>X</span>
              <p>{popupMessage}</p>
              <button onClick={handleOkButtonClick}>OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
*/
/*
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './popup.css';

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [step, setStep] = useState(1); // Track login step (1 for username/password, 2 for verification code)
  const history = useHistory();

  const handleLogin = async () => {
    try {
      if (step === 1) {
        // First step: validate username and password
        const response = await fetch('http://localhost:8081/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Username and password validated successfully');
          // Move to the next step: verification code input
          setStep(2);
        } else {
          setPopupMessage('Invalid username or password');
          setShowPopup(true);
        }
      } else if (step === 2) {
        // Second step: validate verification code
        // Here you would validate the verification code entered by the user
        // For simplicity, let's assume the code is correct if it matches '123456'
        if (verificationCode === '123456') {
          console.log('Verification code validated successfully');
          // Set loggedIn state and redirect user to home page
          setLoggedIn({ username });
          history.push('/home');
        } else {
          setPopupMessage('Invalid verification code');
          setShowPopup(true);
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setPopupMessage('An error occurred during login. Please try again later.');
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleOkButtonClick = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Register</Link></li>
        </ul>
      </nav>
      <div className="login-page">
        {step === 1 && (
          <>
            <h1>Enter Details to Login</h1>
            <div className="login-container">
              <div className="form-group">
                <label htmlFor="username"><b>Username:</b></label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="password"><b>Password:</b></label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button onClick={handleLogin} className="login-btn">Next</button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h1>Enter Verification Code</h1>
            <div className="login-container">
              <div className="form-group">
                <label htmlFor="verificationCode"><b>Verification Code:</b></label>
                <input type="text" id="verificationCode" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
              </div>
              <button onClick={handleLogin} className="login-btn">Login</button>
            </div>
          </>
        )}
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <span className="popup-close" onClick={handlePopupClose}>X</span>
              <p>{popupMessage}</p>
              <button onClick={handleOkButtonClick}>OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
*/
/*
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './popup.css';

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [step, setStep] = useState(1); // Track login step (1 for username/password, 2 for verification code)
  const history = useHistory();

  const handleLogin = async () => {
    try {
      if (step === 1) {
        // First step: validate username and password
        const response = await fetch('http://localhost:8081/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Username and password validated successfully');
          // Move to the next step: verification code input
          setStep(2);
        } else {
          setPopupMessage('Invalid username or password');
          setShowPopup(true);
        }
      } else if (step === 2) {
        // Second step: validate verification code
        const response = await fetch('http://localhost:8081/verifyCode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, verificationCode })
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Verification code validated successfully');
          // Set loggedIn state and redirect user to home page
          setLoggedIn({ username });
          history.push('/home');
        } else {
          setPopupMessage('Invalid verification code');
          setShowPopup(true);
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setPopupMessage('An error occurred during login. Please try again later.');
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleOkButtonClick = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Register</Link></li>
        </ul>
      </nav>
      <div className="login-page">
        {step === 1 && (
          <>
            <h1>Enter Details to Login</h1>
            <div className="login-container">
              <div className="form-group">
                <label htmlFor="username"><b>Username:</b></label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="password"><b>Password:</b></label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button onClick={handleLogin} className="login-btn">Next</button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h1>Enter Verification Code</h1>
            <div className="login-container">
              <div className="form-group">
                <label htmlFor="verificationCode"><b>Verification Code:</b></label>
                <input type="text" id="verificationCode" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
              </div>
              <button onClick={handleLogin} className="login-btn">Login</button>
            </div>
          </>
        )}
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <span className="popup-close" onClick={handlePopupClose}>X</span>
              <p>{popupMessage}</p>
              <button onClick={handleOkButtonClick}>OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
*/