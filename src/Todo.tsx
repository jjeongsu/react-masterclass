import { useState } from "react";
import {useForm} from 'react-hook-form';

// function TodoList(){

//   const [Value], setValue] = useState("");
//   const [ValueError, setValueError] = useState("");
//   const onChange = (e:React.FormEvent<HTMLInputElement>) => {
//     const {currentTarget : {value}} = e ;
//     setValue(value);
//   }
//   const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(Todo);
//     if(Todo.length < 10){
//        return setTodoError("To do should be longer");
//      }
//   }
//   return(
//     <div>
//     <form onSubmit={onSubmit}>
//         <input 
//           onChange={onChange}
//           placeholder="Write a to do " />
//         <button>ADD</button>
//          {todoError !== "" ? todoError : null}
//       </form>
//     </div>
//   )
// }

function TodoList(){
  const {register, watch, handleSubmit, formState} = useForm();
  /*
  register 함수 : 
  watch :form의 입력값이 변화를 볼수 잇음.
  handleSubmit : validation 담당.
  formState : 
    formState.errors : 에러 확인
  */
  const onValid =(data:any) => {
    console.log(data);
  }
  const onInvalid =() => {
  };
  
  console.log(formState.errors);//error 확인
  console.log(watch());
  return(
    <div>
      <form 
      style={{display: "flex", flexDirection: "column"}}
      onSubmit={handleSubmit(onValid, onInvalid)}>
        <input type="text" 
          {...register("email",
          {
            required: true,
            pattern: {
              value:/^[A-Za-z0-9._%+-]+@naver.com$/,
              message:"your email is not valid",
            }
          })} 
          placeholder= "Email" />
        <span>
        </span>
        <input type="text" 
          {...register("firstName",
          {required: true})} 
          placeholder= "First Name" />

        <input type="text" 
          {...register("lastName", 
          {required: true})} 
          placeholder= "Last Name" />

        <input type="text" 
          {...register("username", 
          {required: true, minLength: 10})} 
          placeholder= "User Name" />

        <input type="text" 
          {...register("password", 
          {required: true, 
            minLength: {
            value: 5, 
            message : "your password is too short"}})}
          placeholder= "Password" />

        <input type="text" 
          {...register("password1", 
          {required: "Password is required!", minLength: 5})} 
          placeholder= "Password1" />

        <button>ADD</button>
      </form>
    </div>
  )
}


export default TodoList;
