import React from "react";

function TaskForm() {
  return (
    <form className="input__form">
      <input
        type="text"
        placeholder="Add a task"
        name="taskName"
        required="required"
      />
      <button>Add</button>
    </form>
  );
}

export default TaskForm;
