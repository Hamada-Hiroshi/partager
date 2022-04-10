import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter } from 'react-router-dom';
import CameraSearch from "./CameraSearch";
import Grid from "@material-ui/core/Grid";

const Beers = (props) => {
  return (
    <>
      <div className="wrapper beer">
        <h2 className="sub-title">{props.category}</h2>
        {props.beers.map((beer) => (
          <div key={beer.id} className="drink-box">
            <Grid container>
              <Grid item xs={5} className="drink-image">
                <img src={beer.sample_image_url} alt="" className="index-drink-image" />
              </Grid>
              <Grid item xs={7} className="drink-info">
                <p className="dink-title">{beer.name}</p>
                <p className="beer-style">ビアスタイル：{beer.beer_style.name}</p>
                <p className="country">
                  <span className={`flag-icon flag-icon-${beer.country.abbreviation}`}></span>
                  {beer.country.name}
                </p>
              </Grid>
            </Grid>
          </div>
        ))}
      </div>
      <BrowserRouter>
        <CameraSearch />
      </BrowserRouter>
    </>
  );
};
export default Beers;
