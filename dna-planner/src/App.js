import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <div className="bg-light text-dark min-vh-100 p-5" style={{ fontFamily: 'Poppins, Segoe UI, Roboto, sans-serif' }}>
      {/* Navigation */}
      <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-4">
        <h1 className="display-6 fw-semibold">DNA Diet Planner</h1>
        <div>
          <button className="btn btn-outline-primary me-2">Home</button>
          <button className="btn btn-outline-primary me-2">Upload Page</button>
          <button className="btn btn-outline-primary">Meal Plan</button>
        </div>
      </div>

      {/* Upload DNA Section */}
      <div className="mb-4">
        <h2 className="h5 text-primary">Upload DNA</h2>
        <input type="file" accept=".txt,.csv,.json" className="form-control bg-white text-dark border-primary mt-2" />
      </div>

      {/* Food Info Section */}
      <div className="row g-4 mb-4">
        {/* Left Side: Facts We Give */}
        <div className="col-md-6">
          <div className="card shadow-sm border-primary">
            <div className="card-body">
              <h5 className="card-title text-primary">Facts We Give</h5>
              <ul className="list-unstyled">
                <li>• Genetic sensitivity to lactose</li>
                <li>• Recommended daily folate</li>
                <li>• Omega-3 absorption rate</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side: Food Info Entry */}
        <div className="col-md-6">
          <div className="card shadow-sm border-primary">
            <div className="card-body">
              <button className="btn btn-primary w-100 mb-3">Take Pic</button>
              <label className="form-label">Facts about food:</label>
              <input type="text" className="form-control border-primary mb-3" placeholder="Enter food facts manually..." />
              <button className="btn btn-outline-primary w-100">Add Item</button>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Plan Section */}
      <div className="card border-primary mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">Meal Plan</h5>
          <div className="d-flex justify-content-between">
            <span>Item 1</span>
            <span>Calculations</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Item 2</span>
            <span>Calculations</span>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="card bg-white border-primary shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">AI Recommendations</h5>
          <p className="card-text">
            Based on your DNA, consider a Mediterranean diet with increased leafy greens and lower dairy consumption.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;