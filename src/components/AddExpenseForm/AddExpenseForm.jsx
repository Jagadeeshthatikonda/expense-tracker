import { v4 as uuidV4 } from "uuid";
import React, { useState } from "react";
import Modal from "react-modal";
import { useSnackbar } from "notistack";

import "./styles.css";

const AddExpenseForm = ({ isOpen, closeModal, addExpense }) => {
  const [expenseAmount, setExpenseAmount] = useState(1);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = event => {
    const expenseValue = parseInt(event.target.value);

    setExpenseAmount(expenseValue);
  };

  const handleExpense = e => {
    e.preventDefault();
    if (!expenseAmount) {
      enqueueSnackbar(
        "Expense should not be empty, if it is expected then delete the expense or do not add the expense",
        { variant: "error" }
      );
      return;
    }

    const newExpense = {
      id: uuidV4(),
      title,
      price: expenseAmount,
      category,
      date,
    };

    addExpense(newExpense);
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
        <h2 className="add-expense-heading">{`Add Expense`}</h2>
        <div className="actions-container">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={event => setTitle(event.target.value)}
            className="add-expense-input"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={expenseAmount}
            onChange={handleInputChange}
            className="add-expense-input"
            min="0"
            required
          />
          <input
            type="text"
            placeholder="Select Category"
            value={category}
            onChange={event => setCategory(event.target.value)}
            className="add-expense-input"
            required
          />
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            value={date}
            onChange={event => setDate(event.target.value)}
            className="add-expense-input"
            required
          />
          <button type="submit" className="add-expense-button">
            Add Expense
          </button>
          <button onClick={closeModal} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddExpenseForm;
