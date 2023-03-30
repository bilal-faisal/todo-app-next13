"use client";
import { useState } from "react";

const Home = () => {
  const [todos, settodos] = useState([
    { text: "Todo1", completed: false },
    { text: "Todo2", completed: true },
    { text: "Todo3", completed: false },
  ]);
  let [todo, settodo] = useState("");

  function addTodoFunc(e: any) {
    todo = todo.trim();
    settodo(todo);
    if (todo == "") {
      return;
    }

    let can = true;
    {
      for (const key in todos) {
        if (todo == todos[key].text) {
          can = false;
        }
      }
    }

    if (can) {
      let newTodo = {
        text: `${todo}`,
        completed: false,
      };
      settodos([...todos, newTodo]);
      settodo("");
    } else {
      alert("Task already exists");
    }
  }

  function deleteTodoFunc(e: any) {
    let newTodos = todos.filter((elem) => {
      if (e.target.name == elem.text) {
        return false;
      } else {
        return true;
      }
    });
    settodos(newTodos);
  }

  function inputHandleFunc(e: any) {
    settodo(e.target.value);
  }
  function checkBoxFunc(e: any) {
    let data = todos.map((elem) => {
      if (e.target.name == elem.text) {
        elem.completed = !elem.completed;
      }
      return elem;
    });
    settodos(data);
  }
  return (
    <>
      <h1 className="py-5 text-4xl text-center font-bold">Todo App</h1>

      <div className="mt-4 mb-6">
        <span className="ml-4">Add Task:</span>
        <input
          type="text"
          className="ml-2 border border-black pl-1"
          value={todo}
          onChange={inputHandleFunc}
          autoFocus
        />
        <button
          className="ml-4 px-3 border border-black hover:bg-gray-200"
          onClick={addTodoFunc}
        >
          Add
        </button>
      </div>
      <p className="pl-4 text-xl mt-4 mb-2">Todos:</p>
      <ul className="ml-6">
        {todos.map((elem) => {
          return (
            <li key={elem.text}>
              <input
                type="checkbox"
                name={elem.text}
                checked={elem.completed}
                onChange={checkBoxFunc}
                className="hover:cursor-pointer"
              />
              <span
                className={
                  elem.completed === true
                    ? "text-green-500 pl-3 text-lg"
                    : "text-red-500 pl-3 text-lg"
                }
              >
                {elem.text}
              </span>

              <button
                className="ml-3 underline"
                onClick={deleteTodoFunc}
                name={elem.text}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;
