# Recoil - Selector

recoil의 또다른 기능인 selector에 대해 알아보자.
recoil은 react의 상태관리 라이브러리고, 컴포넌트간 상태공유를 가능하게 한다. 

기존에 만들었던 todolist는 todoState을 통해 현재 만들어진 전체 투두리스트를 저장하고,
categoryState을 통해 현재 사용자가 확인하는 카테고리의 상태를 담고있다.

Selector를 이용하여 특정카테고리에 해당하는 투두리스트들만 가져오는 기능을 예제로 만들어 보자.
```
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO, //enum 사용법 
})
```

## Selector
공식문서에서 설명하는 selector는 하나의 파생된 상태조각이다. 
즉 Recoil의 selector를 사용함으로써 공유상태인 atom에서 순수함수인 selector를 거쳐 컴포넌트로 내려하는 데이터플로우를 만들 수 있다. 
(Selector를 이용함으로써 데이터를 하나의 atom에 모아두고 컴포넌트에서 조작하는 대신 미리 조작된 데이터를 컴포넌트에 공급함으로 써 좀더 체계적인 방식으로 데이터를 변형할 수 있다.)


### get
get을 이용하여 특정 atom을 가져올 수 있다.get 함수만 제공 될 경우 Selector는 읽기만 가능한 RecoilValueReadOnly객체를 반환한다.
위 예시의 경우 filter함수를 통해 특정카테고리에 매칭되는 todo들만 리턴할 것이기 때문에 todoState, categoryState모두 필요하다.

```
export const toDoSelector = selector({
  key:"toDoSelector",
  get: ({get}) => { //get이 있어야 atom을 받을 수 있다.
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category); //사용자가 보고자 지정한 카테고리와 todo의 카테고리가 같은것만 리턴한다.
  }
})
```

### set
이번에는 시간을 분단위로 분단위를 시간으로 변환해주는 컴포넌트를 만들어본다.

- Atom.ts
```
export const minuteState = atom<number>({
  key: "minute",
  default: 0,
})

export const hourSelector = selector<number>({ //selector의 리턴타입은 넘버
  key: "hours",
  get:({get}) => {
    const minutes = get(minuteState); //get을 말그대로 아톰에 접급하여 가지고 온다.
    return minutes / 60;
  },
  //set은 원하는 아톰의 state을 수정한다.
  //newValue는 우리가 보내주는 새로운 값.
  set: ({set}, newValue) => {
    console.log(newValue);
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes)// set(수정하고싶은 아톰, 수정할 값)
  },
})
```

- App.tsx
```
function App(){
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  //useRecoilState(selector)
  //hours -> selector의 get으로 부터 온다.
  //setHours -> selector의 set으로 부터 온다. set을 실행시키는 함수이다.
  
  const onMinutesChange = (event:React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value); //+는 string을 number로 바꿔줌 ex)+"1"은 1
  };
  const onHoursChange = (event:React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value); //시간단위의 값이 newValue에 전달된다.
  }

  return (
    <div>
      <input value={minutes} onChange={onMinutesChange} type="number" placeholder="Minutes" />
      <input value={hours} onChange={onHoursChange} type="number" placeholder="Hours" />
    </div>
  )
}
```
위 컴포넌트에는 두개의 입력창이 존재한다.
분 단위의 시간을 입력하는 창 -> onMinuteChange를 통해 minuteState에 담긴다.
한시간 단위의 시간을 입력하는 창 -> onHourChange를 통해 hourSelector에 의해 조작된다.

hourSelector가 하는 일은 다음과 같다.
- 분 단위의 시간이 입력되면 minuteState을 get 해와서 value/60을 한뒤 hours에 리턴한다.
- hour인풋필드에 새로운 값이 들어오면 valeu * 60을 한뒤 minuteState에 새로운 값을 set해준다. 
