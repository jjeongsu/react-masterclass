import { Tab, Tabs } from "./Coin";
import {useMatch, Link, useOutlet, useOutletContext, Outlet} from "react-router-dom";
function Chart(){
  const lineMatch = useMatch("/:coinId/chart/line");
  const candleMatch = useMatch("/:coinId/chart/candle");
  const {coinId} = useOutletContext() as {coinId: string};
  return(
    <div>
      <Tabs>
      <Tab isActive={lineMatch !== null}>
        <Link to={`/${coinId}/chart/line`}>LINE</Link>
      </Tab>
      <Tab isActive={candleMatch !== null}>
        <Link to={`/${coinId}/chart/candlestick`}>CANDLE</Link>
      </Tab>
    </Tabs>
    <Outlet context={{coinId}}/>
    </div>
  )
}
export default Chart;