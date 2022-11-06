import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import { useRecoilValue } from "recoil";
import { userState } from "../store/userState";
import CameraSearch from "./CameraSearch";
import ReviewModal from "./ReviewModal";
import AverageScore from "./AverageScore";
import LoadingSpinner from "./LoadingSpinner";
import UserInfo from "../types/UserInfo";
import Beer from "../types/Beer";
import { preloadImages } from "../common";
import axios from "axios";

const BeerInfo: React.VFC = () => {
  const userInfo: UserInfo = useRecoilValue(userState);
  const navigate = useNavigate();
  const location = useLocation();
  const [beer, setBeer] = useState<Beer | null>(location.state);
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (beer == null) {
      const getBeerInfo = async () => {
        const csrfToken = (document.head.querySelector("[name=csrf-token][content]") as HTMLMetaElement).content;
        try {
          const response = await axios.get(`${location.pathname}/ajax`, {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json",
              "X-CSRF-Token": csrfToken
            }
          });
          if (response.data) {
            await preloadImages([response.data]);
            setBeer(response.data);
          } else {
            navigate("/beers/no_search_result");
          }
        } catch (error) {
          console.log(error);
        }
      }
      getBeerInfo();
      // レビュー後も再取得するようにしたい
    }
  }, []);

  return (
    <>
      {!beer ? (
        <div className="wrapper beer show">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="no-wrapper beer show">
          <div className="background-drink-image">
            <img src={beer.content_image_url} alt="" className="beer-content-image" />
          </div>
          <div className="drink-info">
            <Grid container>
              <Grid item xs={8} className="drink-image">
                <img src={beer.sample_image_url} alt="" className="beer-image" />
              </Grid>
              <Grid item xs={3} className="drink-score">
                <AverageScore reviewsData={beer.reviews_data} />
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
                    {userInfo.reviewedBeerIds.includes(beer.id) ? "もう一度評価する" : "評価を追加する" }
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
      )}
      <CameraSearch />
    </>
  );
};
export default BeerInfo;
