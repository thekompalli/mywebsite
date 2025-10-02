import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/mockData';
import TranslatedText from './TranslatedText';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section 
      className="premium-spacing py-32 md:py-40 lg:py-48 xl:py-56 text-white dark:text-gray-100 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/lyon.JPG)',
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        minHeight: '80vh'
      }}
    >
      {/* Background Video */}
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30 dark:bg-opacity-50 z-5"></div>
      
      <div className="w-full px-8 lg:px-12 relative z-10 h-full flex items-center">
        <div className="w-full">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h2 
              className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-snug sm:leading-normal mb-0 section-heading tracking-tight text-left"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)'
              }}
            >
              <TranslatedText path="about.text" enableCipher={true} />
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
