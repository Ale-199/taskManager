import { FaCheckDouble, FaEdit, FaRegTrashAlt } from "react-icons/fa";

export default function TaskList() {
  return (
    <div className="task">
      <p className="task__name">
        <b>1</b>
        taskName
      </p>
      <div className="task-icons">
        <FaCheckDouble color="green" />
        <FaEdit color="purple" />
        <FaRegTrashAlt color="red" />
      </div>
    </div>
  );
}
