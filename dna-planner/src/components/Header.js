import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-4">
      <h1 className="display-6 fw-semibold">DNA Diet Planner</h1>
      <div>
        <NavLink to="/" className={({ isActive }) => "btn btn-outline-primary me-2" + (isActive ? " active" : "")}>Home</NavLink>
        <NavLink to="/meal-plan" className={({ isActive }) => "btn btn-outline-primary" + (isActive ? " active" : "")}>Meal Plan</NavLink>
      </div>
    </div>
  );
};

export default Header; 