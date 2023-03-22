import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCardProps {
  todo: string;
  index: number;
}

function DraggableCard({todo, index}: IDraggableCardProps){
  return(
    <Draggable key={todo} draggableId={todo} index={index}>
      {(provided) => (
        <Card 
          ref={provided.innerRef} 
          {...provided.draggableProps}
          {...provided.dragHandleProps} >
          {todo}
        </Card>
      )}
    </Draggable>
  )
}
export default React.memo(DraggableCard);
//불필요한 리랜더링 줄이고 최적화하기
//DraggableCard에게 동일한 index와 동일한 todo prop을 받으면 리랜더링을 하지 않도록 하기 위함
//React.memo(Compoent): prop이 변하지 않는다면 해당 컴포넌트를 리랜더링 하지 않는다.
const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;