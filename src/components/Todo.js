import { click } from "@testing-library/user-event/dist/click";
import React, { useEffect, useState } from "react";

export default function Todo({ todo, deleteTodo, updateTodo }) {
  let [edit, setEdit] = useState(false);

  let [title, setTitle] = useState(todo.title);

  let updateTodoHandler = (e) => {
    e.preventDefault();
    let updatedTodo = {
      id: todo.id,
      title: title,
      completed: todo.completed,
    };
    updateTodo(updatedTodo);
    setEdit(false);
  };

  let checkHandler = () => {
    let updatedTodo = {
      id: todo.id,
      title: title,
      completed: !todo.completed,
    };
    updateTodo(updatedTodo);
  };

  let [dots, setDots] = useState(true);
  //   let [deleteEdit, setDeleteEdit] = useState(false);

  let dotsHandler = (type) => {
    if (type === "dots") {
      setDots(false);
      //   setDeleteEdit(false);
    }
  };

  document.addEventListener("click", function (e) {
    if (e.target.closest(".threedots") === null) {
      setDots(true);
    }
  });

  return (
    <div>
      <li
        key={todo.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={checkHandler}
        />
        {!edit && (
          <span
            className={`${todo.completed ? "line-through" : ""}`}
            onDoubleClick={() => setEdit(true)}
          >
            {todo.title}
          </span>
        )}
        {edit && (
          <form onSubmit={updateTodoHandler}>
            <input
              type="text"
              className="todo-item-input"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </form>
        )}

        {dots && (
          <span
            id="threedots"
            className="threedots"
            onClick={() => dotsHandler("dots")}
          >
            <i className="fa fa-ellipsis-v"></i>
          </span>
        )}

        {!dots && (
          <div id="deleteEdit" className="delete-edit">
            <span onClick={() => deleteTodo(todo.id)}>
              <i className="far fa-trash-alt delete"></i>
            </span>
            <br />
            <span onClick={() => setEdit(true)}>
              <i className="fa fa-pencil-square-o edit"></i>
            </span>
          </div>
        )}
      </li>
    </div>
  );
}
