import React from "react";
import { useNavigate } from "react-router-dom";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import ReplayIcon from "@material-ui/icons/Replay";
import { IconButton } from "@material-ui/core";
import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import Grid from "@material-ui/core/Grid";

const CameraSearch = () => {
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

  const setHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  const navigate = useNavigate();

  const fetchResponse = (image) => {
    let csrfToken = document.head.querySelector("[name=csrf-token][content]").content;
    let data = new FormData();
    data.append("image_data", image);

    fetch("/beers/image_search", {
      method: "post",
      headers: { "X-CSRF-Token": csrfToken },
      body: data
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigate("/beers/search_result", { state: data });
    })
    .catch(error => {
      console.log(error);
    });
  }

  const CameraButton = () => {
    setHeight();
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
          displayNone();
          setCaptureEnable(true);
        }}>
          <CameraAltIcon />
        </IconButton>
      );
    }
  }

  return (
    <>
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
              facingMode: { exact: "environment" }
              // facingMode: "user",
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
