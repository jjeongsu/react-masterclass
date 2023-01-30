import React from "react";
import {BrowserRouter, createBrowserRouter, Route, Routes} from 'react-router-dom'
import Chart from "./Routes/Chart";
import Coin from './Routes/Coin';
import Coins from './Routes/Coins';
import Price from "./Routes/Price";
const Router = createBrowserRouter([
	{
		path:"/",
		element: <Coins />
	},
	{
		path:"/:coinID",
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
		]
	}
])
export default Router;