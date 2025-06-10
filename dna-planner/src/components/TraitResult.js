import React from 'react';
import linkData from '../NutrientLinks.json';
import './TraitResult.css';

// The links are nested. Let's flatten the structure for easy lookup.
const linkDict = linkData["Nutrient Metabolism"] ? linkData["Nutrient Metabolism"][0] : {};

const TraitResult = ({ result }) => {
  if (!result || Object.keys(result).length === 0) {
    // Return null to not render the component if there are no results.
    // Or you can return a placeholder.
    return (
        <div className="card-custom mb-4">
            <h5 className="card-custom-title">Analysis Results</h5>
            <p className="card-custom-text">No traits to display. Upload a file and click Analyze.</p>
        </div>
    );
  }
  
  return (
    <div className="card-custom mb-4">
      <h5 className="card-custom-title">Your Genetic Profile</h5>
      <div className="trait-grid">
        {Object.entries(result).map(([nutrient, snpResults]) => (
          <div key={nutrient} className="trait-item">
            <h6>
                <a href={linkDict[nutrient] || "#"} target="_blank" rel="noopener noreferrer" className="trait-link">
                    {nutrient}
                </a>
            </h6>
            <div className="trait-details">
              {snpResults.map((snpResult, index) => (
                <div key={index} className="trait-meaning">
                  {snpResult.meaning}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TraitResult;