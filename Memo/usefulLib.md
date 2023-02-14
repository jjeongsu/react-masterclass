# 유용한 React 라이브러리들을 정리한 문서

## React Helmet
[관련링크](https://github.com/nfl/react-helmet)  
-> Coin.tsx, Coins.tsx에서 사용됨
문서의 <head>가는 다이렉트 링크를 만들어주어서 웹문서의 헤더값을 변경할 때 사용하는 리액트 컴포넌트이다.

노마드코더에서 사용한 <title> 뿐 아니라 CSS,favicon 등을 넣을 수 있다.
```
import { Helmet } from "react-helmet";

<Helmet>
  <title>
    {state?.name ? state.name: loading ? "Loading.." : infoData?.name}
  </title>
</Helmet>
```

## ApexChart
[관련링크](https://apexcharts.com/)  

데이터 시각화 차트를 만들때 유용한 라이브러리

```
import ApexChart from "react-apexcharts"

<ApexChart 
          type="line"
          series={[
            {
              name: "price",
              data: data?.map(price => parseFloat(price.close)) as number[] 
            }
          ]}
          options={{ 
            yaxis:{show: false},
            xaxis:{
              labels: {show: false, datetimeFormatter: { month: "MMM 'yy",}},
              axisTicks: {show: false},
              type: "datetime",
              categories:data?.map(price => new Date(price.time_close*1000).toISOString()),
            },
            fill :{
              type: "gradient",
              gradient: {gradientToColors:["#0be881"], stops: [0,100]},
            },
            colors : ["#0fbcf9"],
            stroke:{
              curve: "smooth",
              width: 5,
            },
            grid:{ show: false},
            theme:{
              mode: 'dark',
            },
            tooltip: {
              y : {
                formatter: (value) => `$ ${value.toFixed(3)}`,
              }
            },
            chart: {
              height: 300,
              width:500,
              toolbar: {
                show: false
              },
              background: "transparent",
          }}}
          />
```

## React-Hook-Forms
form으로 제출하는 녀셕을 아주 손쉽게 만들어 주는 녀석
심지어 validation도 가볍게 만들 수 있다.

### 사용하기

```
 const {register, watch, handleSubmit, formState:{errors}, setValue} = useForm();
  /*
  register 함수 : 
  watch :form의 입력값이 변화를 볼수 잇음.
  handleSubmit : validation 담당.
  formState : 
    formState.errors : 에러 확인
  setValue : 필드의 값을 동적으로 설정한다.
    ex) setValue('name','hello');
    ex) onClick={()=>setValue('name','')};
  */
```
### reset();
`reset()`은 form전체를 리셋시킨다. -> 여러필드를 동시에 비울때 setValue대신 사용하면 좋음  
`reset({email: ""})`은 form에서 특정 필드만 리셋시킨다. 
### required
'이거는 그냥 html input에서 제공해 주는 기능 아닌가요?'할수있다.
그러나 누군가 아주 나쁜 마음을 먹은 사람이 개발자도구를 사용해서 당신의 html코드에 접근해 required를 지워버린다면?
email등 아주 중요한 정보를 넣지 않고도 회원가입이 되는 사태가 발생한다.  
그렇다면 이 코드를 javascript내에 숨겨서 작성하면 되는 일이다.

```
<input type="text" {...register("username")} required> => 요방법이아니라
<input type="text" 
          {...register("username", 
          {required: true} />  => 이렇게요
```
required를 적는 방법에는 두가지가 있는데, 첫번째는 위에서 처럼 true를 적는 방법이고, 
두번째는 메세지를 적는 것이다. `required: "USERNAME is required"` -> 화면에 나올 에러객체에 들어간다.
이렇게 하면 나중에 formState.errors 에서 좀더 쉽게 에러를 확인할 수 있다.

이와 같이 minLength도 
```
minLength: {
  value: 5, 
  message : "your password is too short"}
``` 
이런식으로 적어 줄 수 있다.

