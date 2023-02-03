import { useParams } from "react-router-dom";
import {useOutletContext} from "react-router"
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts"
interface IHistoricalData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart(){
  //어떤 암호화폐를 보여줄지 
  // 1. useParams  
  //const {params} = useParams() as {params:string};
  // 2. props로 가져오기
  const {coinId} = useOutletContext() as {coinId: string};
  console.log('코인아이디',coinId);
  //"ohlcv" : open high low coin value
  const { isLoading, data } = useQuery<IHistoricalData []>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return(
    <div>
      {isLoading ? 
        "LoadingChart.."
        :
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
          />}</div>
  ) 
}
export default Chart;