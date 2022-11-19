import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { BallTriangle } from "react-loader-spinner";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/userState";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import ReplayIcon from "@material-ui/icons/Replay";
import { IconButton, Grid, Backdrop } from "@material-ui/core";
import LoginModal from "./LoginModal";
import { preloadImages, isPC } from "../../common";
import UserInfo from "../../types/UserInfo";

const CameraSearch: React.VFC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const userInfo: UserInfo = useRecoilValue(userState);
  const webcamRef = useRef<Webcam>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageData(imageSrc);
    }
  }, [webcamRef]);

  const displayShow = (isShow: boolean) => {
    let display = document.querySelectorAll(".wrapper, .no-wrapper")[0];
    if (isShow) {
      display.classList.remove("display-none");
    } else {
      display.classList.add("display-none");
    }
  }

  const searchImage = async (image: string) => {
    setProgress(true);
    const csrfToken = (document.head.querySelector("[name=csrf-token][content]") as HTMLMetaElement).content;
    let data = { "image_data": image }

    try {
      const response = await axios.post("/beers/image_search", data, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken
        }
      });
      console.log(response.data);
      if (response.data) {
        await preloadImages([response.data]);
        navigate(`/beers/${response.data.id}`, { state: response.data });
      } else {
        navigate("/beers/no_search_result");
      }
      // 検索結果が現在のページと同じ場合以下の処理が必要
      displayShow(true);
      setProgress(false);
      setCaptureEnable(false);
      setImageData(null);
    } catch (error) {
      console.log(error);
      setProgress(false);
    }
  }

  const stopEvent = (event: any) => {
    event.preventDefault();
  }

  useEffect(() => {
    if (isCaptureEnable || imageData) {
      window.addEventListener("wheel", stopEvent, { passive: false });
      window.addEventListener("touchmove", stopEvent, { passive: false });
    }
    return () => {
      window.removeEventListener("wheel", stopEvent);
      window.removeEventListener("touchmove", stopEvent);
    }
  }, [isCaptureEnable, imageData]);

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
              aspectRatio: isPC() ? (414 / (window.innerHeight - 108)) : ((window.innerHeight - 108) / window.innerWidth),
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
              <span style={{ color: "#FFF", cursor: "pointer" }} onClick={() => searchImage(imageData)}>
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
