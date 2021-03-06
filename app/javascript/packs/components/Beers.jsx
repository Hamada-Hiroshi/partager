import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, Link, browserHistory } from "react-router-dom";
import CameraSearch from "./CameraSearch";
import { Grid, Backdrop } from "@material-ui/core";
import { Oval } from  "react-loader-spinner";
import axios from "axios";
import { useRecoilState } from "recoil";
import { beerSearchResultsState } from "../store/beerSearchResultsState";
import { scrollPositionState } from "../store/scrollPositionState";
import AverageScore from "./AverageScore";

const Beers = () => {
  const { pathname, search, hash } = useLocation();
  const [contents, setContents] = useState({ res: null, loading: true });
  const [beersInfo, setBeersInfo] = useRecoilState(beerSearchResultsState);
  const [scrollPosition, setScrollPosition] = useRecoilState(scrollPositionState);

  const preloadImages = (beers) => {
    let imgArray = new Array();
    let backGroundImgArray = new Array();
    beers.forEach((beer, index) => {
      imgArray[index] = new Image();
      imgArray[index].src = beer.sample_image_url;
      backGroundImgArray[index] = new Image();
      backGroundImgArray[index].src = beer.content_image_url;
    });
    return backGroundImgArray;
  }

  useEffect(() => {
    if (search == beersInfo.params) {
      setContents({ res: beersInfo.beers, loading: false });
    } else {
      console.log("apiリクエスト");
      const getBeers = async () => {
        let csrfToken = document.head.querySelector("[name=csrf-token][content]").content;
        try {
          const response = await axios.get(`/beers/${search}`, {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json",
              "X-CSRF-Token": csrfToken
            }
          });
          console.log(response.data);
          if (response.data.beers.length) {
            const images = await preloadImages(response.data.beers);
            images[0].onload = () =>  {
              console.log("プリロード完了");
              setContents({ res: response.data, loading: false });
              setBeersInfo({ params: search, beers: response.data });
            }
          } else {
            setContents({ res: response.data, loading: false });
          }
        } catch (error) {
          console.log(error);
          setContents({ res: null, loading: false });
        }
      }
      getBeers();
    }
  }, []);

  useEffect(() => {
    if (search == scrollPosition.params && hash == "#back") {
      console.log("ブラウザバックスクロール");
      window.scrollTo(0, scrollPosition.scrollY);
    }
  }, [contents]);

  return (
    <>
      <div className="wrapper beer index">
        {contents.loading ? (
          <div className="index-loading">
            {console.log("スピナー表示")}
            <Oval color="#808080" height={30} width={30} />
          </div>
        ) : (
          <>
            <h2 className="sub-title">{contents.res.category}</h2>
            {console.log("一覧表示")}
            {contents.res.beers.map(beer => (
              <Link
                to={`/beers/${beer.id}`}
                state={beer}
                key={beer.id}
                onClick={() => {
                  setScrollPosition({ params: search, scrollY: window.scrollY });
                  if (!hash.length) {
                    window.history.replaceState(null, null, `${location.href}#back`);
                  }
                }}
              >
                <div className="drink-box">
                  <div className="background-drink-image">
                    <img src={beer.content_image_url} alt="" className="beer-content-image" />
                  </div>
                  <Grid container className="drink-info-box">
                    <Grid item xs={5} className="drink-image">
                      <img src={beer.sample_image_url} alt="" className="beer-image" />
                    </Grid>
                    <Grid item xs={7} className="drink-score">
                      <AverageScore reviewsData={beer.reviews_data} />
                    </Grid>
                    <Grid item xs={12} className="drink-info">
                      <p className="dink-title">{beer.name}</p>
                      <p className="beer-style">ビアスタイル：{beer.beer_style.name}</p>
                      <p className="country">
                        <span className={`flag-icon flag-icon-${beer.country.abbreviation}`}></span>
                        {beer.country.name}
                      </p>
                    </Grid>
                  </Grid>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
      <CameraSearch />
    </>
  );
};
export default Beers;

