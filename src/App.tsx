import { useRecoilState, useRecoilValue } from "recoil";
import { createGlobalStyle } from "styled-components";
import { hourSelector, minuteState } from "./atoms";


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

export default App;