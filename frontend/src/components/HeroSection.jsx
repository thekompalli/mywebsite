import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/mockData';

const AnimatedText = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

const HeroSection = () => {
  const heroWords = ["I", "CREATE", "INTELLIGENT", "SOLUTIONS"];

  return (
    <section id="hero" className="min-h-screen flex items-center justify-start bg-white pt-20">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Main Hero Text */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="hero-text text-7xl sm:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-black leading-none">
              {heroWords.map((word, index) => (
                <div key={word} className="overflow-hidden">
                  <AnimatedText delay={index * 0.2}>
                    <div className="flex items-center">
                      {word}
                      {index === heroWords.length - 1 && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1, duration: 0.5 }}
                          className="ml-8 w-20 h-20 bg-black rounded-full flex items-center justify-center"
                        >
                          <div className="w-10 h-10 bg-white rounded-full"></div>
                        </motion.div>
                      )}
                    </div>
                  </AnimatedText>
                </div>
              ))}
            </div>
          </div>

          {/* Side Content */}
          <div className="lg:col-span-4 xl:col-span-3 lg:pl-12">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-sm font-bold text-black tracking-[0.3em] mb-6 uppercase">
                  Hello
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed tracking-wide">
                  I am {personalInfo.name.toUpperCase()}, a {personalInfo.title.toUpperCase()} specializing in machine learning, AI, and data science solutions.
                </p>
              </div>

              <div className="text-sm text-gray-500 tracking-wide">
                <p>Based in {personalInfo.location}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;