import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Upload from "./components/Upload";
import MealPlan from "./components/MealPlan";
import './index.css';

function App() {
  const [mealItems, setMealItems] = useState([]);

  const handleAddItem = (newItem) => {
    setMealItems(prevItems => [...prevItems, newItem]);
  };

  return (
    <Router>
      <div className="bg-light text-dark min-vh-100 p-5" style={{ fontFamily: 'Poppins, Segoe UI, Roboto, sans-serif' }}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home onAddItem={handleAddItem} mealItems={mealItems} />} />
            <Route path="/meal-plan" element={<MealPlan items={mealItems} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;