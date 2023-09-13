import { FaCheckDouble, FaEdit, FaRegTrashAlt } from "react-icons/fa";

export default function TaskList({task, index}) {

  const getSingleTask = (task) => {
    
  }

  return (
    <div className="task">
      <p className="task__name">
        <b>{index + 1}.</b>
        {task.name}
      </p>
      <div className="task-icons">
        <FaCheckDouble color="green" />
        <FaEdit color="purple" />
        <FaRegTrashAlt color="red" />
      </div>
    </div>
  );
}
