import React, { memo } from "react";
import { IconButton, Box, Typography, Modal, Fade } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

type LoginModal = {
  loginModalOpen: boolean;
  setLoginModalOpen: Function;
}

const LoginModal: React.VFC<LoginModal> = memo((props) => {
  const { loginModalOpen, setLoginModalOpen } = props

  return (
    <>
      <Modal
        open={loginModalOpen}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
        className="modal-wrapper"
      >
        <Fade in={loginModalOpen}>
          <Box className="login-modal-box">
            <Box className="login-modal-close-btn">
              <IconButton onClick={() => setLoginModalOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography id="login-modal-title" component="h2">
              カメラで検索するにはログインが<br />
              必要です
            </Typography>
            <Typography id="login-modal-description">
              <a href="/users/sign_in">ログインする</a>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
});
export default LoginModal;
