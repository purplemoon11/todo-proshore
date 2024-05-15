import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import {
  getTodo,
  deleteTask,
  createTodo,
  updateTodo,
} from "./services/todo.services";
import { CgSandClock } from "react-icons/cg";

import "./App.css";

function App() {
  const [status, setStatus] = useState("");
  const [isCompleteScreen, setIsCompleteScreen] = useState(null);
  const [currentEditedItem, setCurrentEditedItem] = useState("");
  const [currentEdit, setCurrentEdit] = useState("");
  const [value, setValue] = useState({
    name: "",
    shortDescription: "",
    dateAndTime: "",
    status: "",
  });
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let filter = isCompleteScreen ? "Done" : "Upcoming";
      if (isCompleteScreen === null) {
        filter = "all";
      }
      const res = await getTodo(filter);
      setTodoList(res.data);
    };

    fetchData();
  }, [isCompleteScreen]);

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
    setValue({ ...value, status: selectedStatus });
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    const updatedTodoList = await getTodo(
      isCompleteScreen ? "Done" : "Upcoming"
    );

    setTodoList(updatedTodoList.data);
  };

  const handleSubmit = async () => {
    await createTodo(value);
    const updatedTodoList = await getTodo(
      isCompleteScreen ? "Done" : "Upcoming"
    );

    setTodoList(updatedTodoList.data);
    setValue({
      name: "",
      shortDescription: "",
      dateAndTime: "",
      status: "",
    });
  };

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
    setStatus(item.status);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      console.log("object", prev);
      console.log("data", value);
      return { ...prev, name: value };
    });
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, shortDescription: value };
    });
  };

  const handleUpdateDateAndTime = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, dateAndTime: value };
    });
  };

  const handleUpdateTodo = async (taskId) => {
    await updateTodo(value, taskId);
    const updatedTodoList = await getTodo(
      isCompleteScreen ? "Done" : "Upcoming"
    );

    setTodoList(updatedTodoList.data);
  };

  return (
    <div className="App">
      <h1>Todo Task</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              placeholder="Todo Title"
              onChange={(e) => setValue({ ...value, name: e.target.value })}
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              placeholder="Descriptioin to your task"
              onChange={(e) =>
                setValue({ ...value, shortDescription: e.target.value })
              }
            />
          </div>
          <div className="todo-input-item">
            <label>Date and Time</label>
            <input
              onChange={(e) =>
                setValue({ ...value, dateAndTime: e.target.value })
              }
            />
          </div>
          <div className="todo-input-item">
            <label>Status</label>
            <div>
              <input
                type="radio"
                id="Upcoming"
                name="status"
                value="Upcoming"
                checked={status === "Upcoming"}
                onChange={handleStatusChange}
              />
              <label htmlFor="Upcoming">Upcoming</label>
            </div>
            <div>
              <input
                type="radio"
                id="Done"
                name="status"
                value="Done"
                checked={status === "Done"}
                onChange={handleStatusChange}
              />
              <label htmlFor="Done">Done</label>
            </div>
          </div>
          <div className="todo-input-item">
            <button type="button" className="primaryBtn" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn isCompleteScreen ${
              isCompleteScreen === false && "active"
            }`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Upcoming
          </button>
          <button
            className={`secondaryBtn isCompleteScreen ${
              isCompleteScreen === true && "active"
            }`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Done
          </button>
        </div>
        <div className="todo-list">
          {todoList.result?.map((todo) => {
            if (currentEdit === todo.id) {
              return (
                <div className="edit_wrapper" key={todo.id}>
                  <input
                    placeholder="Updated Title"
                    onChange={(e) => handleUpdateTitle(e.target.value)}
                    value={currentEditedItem.name}
                  />
                  <textarea
                    placeholder="Updated Description"
                    rows={4}
                    onChange={(e) => handleUpdateDescription(e.target.value)}
                    value={currentEditedItem.shortDescription}
                  />
                  <input
                    onChange={(e) => handleUpdateDateAndTime(e.target.value)}
                    value={currentEditedItem.dateAndTime}
                  />
                  <div>
                    <input
                      type="radio"
                      id="Upcoming"
                      name="status"
                      value="Upcoming"
                      checked={status === "Upcoming"}
                      onChange={handleStatusChange}
                    />
                    <label htmlFor="Upcoming">Upcoming</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="Done"
                      name="status"
                      value="Done"
                      checked={status === "Done"}
                      onChange={handleStatusChange}
                    />
                    <label htmlFor="Done">Done</label>
                  </div>
                  <button
                    type="button"
                    className="primaryBtn"
                    onClick={() => handleUpdateTodo(todo.id)}
                  >
                    Update
                  </button>
                </div>
              );
            } else {
              return (
                <div className="todo-list-item" key={todo.id}>
                  <div>
                    <h3>{todo.name}</h3>
                    <h4>{todo.dateAndTime}</h4>
                    <p>{todo.shortDescription}</p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDelete(todo.id)}
                    />
                    {todo.status === "Done" ? (
                      <BsCheckLg className="check-icon" title="Status?" />
                    ) : todo.status === "Upcoming" ? (
                      <CgSandClock className="check-icon" title="Status?" />
                    ) : null}
                    <AiOutlineEdit
                      className="check-icon"
                      onClick={() => handleEdit(todo.id, todo)}
                      title="Edit?"
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
