import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchPriceInfo } from "../api";

interface IPriceData {
  ath_date: string;
  ath_price: number;
  market_cap: number ;
  market_cap_change_24h:  number;
  percent_change_1h: number;
  percent_change_1y: number;
  percent_change_6h:  number;
  percent_change_7d:  number;
  percent_change_12h:  number;
  percent_change_15m:  number;
  percent_change_24h:  number;
  percent_change_30d: number;
  percent_change_30m: number;
  percent_from_price_ath: number;
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
}

const InfoTab = styled.div`
  border-radius: 10px;
  height: 50px;
  background-color: #03001C;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
`


function Price(){

  const {coinId} = useOutletContext() as {coinId : string};
  const {isLoading, data} = useQuery([coinId], ()=>fetchPriceInfo(coinId));
  // console.log(data.quotes.USD);
  const priceData :IPriceData = data.quotes.USD;
  console.log("이거는 priceData", priceData);
  return(
  <div>
    <h2>price</h2>
    <InfoTab> 현재 가격 : {priceData.price.toFixed(3)}</InfoTab>
    <InfoTab> 15분전 대비 : {priceData.percent_change_15m.toFixed(3)} %</InfoTab>
    <InfoTab> 30분전 대비 : {priceData.percent_change_30m.toFixed(3)} %</InfoTab>
    <InfoTab> 1시간전 대비 : {priceData.percent_change_1h.toFixed(3)} %</InfoTab>
    <InfoTab> 24시간전 대비 : {priceData.percent_change_24h.toFixed(3)} %</InfoTab>
    <InfoTab> 일주일전 대비 : {priceData.percent_change_7d.toFixed(3)} %</InfoTab>
  </div>    
  )
}
export default Price;