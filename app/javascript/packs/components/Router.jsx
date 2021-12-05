import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectDrink from "./SelectDrink";
import BeerTop from "./BeerTop";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectDrink />}></Route>
        <Route path="/beer" element={<BeerTop />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
