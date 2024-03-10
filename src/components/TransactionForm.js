// TransactionForm.js
import React, { useState } from 'react';

const TransactionForm = ({ handleTransaction }) => {
  const [receiverBankAccountNumber, setReceiverBankAccountNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTransaction(receiverBankAccountNumber, amount);
  };

  return (
    <div>
      <h2>Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Receiver Bank Account Number"
          value={receiverBankAccountNumber}
          onChange={(e) => setReceiverBankAccountNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
};

export default TransactionForm;
