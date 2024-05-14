import React from "react";
import { HiMiniPlusSmall } from "react-icons/hi2";

import "./styles.css";

const AddIncomeCard = ({ openAddIncomeForm, walletBalance }) => (
  <div className="income-card-container">
    <h2 className="expenses-balance-heading-text">
      Wallet Balance:
      <span className="wallet-balance" title={walletBalance}>
        {` ₹${walletBalance}`}
      </span>
    </h2>
    <button className="add-income-btn" onClick={openAddIncomeForm}>
      <HiMiniPlusSmall size={24} color={"white"} />
      Add Income
    </button>
  </div>
);

export default AddIncomeCard;
