import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language] = useState('en');
  const [isTransitioning] = useState(false);

  return (
    <LanguageContext.Provider value={{
      language,
      isTransitioning,
      isEnglish: true,
      isFrench: false
    }}>
      {children}
    </LanguageContext.Provider>
  );
};