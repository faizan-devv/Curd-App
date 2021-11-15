import React, { useEffect } from "react";
import ReactSpinnerTimer from "react-spinner-timer";
import { useState } from "react";
import Webcam from "react-webcam";
import styles from "./WebCam.module.css";
import { style } from "dom-helpers";
let temp = [];

const videoConstraints = {
  width: 632,
  height: 626,
  facingMode: "user",
};

const WebcamCapture = ({ email, rerender, type, hide }) => {
  const [imgSrc, setImgSrc] = useState([]);
  const [count, setCount] = useState([0]);
  const [re, setRe] = useState(false);
  const [showBomb, setShowBomb] = useState(false);
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    if (type) {
      if (temp.length > 9) {
        temp = [];
      }
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc != null) {
        temp.push(imageSrc);
        setImgSrc(temp);
        setRe(!re);
      }
    } else {
      const imageSrc = webcamRef.current.getScreenshot();
      temp.push(imageSrc);
      setImgSrc([imageSrc]);
    }
  }, [webcamRef]);

  const saveProfilePicture = () => {
    let data = JSON.parse(localStorage.getItem("creds"));
    let index = data.users.findIndex((x) => {
      return x.email === email;
    });
    if (type) {
      const arr = temp;
      data.users[index] = {
        ...data.users[index],
        photoBomb: arr,
      };
      localStorage.setItem("creds", JSON.stringify(data));
      hide();
      rerender();
    } else {
      const arr = data.users[index].photoSrc.concat(imgSrc);
      data.users[index] = {
        ...data.users[index],
        photoSrc: arr,
      };
      hide();
      localStorage.setItem("creds", JSON.stringify(data));
      rerender();
    }
  };
  const handleChange = (lap) => {
    if (lap.isFinish) {
      setShowBomb(true);
      setCount(lap.actualLap - 1);
      capture();
    } else {
      capture();
      setCount(lap.actualLap - 1);
    }
  };

  return (
    <>
      {type ? (
        <div>
          <div className={styles.PhotoBombWrap}>
            <Webcam
              audio={false}
              height={250}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={400}
              videoConstraints={videoConstraints}
            />
            <div className={styles.Spinner}>
              <ReactSpinnerTimer
                timeInSeconds={1}
                totalLaps={11}
                isRefresh={false}
                onLapInteraction={handleChange}
              />
              <div className={styles.Counter}>{count}</div>
            </div>
          </div>

          <div>
            <div className={styles.GalleryWrap}>
              {showBomb
                ? imgSrc.map((src, index) => {
                    return <img key={index} src={src} alt="image" />;
                  })
                : null}
            </div>
          </div>
          <button onClick={saveProfilePicture}>Save</button>
        </div>
      ) : (
        [
          imgSrc?.length > 0 ? (
            <div>
              <img src={imgSrc} />{" "}
              <button
                onClick={() => {
                  setImgSrc(null);
                }}
              >
                Re-take
              </button>
              <button onClick={saveProfilePicture}>Save</button>
            </div>
          ) : (
            <div>
              {" "}
              <Webcam
                audio={false}
                height={500}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={700}
                videoConstraints={videoConstraints}
              />
              <button onClick={capture}>Capture photo</button>
            </div>
          ),
        ]
      )}
    </>
  );
};

export default WebcamCapture;
