import React, { useState, useEffect } from "react";

//API for json-server
const API_URL = "http://localhost:3001/todos";

//Define a typescript type for a todo
type Todo = {
  id: number;
  text: string;
};

function App() {
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

    const newTodo = { text: input };
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });
    const savedTodo: Todo = await response.json();
    setTodos((prev) => [...prev, savedTodo]);
    setInput("");

    // const newTodo: Todo = {
    //   id: Date.now(),
    //   text: input,
    // };
    // setTodos([...todos, newTodo]);
    // setInput("");
  };

  //Function to delete a todo
  const deleteTodo = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  // const deleteTodo = (id: number) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo List </h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a Todo"
      />
      <button onClick={addTodo}>Add</button>
      <ol>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button
              style={{ margin: "20px" }}
              onClick={() => deleteTodo(todo.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
