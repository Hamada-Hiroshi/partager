import React, { useState, useLayoutEffect } from "react";
import { IconButton, Box, Typography, Modal } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const LoginModal = (props) => {
  const { loginModalOpen, setLoginModalOpen } = props

  return (
    <>
      <Modal
        open={loginModalOpen}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="modal-box">
          <Box className="modal-close-btn">
            <IconButton onClick={() => setLoginModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography id="modal-title" component="h2">
            カメラで検索するにはログインが<br />
            必要です
          </Typography>
          <Typography id="modal-description">
            <a href="/users/sign_in">ログインする</a>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
export default LoginModal;
