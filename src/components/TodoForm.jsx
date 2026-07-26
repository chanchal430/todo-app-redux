import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTodo, editTodo } from "../features/todo/todoSlice";
import { Flag, CalendarDays, PlusCircle } from "lucide-react";
import { toast } from "react-toastify";

const TodoForm = ({ editingTodo, setEditingTodo }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (editingTodo) {
      setValue("todoTitle", editingTodo.title);
      setValue("priority", editingTodo.priority);
      setValue("date", editingTodo.date);
    } else {
      reset();
    }
  }, [editingTodo, setValue, reset]);

  const submitHandler = (data) => {
    if (editingTodo) {
      dispatch(
        editTodo({
          id: editingTodo.id,
          updatedTodo: {
            ...editingTodo,
            title: data.todoTitle,
            priority: data.priority,
            date: data.date,
            completed: false
          },
        }),
      );

      setEditingTodo(null);
    } else {
      dispatch(
        addTodo({
          id: Date.now(),
          title: data.todoTitle,
          priority: data.priority,
          date: data.date,
          completed: false,
        }),
      );
      toast.success('Todo added Successfully!')
    }

    reset();
  };

  return (
    <div className="">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {editingTodo ? "Edit Task" : "Create New Task"}
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Organize your day by adding a new task.
        </p>
      </div>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
        {/* Task */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Task Name
          </label>

          <input
            type="text"
            placeholder="What needs to be done?"
            {...register("todoTitle", {
              required: "Todo title is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters required",
              },
            })}
            className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none transition-all
            dark:bg-slate-800 dark:text-white
            ${
              errors.todoTitle
                ? "border-red-500"
                : "border-slate-200 bg-slate-50 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:focus:bg-slate-800"
            }`}
          />

          {errors.todoTitle && (
            <p className="mt-2 text-sm text-red-500">
              {errors.todoTitle.message}
            </p>
          )}
        </div>

        {/* Priority & Date */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Flag size={16} />
              Priority
            </label>

            <select
              {...register("priority", {
                required: "Priority is required",
              })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none transition-all hover:border-slate-300 focus:border-blue-500  focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            {errors.priority && (
              <p className="mt-2 text-sm text-red-500">
                {errors.priority.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <CalendarDays size={16} />
              Due Date
            </label>

            <input
              type="date"
              {...register("date")}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl active:translate-y-0"
        >
          <PlusCircle size={18} />
          {editingTodo ? "Update Task" : "Add Task"}
        </button>

        {
          editingTodo && (
            <button type="button" className="w-full rounded-2xl border py-4 font-semibold" onClick={() => {
              setEditingTodo(null);
              reset();
            }}>
              Cancel
            </button>
          )
        }
      </form>
    </div>
  );
};
export default TodoForm;
