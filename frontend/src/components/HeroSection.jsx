import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/mockData';
import TranslatedText from './TranslatedText';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const ViewCounter = () => {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    // Get current view count from localStorage
    const currentViews = localStorage.getItem('portfolioViews');
    let views = currentViews ? parseInt(currentViews) : 0;
    
    // Check if this is a new session (to avoid counting multiple views from same session)
    const lastVisit = localStorage.getItem('portfolioLastVisit');
    const now = Date.now();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    
    if (!lastVisit || (now - parseInt(lastVisit)) > oneHour) {
      views += 1;
      localStorage.setItem('portfolioViews', views.toString());
      localStorage.setItem('portfolioLastVisit', now.toString());
    }
    
    setViewCount(views);
  }, []);

  // Format number with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <span className="text-white dark:text-black font-bold">{formatNumber(viewCount)}</span>
  );
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('Paris');

  useEffect(() => {
    const getWeatherByCoords = async (lat, lon) => {
      try {
        // Using wttr.in API - free weather service, no API key required
        const response = await fetch(
          `https://wttr.in/${lat},${lon}?format=j1`,
          { 
            method: 'GET',
            headers: {
              'User-Agent': 'curl/7.64.1' // Required for wttr.in
            }
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          const current = data.current_condition[0];
          const location = data.nearest_area[0];
          
          const weatherCondition = current.weatherDesc[0].value;
          const icons = {
            'Sunny': '☀️',
            'Clear': '☀️',
            'Partly cloudy': '⛅',
            'Cloudy': '☁️',
            'Overcast': '☁️',
            'Mist': '🌫️',
            'Patchy rain possible': '🌦️',
            'Patchy snow possible': '🌨️',
            'Light rain': '🌧️',
            'Moderate rain': '🌧️',
            'Heavy rain': '🌧️',
            'Light snow': '❄️',
            'Moderate snow': '❄️',
            'Heavy snow': '❄️',
            'Thundery outbreaks possible': '⛈️'
          };

          const temp = parseInt(current.temp_C);
          const cityName = location.areaName[0].value;

          setWeather({
            temp: temp,
            condition: weatherCondition,
            icon: icons[weatherCondition] || '🌤️'
          });
          setLocation(cityName);
        } else {
          throw new Error('Weather API failed');
        }
      } catch (error) {
        console.warn('Weather API failed, using fallback data:', error);
        // Fallback to simulated data
        getFallbackWeather();
      }
      setLoading(false);
    };

    const getFallbackWeather = () => {
      const conditions = ['Clear', 'Clouds', 'Rain'];
      const temps = [15, 18, 22];
      const icons = {
        'Clear': '☀️',
        'Clouds': '☁️', 
        'Rain': '🌧️'
      };
      
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      const randomTemp = temps[Math.floor(Math.random() * temps.length)];
      
      setWeather({
        temp: randomTemp,
        condition: randomCondition,
        icon: icons[randomCondition]
      });
    };

    const getLocationAndWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            getWeatherByCoords(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.warn('Geolocation failed:', error.message);
            // Fallback to Paris coordinates
            getWeatherByCoords(48.8566, 2.3522);
          },
          { timeout: 5000, enableHighAccuracy: false }
        );
      } else {
        console.warn('Geolocation not supported');
        // Fallback to Paris coordinates
        getWeatherByCoords(48.8566, 2.3522);
      }
    };

    getLocationAndWeather();
  }, []);

  if (loading) return null;

  return (
    <div className="text-sm font-bold text-black dark:text-white">
      {weather.temp}°C {weather.condition}
    </div>
  );
};

const AnimatedWord = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className="overflow-hidden inline-block"
    >
      {children}
    </motion.div>
  );
};

const CipherWord = ({ delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [cipherComplete, setCipherComplete] = useState(false);
  const { language } = useLanguage();

  const cipherChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  // Get the correct translated text
  const originalText = translations[language]?.hero?.complicated || 'COMPLICATED';

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const startAnimation = useCallback((delayMs) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setDisplayText(originalText);
    setCipherComplete(false);

    timeoutRef.current = setTimeout(() => {
      let iterations = 0;

      intervalRef.current = setInterval(() => {
        setDisplayText(() =>
          originalText.split('').map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterations) {
              return originalText[index];
            }
            return cipherChars[Math.floor(Math.random() * cipherChars.length)];
          }).join('')
        );

        if (iterations >= originalText.length) {
          clearInterval(intervalRef.current);
          setDisplayText(originalText);
          setCipherComplete(true);
          return;
        }

        iterations += 1 / 3;
      }, 50);
    }, delayMs);
  }, [originalText, cipherChars]);

  useEffect(() => {
    startAnimation((delay + 0.4) * 1000); // Start after word animation delay

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAnimation, delay]);

  useEffect(() => {
    setDisplayText(originalText);
  }, [originalText]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className="overflow-hidden inline-block"
    >
      <span
        className={`${!cipherComplete ? 'font-mono' : ''} cursor-pointer`}
        onMouseEnter={() => startAnimation(0)}
        onFocus={() => startAnimation(0)}
        tabIndex={0}
      >
        {displayText}
      </span>
    </motion.div>
  );
};

