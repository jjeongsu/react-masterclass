import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchPriceInfo } from "../api";

function CandlestickChart(){
  const {coinId} = useOutletContext() as {coinId : string};
  const {isLoading, data} = useQuery([coinId], ()=>fetchPriceInfo(coinId));
  console.log(data.quotes.USD);
  return(
    <div>
      candlestickchart
    </div>
  )
}
export default CandlestickChart;