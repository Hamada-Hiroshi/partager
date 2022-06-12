import React, { useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import CameraSearch from "./CameraSearch";
import { Grid, Button, IconButton, Box, Typography, Modal } from "@material-ui/core";
import { Oval } from  "react-loader-spinner";
import { useRecoilValue } from "recoil";
import { userState } from "../store/userState";
import LoginModal from "./LoginModal";
import ReviewModal from "./ReviewModal";

const BeerInfo = () => {
  const { state, pathname } = useLocation();
  const userInfo = useRecoilValue(userState);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  console.log(state);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
            <Button variant="outlined" onClick={() => {
              if (userInfo.isLogin) {
                setReviewModalOpen(true);
              } else {
                setLoginModalOpen(true);
              }
            }}>
              評価する
            </Button>
            <ReviewModal reviewModalOpen={reviewModalOpen} setReviewModalOpen={setReviewModalOpen} />
          </div>
        </div>
      </div>
      <CameraSearch />
    </>
  );
};
export default BeerInfo;
