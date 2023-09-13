import React, { useState } from "react";
import { toast } from "react-toastify";
import { URL } from "../App";
import axios from "axios";
import { useGlobalContext } from "../hook/useGlogbalContext";

function TaskForm() {
  const { dispatch } = useGlobalContext();

  const [formData, setFormData] = useState({
    taskName: "",
    completed: false,
  });

  const { taskName } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (taskName === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      const { data } = await axios.post(
        `${URL}/api/tasks`,
        formData
      );
      dispatch({ type: "CREATE_TASK", payload: data });
      toast.success("Task added successfully");
      //reset the form
      setFormData({
        ...formData,
        name: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  //   const createTask = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await fetch("http://localhost:5000/api/tasks", {
  //         method: "POST",
  //         body: JSON.stringify(formData),
  //       });
  //       const json = await response.json();
  //       dispatch({ type: "CREATE_TASK", payload: json });
  //       toast.success("Task added successfully");
  //       setFormData({
  //         ...formData,
  //         name: "",
  //       });
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   };

  return (
    <form className="input__form" onSubmit={createTask}>
      <input
        type="text"
        placeholder="Add a task"
        name="taskName"
        required="required"
        value={taskName}
        onChange={handleInputChange}
      />
      <button>Add</button>
    </form>
  );
}

export default TaskForm;
