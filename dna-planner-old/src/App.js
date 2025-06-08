import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Upload from "./components/Upload";
import MealPlan from "./components/MealPlan";
import './index.css';

function App() {
  const [dnaFile, setDnaFile] = useState(null);
  const [mealItems, setMealItems] = useState([]);

  const handleFileSelect = (file) => {
    setDnaFile(file);
  };

  const handleAddItem = (newItem) => {
    setMealItems(prevItems => [...prevItems, newItem]);
  };

  return (
    <Router>
      <div className="bg-light text-dark min-vh-100 p-5" style={{ fontFamily: 'Poppins, Segoe UI, Roboto, sans-serif' }}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home onAddItem={handleAddItem} mealItems={mealItems} onFileSelect={handleFileSelect} />} />
            <Route path="/upload" element={<Upload onFileSelect={handleFileSelect} />} />
            <Route path="/meal-plan" element={<MealPlan items={mealItems} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;