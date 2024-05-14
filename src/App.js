import React, { useState } from "react";
import { useSnackbar } from "notistack";
//Maintain import orders
import AddIncomeCard from "./components/AddIncomeCard/AddIncomeCard";
import AddExpenseCard from "./components/AddExpenseCard/AddExpenseCard";
import AddIncomeForm from "./components/AddIncomeForm/AddIncomeForm";
import AddExpenseForm from "./components/AddExpenseForm/AddExpenseForm";
import UpdateExpenseForm from "./components/UpdateExpenseForm/UpdateExpenseForm";
import TransactionsCard from "./components/TransactionsCard/TransactionsCard";
import ExpensesSummary from "./components/ExpensesSummary/ExpensesSummary";
import TopExpensesDetails from "./components/TopExpensesDetails/TopExpensesDetails";
import { DEFAULT_WALLET_BALANCE } from "./constants/";
import "./App.css";

const App = () => {
  const [isOpenIncomeModal, setIsOpenIncomeModal] = useState(false);
  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false);
  const [mode, setMode] = useState("");
  const [updateExpenseId, setUpdateExpenseId] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const localStorageExpenses = JSON.parse(localStorage.getItem("expenses"));
  const localStorageWalletBalance = JSON.parse(localStorage.getItem("wallet"));

  const [expenses, setExpenses] = useState(
    localStorageExpenses ? localStorageExpenses : []
  );
  const [walletBalance, setWalletBalance] = useState(
    localStorageWalletBalance
      ? localStorageWalletBalance.walletBalance
      : DEFAULT_WALLET_BALANCE
  );

  const isOpenAddExpenseForm = mode === "ADD" && isOpenExpenseModal;
  const isOpenUpdateExpenseForm = mode === "UPDATE" && isOpenExpenseModal;

  const setExpensesInLocalStorage = expensesData =>
    localStorage.setItem("expenses", JSON.stringify(expensesData));

  const setWalletBalanceInLocalStorage = walletBalance =>
    localStorage.setItem(
      "wallet",
      JSON.stringify({
        walletBalance,
      })
    );

  const addExpense = expense => {
    const updatedWalletBalance = walletBalance - expense.price;
    if (updatedWalletBalance < 0) {
      enqueueSnackbar("Wallet balance is insufficient", { variant: "error" });

      return;
    }

    setExpenses(prev => {
      const expensesData = [...prev, expense];
      setExpensesInLocalStorage(expensesData);
      return expensesData;
    });

    setWalletBalance(updatedWalletBalance);
    setWalletBalanceInLocalStorage(updatedWalletBalance);
  };

  const updateExpense = (updatedExpense, expenseAmount) => {
    console.log(updatedExpense, expenseAmount);
    const updatedWalletBalance = walletBalance + expenseAmount;
    if (updatedWalletBalance < 0) {
      enqueueSnackbar("Wallet balance is insufficient", { variant: "error" });

      return;
    }

    setWalletBalance(updatedWalletBalance);
    setWalletBalanceInLocalStorage(updatedWalletBalance);

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
      setExpensesInLocalStorage(existingExpenses);
      return existingExpenses;
    });
  };

  const addIncome = income => {
    setWalletBalance(income);
    setWalletBalanceInLocalStorage(income);
  };

  const deleteExpense = id => {
    const updatedExpenses = expenses.filter(expense => {
      if (expense.id !== id) {
        return true;
      } else {
        setWalletBalance(prev => {
          const walletBalance = prev + expense.price;
          setWalletBalanceInLocalStorage(walletBalance);
          return walletBalance;
        });
        return false;
      }
    });
    setExpensesInLocalStorage(updatedExpenses);
    setExpenses(updatedExpenses);
  };

  const openAddIncomeModal = () => {
    setIsOpenIncomeModal(true);
  };

  const openAddExpenseForm = () => {
    setMode("ADD");
    setIsOpenExpenseModal(true);
  };

  const openUpdateExpenseForm = id => {
    setUpdateExpenseId(id);
    setMode("UPDATE");
    setIsOpenExpenseModal(true);
  };

  const closeUpdateExpenseForm = () => {
    setUpdateExpenseId("");
    setMode("");
    setIsOpenExpenseModal(false);
  };

  const closeExpenseModal = () => {
    setIsOpenExpenseModal(false);
  };

  const totalExpenses = () =>
    expenses.reduce((accumulator, current) => accumulator + current.price, 0);

  const getActiveUpdateExpense = () =>
    expenses.find(expense => expense.id === updateExpenseId);

  const renderUpdateExpenseForm = () => (
    <UpdateExpenseForm
      walletBalance={walletBalance}
      existingExpense={getActiveUpdateExpense()}
      isOpen={isOpenExpenseModal}
      closeModal={closeUpdateExpenseForm}
      updateExpense={updateExpense}
    />
  );

  const renderAddExpenseForm = () => (
    <AddExpenseForm
      isOpen={isOpenExpenseModal}
      closeModal={closeExpenseModal}
      addExpense={addExpense}
    />
  );
  const renderAddIncomeModal = () => (
    <AddIncomeForm
      isOpen={isOpenIncomeModal}
      closeModal={() => setIsOpenIncomeModal(false)}
      addIncome={addIncome}
      walletBalance={walletBalance}
    />
  );

  const renderTransactionsAndTopExpensesCards = () => (
    <div className="transactions-and-top-expenses-details">
      <TransactionsCard
        expenses={expenses}
        deleteExpense={deleteExpense}
        openUpdateExpenseForm={openUpdateExpenseForm}
      />
      <TopExpensesDetails expenses={expenses} />
    </div>
  );

  const renderAddIncomeAndExpenseDetailsCards = () => (
    <div className="income-expenses-details-container">
      <AddIncomeCard
        openAddIncomeForm={openAddIncomeModal}
        walletBalance={walletBalance}
      />
      <AddExpenseCard
        openAddExpenseForm={openAddExpenseForm}
        expenses={totalExpenses()}
      />
      <ExpensesSummary expenses={expenses} />
    </div>
  );

  return (
    <div className="app-container">
      <h1 className="header-text">Expense Tracker</h1>
      {renderAddIncomeAndExpenseDetailsCards()}
      {renderTransactionsAndTopExpensesCards()}
      {isOpenIncomeModal ? renderAddIncomeModal() : null}

      {isOpenAddExpenseForm ? renderAddExpenseForm() : null}
      {isOpenUpdateExpenseForm ? renderUpdateExpenseForm() : null}
    </div>
  );
};

export default App;
