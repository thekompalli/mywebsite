import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/mockData';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="premium-spacing bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-black leading-tight mb-12 section-heading">
              I SPECIALIZE IN TURNING COMPLEXITY INTO INTELLIGENT SOLUTIONS
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              {personalInfo.aboutMe}
            </p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center space-x-6 pt-8"
            >
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <div>
                <p className="text-sm font-bold text-black tracking-[0.3em] uppercase">
                  Part
                </p>
                <p className="text-sm font-bold text-black tracking-[0.3em] uppercase">
                  ners
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;