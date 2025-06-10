import React, { useState } from 'react';
import Upload from './Upload';
import FoodInfo from './FoodInfo';
import TraitResult from './TraitResult';
import { getGeneticHighlights, getRecipeOfTheDay } from '../api/recommendations';
import AiRecommendations from './AiRecommendations';
import MealPlan from './MealPlan';
import NutritionDashboard from './NutritionDashboard';
import GeneticHighlights from './GeneticHighlights';
import RecipeOfTheDay from './RecipeOfTheDay';

const Home = ({ onAddItem, mealItems, onRemoveItem, undo, redo, canUndo, canRedo }) => {
    const [analysisResult, setAnalysisResult] = useState({});
    const [highlights, setHighlights] = useState(null);
    const [recipe, setRecipe] = useState('');
    const [isRecipeLoading, setIsRecipeLoading] = useState(false);

    const handleAnalysis = async (results) => {
        setAnalysisResult(results);
        if (results && Object.keys(results).length > 0) {
            setHighlights(await getGeneticHighlights(results));
            setIsRecipeLoading(true);
            setRecipe(await getRecipeOfTheDay(results));
            setIsRecipeLoading(false);
        } else {
            setHighlights(null);
            setRecipe('');
        }
    };

    return (
        <>
            <div className="row g-4 mb-4">
                <div className="col-lg-6">
                    <Upload onAnalysisComplete={handleAnalysis} />
                </div>
                <div className="col-lg-6">
                    <FoodInfo onAddItem={onAddItem} />
                </div>
            </div>
            <div className="row g-4 mb-4">
                <div className="col-lg-6">
                    <MealPlan items={mealItems} onRemoveItem={onRemoveItem} undo={undo} redo={redo} canUndo={canUndo} canRedo={canRedo} />
                </div>
                <div className="col-lg-6">
                    <NutritionDashboard analysisResult={analysisResult} mealItems={mealItems} />
                </div>
            </div>

            <div className="row g-4">
                <div className="col-lg-4">
                    <TraitResult result={analysisResult} />
                </div>
                <div className="col-lg-4">
                    <GeneticHighlights highlights={highlights} />
                </div>
                <div className="col-lg-4">
                    <AiRecommendations mealItems={mealItems} analysisResult={analysisResult} />
                </div>
            </div>

            <div className="row g-4">
                <div className="col-12">
                    <RecipeOfTheDay recipe={recipe} isLoading={isRecipeLoading} />
                </div>
            </div>
        </>
    );
};

export default Home;