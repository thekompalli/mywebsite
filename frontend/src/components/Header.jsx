import React from 'react';
import { personalInfo } from '../data/mockData';

const Header = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <div className="text-2xl font-bold text-black tracking-tight">
            K/
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('work')}
              className="text-sm text-gray-900 hover:text-gray-600 transition-colors font-medium tracking-wide"
            >
              WORK
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className="text-sm text-gray-900 hover:text-gray-600 transition-colors font-medium tracking-wide"
            >
              EXPERIENCE
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="text-sm text-gray-900 hover:text-gray-600 transition-colors font-medium tracking-wide"
            >
              CAPABILITIES
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-sm text-gray-900 hover:text-gray-600 transition-colors font-medium tracking-wide"
            >
              CONTACT
            </button>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex flex-col items-end text-sm">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="text-gray-900 hover:text-gray-600 transition-colors font-medium"
            >
              {personalInfo.email.toUpperCase()}
            </a>
            <a 
              href={`tel:${personalInfo.phone}`}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {personalInfo.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;