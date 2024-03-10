// LinkBankAccountForm.js
import React, { useState } from 'react';

const LinkBankAccountForm = ({ handleLinkBankAccount }) => {
  const [bankAccountNumber, setBankAccountNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLinkBankAccount(bankAccountNumber);
  };

  return (
    <div>
      <h2>Link Bank Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Bank Account Number"
          value={bankAccountNumber}
          onChange={(e) => setBankAccountNumber(e.target.value)}
        />
        <button type="submit">Link Account</button>
      </form>
    </div>
  );
};

export default LinkBankAccountForm;
