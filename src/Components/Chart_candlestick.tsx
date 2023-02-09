import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchPriceInfo } from "../api";
import ApexChart from "react-apexcharts";

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

function CandlestickChart(){
  const {coinId} = useOutletContext() as {coinId : string};
  const {isLoading, data} = useQuery<IHistoricalData []>(["ohlcv",coinId], ()=>fetchPriceInfo(coinId));
  
  return(
    <div>
      <h1>Candlestick Chart</h1>
      {
        isLoading ?
        "Loading Chart"
        :
        <ApexChart 
        type="candlestick"
        />
      }
    </div>
  )
}
export default CandlestickChart;