import { useParams } from "react-router-dom";
import {useOutletContext} from "react-router"
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";


function Chart(){
  //어떤 암호화폐를 보여줄지 
  // 1. useParams  
  //const {params} = useParams() as {params:string};
  // 2. props로 가져오기
  const {coinId} = useOutletContext() as {coinId: string};
  console.log('코인아이디',coinId);
  //"ohlcv" : open high low coin value
  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return <h1>chart</h1>
}
export default Chart;