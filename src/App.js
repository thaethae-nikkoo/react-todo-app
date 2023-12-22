import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import CheckallAndRemaining from "./components/CheckallAndRemaining";
import FilterTodo from "./components/FilterTodo";
import ClearCompleted from "./components/ClearCompleted";
import Modal from "./components/Modal";
import { useCallback, useEffect, useState } from "react";
function App() {
  let [todos, setTodos] = useState([]);
  let [filterTodos, setFilterTodos] = useState(todos);
  let [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos);
        setFilterTodos(todos);
      });
  }, []);

  let addTodo = (todo) => {
    // client side
    setTodos((prevState) => [...prevState, todo]);

    // Server Side
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(todo),
    });
  };

  let deleteTodo = (todoId) => {
    // Server Side
    fetch(`http://localhost:3001/todos/${todoId}`, {
      method: "DELETE",
    });

    // Client Side
    setTodos((prevState) => {
      return prevState.filter((todo) => {
        return todo.id !== todoId;
      });
    });
  };

  let updateTodo = (updatedTodo) => {
    // Server Side
    fetch(`http://localhost:3001/todos/${updatedTodo.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });

    // Client Side
    setTodos((prevState) => {
      return prevState.map((t) => {
        if (t.id === updatedTodo.id) {
          return updatedTodo;
        }
        return t;
      });
    });
  };

  let remainingCount = todos.filter((t) => !t.completed).length;

  let checkAll = () => {
    todos.forEach((t) => {
      t.completed = true;

      updateTodo(t);
    });

    setTodos((prevState) => {
      return prevState.map((t) => {
        return { ...t, completed: true };
      });
    });
  };

  let uncheckAll = () => {
    todos.forEach((t) => {
      t.completed = false;
      updateTodo(t);
    });

    setTodos((prevState) => {
      return prevState.map((t) => {
        return { ...t, completed: false };
      });
    });
  };

  let clearCompletedHandler = () => {
    todos.forEach((t) => {
      if (t.completed === true) {
        deleteTodo(t.id);
      }
    });

    setTodos((prevState) => {
      return prevState.filter((todo) => {
        return todo.completed === false;
      });
    });
  };

  let filterBy = useCallback(
    (filter) => {
      if (filter === "All") {
        setFilterTodos(todos);
      }
      if (filter === "Active") {
        setFilterTodos(todos.filter((t) => !t.completed));
      }
      if (filter === "Completed") {
        setFilterTodos(todos.filter((t) => t.completed));
      }
    },
    [todos]
  );
  return (
    <>
      <div className="container">
        {showModal && (
          <Modal addTodo={addTodo} setShowModal={setShowModal}>
            <TodoForm addTodo={addTodo} setShowModal={setShowModal} />
          </Modal>
        )}

        <header className="text-center text-dark my-4">
          <h2 className="mb-4">Todo List</h2>
        </header>

        {/* {modal && <Modal setShowModal={setShowModal} />} */}

        <button
          type="button"
          className="add-new-button"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-circle"></i> Add new task
        </button>

        <TodoList
          todos={filterTodos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />

        <CheckallAndRemaining
          remainingCount={remainingCount}
          checkAll={checkAll}
          uncheckAll={uncheckAll}
        />

        <div className="other-buttons-container">
          <FilterTodo filterBy={filterBy} />

          <ClearCompleted clearCompletedHandler={clearCompletedHandler} />
        </div>
      </div>
    </>
  );
}

export default App;
