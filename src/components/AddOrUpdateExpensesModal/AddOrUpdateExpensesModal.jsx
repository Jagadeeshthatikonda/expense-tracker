import { v4 as uuidV4 } from "uuid";
import React, { useState } from "react";
import Modal from "react-modal";

import "./styles.css";

const AddOrUpdateExpensesModal = ({
  mode,
  expense,
  isOpen,
  closeModal,
  updateExpenseId,
  addOrUpdateExpense,
}) => {
  const [expenseAmount, setExpenseAmount] = useState(
    expense ? expense.price : 0
  );
  const [title, setTitle] = useState(expense ? expense.title : "");
  const [category, setCategory] = useState(expense ? expense.category : "");
  const [date, setDate] = useState(expense ? expense.date : "");
  const isUpdateMode = mode === "UPDATE";
  const buttonText = isUpdateMode ? "Update" : "Add";

  const isAddOrUpdateActionEnabled =
    !!title && !!category && !!date && !!expenseAmount;

  const handleInputChange = event => {
    setExpenseAmount(parseInt(event.target.value));
  };

  const handleExpense = () => {
    const newExpense = {
      id: expense ? expense.id : uuidV4(),
      title,
      price: expenseAmount,
      category,
      date,
    };

    addOrUpdateExpense(newExpense);
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
          borderRadius: "15px",
          top: "auto",
          bottom: "auto",
          left: "auto",
          right: "auto",
          paddingLeft: "32px",
        },
      }}
    >
      <h2 className="add-balance-heading">{`${buttonText} Expense`}</h2>
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
          disabled={!isAddOrUpdateActionEnabled}
        >
          {buttonText} Expense
        </button>
        <button onClick={closeModal} className="cancel-button">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddOrUpdateExpensesModal;
