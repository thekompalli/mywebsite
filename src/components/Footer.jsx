import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/mockData';
import TranslatedText from './TranslatedText';

const MarqueeText = ({ children }) => {
  return (
    <div 
      className="relative h-64 flex items-center justify-center py-16 overflow-hidden"
      style={{
        backgroundImage: 'url(/side.gif)',
        backgroundSize: '20%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Slight overlay for better text readability */}
      <div className="absolute inset-0 bg-white dark:bg-black bg-opacity-20 dark:bg-opacity-20"></div>
      
      <div 
        className="relative z-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font text-gray-900 dark:text-white tracking-tight whitespace-nowrap"
        style={{
          textShadow: '2px 2px 4px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6)'
        }}
      >
        Krishna Kompalli
      </div>
    </div>
  );
};

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Main Footer Content */}
      <div className="relative">
        <div className="px-8 lg:px-12 py-20">
          <div className="flex justify-between items-start">
            {/* Main Content - Left Side */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-shrink-0"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-black dark:text-white tracking-tight">
                Accelerate your
                <br />
                AI product efforts
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
                Ready to transform your business with AI? Let's discuss your product development needs and build something exceptional together.
              </p>
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-black dark:bg-white text-white dark:text-black px-8 py-4 font-bold transition-colors border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
              >
                Contact us
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </motion.div>

            {/* Navigation - Right Side */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="hidden lg:block flex-shrink-0"
            >
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-3 text-right">
                  <button
                    onClick={() => scrollToSection('work')}
                    className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium uppercase tracking-wide"
                  >
                    Work
                  </button>
                  <button
                    onClick={() => scrollToSection('experience')}
                    className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium uppercase tracking-wide"
                  >
                    Experience
                  </button>
                  <button
                    onClick={() => scrollToSection('skills')}
                    className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium uppercase tracking-wide"
                  >
                    Skills
                  </button>
                </div>
                <div className="space-y-3 text-right">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium uppercase tracking-wide"
                  >
                    Contact
                  </button>
                  <a
                    href={`https://${personalInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium uppercase tracking-wide"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/krishnakompalli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium uppercase tracking-wide"
                  >
                    Github
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

            {/* Mobile Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:hidden mt-8"
            >
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <button
                    onClick={() => scrollToSection('work')}
                    className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium uppercase tracking-wide text-left"
                  >
                    Work
                  </button>
                  <button
                    onClick={() => scrollToSection('experience')}
                    className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium uppercase tracking-wide text-left"
                  >
                    Experience
                  </button>
                  <button
                    onClick={() => scrollToSection('skills')}
                    className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium uppercase tracking-wide text-left"
                  >
                    Skills
                  </button>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium uppercase tracking-wide text-left"
                  >
                    Contact
                  </button>
                  <a
                    href={`https://${personalInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium uppercase tracking-wide text-left"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/krishnakompalli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium uppercase tracking-wide text-left"
                  >
                    Github
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

        {/* Company Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 px-8 lg:px-12"
        >
          {/* Full width border line */}
          <div className="w-full border-t-2 border-black dark:border-white mb-8"></div>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-2xl leading-relaxed">
            Krishna Kompalli develops AI products and provides consulting services to accelerate digital transformation for businesses across fintech, healthcare, education, and enterprise sectors.
          </p>
        </motion.div>

        {/* Large Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="pb-8 px-8 lg:px-12"
        >
          <h3 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-black dark:text-white leading-none tracking-tight uppercase text-left">
            krishna kompalli
          </h3>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;