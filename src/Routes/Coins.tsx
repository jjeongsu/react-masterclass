import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled, { StyledComponent } from "styled-components";
import {fetchCoins} from "../api";
const Title = styled.h1`
    color: ${props => props.theme.accentColor}
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
    color: ${props => props.theme.bgColor};
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

function Coins(){
    /*
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        //function을 바로 실행하기
        (async() => {
            const response = await fetch("https:\//api.coinpaprika.com/v1/coins");
            const json = await response.json();
            console.log(json);
            setCoins(json.slice(0,100)); //100개만 자르기
            setLoading(false);
        })();
    },[]); */
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
    
    return (
        <Container>
            <Header>
                <Title>코인</Title>
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