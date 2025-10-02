import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const TranslatedText = ({ 
  path, 
  fallback = '', 
  className = '', 
  enableCipher = false,
  children 
}) => {
  const { language, isTransitioning } = useLanguage();
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  
  const cipherChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  
  // Get translated text from path
  const getTranslatedText = (lang) => {
    const keys = path.split('.');
    let result = translations[lang];
    
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        return fallback || children || path;
      }
    }
    
    return result || fallback || children || path;
  };
  
  const currentText = getTranslatedText(language);
  
  // Helper function to determine if text should use smaller font in French
  const shouldUseSmallerFontInFrench = () => {
    if (language === 'fr') {
      // Check if this is a large heading based on the path or text length differences
      const englishText = getTranslatedText('en');
      const frenchText = getTranslatedText('fr');
      
      // If French text is significantly longer than English, use smaller font
      if (frenchText.length > englishText.length * 1.3) {
        return true;
      }
      
      // Also check for specific large heading sections
      if (path.includes('work.workTitle') || path.includes('experience.title') || 
          path.includes('skills.title') || path.includes('skills.subtitle') || 
          path.includes('resume.title')) {
        return true;
      }
    }
    return false;
  };
  
  useEffect(() => {
    if (isTransitioning && enableCipher) {
      setIsAnimating(true);
      let iterations = 0;
      const targetText = getTranslatedText(language);
      
      const interval = setInterval(() => {
        setDisplayText(prev => {
          const newText = targetText.split('').map((char, index) => {
            if (index < iterations) {
              return targetText[index];
            }
            return cipherChars[Math.floor(Math.random() * cipherChars.length)];
          }).join('');
          
          return newText;
        });
        
        if (iterations >= targetText.length) {
          clearInterval(interval);
          setDisplayText(targetText);
          setIsAnimating(false);
        }
        iterations += 1/3;
      }, 30);
      
      return () => clearInterval(interval);
    } else {
      setDisplayText(currentText);
      setIsAnimating(false);
    }
  }, [language, isTransitioning, path, enableCipher]);
  
  // If children are provided, render them with translated content
  if (children) {
    const childResponsiveClassName = shouldUseSmallerFontInFrench() 
      ? `${children.props.className || ''} ${isAnimating ? 'font-mono' : ''} text-[0.8em]`
      : `${children.props.className || ''} ${isAnimating ? 'font-mono' : ''}`;
      
    return React.cloneElement(children, {
      children: displayText,
      className: childResponsiveClassName.trim()
    });
  }
  
  // Apply responsive font scaling for French text
  const responsiveClassName = shouldUseSmallerFontInFrench() 
    ? `${className} ${isAnimating ? 'font-mono' : ''} text-[0.8em]`
    : `${className} ${isAnimating ? 'font-mono' : ''}`;

  return (
    <span className={responsiveClassName.trim()}>
      {displayText}
    </span>
  );
};

export default TranslatedText;