import { useState } from "react";

function TodoList(){

  const [Todo, setTodo] = useState("");
  const onChange = (e:React.FormEvent<HTMLInputElement>) => {
    const {currentTarget : {value}} = e ;
    setTodo(value);
  }
  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(Todo);
  }
  return(
    <div>
    <form onSubmit={onSubmit}>
        <input 
          onChange={onChange}
          placeholder="Write a to do " />
        <button>ADD</button>
      </form>
    </div>
  )
}
export default TodoList;