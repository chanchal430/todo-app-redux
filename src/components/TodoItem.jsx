import React from "react";
import {
  CalendarDays,
  Flag,
  Pencil,
  Trash2,
  Circle,
  CheckCircle2,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { completeTodo, deleteTodo } from "../features/todo/todoSlice";
import { toast } from "react-toastify";

const TodoItem = ({ todo, setEditingTodo }) => {
  const dispatch = useDispatch();

  const priorityColors = {
    low: "bg-emerald-100 text-emerald-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    toast.error("Task deleted");
  };

  const handleToggle = (id) => {
    dispatch(completeTodo(id));
    toast.success(
      todo.completed ? "Task marked as pending" : "Task completed ",
    );
  };

  const handleEdit = () => {
    setEditingTodo(todo);
    toast.info("Editing task");
  };

  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        {/* Left */}
        <div className="flex flex-1 gap-4">
          <button
            onClick={() => handleToggle(todo.id)}
            className="mt-1 text-slate-400 transition hover:text-green-500"
          >
            {todo.completed ? (
              <CheckCircle2
                size={22}
                className="text-white bg-green-500 rounded-full text-xl"
              />
            ) : (
              <Circle size={22} />
            )}
          </button>

          <div className="space-y-3">
            <h3
              className={`text-lg font-semibold ${
                todo.completed
                  ? "text-slate-400 line-through"
                  : "text-slate-900 dark:text-white"
              }`}
            >
              {todo.title}
            </h3>

            <div className="flex flex-wrap items-center gap-3">
              {todo.priority && (
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                    priorityColors[todo.priority]
                  }`}
                >
                  <Flag size={12} />
                  {todo.priority}
                </span>
              )}

              {todo.date && (
                <span className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                  <CalendarDays size={15} />
                  {todo.date}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 opacity-0 transition group-hover:opacity-100">
          <button
            onClick={handleEdit}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-slate-800"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => handleDelete(todo.id)}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-red-100 hover:text-red-600 dark:hover:bg-slate-800"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
