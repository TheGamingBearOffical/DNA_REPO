import React, { useState, useEffect } from 'react';
import { getAIRecomendations } from '../api/recommendations';
import ReactMarkdown from 'react-markdown';
import Spinner from 'react-bootstrap/Spinner';
import './AiRecommendations.css';


const AiRecommendations = ({ mealItems, analysisResult }) => {
  const [recommendations, setRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only fetch if we have items and analysis results
    if (mealItems && mealItems.length > 0 && analysisResult && Object.keys(analysisResult).length > 0) {
      const fetchRecommendations = async () => {
        setIsLoading(true);
        const result = await getAIRecomendations(mealItems, analysisResult);
        setRecommendations(result);
        setIsLoading(false);
      };

      fetchRecommendations();
    }
  }, [mealItems, analysisResult]); // Rerun when these change

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <Spinner animation="grow" variant="primary" />
          <p className="loading-text">Generating your personalized recommendations...</p>
        </div>
      );
    }

    if (recommendations) {
      return <ReactMarkdown>{recommendations}</ReactMarkdown>;
    }
    
    // Default message when no recommendations have been generated yet
    return (
      <p className="card-custom-text">
        Add food items and analyze your DNA to get personalized AI recommendations.
      </p>
    );
  };

  return (
    <div className="card-custom ai-recommendations">
      <div className="card-body">
        <h5 className="card-custom-title">AI Meal Recommendations</h5>
        <div className="recommendations-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AiRecommendations; 