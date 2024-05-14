import React, { useState } from "react";
import { useSnackbar } from "notistack";
//Maintain import orders
import AddIncomeCard from "./components/AddIncomeCard/AddIncomeCard";
import AddExpenseCard from "./components/AddExpenseCard/AddExpenseCard";
import AddIncomeModal from "./components/AddIncomeModal/AddIncomeModal";
import AddExpenseModal from "./components/AddExpenseModal/AddExpenseModal";
import UpdateExpenseModal from "./components/UpdateExpenseModal/UpdateExpenseModal";
import TransactionsCard from "./components/TransactionsCard/TransactionsCard";
import ExpensesPieChart from "./components/Piechart/Piechart";
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

  const isOpenAddExpenseModal = mode === "ADD" && isOpenExpenseModal;
  const isOpenUpdateExpenseModal = mode === "UPDATE" && isOpenExpenseModal;

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

  const getActiveUpdateExpense = () =>
    expenses.find(expense => expense.id === updateExpenseId);

  const renderUpdateExpenseModal = () => (
    <UpdateExpenseModal
      walletBalance={walletBalance}
      existingExpense={getActiveUpdateExpense()}
      isOpen={isOpenExpenseModal}
      closeModal={closeUpdateExpenseModal}
      updateExpense={updateExpense}
    />
  );

  const renderAddExpenseModal = () => (
    <AddExpenseModal
      isOpen={isOpenExpenseModal}
      closeModal={closeExpenseModal}
      addExpense={addExpense}
    />
  );
  const renderAddIncomeModal = () => (
    <AddIncomeModal
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
        openUpdateExpenseModal={openUpdateExpenseModal}
      />
      <TopExpensesDetails expenses={expenses} />
    </div>
  );

  const renderAddIncomeAndExpenseDetailsCards = () => (
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
  );

  return (
    <div className="app-container">
      <h1 className="header-text">Expense Tracker</h1>
      {renderAddIncomeAndExpenseDetailsCards()}
      {renderTransactionsAndTopExpensesCards()}
      {isOpenIncomeModal ? renderAddIncomeModal() : null}

      {isOpenAddExpenseModal ? renderAddExpenseModal() : null}
      {isOpenUpdateExpenseModal ? renderUpdateExpenseModal() : null}
    </div>
  );
};

export default App;
