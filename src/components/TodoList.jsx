import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const TodoList = ({ search, setEditingTodo, filter }) => {
  const todos = useSelector((state) => state.todos.value);

  // search
  let filteredTodos = [...todos];

  filteredTodos = filteredTodos.filter((todo) => {
    const keyword = search.toLowerCase();

    return (
      todo.title.toLowerCase().includes(keyword) ||
      todo.priority.toLowerCase().includes(keyword) ||
      (todo.date && todo.date.includes(keyword)) ||
      (todo.completed ? "completed" : "pending").includes(keyword)
    );
  });

  // filter
  switch (filter) {
    case "completed":
      filteredTodos = filteredTodos.filter((todo) => todo.completed);
      break;
    case "pending":
      filteredTodos = filteredTodos.filter((todo) => !todo.completed);
      break;
    case "high":
      filteredTodos = filteredTodos.filter((todo) => todo.priority === "high");
      break;

    case "medium":
      filteredTodos = filteredTodos.filter(
        (todo) => todo.priority === "medium",
      );
      break;

    case "low":
      filteredTodos = filteredTodos.filter((todo) => todo.priority === "low");
      break;

    default:
      break;
  }

  return (
    <div className="flex flex-col gap-4 p-6 overflow-auto">
      {filteredTodos.map((todo) => {
        return (
          <TodoItem key={todo.id} todo={todo} setEditingTodo={setEditingTodo} />
        );
      })}
    </div>
  );
};

export default TodoList;
