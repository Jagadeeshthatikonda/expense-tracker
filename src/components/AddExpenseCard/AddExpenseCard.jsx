import React from "react";
import "./styles.css";
import { HiMiniPlusSmall } from "react-icons/hi2";
const AddExpenseCard = ({ openAddExpenseModal, expenses }) => (
  <div className="expense-card-container">
    <h2 className="expenses-balance-heading-text">
      Expenses:
      <span className="expenses-balance"> ₹{expenses}</span>
    </h2>
    <button className="add-expense-btn" onClick={openAddExpenseModal}>
      <HiMiniPlusSmall size={24} color={"white"} />
      Add Expense
    </button>
  </div>
);

export default AddExpenseCard;
