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
  const beer = useLocation().state;
  const userInfo = useRecoilValue(userState);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  return (
    <>
      <div className="no-wrapper beer show">
        <div className="background-drink-image">
          <img src={beer.content_image_url} alt="" className="beer-content-image" />
        </div>
        <div className="drink-info">
          <Grid container>
            <Grid item xs={8} className="drink-image">
              <img src={beer.sample_image_url} alt="" className="beer-image" />
            </Grid>
            <Grid item xs={4} className="drink-score">
            </Grid>
          </Grid>
          <div className="drink-text-box">
            <p className="dink-title">{beer.name}</p>
            <p className="beer-style">ビアスタイル：{beer.beer_style.name}</p>
            <p className="country">
              <span className={`flag-icon flag-icon-${beer.country.abbreviation}`}></span>
              {beer.country.name}
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
                  drinkId={beer.id}
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

