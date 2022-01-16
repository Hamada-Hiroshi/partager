import React from "react";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { IconButton } from "@material-ui/core";

const BeerTop = () => {
  return (
    <>
      <div className="wrapper beer">
        <h2 className="sub-title">ビアスタイルで探す</h2>
        <div id="select-beer-genre">
          <div className="beer-genre" id="lager">
            <p>
              <span className="main-font">Lager</span>
              <br />
              <span className="sub-font">-ラガー-</span>
            </p>
          </div>
          <div className="beer-genre" id="ale">
            <p style={{ color: "#FFF" }}>
              <span className="main-font">Ale</span>
              <br />
              <span className="sub-font">-エール-</span>
            </p>
          </div>
          <div className="beer-genre" id="others">
            <p>
              <span className="main-font">Others</span>
              <br />
              <span className="sub-font">-その他-</span>
            </p>
          </div>
          <div className="beer-genre" id="genre-hint">
            <p>ビアスタイルとは？</p>
          </div>
        </div>
      </div>

      <div className="footer fixed beer-footer">
        <IconButton>
          <CameraAltIcon />
        </IconButton>
      </div>
    </>
  );
};
export default BeerTop;
