import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={200} width={200} ref={webcamRef} screenshotFormat="image/jpeg" />
      )}
      <div className="btn-container mt-2">
        {imgSrc ? (
          <button className="btn btn-outline-primary" onClick={retake}>Retake photo</button>
        ) : (
          <button className="btn btn-primary" onClick={capture}>Capture photo</button>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture; 