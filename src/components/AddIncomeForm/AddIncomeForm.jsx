import React, { useState } from "react";
import Modal from "react-modal";

import "./styles.css";

const AddIncomeForm = ({ isOpen, closeModal, walletBalance, addIncome }) => {
  const [incomeAmount, setIncomeAmount] = useState(walletBalance);

  const handleInputChange = event => {
    const incomeValue = parseInt(event.target.value);

    setIncomeAmount(incomeValue);
  };

  const handleAddBalance = e => {
    e.preventDefault();

    addIncome(parseInt(incomeAmount));
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Balance"
      style={{
        overlay: {
          opacity: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          animation: "in 0.4s ease-out",
        },
        content: {
          width: "538px",
          height: "164px",
          borderRadius: "15px",
          backgroundColor: "#EFEFEFD9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          top: "auto",
          bottom: "auto",
          left: "auto",
          right: "auto",
        },
      }}
    >
      <form onSubmit={handleAddBalance}>
        <h2 className="add-balance-heading">Add Balance</h2>
        <div className="income-actions-container ">
          <input
            type="number"
            placeholder="Income Amount"
            value={incomeAmount}
            onChange={handleInputChange}
            className="add-income-input"
            min="0"
            required
          />
          <button type="submit" className="add-income-button">
            Add Balance
          </button>
          <button onClick={closeModal} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddIncomeForm;
