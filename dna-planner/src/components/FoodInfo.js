import React, { useState } from 'react';
import WebcamCapture from './WebcamCapture';
import { callImageAnalysisApi } from '../api/imageAnalysis';
import LoadingSpinner from './LoadingSpinner';

const FoodInfo = ({ onAddItem }) => {
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddItemClick = async () => {
    if (capturedImage) {
      setIsLoading(true);
      // The capturedImage is a full data URL, which our API function now handles
      const foodData = await callImageAnalysisApi(capturedImage);
      setIsLoading(false);

      if (foodData && foodData.foodName) {
        onAddItem({ name: foodData.foodName, calories: parseInt(foodData.calories, 10) || 0, image: capturedImage });
      } else {
        onAddItem({ name: "Unrecognized Item", calories: 0, image: capturedImage });
      }
      
      setCapturedImage(null);
      setShowWebcam(false);
    }
  };

  const handlePicClick = () => {
    setShowWebcam(true);
  };

  const handleCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
    setShowWebcam(false);
  };

  return (
    <div className="card shadow-sm border-primary">
      <div className="card-body">
        {isLoading ? (
          <LoadingSpinner />
        ) : showWebcam ? (
          <WebcamCapture onCapture={handleCapture} />
        ) : (
          <>
            <button className="btn btn-primary w-100 mb-3" onClick={handlePicClick}>Take Pic</button>
            {capturedImage && (
              <div className="mb-3">
                <img src={capturedImage} width="100" alt="captured" />
              </div>
            )}
            <button
              className="btn btn-outline-primary w-100"
              onClick={handleAddItemClick}
              disabled={!capturedImage}
            >
              Add Item
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FoodInfo; 