import React from "react";
import { useRef, useState, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { BallTriangle } from  "react-loader-spinner";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../store/userState";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import ReplayIcon from "@material-ui/icons/Replay";
import { IconButton, Grid, Backdrop } from "@material-ui/core";
import { Box, Button, Typography, Modal } from "@material-ui/core";

const CameraSearch = memo(() => {
  const userInfo = useRecoilValue(userState);
  console.log(userInfo);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCaptureEnable, setCaptureEnable] = useState(false);
  const webcamRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setImageData(imageSrc);
    }
  }, [webcamRef]);

  const displayNone = () => {
    let display = document.getElementsByClassName("wrapper")[0];
    display.classList.add("display-none");
  }
  const displayShow = () => {
    let display = document.getElementsByClassName("wrapper")[0];
    display.classList.remove("display-none");
  }

  const navigate = useNavigate();
  const [progress, setProgress] = useState(false);

  const fetchResponse = (image) => {
    setProgress(true);
    let csrfToken = document.head.querySelector("[name=csrf-token][content]").content;
    let data = { "image_data": image }

    axios
      .post("/beers/image_search", data, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken
        }
      })
      .then((response) => {
        console.log(response.data);
        setProgress(false);
        navigate("/beers/search_result", { state: response.data });
      })
      .catch(error => {
        console.log(error);
        setProgress(false);
      });
  }

  const judgeDevice = () => {
    if (navigator.userAgent.indexOf("iPhone") > 0) {
      return "iphone";
    } else if (navigator.userAgent.indexOf("Android") > 0 && navigator.userAgent.indexOf("Mobile") > 0) {
      return "android";
    } else if (navigator.userAgent.indexOf("iPad") > 0) {
      return "ipad";
    } else if (navigator.userAgent.indexOf("Android") > 0) {
      return "android_tablet";
    } else {
      return "pc";
    }
  }

  const isPC = () => {
    let userAgent = judgeDevice();
    if (userAgent === "pc") {
      return true;
    } else {
      return false;
    }
  }

  const CameraButton = () => {
    if (isCaptureEnable) {
      // 撮影
      return (
        <IconButton onClick={() => {
          capture();
          setCaptureEnable(false);
        }}>
          <CameraAltIcon />
        </IconButton>
      );
    } else if (imageData) {
      // 撮り直し
      return (
        <IconButton onClick={() => {
          setImageData(null);
          setCaptureEnable(true);
        }}>
          <ReplayIcon />
        </IconButton>
      );
    } else {
      // カメラ起動
      return (
        <IconButton onClick={() => {
          if (userInfo.isLogin) {
            displayNone();
            setCaptureEnable(true);
          } else {
            setModalOpen(true);
          }
        }}>
          <CameraAltIcon />
        </IconButton>
      );
    }
  }

  return (
    <>
      <Backdrop open={progress} style={{ zIndex: 99 }}>
        <BallTriangle color="#00BFFF" height={80} width={80} />
      </Backdrop>

      {/* カメラ起動時のディスプレイ */}
      {isCaptureEnable && (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={{
              aspectRatio: (window.innerHeight - 108) / window.innerWidth,
              facingMode: isPC() ? "user" : { exact: "environment" }
              // width: { min: 640, ideal: 1170, max: 1284 },
              // height: { min: 1136, ideal: 2532, max: 2778 }
            }}
          />
        </div>
      )}
      {imageData && (
        <div>
          <img src={imageData} alt="Screenshot" className="camera-image" />
        </div>
      )}

      {/* フッター */}
      <div className="footer fixed beer-footer">
        <Grid container alignItems="center">
          <Grid item xs={4}>
            {/* カメラ停止 */}
            {isCaptureEnable && (
              <span style={{ color: "#FFF", cursor: "pointer" }} onClick={() => {
                displayShow();
                setCaptureEnable(false);
              }}>
                キャンセル
              </span>
            )}
            {/* 写真削除 */}
            {imageData && (
              <span style={{ color: "#FFF", cursor: "pointer" }} onClick={() => {
                displayShow();
                setImageData(null);
              }}>
                キャンセル
              </span>
            )}
          </Grid>

          <Grid item xs={4}>
            <CameraButton />
            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Box className="modal-box">
                <Typography id="modal-title" component="h2">
                  カメラで検索するにはログインが<br />
                  必要です
                </Typography>
                <Typography id="modal-description">
                  <a href="/users/sign_in">ログインする</a>
                </Typography>
              </Box>
            </Modal>
          </Grid>

          <Grid item xs={4}>
            {imageData && (
              <span style={{ color: "#FFF", cursor: "pointer" }} onClick={() => fetchResponse(imageData)}>
                検索
              </span>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
});
export default CameraSearch;
