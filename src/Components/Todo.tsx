import { IToDo } from "../atoms";

function ToDo({text}:IToDo){
  return <li >{text} 
    <button>To do </button>
    <button>Doing </button>
    <button>Done </button>
  </li>;
}

export default ToDo;