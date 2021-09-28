import React from "react";
import ToDo from "./ToDo";

function ToDoList({ toDoList, onCheckButtonClick }) {
  return (
    <>
      {toDoList.map((todo) => (
        <ToDo key={todo.id} todo={todo} onCheckButtonClick={onCheckButtonClick}/>
      ))}
    </>
  );
}

export default ToDoList;
