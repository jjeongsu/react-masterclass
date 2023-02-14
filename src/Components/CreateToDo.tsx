import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";
interface IForm {
  toDo: string;
}

function CreateToDo() {
  const {register, handleSubmit } =useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return(
    <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
    </form>
  )
}
export default CreateToDo;

function setValue(arg0: string, arg1: string) {
  throw new Error("Function not implemented.");
}
