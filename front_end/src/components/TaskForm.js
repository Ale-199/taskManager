import React from "react";

export default function TaskForm({
  createTask,
  taskName,
  handleInputChange,
  isEditing,
  updateTask,
}) {
  return (
    <form
      className="input__form"
      onSubmit={isEditing ? updateTask : createTask}
    >
      <input
        type="text"
        placeholder="Add a task"
        name="taskName"
        // required="required"
        value={taskName}
        onChange={handleInputChange}
      />
      <button type="submit">{isEditing ? "Edit" : "Add"}</button>
    </form>
  );
}
