import React from "react";
import {BrowserRouter, createBrowserRouter, Route, Routes} from 'react-router-dom'
import Chart from "./Routes/Chart";
import Coin from './Routes/Coin';
import Coins from './Routes/Coins';
import Price from "./Routes/Price";
import Error from "./Components/Error";
import LineChart from "./Components/Chart_line";
import CandlestickChart from "./Components/Chart_candlestick";
const Router = createBrowserRouter([
	{
		path:"/",
		element: <Coins />
	},
	{
		path:"/:coinId",
		element: <Coin />,
		children: [
			{
				path: "chart",
				element: <Chart />,
				children: [
					{
						path: "line",
						element: <LineChart />
					},
					{
						path: "candlestick",
						element: <CandlestickChart />
					}
				]
			},
			{
				path: "price",
				element: <Price />
			}
		],
		errorElement: <Error />
		
	}
])
export default Router;