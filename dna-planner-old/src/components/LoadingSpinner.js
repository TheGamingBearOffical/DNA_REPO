import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => (
  <div className="text-center py-5">
    <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }}/>
    <p className="mt-3 fs-5 text-primary">Analyzing Genetic Data...</p>
  </div>
);

export default LoadingSpinner;