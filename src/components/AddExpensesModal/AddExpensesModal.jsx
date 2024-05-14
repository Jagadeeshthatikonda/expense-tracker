import React, { useState } from "react";
import Modal from "react-modal";
import "./styles.css";
const ExpenseModal = ({ isOpen, closeModal, addExpense }) => {
  const [expenseAmount, setExpenseAmount] = useState();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleInputChange = event => {
    setExpenseAmount(parseInt(event.target.value));
  };

  const handleAddExpense = () => {
    addExpense({
      title,
      price: expenseAmount,
      category,
      date,
    });
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Expense"
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
      <h2 className="add-balance-heading">Add Expense</h2>
      <div className="actions-container">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
          className="add-expense-input"
        />

        <input
          type="number"
          placeholder="Price"
          value={expenseAmount}
          onChange={handleInputChange}
          className="add-expense-input"
        />
        <input
          type="text"
          placeholder="Select Category"
          value={category}
          onChange={event => setCategory(event.target.value)}
          className="add-expense-input"
        />
        <input
          type="date"
          placeholder="dd/mm/yyyy"
          value={date}
          onChange={event => setDate(event.target.value)}
          className="add-expense-input"
        />
        <button onClick={handleAddExpense} className="add-expense-button">
          Add Expense
        </button>
        <button onClick={closeModal} className="cancel-button">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ExpenseModal;
