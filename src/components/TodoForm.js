import React, { useState } from "react";

export default function TodoForm({ addTodo, setShowModal }) {
  let [task, setTask] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();
    let todo = {
      id: Math.random(),
      title: task,
      completed: false,
    };

    addTodo(todo);
    setTask("");
    setShowModal(false);
  };
  return (
    <>
      <form className="add text-center my-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control m-auto"
          name="add"
          id="add"
          value={task}
          placeholder="What do you need to do?"
          onChange={(e) => setTask(e.target.value)}
        />
      </form>
    </>
  );
}
