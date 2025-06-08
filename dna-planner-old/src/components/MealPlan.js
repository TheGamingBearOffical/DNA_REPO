import React from 'react';

const MealPlan = ({ items }) => {
  return (
    <div className="card border-primary mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-primary">Meal Plan</h5>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <span>{item.name}</span>
                <br />
                {item.image && <img src={item.image} width="50" alt={item.name} />}
              </div>
              <span>{item.details}</span>
            </div>
          ))
        ) : (
          <p>No items added to the meal plan yet.</p>
        )}
      </div>
    </div>
  );
};

export default MealPlan; 