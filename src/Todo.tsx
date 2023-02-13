import { useState } from "react";
import {useForm} from 'react-hook-form';

interface IForm {
  email: string;
  firstName: string;
  lastName : string;
  username : string;
  password: string;
  password1: string;
  extraError?: string;
}; //form의 데이터에 관한 인터페이스
function TodoList(){
  const {register, watch, handleSubmit, formState:{errors}, setError} = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    }
  });
  const onValid =(data:IForm) => {
    if(data.password !== data.password1) {
      setError("password1", {message:"Password are not the same"}, {shouldFocus: true});
    }
    setError("extraError", {message: "Server offline"}); //전체 form에 해당되는 에러
  }
  const onInvalid =() => {
  };
  
  console.log(errors);//error 확인
  console.log(watch());
  return(
    <div>
      <form 
      style={{display: "flex", flexDirection: "column"}}
      onSubmit={handleSubmit(onValid, onInvalid)}>
        <span>{errors?.email?.message}</span>
        <input type="text" 
          {...register("email",
          {
            required: "Email is required",
            pattern: {
              value:/^[A-Za-z0-9._%+-]+@naver.com$/,
              message:"your email is not valid",
            }
          })} 
          placeholder= "Email" />
        <span>{errors?.firstName?.message}</span>
        <input type="text" 
          {...register("firstName", {required: "write here"})} 
          placeholder= "First Name" />
        <span>{errors?.lastName?.message}</span>
        <input type="text" 
          {...register("lastName", {required: "write here"})} 
          placeholder= "Last Name" />
        <span>{errors?.username?.message}</span>
        <input type="text" 
          {...register("username",  {
            required: "write here", 
            minLength: 10, 
            validate: {
              noNico: (value) => 
                value.includes("nico") ? "no nico allowed" : true,
              noElle : (value) => 
                value.includes("elle") ? "no elle allowed" : true,
            }
          })} 
          placeholder= "User Name" />
        <span>{errors?.password?.message}</span>
        <input type="text" 
          {...register("password", 
          { 
            required: "write here", 
            minLength: {
            value: 5, 
            message : "your password is too short"}})}
          placeholder= "Password" />
        <span>{errors?.password1?.message}</span>
        <input type="text"
          {...register("password1",  {required: "Password is required!", minLength: 5})} 
          placeholder= "Password1" />
        <span>{errors.extraError?.message}</span>
        <button>ADD</button>
      </form>
    </div>
  )
}


export default TodoList;
