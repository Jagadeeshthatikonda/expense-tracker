import React, { useState } from "react";
import Modal from "react-modal";
import { useSnackbar } from "notistack";

import "./styles.css";

const UpdateExpenseForm = ({
  walletBalance,
  existingExpense,
  isOpen,
  closeModal,
  updateExpense,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [updatedExpenseAmount, setUpdatedExpenseAmount] = useState(
    existingExpense.price
  );
  const [title, setTitle] = useState(existingExpense.title);
  const [category, setCategory] = useState(existingExpense.category);
  const [date, setDate] = useState(existingExpense.date);

  const handleInputChange = event => {
    const expenseValue = parseInt(event.target.value);

    setUpdatedExpenseAmount(expenseValue);
  };

  const handleExpense = e => {
    e.preventDefault();
    if (!updatedExpenseAmount) {
      enqueueSnackbar(
        "Expense should not be empty, if it is expected then delete the expense",
        { variant: "error" }
      );
      return;
    }

    const newExpense = {
      id: existingExpense.id,
      title,
      price: updatedExpenseAmount,
      category,
      date,
    };

    const isAmountUpdated = existingExpense.price !== updatedExpenseAmount;
    let differenceAmount;
    if (isAmountUpdated) {
      differenceAmount = existingExpense.price - updatedExpenseAmount;
    } else {
      differenceAmount = 0;
    }
    updateExpense(newExpense, differenceAmount);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Expense"
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
          height: "335px",
          borderRadius: "15px ",
          backgroundColor: "#EFEFEFD9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          top: "auto",
          bottom: "auto",
          left: "auto",
          right: "auto",
          paddingLeft: "32px",
        },
      }}
    >
      <form onSubmit={handleExpense}>
        <h2 className="edit-balance-heading">{`Edit Expense`}</h2>
        <div className="actions-container">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={event => setTitle(event.target.value)}
            className="edit-expense-input"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={updatedExpenseAmount}
            onChange={handleInputChange}
            className="edit-expense-input"
            min="0"
            required
          />
          <input
            type="text"
            placeholder="Select Category"
            value={category}
            onChange={event => setCategory(event.target.value)}
            className="edit-expense-input"
            required
          />
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            value={date}
            onChange={event => setDate(event.target.value)}
            className="edit-expense-input"
            required
          />
          <button type="submit" className="edit-expense-button">
            Update Expense
          </button>
          <button onClick={closeModal} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateExpenseForm;
