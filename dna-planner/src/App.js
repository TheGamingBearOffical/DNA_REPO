import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Home from "./components/Home";
import MealPlan from "./components/MealPlan";
import './index.css';
import './App.css';
import { useUndoableState } from "./hooks/useUndoableState";

function App() {
  const {
    state: mealItems,
    setState: setMealItems,
    canUndo,
    canRedo,
    undo,
    redo,
  } = useUndoableState([]);

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleAddItem = (newItem) => {
    const newItemWithId = { ...newItem, id: `${newItem.name}-${Date.now()}` };
    setMealItems(prevItems => [...prevItems, newItemWithId]);
  };

  const handleRemoveItem = (itemId) => {
    setMealItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className="app-container">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Routes>
            <Route path="/" element={<Home onAddItem={handleAddItem} mealItems={mealItems} onRemoveItem={handleRemoveItem} undo={undo} redo={redo} canUndo={canUndo} canRedo={canRedo} />} />
            <Route path="/meal-plan" element={<MealPlan items={mealItems} onRemoveItem={handleRemoveItem} undo={undo} redo={redo} canUndo={canUndo} canRedo={canRedo} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;