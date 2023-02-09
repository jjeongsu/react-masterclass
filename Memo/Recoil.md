# Recoil
<hr/>
## Recoil의 필요성
Recoil을 쓰지 않을 경우 -> 프롭이 필요하지 않는 컴포넌트까지 프롭이 계속 전달됨
<br />
특히 컴포넌트의 트리가 깊어질수록 이런 프롭드릴링이 복잡해지고 실수를 유발하기 쉽다.  
Recoil은 하나의 버블에서 value가 필요한 컴포넌트들의  접근을 가능하게 해준다.  
recoil에서는 이러한 bubble을 atom 이라고 부른다.  
각 아톰안에는 원하는 value들을 저장해 둘수 있다.  
ex) isDark, isLoggedin..  

아톰은 특정 컴포넌트에 종속되지않고 어딘가에 살고 있다.(?)  

## Recoil 사용하기

1. index에 Recoilroot  
recoil상태를 사용하는 컴포넌트는 부모 드리 어딘가에 나타나는 RecoilRoot가 필요하다. Root 컴포넌트가 RecoilRoot를 넣기에 가장 좋은 장소이다.
```
 <RecoilRoot>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
    </RecoilRoot>
```

2. atom.ts에 atom  
Atom은 상태의 일부를 나타낸다. Atom은 어느 컴포넌트에서나 읽고 쓸 수 있다.
Atom의 값을 읽는 컴포넌트들은 암묵저긍로 atom을 구독한다.
그래서 atom에 어떤 변화가 있으면 그 atom을 구독하는 모든 컴포넌트들이 리랜더링 되는 결과가 발생할것이다.
```
import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default : false,
})
```
3. useRecoilState  
컴포넌트가 atom을 읽고 쓰게 하기 위해서는 useRecoilState를 아래와 같이 사용하면 된다.
```
const [text, setText] = useRecoilState(textAtom);
```
4. useSetRecoilState & useRecoilValue

- useSetRecoilState : state의 값을 업데이트 하기위한 setter함수를 반환한다.
```
const setDarkAtom = useSetRecoilState(isDarkAtom);
```

- useRecoilValue :state 값을 반환한다. 이 훅은 읽기 전용 상태와 쓰기 가능 상태에서 모두 동작하므로 컴포넌트가 상태를 읽을 수만 있게 하고 싶을 때 추천하는 훅이다. 이 훅을 react컴포넌트에서 사용하면 상태가 엄태이트 될때 리렌더링을 하도록 컴포넌트를 구독한다.
```
const DarkAtomValue = useRecoilValue(isDarkAtom);
```