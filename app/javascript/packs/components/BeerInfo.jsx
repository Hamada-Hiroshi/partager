import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import CameraSearch from "./CameraSearch";
import Grid from "@material-ui/core/Grid";
import { Oval } from  "react-loader-spinner";

const BeerInfo = () => {
  const { state } = useLocation();
  console.log(state);

  return (
    <>
      <div className="beer show">
        <div className="background-drink-image">
          <img src={state.content_image_url} alt="" className="beer-content-image" />
        </div>
        <div className="drink-info">
          <Grid container>
            <Grid item xs={8} className="drink-image">
              <img src={state.sample_image_url} alt="" className="beer-image" />
            </Grid>
            <Grid item xs={4} className="drink-score">
            </Grid>
          </Grid>
          <div className="drink-text-box">
            <p className="dink-title">{state.name}</p>
            <p className="beer-style">ビアスタイル：{state.beer_style.name}</p>
            <p className="country">
              <span className={`flag-icon flag-icon-${state.country.abbreviation}`}></span>
              {state.country.name}
            </p>
          </div>
        </div>
      </div>
      <CameraSearch />
    </>
  );
};
export default BeerInfo;
