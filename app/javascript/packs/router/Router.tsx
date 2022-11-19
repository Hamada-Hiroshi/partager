import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import SelectDrink from "../components/SelectDrink";
import BeerTop from "../components/BeerTop";
import WineTop from "../components/WineTop";
import SakeTop from "../components/SakeTop";
import Beers from "../components/Beers";
import BeerInfo from "../components/BeerInfo";
import NoSearchResult from "../components/NoSearchResult";

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
