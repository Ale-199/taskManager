import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
const Task = () => {
  const [tasks, setTasks] = useState([1, 2, 3]);

  return (
    <div className="container">
      <div className="form__container">
        <h2>Task Manager</h2>

        <TaskForm />

        {tasks.length > 0 && (
          <div className="task__counting">
            <p>
              <b>Total: Tasks: </b>
            </p>
            <p>
              <b>Completed Tasks: </b>
            </p>
          </div>
        )}
        <hr />

        <TaskList />
      </div>
    </div>
  );
};

export default Task;
