import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/mockData';
import TranslatedText from './TranslatedText';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { useTheme } from '../contexts/ThemeContext';
import * as THREE from 'three';
import Fuse from 'fuse.js';
import { buildSearchIndex } from '../data/searchIndex';

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



const DataWormhole = () => {
  const containerRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create data elements
    const dataElements = [];
    const dataValues = [
      '0.98', '1.5M', '99.7%', '2.3K', '0.85', '42', '1.2B', '95%', '3.14', '500K',
      '0.001', '88%', '7.5M', '0.92', '1024', '64', '99.9%', '2.5K', '0.78', '10M',
      '128', '92%', '5.6K', '0.99', '256', '1.8M', '97%', '4.2K', '0.87', '512',
      'µ', 'σ', 'Σ', 'π', '∆', '∫', 'α', 'β', 'γ', 'λ', 'θ', 'ω',
      '[]', '{}', '||', '->', '<=', '>=', '!=', '==',
      '0xF4A2', '0x3B9C', '0x7E1D', '0xA5B3',
      'y=mx+b', 'E=mc²', 'a²+b²=c²', 'f(x)', 'df/dx', '∂/∂x',
      '∑x²', '√n', 'log(n)', 'e^x', 'sin(θ)', 'cos(φ)',
      'P(A|B)', 'μ±σ', 'R²=0.95', 'p<0.05', 'χ²', 'F(x)',
      'n!', 'lim→∞', '∇f', '∫∫', '∂²/∂t²', 'dx/dt',
      // Data Science formulas
      'MSE', 'RMSE', 'MAE', 'RSS', 'TSS', 'AUC-ROC',
      'precision', 'recall', 'F1-score', 'accuracy',
      'y=β₀+β₁x', 'ŷ=wx+b', 'J(θ)', '∇J(θ)',
      'softmax', 'sigmoid', 'ReLU', 'tanh',
      'argmax', 'argmin', 'cross-entropy',
      // Libraries
      'TensorFlow', 'PyTorch', 'Keras', 'scikit-learn',
      'pandas', 'NumPy', 'Matplotlib', 'seaborn',
      'XGBoost', 'LightGBM', 'CatBoost',
      'BERT', 'GPT', 'LSTM', 'GRU', 'CNN', 'RNN',
      'k-means', 'PCA', 'SVM', 't-SNE', 'KNN',
      'Ridge', 'Lasso', 'ElasticNet', 'GBM',
      'Transformers', 'YOLO', 'ResNet', 'VGG'
    ];

    // Create different types of elements
    for (let i = 0; i < 120; i++) {
      const type = Math.random();

      if (type < 0.7) {
        // Text sprites (more text elements)
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 128;

        const value = dataValues[Math.floor(Math.random() * dataValues.length)];
        context.font = 'Bold 48px monospace';
        context.fillStyle = theme === 'dark' ? 'white' : 'black';
        context.textAlign = 'center';
        context.fillText(value, 128, 80);

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 0.6
        });
        const sprite = new THREE.Sprite(material);

        sprite.position.set(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          -Math.random() * 50 - 10
        );
        sprite.scale.set(2, 1, 1);

        scene.add(sprite);
        dataElements.push({ object: sprite, speed: Math.random() * 0.05 + 0.02, type: 'text' });

      } else {
        // Small dots (scatter plot style)
        const geometry = new THREE.SphereGeometry(0.05, 8, 8);
        const material = new THREE.MeshBasicMaterial({
          color: theme === 'dark' ? 0xffffff : 0x000000,
          transparent: true,
          opacity: 0.5
        });
        const dot = new THREE.Mesh(geometry, material);

        dot.position.set(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          -Math.random() * 50 - 10
        );

        scene.add(dot);
        dataElements.push({ object: dot, speed: Math.random() * 0.08 + 0.03, type: 'dot' });
      }
    }

    // Mouse interaction for parallax
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Move camera slightly based on mouse
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Move elements towards camera (wormhole effect)
      dataElements.forEach((element) => {
        element.object.position.z += element.speed;

        // Reset position when element passes camera
        if (element.object.position.z > 5) {
          element.object.position.z = -50 - Math.random() * 20;
          element.object.position.x = (Math.random() - 0.5) * 20;
          element.object.position.y = (Math.random() - 0.5) * 20;
        }

        // Add slight rotation for visual interest
        if (element.type === 'text') {
          element.object.material.rotation += 0.001;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

const SmartSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Build comprehensive search index from all data sources
  const searchableContent = useMemo(() => buildSearchIndex(), []);

  // Initialize Fuse.js for state-of-the-art fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(searchableContent, {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'keywords', weight: 2 },
        { name: 'description', weight: 1 },
        { name: 'type', weight: 0.5 }
      ],
      threshold: 0.4, // 0 = exact match, 1 = match anything
      distance: 100, // Maximum distance for match
      includeScore: true,
      minMatchCharLength: 2,
      ignoreLocation: true, // Ignore where in the string the match occurs
      findAllMatches: true,
      useExtendedSearch: true // Enables advanced search patterns
    });
  }, [searchableContent]);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    // Use Fuse.js for intelligent multilingual fuzzy search
    const fuseResults = fuse.search(query);

    // Transform Fuse results to our format
    const results = fuseResults
      .map(result => ({
        ...result.item,
        score: (1 - result.score) * 1000 // Convert Fuse score (lower is better) to our score (higher is better)
      }))
      .slice(0, 5);

    setSearchResults(results);
    setShowResults(results.length > 0);
  };

  const handleResultClick = (result) => {
    if (result.action === 'download-resume') {
      // Download resume
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Krishna_Kompalli_Resume.pdf';
      link.click();
    } else if (result.section) {
      // Scroll to section
      const element = document.getElementById(result.section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    setShowResults(false);
    setSearchQuery('');
  };

  return (
    <div className="relative w-full z-50">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => searchResults.length > 0 && setShowResults(true)}
          placeholder="Search..."
          className="w-full px-4 py-2 text-sm bg-white dark:bg-gray-800 text-black dark:text-white border-2 border-black dark:border-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Search Results */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute w-full mt-1 bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-xl max-h-80 overflow-y-auto right-0"
        >
          {searchResults.map((result, index) => (
            <button
              key={index}
              onClick={() => handleResultClick(result)}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-700 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-black dark:text-white truncate">{result.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{result.description}</div>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    <span className="text-xs px-1.5 py-0.5 bg-gray-200 dark:bg-gray-600 rounded capitalize">{result.type}</span>
                    {result.industry && <span className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">{result.industry}</span>}
                    {result.company && <span className="text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">{result.company}</span>}
                    {result.category && <span className="text-xs px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded">{result.category}</span>}
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

const TommyPet = () => {
  const [petState, setPetState] = useState('walking'); // walking, standing, sitting, sleeping
  const [showBark, setShowBark] = useState(false);
  const [position, setPosition] = useState(-100); // Start off-screen left

  useEffect(() => {
    // Walk animation: move from left to kennel
    const walkTimer = setTimeout(() => {
      setPosition(0); // Move to final position
    }, 100);

    // After walking (1.5s), stand and bark
    const standTimer = setTimeout(() => {
      setPetState('standing');
      setShowBark(true);
    }, 1600);

    // After barking for 5 seconds, sit
    const sitTimer = setTimeout(() => {
      setShowBark(false);
      setPetState('sitting');
    }, 6600);

    return () => {
      clearTimeout(walkTimer);
      clearTimeout(standTimer);
      clearTimeout(sitTimer);
    };
  }, []);

  useEffect(() => {
    if (petState === 'sitting') {
      // After 5 seconds of sitting, sleep
      const sleepTimer = setTimeout(() => {
        setPetState('sleeping');
      }, 5000);

      return () => clearTimeout(sleepTimer);
    }
  }, [petState]);

  const handleClick = () => {
    if (petState === 'sleeping') {
      // Wake up Tommy
      setPetState('standing');
      setShowBark(true);
      setTimeout(() => {
        setShowBark(false);
        setPetState('sitting');
      }, 3000);
    }
  };

  const getPetImage = () => {
    switch(petState) {
      case 'walking':
        return '/pet/run.png';
      case 'standing':
        return '/pet/stand.png';
      case 'sitting':
        return '/pet/sit.png';
      case 'sleeping':
        return '/pet/sleep.png';
      case 'fetching':
        return '/pet/fetch.png';
      default:
        return '/pet/sit.png';
    }
  };

  return (
    <div className="relative flex items-end justify-center gap-4 mt-4">
      {/* Kennel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/pet/kennel.png"
          alt="kennel"
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'contain'
          }}
        />
      </motion.div>

      {/* Tommy */}
      <motion.div
        className="relative cursor-pointer"
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: position }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <img
          src={getPetImage()}
          alt="Tommy the pet"
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'contain'
          }}
        />

        {/* Bark bubble */}
        {showBark && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 border-2 border-black dark:border-white rounded-lg px-3 py-2 max-w-xs"
          >
            <div className="bark-text text-sm font-bold text-black dark:text-white">
              Boww Woow! 🐕
            </div>
            {/* Speech bubble arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
              <div className="border-8 border-transparent border-t-black dark:border-t-white"></div>
              <div className="border-8 border-transparent border-t-white dark:border-t-gray-800 absolute top-0 left-1/2 transform -translate-x-1/2 -mt-0.5"></div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};


const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-start pt-16 sm:pt-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Data Wormhole Background */}
      <DataWormhole />

      <div className="w-full relative z-10 flex flex-col lg:flex-row" style={{ pointerEvents: 'none' }}>
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
        <div className="mt-8 lg:mt-0 px-4 sm:px-6 lg:px-8 lg:w-80 xl:w-96" style={{ pointerEvents: 'auto' }}>
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

            {/* Currently Working On */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              className="border-2 border-black dark:border-white bg-white dark:bg-black p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 animate-pulse"></div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium mb-2">
                    Currently Building
                  </div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-2">
                    UniVox
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    AI-powered meeting intelligence platform that automatically transcribes, summarizes, and extracts actionable insights from conversations (including Indian native languages).
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[10px] bg-black dark:bg-white text-white dark:text-black px-2 py-1 font-bold uppercase tracking-wide">
                      In Progress
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      ETA - Q4 2025
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tommy Pet with Kennel */}
            <TommyPet />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
export { TommyPet, SmartSearchBar };
