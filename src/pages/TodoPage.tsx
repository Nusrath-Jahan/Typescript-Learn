import React, { useState, useEffect } from "react";
import "./TodoPage.css";

//API for json-server
const API_URL = "http://localhost:3001/todos";

//Define a typescript type for a todo
type Todo = {
  id: number;
  text: string;
};

function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  //Load todos from the API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: Todo[]) => setTodos(data))
      .catch((err) => console.error("API error:", err));
  }, []);

  //Function to add a todo
  const addTodo = async () => {
    if (input === "") return;

    try {
      const newTodo = { text: input };
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) throw new Error("Failed to add todo");

      const savedTodo: Todo = await response.json();
      setTodos((prev) => [...prev, savedTodo]);
      setInput("");
    } catch (err) {
      console.error("Error adding todo:", err);
      alert("Failed to add todo. Is the server running?");
    }
  };

  //Function to delete a todo
  const deleteTodo = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>📝 Todo List</h1>
      <div className="todo-input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a new todo..."
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-message">No todos yet. Start adding one!</p>
        ) : (
          <ol>
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <span>{todo.text}</span>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default TodoPage;
