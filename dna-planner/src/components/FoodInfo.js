import React, { useState } from 'react';
import WebcamCapture from './WebcamCapture';
import { callImageAnalysisApi } from '../api/imageAnalysis';
import LoadingSpinner from './LoadingSpinner';
import './FoodInfo.css';

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
        onAddItem({ 
          name: foodData.foodName, 
          calories: parseInt(foodData.calories, 10) || 0, 
          protein: parseInt(foodData.protein, 10) || 0,
          fat: parseInt(foodData.fat, 10) || 0,
          carbs: parseInt(foodData.carbs, 10) || 0,
          image: capturedImage 
        });
      } else {
        onAddItem({ name: "Unrecognized Item", calories: 0, protein: 0, fat: 0, carbs: 0, image: capturedImage });
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
    <div className="card-custom">
      {isLoading ? (
        <LoadingSpinner />
      ) : showWebcam ? (
        <WebcamCapture onCapture={handleCapture} />
      ) : (
        <>
          <h5 className="card-custom-title">Add Food Item</h5>
          <div className="food-info-content">
            <p className="card-custom-text">Take a picture of your food to analyze its nutritional content.</p>
            
            {capturedImage && (
              <div className="captured-image-preview">
                <img src={capturedImage} alt="captured food" />
              </div>
            )}
          </div>
          <div className="button-group">
            <button className="btn-custom-primary" onClick={handlePicClick}>
              Take Pic
            </button>
            <button
              className="btn-custom-outline"
              onClick={handleAddItemClick}
              disabled={!capturedImage}
            >
              Add Item
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FoodInfo; 