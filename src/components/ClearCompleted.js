import React from "react";

export default function ClearCompleted({ clearCompletedHandler }) {
  return (
    <>
      <div>
        <button className="button" onClick={clearCompletedHandler}>
          Clear completed
        </button>
      </div>
    </>
  );
}
