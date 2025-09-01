import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/mockData';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-50/95 backdrop-blur-sm' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-900 tracking-tight cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            KK.
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            {[
              { label: 'WORK', id: 'work' },
              { label: 'COMPANY', id: 'experience' },
              { label: 'CAPABILITIES', id: 'skills' },
              { label: 'CONTACT', id: 'contact' }
            ].map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-black hover:text-gray-600 transition-colors font-medium tracking-wider"
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="hidden lg:flex flex-col items-end text-sm"
          >
            <a 
              href={`mailto:${personalInfo.email}`}
              className="text-black hover:text-gray-600 transition-colors font-medium tracking-wide"
            >
              {personalInfo.email.toUpperCase()}
            </a>
            <a 
              href={`tel:${personalInfo.phone}`}
              className="text-gray-600 hover:text-black transition-colors mt-1"
            >
              {personalInfo.phone}
            </a>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;