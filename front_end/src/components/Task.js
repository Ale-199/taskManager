import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";

import TaskList from "./TaskList";
import { URL } from "../App";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState();

  const [formData, setFormData] = useState({
    taskName: "",
    completed: false,
  });

  const { taskName } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (taskName === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      await axios.post(`${URL}/api/tasks`, formData);
      toast.success("Task added successfully");
      setFormData({
        ...formData,
        taskName: "",
      });
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getSingleTask = async (task) => {
    setFormData({
      taskName: task.name,
      completed: false,
    });
    setTaskID(task._id);
    setIsEditing(true);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/api/tasks/${taskID}`, formData);
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setToCompleted = async (task) => {
    const completedFormData = {
      taskName: task.name,
      completed: true,
    };
    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, completedFormData);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const cTask = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedTasks(cTask);
  }, [tasks]);

  return (
    <div className="container">
      <div className="form__container">
        <h2>Task Manager</h2>
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

        {tasks.length > 0 && (
          <div className="task__counting">
            <p>
              <b>Total: Tasks: </b>
              {tasks.length}
            </p>
            <p>
              <b>Completed Tasks: </b>
              {completedTasks.length}
            </p>
          </div>
        )}
        <hr />
        {!isLoading && tasks.length === 0 ? (
          <p className="No_task">No task added. Please add a task</p>
        ) : (
          <>
            {tasks.map((task, index) => {
              return (
                <TaskList
                  key={task._id}
                  task={task}
                  index={index}
                  deleteTask={deleteTask}
                  getSingleTask={getSingleTask}
                  setToCompleted={setToCompleted}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
