import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/mockData';

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

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-start bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Main Hero Text */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="hero-text text-6xl sm:text-7xl lg:text-8xl xl:text-[8rem] font-bold text-gray-900 leading-none tracking-tight">
              {/* Line 1: I */}
              <div className="mb-2">
                <AnimatedWord delay={0}>
                  I
                </AnimatedWord>
              </div>
              
              {/* Line 2: HARNESS */}
              <div className="mb-2">
                <AnimatedWord delay={0.2}>
                  HARNESS
                </AnimatedWord>
              </div>
              
              {/* Line 3: DATA with heart */}
              <div className="mb-2 flex items-center">
                <AnimatedWord delay={0.4}>
                  DA
                </AnimatedWord>
                <motion.span 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="decorative-heart mx-4 text-6xl sm:text-7xl lg:text-8xl xl:text-[8rem] leading-none"
                >
                  ♥
                </motion.span>
                <AnimatedWord delay={0.5}>
                  TA
                </AnimatedWord>
              </div>
              
              {/* Line 4: TO with star */}
              <div className="mb-2 flex items-center">
                <AnimatedWord delay={0.7}>
                  T
                </AnimatedWord>
                <motion.span 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="decorative-star mx-4 text-6xl sm:text-7xl lg:text-8xl xl:text-[8rem] leading-none"
                >
                  ✱
                </motion.span>
                <AnimatedWord delay={0.8}>
                  O
                </AnimatedWord>
              </div>
              
              {/* Line 5: FUEL */}
              <div className="mb-2">
                <AnimatedWord delay={1.0}>
                  FUEL
                </AnimatedWord>
              </div>
              
              {/* Line 6: INNOVATION with peace sign */}
              <div className="flex items-center">
                <AnimatedWord delay={1.1}>
                  INNOVA
                </AnimatedWord>
                <motion.span 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3, duration: 0.4 }}
                  className="decorative-peace mx-2 text-6xl sm:text-7xl lg:text-8xl xl:text-[8rem] leading-none"
                >
                  ✌
                </motion.span>
                <AnimatedWord delay={1.2}>
                  ION.
                </AnimatedWord>
              </div>
            </div>
          </div>

          {/* Side Content */}
          <div className="lg:col-span-4 xl:col-span-3 lg:pl-12">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-sm font-bold text-black tracking-[0.3em] mb-6 uppercase">
                  Hello
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed tracking-wide">
                  I AM {personalInfo.name.toUpperCase()}, A DATA SCIENTIST CREATING AI-POWERED EXPERIENCES, SPECIALIZING IN MACHINE LEARNING, STRATEGY, AND INNOVATION.
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