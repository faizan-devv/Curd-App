import React, { useEffect } from "react";
import ReactSpinnerTimer from "react-spinner-timer";
import { useState } from "react";
import Webcam from "react-webcam";
import styles from "./WebCam.module.css";

const videoConstraints = {
  width: 632,
  height: 626,
  facingMode: "user",
};

const WebcamCapture = ({ email, rerender, type }) => {
  const [imgSrc, setImgSrc] = useState([]);
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    console.log("Entered Capture");
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc, "image source");

    temp.push(imageSrc);
    console.log(temp, "temp before");
    temp.push(imageSrc);
    console.log(temp, "temppppp");
    setImgSrc(temp);
  }, [webcamRef]);

  const saveProfilePicture = () => {
    let data = JSON.parse(localStorage.getItem("creds"));
    let index = data.users.findIndex((x) => {
      return x.email === email;
    });
    if (type) {
      const arr = data.users[index].photoSrc.push(imgSrc);
      data.users[index] = {
        ...data.users[index],
        photoSrc: arr,
      };
      localStorage.setItem("creds", JSON.stringify(data));
      rerender();
    } else {
      const arr = data.users[index].photoSrc.concat(imgSrc);
      data.users[index] = {
        ...data.users[index],
        photoSrc: arr,
      };
      localStorage.setItem("creds", JSON.stringify(data));
      rerender();
    }
  };
  const handleChange = (lap) => {
    if (lap.isFinish) {
      capture();
      console.log("Finished!!");
    } else {
      capture();
    }
  };

  // useEffect(() => {
  //   if (!type) {
  //     console.log("Resetting Array");
  //     setImgSrc([]);
  //   }
  // }, []);
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
                totalLaps={10}
                isRefresh={false}
                onLapInteraction={handleChange}
              />
            </div>
          </div>
          <div></div>
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
