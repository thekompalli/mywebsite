import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CulturalExchangeCorner = () => {
  const [pins, setPins] = useState([
    { id: 1, name: "Krishna", location: "Paris, France", lat: 48.8566, lng: 2.3522, fact: "Love working with AI and croissants! 🥐", country: "France", flag: "🇫🇷" },
    { id: 2, name: "Sarah", location: "New York, USA", lat: 40.7128, lng: -74.0060, fact: "Building the future of fintech 🏦", country: "United States", flag: "🇺🇸" },
    { id: 3, name: "Hiroshi", location: "Tokyo, Japan", lat: 35.6762, lng: 139.6503, fact: "Ramen and robotics enthusiast 🍜🤖", country: "Japan", flag: "🇯🇵" },
    { id: 4, name: "Maria", location: "São Paulo, Brazil", lat: -23.5505, lng: -46.6333, fact: "Dancing salsa while coding! 💃", country: "Brazil", flag: "🇧🇷" },
    { id: 5, name: "Ahmed", location: "Dubai, UAE", lat: 25.2048, lng: 55.2708, fact: "Building skyscrapers and startups 🏗️", country: "UAE", flag: "🇦🇪" }
  ]);
  const [showAddPin, setShowAddPin] = useState(false);
  const [newPin, setNewPin] = useState({ name: '', location: '', fact: '' });
  const [selectedPin, setSelectedPin] = useState(null);

  const handleAddPin = () => {
    if (newPin.name && newPin.location && newPin.fact) {
      // Simulate coordinates (in real implementation, you'd geocode the location)
      const randomLat = (Math.random() - 0.5) * 180;
      const randomLng = (Math.random() - 0.5) * 360;
      
      const pin = {
        id: pins.length + 1,
        name: newPin.name,
        location: newPin.location,
        fact: newPin.fact,
        lat: randomLat,
        lng: randomLng,
        country: newPin.location.split(',').pop().trim(),
        flag: "🌍" // Default flag
      };
      
      setPins([...pins, pin]);
      setNewPin({ name: '', location: '', fact: '' });
      setShowAddPin(false);
    }
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-black dark:text-white section-heading mb-6 uppercase tracking-tight">
            Cultural Exchange Corner
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto uppercase tracking-wide">
            Pin your location and share a fun fact - Let's build a global community!
          </p>
        </motion.div>

        {/* Browser Window Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Browser Frame with Website Theme */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden border-4 border-black dark:border-white">
            {/* Custom Header Bar */}
            <div className="bg-black dark:bg-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-white dark:text-black font-mono text-sm">
                cultural-exchange.krishna.com
              </div>
              <motion.button
                onClick={() => setShowAddPin(!showAddPin)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white dark:text-black hover:text-gray-300 dark:hover:text-gray-600 text-lg"
              >
                📍
              </motion.button>
            </div>

            {/* Map Content Area */}
            <div className="h-[600px] md:h-[700px] relative bg-gradient-to-br from-blue-100 to-green-100 dark:from-gray-700 dark:to-gray-800">
              
              {/* World Map Representation */}
              <div className="absolute inset-0 p-6">
                {/* Simulated World Map */}
                <div className="w-full h-full bg-gray-200 dark:bg-gray-600 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 1000 500" className="w-full h-full">
                      {/* Simplified world map paths */}
                      <path d="M100,100 L200,150 L300,100 L400,200 L200,250 Z" fill="currentColor" className="text-gray-500" />
                      <path d="M500,100 L700,120 L650,200 L550,180 Z" fill="currentColor" className="text-gray-500" />
                      <path d="M200,300 L350,280 L400,350 L250,370 Z" fill="currentColor" className="text-gray-500" />
                    </svg>
                  </div>

                  {/* Pin Markers */}
                  {pins.map((pin, index) => (
                    <motion.div
                      key={pin.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${((pin.lng + 180) / 360) * 100}%`,
                        top: `${((90 - pin.lat) / 180) * 100}%`,
                        transform: 'translate(-50%, -100%)'
                      }}
                      onClick={() => setSelectedPin(selectedPin === pin.id ? null : pin.id)}
                    >
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-lg"
                        >
                          <span className="text-white dark:text-black font-bold text-sm">
                            {pin.flag}
                          </span>
                        </motion.div>
                        
                        {/* Pin Info Popup */}
                        {selectedPin === pin.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 min-w-64 z-10"
                          >
                            <div className="text-center">
                              <h4 className="font-bold text-black dark:text-white mb-1">{pin.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{pin.location}</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300 italic">"{pin.fact}"</p>
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"></div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Add Pin Form Overlay */}
              {showAddPin && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-md w-full mx-4"
                  >
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-6 text-center uppercase tracking-wide">
                      Add Your Pin
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={newPin.name}
                        onChange={(e) => setNewPin({...newPin, name: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-black dark:border-white bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Your Location (City, Country)"
                        value={newPin.location}
                        onChange={(e) => setNewPin({...newPin, location: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-black dark:border-white bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                      />
                      <textarea
                        placeholder="Fun fact about you or your culture"
                        value={newPin.fact}
                        onChange={(e) => setNewPin({...newPin, fact: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-black dark:border-white bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none resize-none"
                        rows={3}
                      />
                    </div>
                    <div className="flex space-x-4 mt-6">
                      <motion.button
                        onClick={handleAddPin}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors uppercase tracking-wide"
                      >
                        Add Pin
                      </motion.button>
                      <motion.button
                        onClick={() => setShowAddPin(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors uppercase tracking-wide"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Stats & Action Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <h4 className="text-3xl font-bold text-black dark:text-white">{pins.length}</h4>
                <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wide">Global Visitors</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-bold text-black dark:text-white">{new Set(pins.map(p => p.country)).size}</h4>
                <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wide">Countries</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-bold text-black dark:text-white">∞</h4>
                <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wide">Stories Shared</p>
              </div>
            </div>
            
            <div className="text-center">
              <motion.button
                onClick={() => setShowAddPin(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors uppercase tracking-wide"
              >
                📍 Add Your Pin to the Map
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CulturalExchangeCorner;