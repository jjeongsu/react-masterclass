import { keyboardImplementationWrapper } from "@testing-library/user-event/dist/keyboard";
import styled from "styled-components"
import { isPropertySignature } from "typescript";
import { useState } from 'react';
//interface는 객체에 타입을 지정해 준다.----------------------------

//원래는 이렇게 쓴다 > key값이 많아질 경우 가독성이 좋지 않게 됨
//아래와 같이 지정하게 될 경우 hobby라는 새루운 key값도 만들수 없도록 엄격하게 관리된다.
const a:{ name: string, age: number} = {
    name: "jade",
    age: 23,
}

//interface를 사용하여 대체해보자, 가독성도 높이고 코드의 재활용성도 높아짐
//interface는 typescript 코드가 실행되기 전에 확인해준다.
//proptypes 는 코드 실행 '후' 브라우저에 에러가 나타나게된다.
interface type {
    name:string,
    age: number
}
const b:type = {
    name: "kyle",
    age: 20,
}

//------------------------------------------------------------

interface ContainerProps{
    bgColor: string;
    borderColor: string;
};
const Container = styled.div<ContainerProps>`
    background-color: ${(props)=> props.bgColor };
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 1px solid ${(props) => props.borderColor}
`;

interface CircleProps {
    bgColor:string;
    borderColor?: string; // borderColor : string | undefined 
    text? : string;
};

//null 병합 연산자인 ??는 ??앞에 값이 null이거나 undefined면 오른쪽값을 그렇지 않으면 왼쪽값을 반환하는 논리연산자
function Circle( {bgColor, borderColor, text = "default text"}: CircleProps ){

    const [counter, setCounter] = useState<number>(0);
    //typescript는 초깃값을 가지고 counter의 타입을 추측한다.
    //counter는 num 혹은 string 이다
    return (<Container bgColor = { bgColor} borderColor={borderColor ?? bgColor}> {text} </Container>)
};

export default Circle;
