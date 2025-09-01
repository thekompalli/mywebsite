import React from 'react';
import { personalInfo } from '../data/mockData';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-start bg-white pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Text */}
          <div className="lg:col-span-8 xl:col-span-9">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-black leading-none tracking-tight">
              I
              <br />
              CREATE
              <br />
              INTELLIGENT
              <br />
              <span className="relative">
                SOLUTIONS
                <div className="absolute -bottom-2 right-0 w-16 h-16 bg-black rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
              </span>
            </h1>
          </div>

          {/* Side Content */}
          <div className="lg:col-span-4 xl:col-span-3 lg:pl-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-bold text-black tracking-widest mb-4">
                  HELLO
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  I AM {personalInfo.name.toUpperCase()}, A {personalInfo.title.toUpperCase()} SPECIALIZING IN MACHINE LEARNING, AI, AND DATA SCIENCE SOLUTIONS.
                </p>
              </div>

              <div className="text-sm text-gray-500">
                <p>Based in {personalInfo.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;