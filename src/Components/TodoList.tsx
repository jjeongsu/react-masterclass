import { useState } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
const FullScreen = styled.div`
  height: 100vh;
  width: 100wh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background: linear-gradient(90deg, rgba(255,73,209,1) 0%, rgba(0,212,255,1) 100%);
`;
const TotalContainer =styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  border:2px solid white;
  max-width:50%;
  min-width: 50%;
  margin:auto;
  box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.38);
  backdrop-filter: blur(8px) saturate(200%);
    -webkit-backdrop-filter: blur(8px) saturate(200%);
    background-color: rgba(255, 255, 255, 0.62);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
`;
const ListContainer = styled.div`
  display:flex;
  flex-direction: column;
  margin:auto;
  max-width: 250px;
  margin-top: 20px;
  margin-bottom: 20px;
  `;
const Header = styled.h1`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #6643b5;
  font-size: 30px;
  font-weight: 700;
`;
function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  console.log(toDos);
  return (
    <FullScreen>      
      <TotalContainer>
        <Header>Todo</Header>
        <CreateToDo />
        <ListContainer>
          <ul>
            {toDos.map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
              ))}
          </ul>
        </ListContainer>
      </TotalContainer>
    </FullScreen>
  );
}

export default ToDoList;
