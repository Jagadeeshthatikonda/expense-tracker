// App.js
import React, { useState } from "react";
import { useSnackbar } from "notistack";
import "./App.css";
import AddIncomeCard from "./components/AddIncomeCard/AddIncomeCard";
import AddExpenseCard from "./components/AddExpenseCard/AddExpenseCard";
import AddIncomeModal from "./components/AddIncomeModal/AddIncomeModal";
import AddExpenseModal from "./components/AddExpenseModal/AddExpenseModal";
import UpdateExpenseModal from "./components/UpdateExpenseModal/UpdateExpenseModal";
import TransactionsCard from "./components/TransactionsCard/TransactionsCard";
import ExpensesPieChart from "./components/Piechart/Piechart";
import TopExpensesDetails from "./components/TopExpensesDetails/TopExpensesDetails";

const App = () => {
  const [walletBalance, setWalletBalance] = useState(10);
  const [expenses, setExpenses] = useState([]);
  const [isOpenIncomeModal, setIsOpenIncomeModal] = useState(false);
  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false);
  const [mode, setMode] = useState("");
  const [updateExpenseId, setUpdateExpenseId] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const addExpense = expense => {
    const updatedWalletBalance = walletBalance - expense.price;
    if (updatedWalletBalance < 0) {
      enqueueSnackbar("Wallet balance is insufficient", { variant: "error" });

      return;
    }

    setExpenses(prev => [...prev, expense]);

    setWalletBalance(updatedWalletBalance);
  };

  const updateExpense = (updatedExpense, expenseAmount) => {
    const updatedWalletBalance = walletBalance + expenseAmount;
    if (updatedWalletBalance < 0) {
      enqueueSnackbar("Wallet balance is insufficient", { variant: "error" });

      return;
    }

    setWalletBalance(updatedWalletBalance);

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
    const updatedExpenses = expenses.filter(expense => {
      if (expense.id !== id) {
        return true;
      } else {
        setWalletBalance(prev => prev + expense.price);
        return false;
      }
    });
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

  const isOpenAddExpenseModal = mode === "ADD" && isOpenExpenseModal;
  const isOpenUpdateExpenseModal = mode === "UPDATE" && isOpenExpenseModal;
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
        <ExpensesPieChart expenses={expenses} />
      </div>
      <div className="transactions-and-top-expenses-details">
        <TransactionsCard
          expenses={expenses}
          deleteExpense={deleteExpense}
          openUpdateExpenseModal={openUpdateExpenseModal}
        />
        <TopExpensesDetails expenses={expenses} />
      </div>
      <AddIncomeModal
        isOpen={isOpenIncomeModal}
        closeModal={() => setIsOpenIncomeModal(false)}
        addIncome={addIncome}
      />
      {isOpenAddExpenseModal ? (
        <AddExpenseModal
          isOpen={isOpenExpenseModal}
          closeModal={closeExpenseModal}
          addExpense={addExpense}
        />
      ) : null}

      {isOpenUpdateExpenseModal ? (
        <UpdateExpenseModal
          walletBalance={walletBalance}
          existingExpense={getActiveUpdateExpense()}
          isOpen={isOpenExpenseModal}
          closeModal={closeUpdateExpenseModal}
          updateExpense={updateExpense}
        />
      ) : null}
    </div>
  );
};

export default App;
