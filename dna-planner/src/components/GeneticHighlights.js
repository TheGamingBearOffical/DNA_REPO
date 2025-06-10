import React from 'react';
import { ThumbsUp, AlertTriangle } from 'react-feather';
import './GeneticHighlights.css';

const GeneticHighlights = ({ highlights }) => {
    if (!highlights || (!highlights.heroFoods && !highlights.foodsToWatch)) {
        return (
            <div className="card-custom">
                <h5 className="card-custom-title">Genetic Highlights</h5>
                <p className="card-custom-text">Your personalized food insights will appear here after analysis.</p>
            </div>
        );
    }

    return (
        <div className="card-custom genetic-highlights">
            <h5 className="card-custom-title">Genetic Highlights</h5>
            <div className="highlights-content">
                {highlights.heroFoods?.length > 0 && (
                    <div className="highlight-section hero-foods">
                        <h6><ThumbsUp size={20} /> Hero Foods</h6>
                        <p>Based on your DNA, these foods may be particularly beneficial for you.</p>
                        <ul>
                            {highlights.heroFoods.map((item, index) => (
                                <li key={index}><strong>{item.name}:</strong> {item.reason}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {highlights.foodsToWatch?.length > 0 && (
                    <div className="highlight-section foods-to-watch">
                        <h6><AlertTriangle size={20} /> Foods to Watch</h6>
                        <p>Your genetics suggest you may want to be mindful of your intake of these items.</p>
                        <ul>
                            {highlights.foodsToWatch.map((item, index) => (
                                <li key={index}><strong>{item.name}:</strong> {item.reason}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GeneticHighlights; 