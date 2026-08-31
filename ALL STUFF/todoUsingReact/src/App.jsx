import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Save todos whenever todos changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  function addTodo(e) {
    e.preventDefault();

    if (input.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  }

  // Delete Todo
  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  // Toggle Todo
  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  // Start Editing
  function startEdit(todo) {
    setEditingId(todo.id);
    setEditText(todo.text);
  }

  // Save Edit
  function saveEdit(id) {
    if (editText.trim() === "") return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, text: editText.trim() }
          : todo
      )
    );

    setEditingId(null);
    setEditText("");
  }

  // Clear completed
  function clearCompleted() {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;

    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="app">
      <div className="todo-container">

        <h1>My Todos</h1>

        <p className="subtitle">
          Stay organized and get things done 🚀
        </p>

        {/* Add Todo */}
        <form className="todo-form" onSubmit={addTodo}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button type="submit">
            Add
          </button>
        </form>

        {/* Filter */}
        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All ({todos.length})
          </button>

          <button
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            Active ({activeCount})
          </button>

          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Todo List */}
        <div className="todo-list">

          {filteredTodos.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">📝</div>
              <p>No todos found</p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                className={`todo-item ${
                  todo.completed ? "completed" : ""
                }`}
                key={todo.id}
              >

                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />

                {editingId === todo.id ? (
                  <input
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveEdit(todo.id);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <span className="todo-text">
                    {todo.text}
                  </span>
                )}

                <div className="actions">

                  {editingId === todo.id ? (
                    <button
                      className="save-btn"
                      onClick={() => saveEdit(todo.id)}
                    >
                      ✓
                    </button>
                  ) : (
                    <button
                      className="edit-btn"
                      onClick={() => startEdit(todo)}
                    >
                      ✏️
                    </button>
                  )}

                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    🗑️
                  </button>

                </div>
              </div>
            ))
          )}

        </div>

        {/* Bottom */}
        {todos.length > 0 && (
          <div className="bottom">

            <span>
              {activeCount} item{activeCount !== 1 ? "s" : ""} left
            </span>

            {completedCount > 0 && (
              <button onClick={clearCompleted}>
                Clear completed
              </button>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default App;