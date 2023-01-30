## 타입스크립트 Recap 정리
타입스크립트는 강하게 타입화된 언어이다. 
타입스크립트에서는 코드 실행 전 타입에 대한 정의가 존재한다.

함수의 인자를 타입화 시키기
```
const func = ( a: number, b: number) => a+b ;


function Dummy({text}){
  return <h1>{text}</h1>
} => 이 컴포넌트에게 text가 string이라는것을 알려주기 

interface DummyProps {
  text: string;
  otherThing: boolean;
}

function Dummy({text, otherThing}: DummyProps){
  return <h1>{text}</h1>
}
```
그리고 더미의 상위컴포넌트에서 더미에게 프롭을 보낸다.
```
function App(){
  return (
    <div>
      <Dummy text="hello">
    </div>
  )
}
```
그런데 지금 부모컴포넌트인 App에서는 text 프롭만 넘기고 있다. 이처럼
프롭에 옵션을 걸어주려면
```
interface DummyProps {
  text: string;
  otherThing? : boolean; => 이런식으로 물음표를 달아주면 된다.
} => 그러면 어쩔때는 보내겠지만 다른때는 안보낼수도 있어^^ 하는것임
```
어? 그러면 만약에 부모가 otherThing을 안보내면 Dummy는 어케요?
그럴경우 디폴트 값을 지정해주면 된다.
```
  function Dummy({text, otherThing = false}: DummyProps){
    return <h1>{text}</h1>
  }
```

다음으로는 이벤트에 타입을 지정하는 방법을 보자
다시 돌아가서 부모 이벤트에 버튼을 달고 onclick이벤트를 줘보자
```
function App(){
  const onClick = (event : React.FormEvent<HTMLButtonElement>) => {

  };
  return (
    <div>
      <Dummy text="hello">
      <Form>
       <button> click me </button>
      </Form>
    </div>
  )
}
```
위에서 onclick함수의 이벤트의 타입이 `event : React.FormEvent<HTMLButtonElement>`으로 정의됨을 볼수있다.
이것은 React - 이벤트이름 - 이벤트를 발생시키는 element의 이름 순서이다. (ReactJs에서만)

