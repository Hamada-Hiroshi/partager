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
import NoSearchResult from "./NoSearchResult";
import UserInfo from "../types/UserInfo"

const Router: React.VFC<UserInfo> = (props) => {
  const { isLogin, reviewedBeerIds, reviewedWineIds, reviewedSakeIds } = props;
  console.log(`ログイン: ${props.isLogin}`);

  return (
    <RecoilRoot>
      <BrowserRouter>
        <ScrollToTop />
        {isLogin && (
          <SetUserInfo
            isLogin={isLogin}
            reviewedBeerIds={reviewedBeerIds}
            reviewedWineIds={reviewedWineIds}
            reviewedSakeIds={reviewedSakeIds}
          />
        )}
        <Routes>
          <Route path="/" element={<SelectDrink />}></Route>
          <Route path="/beer" element={<BeerTop />}></Route>
          <Route path="/wine" element={<WineTop />}></Route>
          <Route path="/sake" element={<SakeTop />}></Route>
          <Route path="/beers/no_search_result" element={<NoSearchResult />}></Route>
          <Route path="/beers/:id" element={<BeerInfo />}></Route>
          <Route path="/beers" element={<Beers />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};
export default Router;
