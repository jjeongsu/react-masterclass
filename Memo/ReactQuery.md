# React Query
`react query`는 서버의 값을 클라이언트에 가져오거나(패치), 캐싱, 값 없데이트, 에러핸들링 등의 비동기 과정을 더욱 편하게 하는데 사용된다.

## 사용하는 이유?

- 데이터를 받아 오는데 필요한 state,fetch와 컴포넌트의 분리
  -  api 관련된 코드를 api.ts 파일에 따로 분리

## 사용방법
0. react 버전이 18일경우, `npm i @tanstack/react-query`로 모듈설치
1. 먼저 가장 기본이 되는곳에 react-query를 세팅한다. (예시 index.tsx)
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { Theme } from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
    
  </React.StrictMode>
);
```
2. fetcher 함수를 만든다.

기존에 코인을 받아오던 
```
const response = await fetch("https:\//api.coinpaprika.com/v1/coins");
const json = await response.json();
```
를 api.tsx파일을
```
export async function fetchCoins(){
  return  fetch("https:\//api.coinpaprika.com/v1/coins").then(res => res.json());
}
```
으로 정리한다.

3. useQuery api를 이용해 보자
아래는 Coins.tsx에 작성되어 있던 기존의 코드이다.
 이제 useQuery 훅을 사용해 
```
const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        //function을 바로 실행하기
        (async() => {
            const response = await fetch("https:\//api.coinpaprika.com/v1/coins");
            const json = await response.json();
            console.log(json);
            setCoins(json.slice(0,100)); //100개만 자르기
            setLoading(false);
        })();
    },[]);
```
단 한줄의 코드로 정리할 수 있다.

`const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);`
- isLoading : 기존의 loading, setLoading을 대체한다. 
- useQuery : fetcher함수인 fetchCoins를 불러오고, 그 fetcher함수가 로딩중이거나 로딩이 끝난상태임을 isLoading을 통해 알려준다.
- data : fetchCoins가 끝났을때 리턴값을 담는다.

또다른 장점은 react-query는 데이터를 캐시에 저장해둔다.
## 사용하는 api들
### useQuery
- 데이터를 get하기 위한 api. 



## 그외
cf) `{isLoading: infoLoading}`처럼 객체에 이름은 부여하는 방식을 자바스크립트에서는 Destructuring Assigment(구조분해할당)라고 부른다.
### 구조분해할당 
[더보기link](https://ko.javascript.info/destructuring-assignment)  
함수에 객체나 배열을 전달해야 할 경우가 생기는데, 가끔 객체나 배열에 저장된 데이터 전체가 아닌 일부만 필요한 경우가 생긴다.
이럴때 객체나 배열을 변수로 '분해'할수 있게 해주는 문법인 '구조분해할당'을 사용할 수 있다.
이외에 함수의 매개변수가 많거나, 매개변수의 기본값이 필요 한 경우에서 구조분해가 진가를 발휘할 수 있다.

< 객체 분해하기 >

1. 기본문법
`let {one, two} = {name: 'lee', age:25}`
좌측에는 객체 프로퍼티의 '패턴'을, 우측에는 분해하고자 하는 객체를 넣는다.

2. 예시
```
let info = {
  name: 'lee',
  age: 25,
  height: 177
}
let {name, age, hegiht} = info;
```
info.name, info.age, info.height에 저장된 값이 상응한는 변수에 할당이 되고 순서는 중요하지 않다.

3. 조금만더 복잡한 패턴
할당 연산자의 좌측에 좀더 복잡한 패턴이 올 수 있다. 분해하려는 객체의 프로퍼티와 변수의 연결을 원하는 대로 조정할수 있다.
객체 프로퍼티를 키와 '다른 이름'을 가진 변수에도 저장할 수 있다.

`let {name: n, age: a, height: h} = info;` <br/>
info.name을 n이라는 변수에 저장하는 식이다.

만약 프로퍼티가 없는 경우를 대비하여 = 을 사용해 기본값을 설정할 수도 있다.
```
let info = {
  title: "Nothing",
};
```
`let {name='kim', age='70', hegiht=188} = info;`