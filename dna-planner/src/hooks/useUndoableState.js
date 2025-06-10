import { useState, useCallback } from 'react';

export const useUndoableState = (initialState) => {
    const [history, setHistory] = useState([initialState]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const state = history[currentIndex];

    const setState = useCallback((value) => {
        const newState = typeof value === 'function' ? value(state) : value;
        const newHistory = history.slice(0, currentIndex + 1);
        newHistory.push(newState);
        
        setHistory(newHistory);
        setCurrentIndex(newHistory.length - 1);
    }, [currentIndex, history, state]);

    const canUndo = currentIndex > 0;
    const canRedo = currentIndex < history.length - 1;

    const undo = useCallback(() => {
        if (canUndo) {
            setCurrentIndex(currentIndex - 1);
        }
    }, [canUndo, currentIndex]);

    const redo = useCallback(() => {
        if (canRedo) {
            setCurrentIndex(currentIndex + 1);
        }
    }, [canRedo, currentIndex]);

    const reset = useCallback((newInitialState) => {
        setHistory([newInitialState]);
        setCurrentIndex(0);
    }, []);

    return {
        state,
        setState,
        canUndo,
        canRedo,
        undo,
        redo,
        reset,
    };
}; 