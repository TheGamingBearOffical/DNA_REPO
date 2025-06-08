import React from 'react';

// Helper to assign a color based on category
const getCategoryColor = (category) => {
  switch (category) {
    case 'Macronutrients': return 'text-info';
    case 'Micronutrients': return 'text-success';
    case 'Sensitivities': return 'text-warning';
    case 'Metabolic Health': return 'text-danger';
    case 'Lifestyle': return 'text-secondary';
    default: return 'text-dark';
  }
};

const TraitResult = ({ trait }) => {
  const colorClass = getCategoryColor(trait.category);

  return (
    <div className="border-bottom pb-2 mb-2">
      <p className="mb-0 fw-bold">
        <span className={`fs-4 me-2 ${colorClass}`}>•</span>
        {trait.trait}
      </p>
      <small className="text-muted ms-4">{trait.summary}</small>
    </div>
  );
};

export default TraitResult;