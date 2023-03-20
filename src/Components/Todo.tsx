import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";
const List = styled.li`
  
`;

/**
 * Todos의 값을 변경하기
 * 중요한점은 state를 mutate하지말고 새로운 state를 만들어야 한다는 것.
 *  1. find todo based on Id, index
 *  
 */

function ToDo({text, category, id}:IToDo){
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: {name} //어떤 버튼을 눌렀는데? 
    } = e;
    setToDos((oldTodos) => {
      const targetIndex = oldTodos.findIndex(todo => todo.id === id); //target의 경로 찾기
      const oldTodo = oldTodos[targetIndex];
      const newTodo = {text, id, category: name as any};
      //배열의 원소를 교체하기 : 새로운 배열을 만들어서 리턴하기
      //final = [...front, newelement, ...back]
      return  [
        ...oldTodos.slice(0,targetIndex),
        newTodo,
        ...oldTodos.slice(targetIndex+1),
      ];
    });
  }
  
  return (
  <li >{text } 
    {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>DOING </button>}
    {category !== Categories.DOING &&  <button name={Categories.DOING} onClick={onClick}>DONE </button>}
    {category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>TO_DO </button>}
  </li>);
}

export default ToDo;