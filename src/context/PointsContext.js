"use client"; 
import { createContext, useContext, useState } from 'react';

// Create context
const PointsContext = createContext();

// Provider component
export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  return (
    <PointsContext.Provider value={{ points, setPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

// Hook to use the context
export const usePoints = () => {
  const context = useContext(PointsContext);
  return context;
};
