import React from "react";
import Todo from "./Todo";

export default function TodoList({ todos, deleteTodo, updateTodo }) {
  return (
    <>
      <ul className="list-group todos mx-auto text-light">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
    </>
  );
}
