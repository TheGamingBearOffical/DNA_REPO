import React from 'react';
import FoodInfo from './FoodInfo';
import MealPlan from './MealPlan';
import AiRecommendations from './AiRecommendations';
import Upload from './Upload';

const FactsWeGive = () => (
  <div className="card shadow-sm border-primary">
    <div className="card-body">
      <h5 className="card-title text-primary">Facts We Give</h5>
      <ul className="list-unstyled">
        <li>• Genetic sensitivity to lactose</li>
        <li>• Recommended daily folate</li>
        <li>• Omega-3 absorption rate</li>
      </ul>
    </div>
  </div>
);

const Home = ({ mealItems, onAddItem, onFileSelect }) => {
  return (
    <>
      <Upload onFileSelect={onFileSelect} />
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <FactsWeGive />
        </div>
        <div className="col-md-6">
          <FoodInfo onAddItem={onAddItem} />
        </div>
      </div>
      <MealPlan items={mealItems} />
      <AiRecommendations />
    </>
  );
};

export default Home; 