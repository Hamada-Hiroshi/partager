import React, { useState, useRef } from "react";
import { TextField, Button, IconButton, Box, Grid, Modal, Slide, Backdrop } from "@material-ui/core";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import ReactStars from "react-rating-stars-component";
import { BallTriangle } from "react-loader-spinner";
import axios from "axios";

const ReviewModal = (props) => {
  const { reviewModalOpen, setReviewModalOpen, drinkType, drinkId } = props
  const [rating, setRating] = useState(null);
  const inputComment = useRef(null);
  const [progress, setProgress] = useState(false);

  const ratingChanged = (newRating) => {
    let score = (newRating / 5) + 0.8
    setRating(score);
    displaySendButton(true);
  }

  const displaySendButton = (isShow) => {
    let sendButton = document.getElementById("review-send-btn");
    if (isShow) {
      sendButton.classList.remove("display-none");
    } else {
      sendButton.classList.add("display-none");
    }
  }

  const displayTextArea = (isOpen) => {
    let ratingDisplay = document.getElementById("rating-area");
    let commentDescription = document.getElementById("comment-description");
    let commentForm = document.getElementsByClassName("comment-form")[0];
    let backButton = document.getElementById("review-back-btn");
    if (isOpen) {
      ratingDisplay.classList.add("display-none");
      commentDescription.classList.add("display-none");
      commentForm.classList.add("focused-comment-form");
      backButton.classList.remove("display-none");
    } else {
      ratingDisplay.classList.remove("display-none");
      commentDescription.classList.remove("display-none");
      commentForm.classList.remove("focused-comment-form");
      backButton.classList.add("display-none");
    }
  }

  const ratingImpression = () => {
    if (rating >= 1 && rating < 2) {
      return "Poor";
    } else if (rating >= 2 && rating < 3) {
      return "Average";
    } else if (rating >= 3 && rating < 4) {
      return "Good !";
    } else if (rating >= 4 && rating < 5) {
      return "Very Good !!";
    } else if (rating == 5) {
      return "Excellent !!!";
    }
  }

  const handleSubmit = () => {
    console.log(inputComment.current.value);
    setProgress(true);
    let csrfToken = document.head.querySelector("[name=csrf-token][content]").content;
    let data = {
      "review": {
        "drink_id": drinkId,
        "drink_type": drinkType.charAt(0).toUpperCase() + drinkType.slice(1),
        "score": rating,
        "comment": inputComment.current.value
      }
    }

    axios
      .post("/reviews", data, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken
        }
      })
      .then((response) => {
        setReviewModalOpen(false);
        displaySendButton(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setProgress(false);
      });
  }

  return (
    <>
      <Backdrop open={progress} style={{ zIndex: 1500 }}>
        <BallTriangle color="#00BFFF" height={80} width={80} />
      </Backdrop>

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
                    setRating(null);
                    setReviewModalOpen(false);
                    displaySendButton(false);
                  }}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
            <div id="rating-area">
              <span className="rating-score">
                {!rating ? "" : rating.toFixed(1)}
              </span>
              <span className="rating-impression">
                {ratingImpression()}
              </span>
              <ReactStars
                count={21}
                onChange={ratingChanged}
                size={16}
                activeColor="#ffd700"
              />
            </div>
            {rating && (
              <>
                <p id="comment-description">ご意見をお聞かせください</p>
                <TextField
                  multiline
                  placeholder="このビールはいかがでしたか？"
                  variant="standard"
                  onFocus={() => {displayTextArea(true);}}
                  inputRef={inputComment}
                  // maxRows={1}
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