const HelpWord = ({ delay = 0 }) => {
  const [autoActive, setAutoActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const autoTimerRef = useRef(null);
  const autoRevertRef = useRef(null);

  useEffect(() => {
    // Start the help -> save transition after the word animation and cipher effect
    autoTimerRef.current = setTimeout(() => {
      setAutoActive(true);

      autoRevertRef.current = setTimeout(() => {
        setAutoActive(false);
      }, 2000);
    }, (delay + 1.5) * 1000); // Start after word animation + cipher effect

    return () => {
      if (autoTimerRef.current) {
        clearTimeout(autoTimerRef.current);
      }
      if (autoRevertRef.current) {
        clearTimeout(autoRevertRef.current);
      }
    };
  }, [delay]);

  const showSave = autoActive || isHovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className="overflow-hidden inline-block"
    >
      <TranslatedText path="hero.to" enableCipher={true} />{' '}
      <span
        className="transition-all duration-300 text-gray-900 dark:text-gray-100 cursor-pointer inline-block"
        style={{ 
          color: showSave ? '#10B981' : undefined,
          transform: showSave ? 'scale(1.05)' : 'scale(1)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        tabIndex={0}
      >
        <TranslatedText path={showSave ? "hero.save" : "hero.help"} enableCipher={true} />
      </span>.
    </motion.div>
  );
};


const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-start pt-16 sm:pt-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="w-full relative z-10 flex flex-col lg:flex-row">
        {/* Main Hero Text - Mobile Optimized */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8">
          <div className="hero-text text-left text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight sm:leading-none tracking-tight text-gray-900 dark:text-gray-100">
              {/* Line 1: DATA */}
              <div className="mb-2">
                <AnimatedWord delay={0}>
                  <TranslatedText path="hero.data" enableCipher={true} />
                </AnimatedWord>
              </div>
              
              {/* Line 2: IS */}
              <div className="mb-2">
                <AnimatedWord delay={0.2}>
                  <TranslatedText path="hero.is" enableCipher={true} />
                </AnimatedWord>
              </div>
              
              {/* Line 3: COMPLICATED */}
              <div className="mb-2">
                <CipherWord delay={0.4} />
              </div>
              
              {/* Line 4: BUT */}
              <div className="mb-2">
                <AnimatedWord delay={0.6}>
                  <TranslatedText path="hero.but" enableCipher={true} />
                </AnimatedWord>
              </div>
              
              {/* Line 5: I'M HERE */}
              <div className="mb-2">
                <AnimatedWord delay={0.8}>
                  <TranslatedText path="hero.imHere" enableCipher={true} />
                </AnimatedWord>
              </div>
              
              {/* Line 6: TO HELP */}
              <div className="mb-2">
                <HelpWord delay={1.0} />
              </div>
            </div>
        </div>

        {/* Smart Side Panel */}
        <div className="mt-8 lg:mt-0 px-4 sm:px-6 lg:px-8 lg:w-80 xl:w-96">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="space-y-6"
          >
            {/* Main Profile Card */}
            <div className="border-2 border-black dark:border-white bg-white dark:bg-black">
              <div className="p-6 space-y-4">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7, duration: 0.6 }}
                  className="flex items-center justify-between"
                >
                  <h2 className="text-xl font-bold text-black dark:text-white tracking-tight uppercase">
                    <TranslatedText path="hero.hello" enableCipher={true} />
                  </h2>
                  <div className="w-3 h-3 bg-black dark:bg-white"></div>
                </motion.div>

                {/* Main Intro */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                  className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium"
                >
                  <TranslatedText path="hero.intro" enableCipher={true} />
                </motion.p>

                {/* Dynamic Data Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9, duration: 0.6 }}
                  className="grid grid-cols-2 gap-4 pt-4 border-t border-black dark:border-white"
                >
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">Location</div>
                    <div className="text-sm font-bold text-black dark:text-white">{personalInfo.location}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">Weather</div>
                    <WeatherWidget />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Live Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.6 }}
              className="flex items-center justify-between bg-black dark:bg-white text-white dark:text-black p-4 font-bold"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white dark:bg-black"></div>
                  <span className="text-sm uppercase tracking-wide">Online</span>
                </div>
                <div className="w-px h-4 bg-white dark:bg-black"></div>
                <div className="text-sm">
                  <ViewCounter /> views
                </div>
              </div>
              <div className="text-sm uppercase tracking-wide">
                Available
              </div>
            </motion.div>

            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.6 }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="text-center border border-black dark:border-white p-3">
                <div className="text-lg font-bold text-black dark:text-white">5+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Years</div>
              </div>
              <div className="text-center border border-black dark:border-white p-3">
                <div className="text-lg font-bold text-black dark:text-white">AI/ML</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Focus</div>
              </div>
              <div className="text-center border border-black dark:border-white p-3">
                <div className="text-lg font-bold text-black dark:text-white">∞</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Ideas</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
