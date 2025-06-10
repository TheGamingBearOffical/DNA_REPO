import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'react-feather';
import UndoRedo from './UndoRedo';
import './MealPlan.css';

const MealPlan = ({ items, onRemoveItem, undo, redo, canUndo, canRedo }) => {
  const totalCalories = items.reduce((total, item) => total + (item.calories || 0), 0);

  return (
    <div className="card-custom mb-4">
      <h5 className="card-custom-title">Calorie Counter</h5>
      {items.length > 0 ? (
        <div className="meal-plan-content">
          <ul className="meal-list">
            <AnimatePresence>
              {items.map((item) => (
                <motion.li 
                  key={item.id} 
                  className="meal-item"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                >
                  <div className="meal-item-info">
                    {item.image && <img src={item.image} alt={item.name} className="meal-item-image" />}
                    <span>{item.name}</span>
                  </div>
                  <div className="meal-item-details">
                    <span className="meal-item-calories">{item.calories} calories</span>
                    {onRemoveItem && (
                      <button onClick={() => onRemoveItem(item.id)} className="btn-remove-item">
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <UndoRedo undo={undo} redo={redo} canUndo={canUndo} canRedo={canRedo} />
          <hr className="meal-plan-divider" />
          <div className="total-calories">
            <span>Total:</span>
            <span>{totalCalories} calories</span>
          </div>
        </div>
      ) : (
        <p className="card-custom-text">No items added to the meal plan yet.</p>
      )}
    </div>
  );
};

export default MealPlan; 