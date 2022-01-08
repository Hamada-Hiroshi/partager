import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectDrink from "./SelectDrink";
import BeerTop from "./BeerTop";
import WineTop from "./WineTop";
import SakeTop from "./SakeTop";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectDrink />}></Route>
        <Route path="/beer" element={<BeerTop />}></Route>
        <Route path="/wine" element={<WineTop />}></Route>
        <Route path="/sake" element={<SakeTop />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
