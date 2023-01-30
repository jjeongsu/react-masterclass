import React, { useEffect, useState } from "react";
import { useMatch, } from "react-router-dom";
import { useLocation, useParams, Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { ListFormat } from "typescript";

interface Params {
  [key : string]: string;//이게 왜 돼? index signature 정의하는게 뭔데?
  coinId: string;
}
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
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{isActive: boolean}>`
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
function Coin(){
    const [loading,setLoading] = useState(true);
    const {coinId} = useParams<Params>();
    //Link로 전달된 정보에 접근, state property가 unkown이 아니려면 interface로 알려줘야함
    //url의 파라미터를 반환해줌.
    const {state}= useLocation() as RouterState; //Coins페이지를 통해 state을 받아와야 Coin이 보여질 수 있다.
    const [info, setInfo] = useState<IInfoData>();
    const [priceInfo, setPriceinfo] = useState<IPriceData>();
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    console.log(priceMatch);
    
    useEffect(()=>{
      //크게보면 ()() 이다. 첫번째 괄호안에 함수 써주면 됨.
      (async() => {
        const infoData = await (
          await fetch(`https:\//api.coinpaprika.com/v1/coins/${coinId}`)
        ).json();
        setInfo(infoData);
          console.log(infoData);
        const priceData = await (
          await fetch(`https:\//api.coinpaprika.com/v1/tickers/${coinId}`)
        ).json();
        setPriceinfo(priceData);
          console.log(priceData);
        setLoading(false);
      })();
    },[coinId]);
    
    return(
        <Container>
            <Header>
                {/* state이 존재할경우 name, 존재하지 않을 경우 후항. */}
                <Title>{state?.name || "Loading.." }</Title> 
                <Title>
                  {state?.name ? state.name: loading ? "Loading.." : info?.name}
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
                            <span>{info?.rank}</span>
                          </OverviewItem>
                          <OverviewItem>
                            <span>Symbol:</span>
                            <span>${info?.symbol}</span>
                          </OverviewItem>
                          <OverviewItem>
                            <span>Open Source:</span>
                            <span>{info?.open_source ? "Yes" : "No"}</span>
                          </OverviewItem>
                        </Overview>
                        <Description>{info?.description}</Description>
                        <Overview>
                          <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{priceInfo?.total_supply}</span>
                          </OverviewItem>
                          <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{priceInfo?.max_supply}</span>
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
                      <Outlet />
                    </>
                  )
                }
        </Container>
        )
}
export default Coin;