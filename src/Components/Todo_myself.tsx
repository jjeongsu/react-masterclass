import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";
import { getNameOfDeclaration } from "typescript";

const toDoState = atom<ITodo[]>({
  key:"toDo",
  default: []
})

interface ITodo {
  toDo: string;
  category: "DONE"| "DOING";
}

interface IForm {
  toDo: string;
}

function ToDoList(){
  const [toDo, setToDo] = useRecoilState(toDoState);
  const {register, handleSubmit}=useForm<IForm>();
  const onValid = (data:any) => {
    setToDo((old) => [{toDo:data.toDo, category:"DOING"}, ...old]);
  }
  return(
    <div>
      <h1>ToDolist</h1>
      <hr/>
      <form onSubmit={handleSubmit(onValid)}>
        <input 
          type="text"
          placeholder="Write a Todo"
          {...register(
            "toDo",
            {
              required: "something should be written"
            }
          )}
        />
        <button>ADD</button>
      </form>
      <ul>

      </ul>
    </div>
  )
}
export default ToDoList;