import React from 'react';

const MealPlan = ({ items }) => {
  const totalCalories = items.reduce((total, item) => total + (item.calories || 0), 0);

  return (
    <div className="card border-primary mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-primary">Calorie Counter</h5>
        {items.length > 0 ? (
          <>
            {items.map((item, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <span>{item.name}</span>
                  <br />
                  {item.image && <img src={item.image} width="50" alt={item.name} />}
                </div>
                <span>{item.calories} calories</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between align-items-center fw-bold">
              <span>Total Calories:</span>
              <span>{totalCalories} calories</span>
            </div>
          </>
        ) : (
          <p>No items added to the meal plan yet.</p>
        )}
      </div>
    </div>
  );
};

export default MealPlan; 