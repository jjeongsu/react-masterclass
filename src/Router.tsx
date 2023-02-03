import React from "react";
import {BrowserRouter, createBrowserRouter, Route, Routes} from 'react-router-dom'
import Chart from "./Routes/Chart";
import Coin from './Routes/Coin';
import Coins from './Routes/Coins';
import Price from "./Routes/Price";
import Error from "./Components/Error";
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
				element: <Chart />
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