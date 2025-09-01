import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/mockData';

const MarqueeText = ({ children }) => {
  return (
    <div className="relative h-32 flex items-center justify-center py-16 overflow-hidden">
      <div className="text-8xl lg:text-9xl xl:text-[12rem] font-bold text-black tracking-tight whitespace-nowrap">
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
    <footer className="bg-white text-gray-900">
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
              className="space-y-1"
            >
              <p className="text-sm font-medium tracking-wider text-black">
                I LOVE WORKING WITH PASSIONATE PEOPLE
              </p>
              <p className="text-sm font-medium tracking-wider text-black">
                AND BRANDS
              </p>
            </motion.div>

            {/* Center - CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-1"
            >
              <p className="text-sm font-medium tracking-wider text-black">
                LET'S
              </p>
              <p className="text-sm font-medium tracking-wider text-black">
                COLLABORATE
              </p>
            </motion.div>

            {/* Right - Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-1"
            >
              <a 
                href={`mailto:${personalInfo.email}`}
                className="block text-sm font-medium tracking-wider text-black hover:text-gray-600 transition-colors"
              >
                {personalInfo.email.toUpperCase()}
              </a>
              <a 
                href={`tel:${personalInfo.phone}`}
                className="block text-sm font-medium tracking-wider text-black hover:text-gray-600 transition-colors"
              >
                {personalInfo.phone}
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Middle Section - Marquee Name */}
      <div>
        <MarqueeText />
      </div>

      {/* Bottom Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
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
                  className="block text-sm font-medium tracking-wider text-black hover:text-gray-600 transition-all duration-300 text-left"
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
                className="block text-sm font-medium tracking-wider text-black hover:text-gray-600 transition-all duration-300"
              >
                LINKEDIN
              </motion.a>
              <motion.a 
                href={`mailto:${personalInfo.email}`}
                whileHover={{ x: 5 }}
                className="block text-sm font-medium tracking-wider text-black hover:text-gray-600 transition-all duration-300"
              >
                EMAIL
              </motion.a>
              <motion.a 
                href="https://github.com/krishnakompalli"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="block text-sm font-medium tracking-wider text-black hover:text-gray-600 transition-all duration-300"
              >
                GITHUB
              </motion.a>
            </motion.div>
          </div>

          {/* Copyright Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <p className="text-sm font-medium tracking-wider text-black">
              © 2025 {personalInfo.name.toUpperCase()}
            </p>
            <div className="mt-4 md:mt-0">
              <a 
                href="/privacy"
                className="text-sm font-medium tracking-wider text-black hover:text-gray-600 transition-colors"
              >
                PRIVACY POLICY
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;