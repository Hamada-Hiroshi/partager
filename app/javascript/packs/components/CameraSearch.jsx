import React, { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { BallTriangle } from "react-loader-spinner";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../store/userState";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import ReplayIcon from "@material-ui/icons/Replay";
import { IconButton, Grid, Backdrop } from "@material-ui/core";
import LoginModal from "./LoginModal";

const CameraSearch = () => {
  const userInfo = useRecoilValue(userState);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isCaptureEnable, setCaptureEnable] = useState(false);
  const webcamRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setImageData(imageSrc);
    }
  }, [webcamRef]);

  const displayShow = (isShow) => {
    let display = document.querySelectorAll(".wrapper, .no-wrapper")[0];
    if (isShow) {
      display.classList.remove("display-none");
    } else {
      display.classList.add("display-none");
    }
  }

  const navigate = useNavigate();
  const [progress, setProgress] = useState(false);

  const preloadImages = (beer) => {
    const loadImage = (imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
      return new Promise((resolve) => {
        img.onload = () => {
          resolve(img);
        }
      });
    }
    return Promise.all([
      loadImage(beer.sample_image_url),
      loadImage(beer.content_image_url)
    ]);
  }

  const fetchResponse = async (image) => {
    setProgress(true);
    let csrfToken = document.head.querySelector("[name=csrf-token][content]").content;
    let data = { "image_data": image }

    try {
      const response = await axios.post("/beers/image_search", data, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken
        }
      });
      console.log(response.data);
      const images = await preloadImages(response.data);
      setProgress(false);
      navigate(`/beers/${response.data.id}`, { state: response.data });
    } catch (error) {
      console.log(error);
      setProgress(false);
    }
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
            displayShow(false);
            setCaptureEnable(true);
          } else {
            setLoginModalOpen(true);
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
                displayShow(true);
                setCaptureEnable(false);
              }}>
                キャンセル
              </span>
            )}
            {/* 写真削除 */}
            {imageData && (
              <span style={{ color: "#FFF", cursor: "pointer" }} onClick={() => {
                displayShow(true);
                setImageData(null);
              }}>
                キャンセル
              </span>
            )}
          </Grid>

          <Grid item xs={4}>
            <CameraButton />
            <LoginModal loginModalOpen={loginModalOpen} setLoginModalOpen={setLoginModalOpen} />
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
};
export default CameraSearch;
