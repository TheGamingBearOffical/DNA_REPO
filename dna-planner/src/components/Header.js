import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import ThemeToggle from './ThemeToggle';

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="app-header">
      <div className="logo">
        <span role="img" aria-label="dna-strand">🧬</span>
        <h1>DNA Diet Planner</h1>
      </div>
      <div className="header-controls">
        <nav>
          <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Home</NavLink>
          <NavLink to="/meal-plan" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Meal Plan</NavLink>
        </nav>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
};

export default Header; 