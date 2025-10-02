import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clientSegments } from '../data/mockData';

const SemanticSearch = ({ onSegmentSelect, onProductSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const [voiceError, setVoiceError] = useState('');
  const searchInputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize voice search
  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsVoiceSupported(true);

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError('');
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
        searchInputRef.current?.focus();
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        setVoiceError(event.error === 'not-allowed' ? 'Microphone permission denied' : 'Voice recognition failed');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Voice search handlers
  const startVoiceSearch = () => {
    if (!recognitionRef.current || isListening) return;

    try {
      recognitionRef.current.start();
    } catch (error) {
      setVoiceError('Voice search failed to start');
    }
  };

  const stopVoiceSearch = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  // Create searchable data from all products
  const createSearchableData = () => {
    const searchableItems = [];

    clientSegments.forEach((segment) => {
      // Add segment itself as searchable
      searchableItems.push({
        id: `segment-${segment.id}`,
        type: 'segment',
        title: segment.title,
        description: segment.description,
        segment: segment.title,
        searchableText: `${segment.title} ${segment.description}`.toLowerCase(),
        data: segment
      });

      // Add products if they exist
      if (segment.products) {
        segment.products.forEach((product) => {
          searchableItems.push({
            id: `product-${segment.id}-${product.id}`,
            type: 'product',
            title: product.title,
            description: product.summary || '',
            segment: segment.title,
            searchableText: `${product.title} ${product.summary || ''} ${segment.title}`.toLowerCase(),
            data: { ...product, segmentTitle: segment.title, segmentId: segment.id }
          });
        });
      }
    });

    return searchableItems;
  };

  // Simple semantic search simulation (in production, you'd use a proper embedding model)
  const performSemanticSearch = (query) => {
    if (!query.trim()) return [];

    const searchableData = createSearchableData();
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(' ').filter(word => word.length > 2);

    // Calculate relevance scores
    const results = searchableData.map(item => {
      let score = 0;

      // Exact title match gets highest score
      if (item.title.toLowerCase().includes(queryLower)) {
        score += 100;
      }

      // Word matches in title
      queryWords.forEach(word => {
        if (item.title.toLowerCase().includes(word)) {
          score += 50;
        }
        if (item.description.toLowerCase().includes(word)) {
          score += 30;
        }
        if (item.segment.toLowerCase().includes(word)) {
          score += 20;
        }
      });

      // Semantic keywords scoring
      const semanticKeywords = {
        'ai': ['artificial intelligence', 'machine learning', 'neural', 'model', 'llm', 'gpt'],
        'fintech': ['banking', 'financial', 'payment', 'risk', 'fraud', 'compliance', 'lending'],
        'healthcare': ['medical', 'clinical', 'biomedical', 'patient', 'hospital', 'care'],
        'education': ['learning', 'student', 'assessment', 'tutor', 'analytics', 'study'],
        'analytics': ['data', 'metrics', 'reporting', 'insights', 'performance'],
        'automation': ['workflow', 'process', 'engine', 'orchestration'],
        'search': ['retrieval', 'knowledge', 'semantic', 'vector', 'embedding'],
        'real-time': ['streaming', 'live', 'instant', 'dynamic'],
        'security': ['encryption', 'auth', 'compliance', 'gdpr', 'oauth']
      };

      Object.entries(semanticKeywords).forEach(([keyword, synonyms]) => {
        if (queryLower.includes(keyword)) {
          synonyms.forEach(synonym => {
            if (item.searchableText.includes(synonym)) {
              score += 25;
            }
          });
        }
      });

      return { ...item, score };
    }).filter(item => item.score > 0);

    // Sort by relevance score
    return results.sort((a, b) => b.score - a.score).slice(0, 8);
  };

  // Handle search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);

    // Simulate search delay for better UX
    const searchTimeout = setTimeout(() => {
      const results = performSemanticSearch(searchQuery);
      setSearchResults(results);
      setShowResults(true);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  const handleSearchFocus = () => {
    setIsExpanded(true);
    if (searchQuery.trim()) {
      setShowResults(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding to allow clicking on results
    setTimeout(() => {
      setIsExpanded(false);
      setShowResults(false);
    }, 200);
  };

  const highlightText = (text, query) => {
    if (!query.trim()) return text;

    const words = query.toLowerCase().split(' ').filter(word => word.length > 2);
    let highlightedText = text;

    words.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>');
    });

    return highlightedText;
  };

  const getResultIcon = (type) => {
    return type === 'product' ? '🔧' : '🏢';
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className={`relative transition-all duration-300 ${isExpanded ? 'scale-105' : 'scale-100'}`}>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            placeholder={isListening ? "Listening..." : "Search AI capabilities, industries, or specific solutions..."}
            className="w-full pl-12 pr-20 py-4 text-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-2xl shadow-lg focus:border-black dark:focus:border-white focus:ring-0 focus:outline-none transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400"
            disabled={isListening}
          />

          {/* Right side buttons */}
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-2">
            {/* Voice Search Button */}
            {isVoiceSupported && (
              <button
                onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                    : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-110'
                }`}
                title={isListening ? "Stop voice search" : "Start voice search"}
              >
                {isListening ? (
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h12v12H6z"/>
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                  </svg>
                )}
              </button>
            )}

            {/* Loading Indicator */}
            {isSearching && (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-black dark:border-t-white"></div>
            )}
          </div>
        </div>

        {/* Voice Error Message */}
        {voiceError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-red-700 dark:text-red-300">{voiceError}</span>
              <button
                onClick={() => setVoiceError('')}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}

        {/* Voice Listening Indicator */}
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-center"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-blue-500 rounded-full animate-pulse"
                    style={{
                      height: '20px',
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: '0.8s'
                    }}
                  />
                ))}
              </div>
              <span className="text-blue-700 dark:text-blue-300 font-medium">
                Listening for voice input...
              </span>
              <button
                onClick={stopVoiceSearch}
                className="text-blue-500 hover:text-blue-700 underline text-sm"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Search Suggestions */}
        {!isExpanded && !searchQuery && !isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-4 flex flex-wrap gap-2 justify-center"
          >
            {['AI Risk Scoring', 'Learning Analytics', 'Medical Imaging', 'Workflow Automation', 'Fraud Detection'].map((suggestion, index) => (
              <button
                key={suggestion}
                onClick={() => {
                  setSearchQuery(suggestion);
                  searchInputRef.current?.focus();
                }}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}

        {/* Voice Search Instructions */}
        {isVoiceSupported && !isExpanded && !searchQuery && !isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="mt-2 text-center"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">
              💡 Tip: Click the microphone button or try saying "AI Risk Scoring" or "Healthcare solutions"
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Search Results */}
      <AnimatePresence>
        {showResults && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 mt-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  Search Results ({searchResults.length})
                </h3>
                <button
                  onClick={() => setShowResults(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-black dark:hover:border-white transition-all duration-200 cursor-pointer group hover:shadow-md active:scale-95"
                    onClick={() => {
                      setShowResults(false);
                      setSearchQuery('');

                      if (result.type === 'segment') {
                        // Navigate to segment view
                        onSegmentSelect && onSegmentSelect(result.data);
                      } else if (result.type === 'product') {
                        // Navigate to product view
                        onProductSelect && onProductSelect(result.data.segmentId, result.data.id);
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{getResultIcon(result.type)}</span>
                      <div className="flex-1 min-w-0">
                        <h4
                          className="font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
                          dangerouslySetInnerHTML={{ __html: highlightText(result.title, searchQuery) }}
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {result.segment} • {result.type}
                        </p>
                        {result.description && (
                          <p
                            className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: highlightText(result.description, searchQuery) }}
                          />
                        )}
                      </div>
                      <div className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {Math.round(result.score)}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {showResults && searchResults.length === 0 && !isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 mt-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-2xl shadow-2xl z-50 p-8 text-center"
          >
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">No results found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try searching for AI capabilities, industries, or specific solution types
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SemanticSearch;