import { toast } from "react-toastify";
import { URL } from "../App";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useGlobalContext } from "../hook/useGlogbalContext";

const Task = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { tasks, dispatch } = useGlobalContext();

  useEffect(() => {
    const getTasks = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${URL}/api/tasks`);
        dispatch({ type: "ALL_TASKS", payload: data });
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    };

    getTasks();
  }, [dispatch]);

  return (
    <div className="container">
      <div className="form__container">
        <h2>Task Manager</h2>

        <TaskForm />

        {tasks.length > 0 && (
          <div className="task__counting">
            <p>
              <b>Total: Tasks: </b>
              {tasks.length}
            </p>
            <p>
              <b>Completed Tasks: </b>
            </p>
          </div>
        )}
        <hr />
        {!isLoading && tasks.length === 0 ? (
          <p>No task added. Please add a task</p>
        ) : (
          <>
            {tasks.map((task, index) => {
              return <TaskList key={task._id} task={task} index={index} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Task;
