import React from "react";
import { PlusCircle } from "lucide-react";
import TodoForm from "./TodoForm";

const Sidebar = ({editingTodo, setEditingTodo}) => {
  return (
    <div className="sticky top-0 h-full overflow-y-auto p-6">
      <TodoForm editingTodo={editingTodo} setEditingTodo={setEditingTodo}/>
    </div>
  );
};

export default Sidebar;
