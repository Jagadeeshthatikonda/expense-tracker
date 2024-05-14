// App.js
import React, { useState } from "react";
import "./App.css";
import AddIncomeCard from "./components/AddIncomeCard/AddIncomeCard";
import AddExpenseCard from "./components/AddExpenseCard/AddExpenseCard";
import AddIncomeModal from "./components/AddIncomeModal/AddIncomeModal";
import AddExpensesModal from "./components/AddExpensesModal/AddExpensesModal";
const App = () => {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [isOpenIncomeModal, setIsOpenIncomeModal] = useState(false);
  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false);

  const addExpense = expense => {
    setExpenses([...expenses, expense]);
    setWalletBalance(walletBalance - expense);
  };

  const addIncome = income => {
    setWalletBalance(walletBalance + income);
  };

  const deleteExpense = id => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const openAddIncomeModal = () => {
    setIsOpenIncomeModal(true);
  };

  const openAddExpenseModal = () => {
    setIsOpenExpenseModal(true);
  };

  const totalExpenses = () =>
    expenses.reduce((accumulator, current) => accumulator + current.price, 0);

  return (
    <div className="app-container">
      <h1 className="header-text">Expense Tracker</h1>
      <div className="income-expenses-details-container">
        <AddIncomeCard
          openAddIncomeModal={openAddIncomeModal}
          walletBalance={walletBalance}
        />
        <AddExpenseCard
          openAddExpenseModal={openAddExpenseModal}
          expenses={totalExpenses()}
        />
      </div>
      <div className="transactions-and-top-expenses-details">ample</div>
      <AddIncomeModal
        isOpen={isOpenIncomeModal}
        closeModal={() => setIsOpenIncomeModal(false)}
        addIncome={addIncome}
      />
      <AddExpensesModal
        isOpen={isOpenExpenseModal}
        closeModal={() => setIsOpenExpenseModal(false)}
        addExpense={addExpense}
      />
    </div>
  );
};

export default App;
