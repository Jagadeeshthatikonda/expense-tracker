// IncomeForm.js
import React, { useState } from "react";
import "./styles.css";
import { HiMiniPlusSmall } from "react-icons/hi2";
import { GiExpense } from "react-icons/gi";
import { getFormattedDate } from "../../utils/dateUtils.js";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsPencil } from "react-icons/bs";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { TbArrowNarrowRight } from "react-icons/tb";

const TransactionsCard = ({
  expenses,
  deleteExpense,
  openUpdateExpenseModal,
}) => {
  const totalPages = Math.ceil(expenses.length / 3);
  const [currentPage, setCurrentPage] = useState(1);
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * 3;
  const endIndex = Math.min(startIndex + 3, expenses.length);

  const renderEachTransaction = expense => (
    <div className="transaction-container " key={expense.id}>
      <div className="transaction-icon-container">
        <GiExpense size={24} />
      </div>

      <div className="transaction-info">
        <p className="item-name" title={expense.title}>
          {expense.title}
        </p>
        <p className="transaction-date">{getFormattedDate(expense.date)}</p>
      </div>
      <p className="item-price" title={expense.price}>
        ₹{expense.price}
      </p>
      <div className="transaction-actions">
        <div
          className="delete-transaction-container"
          onClick={() => deleteExpense(expense.id)}
        >
          <IoIosCloseCircleOutline size={24} color={"white"} />
        </div>
        <div
          className="edit-transaction-container"
          onClick={() => openUpdateExpenseModal(expense.id)}
        >
          <BsPencil size={16} color={"white"} />
        </div>
      </div>
    </div>
  );

  const renderFooterActions = () => (
    <div className="footer-actions">
      <button
        className="pagination-btn"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <TbArrowNarrowLeft size={24} color="#222222" />
      </button>
      <span className="page-number-text">{currentPage}</span>
      <button
        className="pagination-btn"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <TbArrowNarrowRight size={24} color="#222222" />
      </button>
    </div>
  );

  return (
    <div className="transactions-card-container">
      <h2 className="transactions-heading-text">Recent Transactions</h2>
      {
        <div className="transactions-card">
          {expenses.length !== 0 ? (
            expenses.slice(startIndex, endIndex).map(renderEachTransaction)
          ) : (
            <p className="no-transactions-view"> No Recent transactions</p>
          )}
          {totalPages > 1 ? renderFooterActions() : null}
        </div>
      }
    </div>
  );
};
export default TransactionsCard;
