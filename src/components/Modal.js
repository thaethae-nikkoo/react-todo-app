import React from "react";
import TodoForm from "./TodoForm";

export default function Modal({ addTodo, setShowModal }) {
  return (
    <div className="modal-component" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="bi bi-pencil-square"></i> Add a new task:
            </h5>
            <button
              type="button"
              className="close"
              onClick={() => setShowModal(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <TodoForm addTodo={addTodo} setShowModal={setShowModal} />
          </div>
        </div>
      </div>
    </div>
  );
}
