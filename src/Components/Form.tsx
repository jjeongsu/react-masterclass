import React,  {useState} from "react";

const Form = () => {
    const [value, setValue] = useState("");
    const onChange = (event : React.FormEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value);
        const {
            currentTarget : {value}, 
        }= event;
        setValue(value);
    }
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Hello",value);
    }
    return (
        <div>
            <form onSubmit = {onSubmit}>
                <input type="text" placeholder="username" value = {value}onChange = {onChange}/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Form;