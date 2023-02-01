const BASE_URL =`https:\//api.coinpaprika.com/v1`;
const CUSTOM_API = `https://ohlcv-api.nomadcoders.workers.dev`;


export function fetchCoins(){
  return  fetch("https:\//api.coinpaprika.com/v1/coins").then(res => res.json());
}
export function fetchCoinInfo(coinId : String){
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res)=>res.json());
}

export function fetchPriceInfo(coinId : String){
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res)=>res.json());
}
  
export function fetchCoinHistory(coinId: String){
  const endDate = Math.floor(Date.now() /1000);
  const startDate = endDate -60*60*24*7;
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`).then((res)=> res.json());
  }