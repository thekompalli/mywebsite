import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/mockData';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl font-bold mb-6 tracking-tight">K.</div>
            <p className="text-gray-400 text-sm leading-relaxed tracking-wide">
              {personalInfo.name}
              <br />
              {personalInfo.title}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold mb-6 text-lg tracking-wide">Quick Links</h4>
            <div className="space-y-3">
              {[
                { label: 'Work', id: 'work' },
                { label: 'Experience', id: 'experience' },
                { label: 'Capabilities', id: 'skills' },
                { label: 'Contact', id: 'contact' }
              ].map((link, index) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  whileHover={{ x: 5 }}
                  className="block text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-wide text-left"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold mb-6 text-lg tracking-wide">Contact</h4>
            <div className="space-y-3 text-sm">
              <p className="text-gray-400 tracking-wide">{personalInfo.location}</p>
              <motion.a 
                href={`mailto:${personalInfo.email}`}
                whileHover={{ x: 5 }}
                className="block text-gray-400 hover:text-white transition-all duration-300 tracking-wide"
              >
                {personalInfo.email}
              </motion.a>
              <motion.a 
                href={`tel:${personalInfo.phone}`}
                whileHover={{ x: 5 }}
                className="block text-gray-400 hover:text-white transition-all duration-300 tracking-wide"
              >
                {personalInfo.phone}
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-12 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm tracking-wide">
            © 2025 {personalInfo.name}. All rights reserved.
          </p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <motion.a 
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-wide"
            >
              LinkedIn
            </motion.a>
            <motion.a 
              href={`mailto:${personalInfo.email}`}
              whileHover={{ y: -2 }}
              className="text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-wide"
            >
              Email
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;