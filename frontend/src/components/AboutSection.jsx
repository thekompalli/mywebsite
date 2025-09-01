import React from 'react';
import { personalInfo } from '../data/mockData';

const AboutSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-black leading-tight mb-8">
              I SPECIALIZE IN TURNING COMPLEXITY INTO INTELLIGENT SOLUTIONS
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              {personalInfo.aboutMe}
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-xl">😊</span>
              </div>
              <div>
                <p className="text-sm font-bold text-black tracking-widest">
                  Part
                </p>
                <p className="text-sm font-bold text-black tracking-widest">
                  ners
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;