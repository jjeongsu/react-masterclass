import { atom, selector } from "recoil";

type categories = "TO_DO" | "DOING" | "DONE"; // 복붙피하기

//create Enumerable
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

//한번에 하나의 카테고리만 렌더링하려고 함.
//사용자가 현재 지정한 카테고리를 알려준다.
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO, //enum 사용법 
})


//Selector is derived state.
//selector를 이용하면 데이터를 하나의 atom에 모아두고 컴포넌트에서 조작하는대신
//데이터에 좀더 체계적인 방식으로 데이터를 변형할 수 있다.
export const toDoSelector = selector({
  key:"toDoSelector",
  get: ({get}) => { //get이 있어야 atom을 받을 수 있다.
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category); //사용자가 보고자 지정한 카테고리와 todo의 카테고리가 같은것만 리턴한다.
  }
})








