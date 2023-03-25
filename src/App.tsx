import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DraggableCard from "./Components/DraggableCard";


function App(){  
  const [todo, setTodo]=useRecoilState(toDoState);
  //드래그가 끝났을 때 실행되는 함수
  const onDragEnd = ({destination, source, draggableId}: DropResult) => {
    if(!destination) return;
    //source index의 요소를 dest index로 옶기기
    setTodo((oldTodos) => {
      const newTodo = [...oldTodos]; //copy! 중요
      newTodo.splice( source?.index, 1); //1. delete item
      newTodo.splice(destination?.index, 0, draggableId); //2. add item
      return newTodo;
    });
  }; 
  return (
    <DragDropContext onDragEnd={onDragEnd}> 
      <Wrapper>
        <Boards>
        {Object.keys(todo).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={todo[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  )
}

export default App;

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;


