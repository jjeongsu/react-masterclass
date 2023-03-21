import {atom, selector} from "recoil";

export const minuteState = atom<number>({
  key: "minute",
  default: 0,
})

export const hourSelector = selector({
  key: "hours",
  get:({get}) => {
    const minutes = get(minuteState); //get을 말그대로 아톰을 가지고 온다.
    return minutes / 60;
  }
})


