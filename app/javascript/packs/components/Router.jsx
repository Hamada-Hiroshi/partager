import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import SelectDrink from "./SelectDrink";
import BeerTop from "./BeerTop";
import WineTop from "./WineTop";
import SakeTop from "./SakeTop";
import Beers from "./Beers";
import BeerInfo from "./BeerInfo";
import BeerSearchResult from "./BeerSearchResult";

const Router = (props) => {
  const { is_login } = props;
  console.log(is_login);

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SelectDrink />}></Route>
          <Route path="/beer" element={<BeerTop is_login={is_login} />}></Route>
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
