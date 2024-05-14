import React, { useState } from "react";
import Modal from "react-modal";
import "./styles.css";
import { useSnackbar } from "notistack";

const AddIncomeModal = ({ isOpen, closeModal, addIncome }) => {
  const [incomeAmount, setIncomeAmount] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = event => {
    const incomeValue = parseInt(event.target.value);
    if (!incomeValue) {
      enqueueSnackbar(
        "Income should not be empty, if it is expected then no need to add",
        { variant: "error" }
      );
    }

    setIncomeAmount(incomeValue);
  };

  const handleAddBalance = () => {
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
        <button
          onClick={handleAddBalance}
          className="add-income-button"
          disabled={!incomeAmount}
          title={
            !incomeAmount
              ? "Please enter all the details to enable this button"
              : undefined
          }
        >
          Add Balance
        </button>
        <button onClick={closeModal} className="cancel-button">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddIncomeModal;
