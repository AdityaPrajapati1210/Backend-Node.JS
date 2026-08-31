import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // GET todos from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ADD todo
  const addTodo = async () => {
    if (!text.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
        }),
      });

      const newTodo = await res.json();

      setTodos((prev) => [newTodo, ...prev]);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
      });

      setTodos((prev) =>
        prev.filter((todo) => todo._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // TOGGLE todo
  const toggleTodo = async (id, completed) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !completed,
          }),
        }
      );

      const updatedTodo = await res.json();

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-16 px-4">
      <div className="w-full max-w-xl">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          My Todos
        </h1>

        {/* Add Todo */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
            placeholder="What needs to be done?"
            className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-6 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">

          {todos.length === 0 && (
            <div className="bg-white rounded-lg p-6 text-center text-gray-400">
              No todos found
            </div>
          )}

          {todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white rounded-lg px-4 py-4 flex items-center justify-between shadow-sm"
            >

              {/* Todo */}
              <div className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    toggleTodo(todo._id, todo.completed)
                  }
                  className="w-5 h-5"
                />

                <span
                  className={
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }
                >
                  {todo.text}
                </span>

              </div>

              {/* Delete */}
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default App;