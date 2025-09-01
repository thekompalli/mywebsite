import React from 'react';
import { personalInfo } from '../data/mockData';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="text-3xl font-bold mb-4">K/</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {personalInfo.name}
              <br />
              {personalInfo.title}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#work" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Work
              </a>
              <a href="#experience" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Experience
              </a>
              <a href="#skills" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Capabilities
              </a>
              <a href="#contact" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Contact
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">{personalInfo.location}</p>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {personalInfo.email}
              </a>
              <a 
                href={`tel:${personalInfo.phone}`}
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {personalInfo.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 {personalInfo.name}. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a 
              href={`mailto:${personalInfo.email}`}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;