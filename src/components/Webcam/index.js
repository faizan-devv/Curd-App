import React from "react";
import { useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 632,
  height: 626,
  facingMode: "user",
};

const WebcamCapture = ({ email, rerender }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const saveProfilePicture = () => {
    console.log(typeof imgSrc);
    let data = JSON.parse(localStorage.getItem("creds"));
    let index = data.users.findIndex((x) => {
      return x.email === email;
    });
    data.users[index] = {
      ...data.users[index],
      photoSrc: imgSrc,
    };
    localStorage.setItem("creds", JSON.stringify(data));
    rerender();
  };
  return (
    <>
      {imgSrc ? (
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
      )}
    </>
  );
};

export default WebcamCapture;
