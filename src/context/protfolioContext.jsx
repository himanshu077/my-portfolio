import React, { createContext, useState, useEffect } from 'react';
import Data from "../Data/index.json"

const PortfolioContext = createContext();

const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState({});

  useEffect(() => {
    setPortfolioData(Data);
  }, []);

  return (
    <PortfolioContext.Provider value={portfolioData}>
      {children}
    </PortfolioContext.Provider>
  );
};

export { PortfolioContext, PortfolioProvider };
