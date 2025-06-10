import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, RotateCw } from 'react-feather';

const UndoRedo = ({ undo, redo, canUndo, canRedo }) => {
    return (
        <div className="undo-redo-container">
            <motion.button 
                onClick={undo} 
                disabled={!canUndo}
                whileTap={{ scale: 0.95 }}
                className="btn-undo-redo"
                aria-label="Undo"
            >
                <RotateCcw size={18} />
                <span>Undo</span>
            </motion.button>
            <motion.button 
                onClick={redo} 
                disabled={!canRedo}
                whileTap={{ scale: 0.95 }}
                className="btn-undo-redo"
                aria-label="Redo"
            >
                <RotateCw size={18} />
                <span>Redo</span>
            </motion.button>
        </div>
    );
};

export default UndoRedo; 