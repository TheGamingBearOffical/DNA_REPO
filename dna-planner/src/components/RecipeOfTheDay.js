import React from 'react';
import ReactMarkdown from 'react-markdown';
import Spinner from 'react-bootstrap/Spinner';
import './RecipeOfTheDay.css';

const RecipeOfTheDay = ({ recipe, isLoading }) => {

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="loading-container">
                    <Spinner animation="border" variant="primary" />
                    <p className="loading-text">Generating your recipe of the day...</p>
                </div>
            );
        }

        if (recipe) {
            return <ReactMarkdown>{recipe}</ReactMarkdown>;
        }

        return (
            <p className="card-custom-text">
                Your personalized Recipe of the Day will appear here once you analyze your DNA.
            </p>
        );
    };

    return (
        <div className="card-custom recipe-of-the-day">
            <h5 className="card-custom-title">🌟 Your Recipe of the Day</h5>
            <div className="recipe-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default RecipeOfTheDay; 