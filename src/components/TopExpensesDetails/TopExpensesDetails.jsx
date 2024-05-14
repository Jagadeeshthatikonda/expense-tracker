// IncomeForm.js
import React from "react";
import "./styles.css";
import TopExpenseBarChart from "../TopExpenseBarChart/TopExpenseBarChart";
const TopExpensesDetails = ({ expenses }) => (
  <div className="top-expense-details-container">
    <h2 className="top-expenses-heading-text">Recent Transactions</h2>

    <div className="top-expenses-card">
      {expenses.length ? (
        <TopExpenseBarChart expenses={expenses} />
      ) : (
        <div className="no-expenses-view">
          <p>No expenses to show the bar chart</p>
        </div>
      )}
    </div>
  </div>
);
export default TopExpensesDetails;
