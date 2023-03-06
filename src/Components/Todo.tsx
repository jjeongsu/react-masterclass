import styled from "styled-components";
import { IToDo } from "../atoms";
const List = styled.li`
  
`;
function ToDo({text, category}:IToDo){
  const onClick = (newCategory: IToDo["category"]) => {
    console.log("I wanna go to ", newCategory);
  }
  
  return (
  <li >{text} 
    <button>To do </button>
    {category !== "DOING" && <button onClick={() => onClick("DOING")}>Doing </button>}
    {category !== "DONE" &&  <button onClick={() => onClick("DONE")}>DONE </button>}
    {category !== "TO_DO" && <button onClick={() => onClick("TO_DO")}>TODO </button>}
  </li>);
}

export default ToDo;