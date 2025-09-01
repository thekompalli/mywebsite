import React, { useRef } from 'react';
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
  return (
    <section id="hero" className="min-h-screen flex items-center justify-start bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Main Hero Text */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="hero-text text-6xl sm:text-7xl lg:text-8xl xl:text-[8rem] font-bold text-black leading-none tracking-tight">
              <div className="overflow-hidden">
                <AnimatedText delay={0}>
                  <div className="flex items-center">
                    I
                  </div>
                </AnimatedText>
              </div>
              <div className="overflow-hidden">
                <AnimatedText delay={0.2}>
                  <div className="flex items-center">
                    CREATE
                  </div>
                </AnimatedText>
              </div>
              <div className="overflow-hidden">
                <AnimatedText delay={0.4}>
                  <div className="flex items-center">
                    ME
                    <span className="decorative-heart mx-4 text-6xl">♥</span>
                    ORABLE
                  </div>
                </AnimatedText>
              </div>
              <div className="overflow-hidden">
                <AnimatedText delay={0.6}>
                  <div className="flex items-center">
                    E
                    <span className="decorative-star mx-4 text-6xl">✱</span>
                    PERIENCES
                  </div>
                </AnimatedText>
              </div>
              <div className="overflow-hidden">
                <AnimatedText delay={0.8}>
                  <div className="flex items-center">
                    F
                    <span className="inline-block w-20 h-16 bg-black mx-4" style={{clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)'}}></span>
                    R B
                    <span className="decorative-star ml-4 text-6xl">✌</span>
                    ANDS.
                  </div>
                </AnimatedText>
              </div>
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