import React from 'react';
import linkData from '../NutrientLinks.json';

// The links are nested. Let's flatten the structure for easy lookup.
const linkDict = linkData["Nutrient Metabolism"] ? linkData["Nutrient Metabolism"][0] : {};

const TraitResult = ({ result }) => {
  if (!result || Object.keys(result).length === 0) {
    // Return null to not render the component if there are no results.
    // Or you can return a placeholder.
    return (
        <div className="card shadow-sm border-primary mb-4">
            <div className="card-body">
                <h5 className="card-title text-primary">Analysis Results</h5>
                <p>No traits to display. Upload a file and click Analyze.</p>
            </div>
        </div>
    );
  }
  
  return (
    <div className="card shadow-sm border-primary mb-4">
      <div className="card-body">
        <h5 className="card-title text-primary">Analysis Results</h5>
        {Object.entries(result).map(([nutrient, snpResults]) => (
          <div key={nutrient} className="mb-3">
            <h6>
                <a href={linkDict[nutrient] || "#"} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                    {nutrient}
                </a>
            </h6>
            <ul className="list-group list-group-flush">
              {snpResults.map((snpResult, index) => (
                <li key={index} className="list-group-item">
                  {snpResult.meaning}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TraitResult;