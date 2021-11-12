import React, { useEffect } from "react";
import { useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 632,
  height: 626,
  facingMode: "user",
};

const WebcamCapture = ({ email, rerender, type }) => {
  const [imgSrc, setImgSrc] = useState([]);
  const webcamRef = React.useRef(null);
  const [count, setCount] = useState(0);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    let temp = [...imgSrc];
    temp.push(imageSrc);
    setImgSrc(temp);
  }, [webcamRef]);

  const saveProfilePicture = () => {
    let data = JSON.parse(localStorage.getItem("creds"));
    let index = data.users.findIndex((x) => {
      return x.email === email;
    });
    let arr = data.users[index].photoSrc.concat(imgSrc);
    data.users[index] = {
      ...data.users[index],
      photoSrc: arr,
    };
    localStorage.setItem("creds", JSON.stringify(data));
    rerender();
  };

  useEffect(() => {
    setImgSrc([]);
  }, []);
  return (
    <>
      {type ? (
        <div>Photo Bomb</div>
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
