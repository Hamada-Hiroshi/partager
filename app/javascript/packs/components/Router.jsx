import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import ScrollToTop from "./ScrollToTop";
import SetUserInfo from "./SetUserInfo";
import SelectDrink from "./SelectDrink";
import BeerTop from "./BeerTop";
import WineTop from "./WineTop";
import SakeTop from "./SakeTop";
import Beers from "./Beers";
import BeerInfo from "./BeerInfo";
import BeerSearchResult from "./BeerSearchResult";

const Router = (props) => {
  const { is_login, reviewed_beer_ids, reviewed_wine_ids, reviewed_sake_ids } = props;
  console.log(`ログイン: ${is_login}`);

  return (
    <RecoilRoot>
      <BrowserRouter>
        <ScrollToTop />
        {is_login && (
          <SetUserInfo
            isLogin={is_login}
            reviewedBeerIds={reviewed_beer_ids}
            reviewedWineIds={reviewed_wine_ids}
            reviewedSakeIds={reviewed_sake_ids}
          />
        )}
        <Routes>
          <Route path="/" element={<SelectDrink />}></Route>
          <Route path="/beer" element={<BeerTop />}></Route>
          <Route path="/wine" element={<WineTop />}></Route>
          <Route path="/sake" element={<SakeTop />}></Route>
          <Route path="/beers/search_result" element={<BeerSearchResult />}></Route>
          <Route path="/beers/:id" element={<BeerInfo />}></Route>
          <Route path="/beers" element={<Beers />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};
export default Router;

