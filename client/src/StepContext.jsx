import React, { createContext, useContext, useState } from 'react';

const StepContext = createContext();

export const useStepContext = () => useContext(StepContext);

export const StepProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <StepContext.Provider value={{ currentStep, totalSteps, handleNextStep }}>
      {children}
    </StepContext.Provider>
  );
};