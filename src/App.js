import React, { useCallback, useEffect, useState } from "react";
import ToDoList from "./components/ToDoList";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { v4 } from "uuid";

const TODO_APP_STORAGE_KEY = 'TODO_APP';

function App() {
  const [toDoList, setToDolist] = useState([]);
  const [textInput, settextInput] = useState("");

  useEffect(() => {
    const storagedToDoList = localStorage.getItem(TODO_APP_STORAGE_KEY)
    if(storagedToDoList){
      setToDolist(JSON.parse(storagedToDoList));
    }
  }, [])


  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(toDoList));
  }, [toDoList]) 


  const onTextInputChange = useCallback((event) => {
    settextInput(event.target.value);
  }, []);

  const onAddButtonClick = useCallback(
    (event) => {
      setToDolist([
        { id: v4(), name: textInput, isCompleted: false },
        ...toDoList,
      ]);
      settextInput("");
    },
    [textInput, toDoList]
  );

  const onCheckButtonClick = useCallback((id) => {
    setToDolist((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }, []);

  return (
    <>
      <h3>Danh sach can lam</h3>
      <TextField
        name="add-todo"
        placeholder="Viec can lam..."
        elemAfterInput={
          <Button
            isDisabled={!textInput}
            appearance="primary"
            onClick={onAddButtonClick}
          >
            Add
          </Button>
        }
        css={{ padding: "2px 4px 2px" }}
        value={textInput}
        onChange={onTextInputChange}
      ></TextField>
      <ToDoList toDoList={toDoList} onCheckButtonClick={onCheckButtonClick} />
    </>
  );
}

export default App;
