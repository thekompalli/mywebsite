import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/mockData';

const MarqueeText = ({ children }) => {
  return (
    <div className="relative h-32 flex items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 0.5,
          ease: "easeInOut"
        }}
        className="absolute text-8xl lg:text-9xl xl:text-[12rem] font-bold text-black tracking-tight whitespace-nowrap"
      >
        Krishna Kompalli
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0, 1, 1, 0],
        }}
        transition={{
          duration: 3,
          delay: 1.75,
          repeat: Infinity,
          repeatDelay: 0.5,
          ease: "easeInOut"
        }}
        className="absolute text-8xl lg:text-9xl xl:text-[12rem] font-bold text-black tracking-tight whitespace-nowrap"
      >
        Krishna Kompalli
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0, 0, 1, 1, 0],
        }}
        transition={{
          duration: 3,
          delay: 3.5,
          repeat: Infinity,
          repeatDelay: 0.5,
          ease: "easeInOut"
        }}
        className="absolute text-8xl lg:text-9xl xl:text-[12rem] font-bold text-black tracking-tight whitespace-nowrap"
      >
        Krishna Kompalli
      </motion.div>
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
    <footer className="bg-gray-50 text-black">
      {/* Top Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Left - Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <p className="text-sm font-medium tracking-wide">
                I LOVE WORKING WITH PASSIONATE PEOPLE
              </p>
              <p className="text-sm font-medium tracking-wide">
                AND BRANDS
              </p>
            </motion.div>

            {/* Center - CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <p className="text-sm font-medium tracking-wide">
                LET'S
              </p>
              <p className="text-sm font-medium tracking-wide">
                COLLABORATE
              </p>
            </motion.div>

            {/* Right - Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <a 
                href={`mailto:${personalInfo.email}`}
                className="block text-sm font-medium tracking-wide hover:text-gray-600 transition-colors"
              >
                {personalInfo.email.toUpperCase()}
              </a>
              <a 
                href={`tel:${personalInfo.phone}`}
                className="block text-sm font-medium tracking-wide hover:text-gray-600 transition-colors"
              >
                {personalInfo.phone}
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Middle Section - Marquee Name */}
      <div className="border-t border-gray-200">
        <MarqueeText /></div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left - Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                { label: 'WORK', id: 'work' },
                { label: 'COMPANY', id: 'experience' },
                { label: 'CAPABILITIES', id: 'skills' },
                { label: 'CONTACT', id: 'contact' }
              ].map((link, index) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  whileHover={{ x: 5 }}
                  className="block text-sm font-medium tracking-wide hover:text-gray-600 transition-all duration-300 text-left"
                >
                  {link.label}
                </motion.button>
              ))}
            </motion.div>

            {/* Right - Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <motion.a 
                href={`https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="block text-sm font-medium tracking-wide hover:text-gray-600 transition-all duration-300"
              >
                LINKEDIN
              </motion.a>
              <motion.a 
                href={`mailto:${personalInfo.email}`}
                whileHover={{ x: 5 }}
                className="block text-sm font-medium tracking-wide hover:text-gray-600 transition-all duration-300"
              >
                EMAIL
              </motion.a>
              <motion.a 
                href="https://github.com/krishnakompalli"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="block text-sm font-medium tracking-wide hover:text-gray-600 transition-all duration-300"
              >
                GITHUB
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;