// ParentComponent.js (where you render the LinkAccountNumber component)
import React, { useState } from 'react';
import LinkAccountNumber from './LinkAccountNumber'; // Import LinkAccountNumber component

function ParentComponent() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    // Implement logout functionality here
    setLoggedIn(false);
  };

  return (
    <div>
      <LinkAccountNumber loggedIn={loggedIn} handleLogout={handleLogout} />
    </div>
  );
}

export default ParentComponent;
