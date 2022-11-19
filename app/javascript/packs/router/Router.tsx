import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import SelectDrink from "../components/pages/SelectDrink";
import BeerTop from "../components/pages/BeerTop";
import WineTop from "../components/pages/WineTop";
import SakeTop from "../components/pages/SakeTop";
import Beers from "../components/pages/Beers";
import BeerInfo from "../components/pages/BeerInfo";
import NoSearchResult from "../components/pages/NoSearchResult";

const Router: React.VFC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
  );
};
export default Router;
