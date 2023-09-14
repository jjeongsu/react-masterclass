import React, { useEffect, useState } from "react";

import { useMatch, } from "react-router-dom";
import { useLocation, useParams, Outlet, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ListFormat } from "typescript";
import { fetchCoinInfo, fetchPriceInfo } from "../api";
import {Helmet} from "react-helmet";
import { useQuery } from "react-query";
type IParams = {
  coinId: string;
};
interface RouterState {
    state: {
        name:string ;
    }
}

//단 object의 경우 object내의 type을 interface로 새로 명시해 줘야 함.
interface IInfoData {
  id : string;
  name : string;
  symbol : string;
  rank : number;
  is_new : boolean;
  is_active : boolean;
  type : string;
  logo : string;
  description : string;
  message : string;
  open_source : boolean;
  started_at : string;
  development_status : string;
  hardware_wallet : boolean;
  proof_type : string;
  org_structure : string;
  hash_algorithm : string;
  first_data_at : string;
  last_data_at : string;
  //test
  tags: ListFormat;
}
interface IPriceData {
  id : string;
  name : string;
  symbol : string;
  rank : number;
  circulating_supply : number;
  total_supply : number;
  max_supply : number;
  beta_value : number;
  first_data_at : string;
  last_updated : string;
  quotes: {
    USD : {
      ath_date : string;
      ath_price: number;
      market_cap : number ;
      market_cap_change_24h: number;
      percent_change_1h : number ;
      percent_change_1y : number ;
      percent_change_6h : number ;
      percent_change_7d : number ;
      percent_change_12h : number ;
      percent_change_15m : number ;
      percent_change_24h : number ;
      percent_change_30d : number ;
      percent_change_30m : number ;
      percent_from_price_ath : number ;
      price : number ;
      volume_24h : number ;
      volume_24h_change_24h : number ;
    }
  };
}
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Loader = styled.div``;
const Container = styled.div`
    max-width: 480px;
    margin: 0 auto;
    padding :0px 20px;
`;
const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items:center;
`;
const Title = styled.h1`
    color: ${(props) => props.theme.accentColor}
`;
export const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  margin: 25px 0px;
  gap: 10px;
`;
export const Tab = styled.span<{isActive: boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0,0,0,0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
  a{
    display: block;
  }
`;
const BackBtn = styled.button`
  float: left;
  text-align: center;
  border-radius: 50%;

`;
function Coin(){
  const {coinId} = useParams() as {coinId: string};    
  const {state}= useLocation() as RouterState; 
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  console.log('코인아이디',coinId);
  const {isLoading: infoLoading, data: infoData} = useQuery<IInfoData>(["info",coinId], ()=>fetchCoinInfo(coinId));
  const {isLoading: tickerLoading, data: tickerData} 
    = useQuery<IPriceData>(
      ["ticker",coinId],
      ()=>fetchPriceInfo(coinId),
      {
        /* 주기적으로 데이터를 업데이트 한다(ms) */
        refetchInterval: 5000, 
      }
      );
  //모든 query는 각기 다른 고유한 key를 가지고 있어야 한다.
  //react-query는 key를 array로 감싸서 표현한다.
  const loading = infoLoading||tickerLoading;
  const navigate = useNavigate();
  const handleOnClick = () =>{
    navigate('/');
  }
  return(
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name: loading ? "Loading.." : infoData?.name}
        </title>
      </Helmet>
      <BackBtn onClick = {handleOnClick}> Back </BackBtn>
      <Header>
        <Title>
          {state?.name ? state.name: loading ? "Loading.." : infoData?.name}
        </Title>
      </Header>
      {loading? (<Loader>Loading</Loader>) : null}
      {
        loading? (
          <Loader> Loading...</Loader>
        ) : (
          <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price :</span>
              <span>{tickerData?.quotes.USD.price.toFixed(3) ? "Yes" : "No"}</span>
            </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickerData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{coinId}}/>
          </>
        )
      }
  </Container>
  )
}
export default Coin;