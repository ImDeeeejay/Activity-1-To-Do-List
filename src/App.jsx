import React, { useState } from 'react';

export default function ToDoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, status: "ongoing" }]);
      setTask("");
    }
  };

  const updateStatus = (index, status) => {
    const newTasks = [...tasks];
    newTasks[index].status = status;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const getTasksByStatus = (status) => tasks.filter((t) => t.status === status);

  const TaskList = ({ title, status, color }) => (
    <div className="bg-gray-800 rounded-lg p-4 flex-1">
      <h2 className={`text-lg font-bold mb-3 ${color}`}>{title}</h2>
      <ul className="space-y-3">
        {getTasksByStatus(status).map((t, i) => {
          const idx = tasks.indexOf(t);
          return (
            <li
              key={i}
              className="flex justify-between bg-gray-900 p-3 rounded gap-4"
            >
              <span
                className={`flex items-center gap-2 flex-1 break-words ${
                  t.status === "completed" ? "line-through text-gray-400" : ""
                }`}
              >
                {t.text}
              </span>

              <div className="flex flex-col gap-2 shrink-0">
                {t.status === "completed" ? (
                  <button
                    className="px-2 py-1 bg-red-600 rounded hover:bg-red-700 text-sm font-serif"
                    onClick={() => deleteTask(idx)}
                  >
                    Delete
                  </button>
                ) : (
                  <>
                    {status !== "important" && (
                      <button
                        className="px-2 py-1 border border-red-500 text-red-400 rounded hover:bg-red-600 hover:text-white text-sm font-serif"
                        onClick={() => updateStatus(idx, "important")}
                      >
                        Important
                      </button>
                    )}
                    {status !== "ongoing" && (
                      <button
                        className="px-2 py-1 border border-yellow-500 text-yellow-400 rounded hover:bg-yellow-600 hover:text-white text-sm font-serif"
                        onClick={() => updateStatus(idx, "ongoing")}
                      >
                        Ongoing
                      </button>
                    )}
                    <button
                      className="px-2 py-1 bg-green-600 rounded hover:bg-green-700 text-sm font-serif"
                      onClick={() => updateStatus(idx, "completed")}
                    >
                      Mark Completed
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white px-4">
      <div className="w-full max-w-4xl bg-gray-900 border border-gray-600 hover:border-blue-800 hover:-translate-y-1 transition duration-300 ease-in-out p-6 rounded-xl text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-left font-serif">
          ✅ To-Do List
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            placeholder="Add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none font-serif"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600 font-serif"
          >
            Add
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <TaskList title="Ongoing Tasks" status="ongoing" color="text-yellow-400" />
          <TaskList title="Important Tasks" status="important" color="text-red-400" />
          <TaskList title="Completed Tasks" status="completed" color="text-green-400" />
        </div>
      </div>
    </div>
  );
}
