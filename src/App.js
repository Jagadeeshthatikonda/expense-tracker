// App.js
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);

  const addExpense = expense => {
    setExpenses([...expenses, expense]);
    setWalletBalance(walletBalance - expense.amount);
  };

  const addIncome = income => {
    setWalletBalance(walletBalance + income.amount);
  };

  const deleteExpense = id => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="app-container">
      <h1 className="header-text">Expense Tracker</h1>
      <div className="income-expenses-details-container">sample</div>
      <div className="transactions-and-top-expenses-details">ample</div>
    </div>
  );
};

export default App;
