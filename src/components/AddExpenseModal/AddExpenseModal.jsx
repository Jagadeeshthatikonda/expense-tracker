import { v4 as uuidV4 } from "uuid";
import React, { useState } from "react";
import Modal from "react-modal";
import { useSnackbar } from "notistack";

import "./styles.css";

const AddExpenseModal = ({ isOpen, closeModal, addExpense }) => {
  const [expenseAmount, setExpenseAmount] = useState(1);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const isAddExpenseActionEnabled =
    !!title && !!category && !!date && !!expenseAmount;

  const handleInputChange = event => {
    const expenseValue = parseInt(event.target.value);
    if (!expenseValue) {
      enqueueSnackbar(
        "Expense should not be empty, if it is expected then delete the expense or do not add the expense",
        { variant: "error" }
      );
    }
    setExpenseAmount(expenseValue);
  };

  const handleExpense = () => {
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
      <h2 className="add-balance-heading">{`Add Expense`}</h2>
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
        <button
          onClick={handleExpense}
          className="add-expense-button"
          disabled={!isAddExpenseActionEnabled}
          title={
            !isAddExpenseActionEnabled
              ? "Please enter all the details to enable this button"
              : undefined
          }
        >
          Add Expense
        </button>
        <button onClick={closeModal} className="cancel-button">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddExpenseModal;
