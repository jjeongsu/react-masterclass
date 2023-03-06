import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
const List = styled.li`
  
`;
function ToDo({text, category, id}:IToDo){
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: {name}
    } = e;
    
  }
  
  return (
  <li >{text} 
    <button>To do </button>
    {category !== "DOING" && <button name="DOING"onClick={onClick}>Doing </button>}
    {category !== "DONE" &&  <button name="DONE"onClick={onClick}>DONE </button>}
    {category !== "TO_DO" && <button name="TO_DO"onClick={onClick}>TODO </button>}
  </li>);
}

export default ToDo;