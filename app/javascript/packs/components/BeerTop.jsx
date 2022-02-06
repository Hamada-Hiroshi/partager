import React from "react";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import ReplayIcon from "@material-ui/icons/Replay";
import { IconButton } from "@material-ui/core";
import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import Grid from "@material-ui/core/Grid";

const BeerTop = () => {
  const [isCaptureEnable, setCaptureEnable] = useState(false);
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
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
    } else if (url) {
      // 撮り直し
      return (
        <IconButton onClick={() => {
          setUrl(null);
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
      <div className="wrapper beer">
        <h2 className="sub-title">ビアスタイルで探す</h2>
        <div id="select-beer-genre">
          <div className="beer-genre" id="lager">
            <p>
              <span className="main-font">Lager</span>
              <br />
              <span className="sub-font">-ラガー-</span>
            </p>
          </div>
          <div className="beer-genre" id="ale">
            <p style={{ color: "#FFF" }}>
              <span className="main-font">Ale</span>
              <br />
              <span className="sub-font">-エール-</span>
            </p>
          </div>
          <div className="beer-genre" id="others">
            <p>
              <span className="main-font">Others</span>
              <br />
              <span className="sub-font">-その他-</span>
            </p>
          </div>
          <div className="beer-genre" id="genre-hint">
            <p>ビアスタイルとは？</p>
          </div>
        </div>
      </div>

      {/* カメラ起動時のディスプレイ */}
      {isCaptureEnable && (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 500,
              height: 700,
              facingMode: { exact: "environment" }
              // facingMode: "user"
            }}
            style={{
              height: "100vh",
              width: "100%",
              objectFit: "cover",
              position: "absolute"
            }}
          />
        </div>
      )}
      {url && (
        <div>
          <img src={url} alt="Screenshot" className="camera-image" />
        </div>
      )}

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
            {url && (
              <span style={{ color: "#FFF", cursor: "pointer" }} onClick={() => {
                displayShow();
                setUrl(null);
              }}>
                キャンセル
              </span>
            )}
          </Grid>

          <Grid item xs={4}>
            <CameraButton />
          </Grid>

          <Grid item xs={4}>
            {url && (
              <span>
                <a href="/beel/image_seach" style={{ color: "#FFF", cursor: "pointer" }}>検索</a>
              </span>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default BeerTop;
