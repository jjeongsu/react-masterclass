const BASE_URL =`https:\//api.coinpaprika.com/v1`;

export function fetchCoins(){
  return  fetch("https:\//api.coinpaprika.com/v1/coins").then(res => res.json());
}
export function fetchCoinInfo(coinId : String){
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res)=>res.json());
}

export function fetchPriceInfo(coinId : String){
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res)=>res.json());
}