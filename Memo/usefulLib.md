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
