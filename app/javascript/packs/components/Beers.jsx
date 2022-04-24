import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import CameraSearch from "./CameraSearch";
import Grid from "@material-ui/core/Grid";
import { Circles } from  "react-loader-spinner";
import Backdrop from "@material-ui/core/Backdrop";
import axios from "axios";

const Beers = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [contents, setContents] = useState({ res: null, loading: true });

  if (contents.loading) {
    let csrfToken = document.head.querySelector("[name=csrf-token][content]").content;
    axios
      .get(`/beers?category=${query.get("category")}`, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken
        }
      })
      .then((response) => {
        console.log(response.data);
        setContents({ res: response.data, loading: false });
      })
      .catch(error => {
        console.log(error);
        setContents({ res: null, loading: false });
      });
  }

  return (
    <>
      <div className="wrapper beer">
        {contents.loading ? (
          <div className="index-loading">
            <Circles color="#808080" height={40} width={40} />
          </div>
        ) : (
          <>
            <h2 className="sub-title">{contents.res.category}</h2>
            {contents.res.beers.map((beer) => (
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
          </>
        )}
      </div>
      <CameraSearch />
    </>
  );
};
export default Beers;
