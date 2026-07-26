import React from "react";
import { ListTodo, Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice"

const Navbar = () => {

  const dispatch = useDispatch()

  const theme = useSelector((state) => state.theme.mode)
  const totalTasks = useSelector((state) => state.todos.value.length);

  console.log(theme);
  return (
    <nav className="sticky top-0 z-50 h-18 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-x">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
            <ListTodo size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">
              Todo App
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Stay productive 🚀
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="hidden rounded-xl bg-slate-100 px-4 py-2 md:block dark:bg-slate-800">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Total Tasks
            </p>

            <h3 className="font-semibold text-slate-800 dark:text-white text-center">
              {totalTasks}
            </h3>
          </div>

          <button
            onClick={() => dispatch(toggleTheme())}
            className="rounded-xl border border-gray-200 bg-white p-3 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            {
              theme === "light" ? (
                <Moon size={20} />
              ) : (
                <Sun size={20} className="text-white"/>
              )
            }
            
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;