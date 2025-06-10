import React from 'react';
import './NutritionDashboard.css';
import nutrientTargets from '../NutritionInfoFactsCool.json';
import { motion } from 'framer-motion';

const ProgressBar = ({ label, value, max, unit }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    return (
        <div className="progress-bar-container">
            <div className="progress-bar-label">
                <span>{label}</span>
                <span>{Math.round(value)} / {max} {unit}</span>
            </div>
            <div className="progress-bar-track">
                <motion.div 
                    className="progress-bar-fill" 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage > 100 ? 100 : percentage}%` }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
};

const NutritionDashboard = ({ analysisResult, mealItems }) => {
    if (!analysisResult || Object.keys(analysisResult).length === 0) {
        return null;
    }

    const getTarget = (nutrientName) => {
        const nutrient = nutrientTargets.nutrients[nutrientName.toLowerCase().replace(' ', '_')];
        if (!nutrient) return 0;
        
        let target = nutrient.value; // Default value if no genotypes match
        const trait = analysisResult[nutrientName]?.[0];

        if (trait) {
            const userGeno = trait.genotype;
            for (const geno in nutrient) {
                if (geno.toUpperCase() === userGeno.toUpperCase()) {
                    target = nutrient[geno];
                    break;
                }
            }
        }
        return target || 0;
    };
    
    const targets = {
        calories: getTarget('Calories'),
        protein: getTarget('Protein'),
        carbs: getTarget('Carbohydrates'),
        fat: getTarget('Total Fat')
    };

    const totals = mealItems.reduce((acc, item) => {
        acc.calories += item.calories || 0;
        acc.protein += item.protein || 0;
        acc.carbs += item.carbs || 0;
        acc.fat += item.fat || 0;
        return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

    return (
        <div className="card-custom mb-4">
            <h5 className="card-custom-title">Daily Nutrition Dashboard</h5>
            <div className="nutrition-grid">
                <ProgressBar label="Calories" value={totals.calories} max={targets.calories} unit="kcal" />
                <ProgressBar label="Protein" value={totals.protein} max={targets.protein} unit="g" />
                <ProgressBar label="Carbs" value={totals.carbs} max={targets.carbs} unit="g" />
                <ProgressBar label="Fat" value={totals.fat} max={targets.fat} unit="g" />
            </div>
        </div>
    );
};

export default NutritionDashboard; 