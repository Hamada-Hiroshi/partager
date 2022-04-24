import React from "react";
import { Link } from "react-router-dom";
import CameraSearch from "./CameraSearch";

const BeerTop = () => {
  return (
    <>
      <div className="wrapper beer">
        <h2 className="sub-title">ビアスタイルで探す</h2>
        <div id="select-beer-genre">
          <Link to="/beers?category=lager" className="beer-genre" id="lager">
            <p style={{ color: "#000" }}>
              <span className="main-font">Lager</span>
              <br />
              <span className="sub-font">-ラガー-</span>
            </p>
          </Link>
          <Link to="/beers?category=ale" className="beer-genre" id="ale">
            <p style={{ color: "#FFF" }}>
              <span className="main-font">Ale</span>
              <br />
              <span className="sub-font">-エール-</span>
            </p>
          </Link>
          <Link to="/beers?category=others" className="beer-genre" id="others">
            <p style={{ color: "#000" }}>
              <span className="main-font">Others</span>
              <br />
              <span className="sub-font">-その他-</span>
            </p>
          </Link>
          <div className="beer-genre" id="genre-hint">
            <p>ビアスタイルとは？</p>
          </div>
        </div>
      </div>
      <CameraSearch />
    </>
  );
};
export default BeerTop;
