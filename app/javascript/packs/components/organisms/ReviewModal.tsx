import React, { useState, useRef } from "react";
import { TextField, Button, IconButton, Box, Grid, Modal, Slide } from "@material-ui/core";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import ReactStars from "react-rating-stars-component";
import SubmittingSpinner from "../atoms/SubmittingSpinner";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../../store/userState";
import UserInfo from "../../types/UserInfo";

type ReviewModal = {
  reviewModalOpen: boolean;
  setReviewModalOpen: Function;
  drinkType: string;
  drinkId: number;
}

const ReviewModal: React.VFC<ReviewModal> = (props) => {
  const { reviewModalOpen, setReviewModalOpen, drinkType, drinkId } = props
  const [rating, setRating] = useState<number>(0);
  const inputComment = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(userState);

  const ratingChanged = (newRating: number) => {
    let score: number = (newRating / 5) + 0.8
    setRating(score);
    displaySendButton(true);
  }

  const displaySendButton = (isShow: boolean) => {
    let sendButton = document.getElementById("review-send-btn");
    if (isShow) {
      sendButton?.classList.remove("display-none");
    } else {
      sendButton?.classList.add("display-none");
    }
  }

  const displayTextArea = (isOpen: boolean) => {
    let ratingDisplay = document.getElementById("rating-area");
    let commentDescription = document.getElementById("comment-description");
    let commentForm = document.querySelectorAll(".comment-form, .focused-comment-form")[0];
    let backButton = document.getElementById("review-back-btn");
    if (isOpen) {
      ratingDisplay?.classList.add("display-none");
      commentDescription?.classList.add("display-none");
      commentForm.classList.add("focused-comment-form");
      commentForm.classList.remove("comment-form");
      backButton?.classList.remove("display-none");
    } else {
      ratingDisplay?.classList.remove("display-none");
      commentDescription?.classList.remove("display-none");
      commentForm.classList.remove("focused-comment-form");
      commentForm.classList.add("comment-form");
      backButton?.classList.add("display-none");
    }
  }

  const handleSubmit = () => {
    setProgress(true);
    const csrfToken = (document.head.querySelector("[name=csrf-token][content]") as HTMLMetaElement).content;
    let data = {
      "review": {
        "drink_id": drinkId,
        "drink_type": drinkType.charAt(0).toUpperCase() + drinkType.slice(1),
        "score": rating,
        "comment": inputComment.current?.value
      }
    }
    axios
      .post("/reviews", data, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken
        }
      })
      .then(() => {
        setReviewModalOpen(false);
        displaySendButton(false);
        setUserInfo({
          isLogin: userInfo.isLogin,
          reviewedBeerIds: userInfo.reviewedBeerIds.concat(drinkId),
          reviewedWineIds: userInfo.reviewedWineIds,
          reviewedSakeIds: userInfo.reviewedSakeIds
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setProgress(false);
      });
  }

  const RatingStatus = () => {
    let impression: string = ""
    if (rating >= 1 && rating < 2) {
      impression = "Poor";
    } else if (rating >= 2 && rating < 3) {
      impression = "Average";
    } else if (rating >= 3 && rating < 4) {
      impression = "Good !";
    } else if (rating >= 4 && rating < 5) {
      impression = "Very Good !!";
    } else if (rating == 5) {
      impression = "Excellent !!!";
    }
    return (
      <>
        <span className="rating-score">
          {rating > 0 ? rating.toFixed(1) : ""}
        </span>
        <span className="rating-impression">
          {impression}
        </span>
      </>
    );
  }

  return (
    <>
      <SubmittingSpinner progress={progress} />
      <Button
        variant="outlined"
        onClick={handleSubmit}
        id="review-send-btn"
        className="display-none"
      >
        レビューを送信
      </Button>
      <Modal
        open={reviewModalOpen}
        className="modal-wrapper"
      >
        <Slide direction="up" in={reviewModalOpen}>
          <Box className="review-modal-box">
            <Box className="review-modal-icon-btns">
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <IconButton
                    id="review-back-btn"
                    className="display-none"
                    onClick={() => {displayTextArea(false);}}
                  >
                    <ArrowBackIosRoundedIcon fontSize="small"/>
                  </IconButton>
                </Grid>
                <Grid item xs={4}>
                  <IconButton onClick={() => {
                    setRating(0);
                    setReviewModalOpen(false);
                    displaySendButton(false);
                  }}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
            <div id="rating-area">
              <RatingStatus />
              <ReactStars
                count={21}
                onChange={ratingChanged}
                size={16}
                activeColor="#ffd700"
              />
            </div>
            {rating > 0 && (
              <>
                <p id="comment-description">ご意見をお聞かせください</p>
                <TextField
                  multiline
                  placeholder="このビールはいかがでしたか？"
                  variant="standard"
                  onMouseDown={() => {displayTextArea(true);}}
                  inputRef={inputComment}
                  maxRows={20}
                  className="comment-form"
                />
              </>
            )}
          </Box>
        </Slide>
      </Modal>
    </>
  );
};
export default ReviewModal;
