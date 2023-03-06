import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
interface IForm {
  toDo: string;
}
const BTN = styled.button`
  background: #5461f5;
  background-image: -webkit-linear-gradient(top, #5461f5, #bf7fd4);
  background-image: -moz-linear-gradient(top, #5461f5, #bf7fd4);
  background-image: -ms-linear-gradient(top, #5461f5, #bf7fd4);
  background-image: -o-linear-gradient(top, #5461f5, #bf7fd4);
  background-image: linear-gradient(to bottom, #5461f5, #bf7fd4);
  -webkit-border-radius: 55;
  -moz-border-radius: 55;
  border-radius: 55px;
  font-family: Arial;
  color: #ffffff;
  font-size: 15px;
  padding: 5px 10px;
  border: solid #1f628d 0px;
  text-decoration: none;
  &:hover {
    background: #d384fa;
  background-image: -webkit-linear-gradient(top, #d384fa, #7581ff);
  background-image: -moz-linear-gradient(top, #d384fa, #7581ff);
  background-image: -ms-linear-gradient(top, #d384fa, #7581ff);
  background-image: -o-linear-gradient(top, #d384fa, #7581ff);
  background-image: linear-gradient(to bottom, #d384fa, #7581ff);
  text-decoration: none;
  }
`;
const TodoInput = styled.input`
  border:none;
  background-color: transparent;
  border-bottom:solid #9896f1 1px;
  color: #3b3a30;
  width:100px;
  height:30px;
  margin-right:10px;
  &:focus {
    outline:none;
  }
`
function CreateToDo() {
  const {register, handleSubmit, setValue } =useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", " ");
  };
  return(
    <form onSubmit={handleSubmit(handleValid)}>
        <TodoInput
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <BTN>
          <span>
            Add
          </span>
        </BTN>
    </form>
  )
}
export default CreateToDo;

