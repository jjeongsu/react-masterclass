import styled from "styled-components";
import { IToDo } from "../atoms";
const List = styled.li`
  
`
function ToDo({text}:IToDo){
  return (
  <li >{text} 
    <button>To do </button>
    <button>Doing </button>
    <button>Done </button>
  </li>);
}

export default ToDo;