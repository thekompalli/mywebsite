import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type = 'success', isVisible, onHide }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 4000); // Hide after 4 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className={`
            px-6 py-4 rounded-lg shadow-lg backdrop-blur-sm border
            ${type === 'success' 
              ? 'bg-white/95 dark:bg-gray-800/95 border-black dark:border-white text-black dark:text-white' 
              : 'bg-red-50/95 dark:bg-red-900/95 border-red-500 text-red-700 dark:text-red-200'
            }
            max-w-sm min-w-[300px]
          `}>
            <div className="flex items-center space-x-3">
              <div className={`
                w-2 h-2 rounded-full flex-shrink-0
                ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
              `}></div>
              <p className="text-sm font-medium tracking-wide leading-relaxed">
                {message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;