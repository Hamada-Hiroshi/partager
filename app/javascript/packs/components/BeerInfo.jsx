import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CameraSearch from "./CameraSearch";
import { Grid, Button, IconButton, Box, Typography, Modal } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import { Oval } from  "react-loader-spinner";
import { useRecoilValue } from "recoil";
import { userState } from "../store/userState";
import ReviewModal from "./ReviewModal";

const BeerInfo = () => {
  const { state, pathname } = useLocation();
  const userInfo = useRecoilValue(userState);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  console.log(state);

  return (
    <>
      <div className="no-wrapper beer show">
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
            {userInfo.isLogin && (
              <>
                <Button
                  variant="outlined"
                  className="review-btn"
                  onClick={() => setReviewModalOpen(true)}
                >
                  <StarIcon />
                  評価を追加する
                </Button>
                <ReviewModal
                  reviewModalOpen={reviewModalOpen}
                  setReviewModalOpen={setReviewModalOpen}
                  drinkType="beer"
                  drinkId={state.id}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <CameraSearch />
    </>
  );
};
export default BeerInfo;

