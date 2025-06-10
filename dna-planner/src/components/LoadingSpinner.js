import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './LoadingSpinner.css';

const LoadingSpinner = () => (
  <div className="loading-spinner-overlay">
    <Spinner animation="border" as="span" className="custom-spinner" />
    <p className="loading-text">Analyzing Food...</p>
  </div>
);

export default LoadingSpinner;