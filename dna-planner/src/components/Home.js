import React, { useState } from 'react';
import FoodInfo from './FoodInfo';
import MealPlan from './MealPlan';
import AiRecommendations from './AiRecommendations';
import Upload from './Upload';
import TraitResult from './TraitResult';

const Home = ({ mealItems, onAddItem }) => {
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <>
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <Upload onAnalysisComplete={setAnalysisResult} />
        </div>
        <div className="col-md-6">
          <FoodInfo onAddItem={onAddItem} />
        </div>
      </div>
      <TraitResult result={analysisResult} />
      <MealPlan items={mealItems} />
      <AiRecommendations mealItems={mealItems} analysisResult={analysisResult} />
    </>
  );
};

export default Home; 