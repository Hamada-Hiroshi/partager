import React from "react";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { IconButton } from "@material-ui/core";
import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import Grid from "@material-ui/core/Grid";

const videoConstraints = {
  width: 380,
  height: 460,
  facingMode: "user",
};

const BeerTop = () => {
  const [isCaptureEnable, setCaptureEnable] = useState(false);
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

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

          {isCaptureEnable && (
            <>
              <div>
                <Webcam
                  audio={false}
                  width={380}
                  height={460}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              </div>
            </>
          )}
          {url && (
            <>
              <div>
                <img src={url} alt="Screenshot" />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="footer fixed beer-footer">
        <Grid container alignItems="center">
          <Grid item xs={4}>
            {/* カメラ停止 */}
            {isCaptureEnable && (
              <span style={{ color: "#FFF", cursor: "pointer" }} onClick={() => setCaptureEnable(false)}>
                キャンセル
              </span>
            )}
            {/* 写真削除 */}
            {url && (
              <span style={{ color: "#FFF", cursor: "pointer" }} onClick={() => setUrl(null)}>
                キャンセル
              </span>
            )}
          </Grid>

          <Grid item xs={4}>
            {/* カメラ起動 */}
            {isCaptureEnable || (
              <IconButton onClick={() => setCaptureEnable(true)}>
                <CameraAltIcon />
              </IconButton>
            )}
            {/* 撮影&カメラ停止 */}
            {isCaptureEnable && (
              <IconButton onClick={() => {
                capture();
                setCaptureEnable(false);
              }}>
                <CameraAltIcon />
              </IconButton>
            )}
          </Grid>

          <Grid item xs={4}>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default BeerTop;
