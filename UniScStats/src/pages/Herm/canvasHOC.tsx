// ThemeContext.tsx
import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

// Define the context type
type CanvasContextType = {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
};

// Provide proper typing for the default value
export const CanvasContext = createContext<CanvasContextType>({
  activeTab: 'light',
  setActiveTab: () => {} 
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('light');

  return (
    <CanvasContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </CanvasContext.Provider>
  );
};