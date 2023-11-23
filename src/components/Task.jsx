// Task.js
import React from "react";

const Task = ({ task, onDelete, onEdit }) => {
  return (
    <div className="task">
      <span>{task.title}</span>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default Task;
