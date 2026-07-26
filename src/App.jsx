import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TodoList from "./components/TodoList";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";

const App = () => {
  const theme = useSelector((state) => state.theme.mode);
  const [editingTodo, setEditingTodo] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard */}
      <div className="flex h-[calc(100vh-80px)]">
        <aside className="w-85 shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <Sidebar editingTodo={editingTodo} setEditingTodo={setEditingTodo} />
        </aside>

        {/* Main Content */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="sticky top-0 z-10 border-b border-slate-200 bg-slate-100 p-6 dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-3">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                My Tasks
              </h2>

              <p className="mt-1 text-slate-500 dark:text-slate-400">
                Manage and organize your daily tasks.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <SearchBar search={search} setSearch={setSearch} />
              <Filter filter={filter} setFilter={setFilter} />
            </div>
          </div>
          <TodoList
            setEditingTodo={setEditingTodo}
            search={search}
            filter={filter}
          />
        </main>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default App;
