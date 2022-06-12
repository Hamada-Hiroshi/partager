import React from "react";
import { IconButton, Box, Typography, Modal, Slide } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const ReviewModal = (props) => {
  const { reviewModalOpen, setReviewModalOpen } = props

  return (
    <>
      <Modal
        open={reviewModalOpen}
        aria-labelledby="review-modal-title"
        aria-describedby="review-modal-description"
        className="modal-wrapper"
      >
        <Slide direction="up" in={reviewModalOpen}>
          <Box className="review-modal-box">
            <Box className="review-modal-close-btn">
              <IconButton onClick={() => setReviewModalOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography id="review-modal-title" component="h2">
              レビュー
            </Typography>
            <Typography id="review-modal-description">
              <a href="/users/sign_in">評価する</a>
            </Typography>
          </Box>
        </Slide>
      </Modal>
    </>
  );
};
export default ReviewModal;
