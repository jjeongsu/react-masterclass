import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled, { StyledComponent } from "styled-components";
import {fetchCoins} from "../api";
import { isDarkAtom } from "./atoms";
const Title = styled.h1`
    color: ${props => props.theme.accentColor};
`;
const Loader = styled.div``;
const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;
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

const CoinsList = styled.ul``;
const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.textColor};
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 10px;
    a{
        transition: color 0.2s ease-in;
        display: flex;
        align-items: center;
        padding: 20px
    }
    &:hover {
        a{
            color:${props => props.theme.accentColor};
        }//react-router-link들이 결국 anchor로 바뀜
    }
`;
interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

const coins = [
    {
        id: "btc-bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        rank: 1,
        is_new: false,
        is_active: true,
        type: "coin",
    },
    {
        id: "eth-ethereum",
        name: "Ethereum",
        symbol: "ETH",
        rank: 2,
        is_new: false,
        is_active: true,
        type: "coin",
    },
    {
        id: "hex-hex",
        name: "HEX",
        symbol: "HEX",
        rank: 3,
        is_new: false,
        is_active: true,
        type: "token",
    },
];
const ThemeBtn = styled.button`
  width: 100px;
  height: 50px;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 20px;
  border: none;
  color: white;
`

function Coins(){

  const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const toggleDarkAtom = () => setDarkAtom( prev => !prev);
	return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
				<ThemeBtn onClick ={ toggleDarkAtom}> Theme Change</ThemeBtn>
      </Header>
        {isLoading ? (<Loader>Loading</Loader>) : (
          <CoinsList >
            {data?.slice(0,100).map(coin => 
              <Coin key={coin.id}>
                <Link 
                  to={ `/${coin.id}`}
                  state= {{name: coin.name}} >
                  <Img src={`https:\//coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                  {coin.name} &rarr;
                </Link>
              </Coin>)}
          </CoinsList>
        )}
    </Container>
  )
  
}
export default Coins;