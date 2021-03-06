import React, { useState, createContext } from "react";

import { AddTodoItem } from "./AddTodoItem";
import { TodoItems } from "./TodoItems";

export const ItemsContext = createContext();

export const App = () => {
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleAddItem = () => {
    const newItem = {
      id: items.length + 1,
      description: description,
      isComplete: false,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    setDescription("");
  };

  const handleCompleteClick = (id) => {
    const updatedItems = items.map((item) => {
      if (id === item.id) {
        return { ...item, isComplete: !item.isComplete };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleDeleteClick = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div>
      <h1>My To-Do List</h1>

      <AddTodoItem
        description={description}
        handleChange={handleChange}
        handleClick={handleAddItem}
        handleSubmit={handleSubmit}
      />

      <ItemsContext.Provider value={{ handleCompleteClick, handleDeleteClick }}>
        <TodoItems
          header="Active Items"
          items={items.filter((item) => !item.isComplete)}
        />

        <TodoItems
          header="Completed Items"
          items={items.filter((item) => item.isComplete)}
        />
      </ItemsContext.Provider>
    </div>
  );
};
