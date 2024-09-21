"use client"; // This tells Next.js that this is a Client Component

import { useState } from "react";

export default function TodoApp() {
  const [task, setTask] = useState<string>(""); // To store input value
  const [tasks, setTasks] = useState<string[]>([]); // To store tasks array
  const [isEditing, setIsEditing] = useState<number | null>(null); // To track the task being edited
  const [editTask, setEditTask] = useState<string>(""); // To store the task being edited

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask(""); // Clear input field
    }
  };

  const handleDelete = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleEdit = (index: number) => {
    setIsEditing(index);
    setEditTask(tasks[index]);
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editTask.trim() !== "") {
      const updatedTasks = tasks.map((t, index) => (index === isEditing ? editTask : t));
      setTasks(updatedTasks);
      setIsEditing(null); // Reset editing state
      setEditTask(""); // Clear edit input
    }
  };

  return (
    <div style={{ 
      padding: "20px", 
      maxWidth: "700px", 
      margin: "auto", 
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    }}>
      <h1 style={{
        backgroundColor: "black",
        color: "red",
        padding: "15px",
        textAlign:"center"
      }}>
        <span style={{ color: "#ffff" }}>Next.js To-Do App By </span>Muhammad Moeed
      </h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={handleChange}
          style={{ padding: "10px", marginRight: "10px", flexGrow: 1, minWidth: "200px", }} 
        />
        <button type="submit" style={{ padding: "10px", minWidth: "100px",color:"#fff", backgroundColor:"black" }}>Add Task</button>
      </form>
      <ul style={{ listStyle: "none", paddingLeft: "0", margin: "0" }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px", flexWrap: "wrap" }}>
            {isEditing === index ? (
              <form onSubmit={handleUpdate} style={{ display: "flex", flexGrow: 1 }}>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  style={{ padding: "10px", flexGrow: 1, marginRight: "10px" }}
                />
                <button type="submit" style={{ padding: "5px 20px", borderRadius: "8px", color: "#bab100", backgroundColor: "black" }}>
                  Save
                </button>
              </form>
            ) : (
              <>
                <span style={{
                  marginRight: "10px",
                  color: "#0073a1",
                  fontSize: "20px",
                  flexGrow: 1,
                  maxWidth: "400px",
                  overflowWrap: "break-word",
                }}>{task}</span>
                <button
                  onClick={() => handleEdit(index)}
                  style={{
                    padding: "10px 30px",
                    borderRadius: "8px",
                    color: "#fff",
                    backgroundColor: "black",
                    marginRight: "10px",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  style={{
                    padding: "10px 30px",
                    borderRadius: "8px",
                    color: "red",
                    backgroundColor: "black",
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
