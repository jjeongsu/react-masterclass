import {atom, selector} from "recoil";

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


