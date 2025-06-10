import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { RefreshCw, VideoOff } from 'react-feather';
import './WebcamCapture.css';
import PhoneAsWebcamInstructions from './PhoneAsWebcamInstructions';

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  // For camera selection
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [noCamera, setNoCamera] = useState(false);

  const handleDevices = useCallback(
    (mediaDevices) => {
      const videoDevices = mediaDevices.filter(({ kind }) => kind === 'videoinput');
      setDevices(videoDevices);
      if (videoDevices.length === 0) {
        setNoCamera(true);
      } else {
        setNoCamera(false);
      }
    },
    [] // No dependencies, setDevices is stable
  );

  const refreshDevices = useCallback(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  // Effect for initial device scan
  useEffect(() => {
    refreshDevices();
  }, [refreshDevices]);

  // Effect to set the default camera when the component loads or devices change
  useEffect(() => {
    if (devices.length > 0 && !selectedDeviceId) {
      setSelectedDeviceId(devices[0].deviceId);
    }
  }, [devices, selectedDeviceId]);


  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="webcam-container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" className="webcam-preview" />
      ) : (
        <>
          {noCamera ? (
            <div className="no-camera-found">
              <VideoOff size={48} />
              <p>No camera found.</p>
              <p>Please connect a camera and refresh.</p>
            </div>
          ) : (
            <Webcam
              height={240}
              width={240}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="webcam-feed"
              videoConstraints={{ deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined }}
              onUserMedia={refreshDevices} // Refresh devices when permission is granted
            />
          )}
          <div className="camera-select-container mt-2">
            {devices.length > 0 && ( // Show dropdown if there's at least one camera
              <select
                id="camera-select"
                className="form-select form-select-sm"
                value={selectedDeviceId}
                onChange={(e) => setSelectedDeviceId(e.target.value)}
              >
                {devices.map((device, key) => (
                  <option key={key} value={device.deviceId}>
                    {device.label || `Camera ${key + 1}`}
                  </option>
                ))}
              </select>
            )}
            <button onClick={refreshDevices} className="btn-custom-icon" aria-label="Refresh camera list">
              <RefreshCw size={16} />
            </button>
          </div>
        </>
      )}
      <div className="webcam-controls mt-3">
        {imgSrc ? (
          <button className="btn-custom-outline" onClick={retake}>Retake</button>
        ) : (
          <button className="btn-custom-primary" onClick={capture} disabled={noCamera}>
            Capture
          </button>
        )}
      </div>
      {!imgSrc && <PhoneAsWebcamInstructions />}
    </div>
  );
};

export default WebcamCapture; 