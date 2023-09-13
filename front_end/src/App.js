import Task from "./components/Task";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <>
      <div className="bg">
        <Task />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
