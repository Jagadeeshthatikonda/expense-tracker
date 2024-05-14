// App.js
import React, { useState } from "react";
import "./App.css";
import AddIncomeCard from "./components/AddIncomeCard/AddIncomeCard";
import AddExpenseCard from "./components/AddExpenseCard/AddExpenseCard";
import AddIncomeModal from "./components/AddIncomeModal/AddIncomeModal";
import AddOrUpdateExpensesModal from "./components/AddOrUpdateExpensesModal/AddOrUpdateExpensesModal";
import TransactionsCard from "./components/TransactionsCard/TransactionsCard";

const App = () => {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [isOpenIncomeModal, setIsOpenIncomeModal] = useState(false);
  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false);
  const [mode, setMode] = useState("");
  const [updateExpenseId, setUpdateExpenseId] = useState("");
  const isUpdateMode = mode === "UPDATE";

  const addExpense = expense => {
    setExpenses(prev => [...prev, expense]);
    setWalletBalance(walletBalance - expense);
  };

  const updateExpense = updatedExpense => {
    setExpenses(prev => {
      const existingExpenses = [...prev];

      const updatedExpenseIndexPosition = existingExpenses.findIndex(
        expense => expense.id === updatedExpense.id
      );

      if (updatedExpenseIndexPosition !== -1) {
        existingExpenses.splice(
          updatedExpenseIndexPosition,
          1,
          updatedExpense
        );
      }

      return existingExpenses;
    });
  };

  const getActiveUpdateExpense = () =>
    expenses.find(expense => expense.id === updateExpenseId);

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
    setMode("ADD");
    setIsOpenExpenseModal(true);
  };

  const openUpdateExpenseModal = id => {
    setUpdateExpenseId(id);
    setMode("UPDATE");
    setIsOpenExpenseModal(true);
  };

  const closeUpdateExpenseModal = () => {
    setUpdateExpenseId("");
    setMode("");
    setIsOpenExpenseModal(false);
  };

  const closeExpenseModal = () => {
    setIsOpenExpenseModal(false);
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
      <div className="transactions-and-top-expenses-details">
        <TransactionsCard
          expenses={expenses}
          deleteExpense={deleteExpense}
          openUpdateExpenseModal={openUpdateExpenseModal}
        />
      </div>
      <AddIncomeModal
        isOpen={isOpenIncomeModal}
        closeModal={() => setIsOpenIncomeModal(false)}
        addIncome={addIncome}
      />
      <AddOrUpdateExpensesModal
        mode={mode}
        expense={getActiveUpdateExpense()}
        isOpen={isOpenExpenseModal}
        updateExpenseId={updateExpenseId}
        closeModal={isUpdateMode ? closeUpdateExpenseModal : closeExpenseModal}
        addOrUpdateExpense={isUpdateMode ? updateExpense : addExpense}
      />
    </div>
  );
};

export default App;
