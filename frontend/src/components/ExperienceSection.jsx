import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../data/mockData';

const CompanyShowcase = ({ exp, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="border-b border-gray-300 pb-16 mb-16 last:border-b-0 last:pb-0 last:mb-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Company Logo/Name Area */}
        <div className="lg:col-span-3">
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={isInView ? { scale: 1 } : { scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              className="mb-6"
            >
              <h3 className="text-4xl font-bold text-black mb-2 section-heading tracking-tight">
                {exp.company.toUpperCase()}
              </h3>
              <p className="text-sm text-gray-500 tracking-widest">{exp.period}</p>
            </motion.div>
          </div>
        </div>

        {/* Project Description */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
          >
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {exp.achievements[0]}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {exp.achievements[1]}
            </p>
          </motion.div>
        </div>

        {/* Impact/Results */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
          >
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {exp.achievements[2] || exp.achievements[1]}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {exp.achievements[3] || exp.achievements[2] || 'Key achievements and impact delivered through innovative solutions.'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Special YouTube showcase for Eden AI */}
      {exp.company === "Eden AI" && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
          className="mt-12"
        >
          <h4 className="text-2xl font-bold text-black mb-6 section-heading">Educational Video Content</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://www.youtube.com/embed/KlCghmesA5o"
                  title="Eden AI Tutorial - Integration Guide"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h5 className="font-bold text-black mb-2">AI Integration Guide</h5>
              <p className="text-sm text-gray-600">Comprehensive tutorial on AI integration</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://www.youtube.com/embed/GN5HhhnH-ew"
                  title="Eden AI Product Demo"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h5 className="font-bold text-black mb-2">Product Demo</h5>
              <p className="text-sm text-gray-600">Showcasing Eden AI platform features</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://www.youtube.com/embed/5VIqZ3qYzs0"
                  title="Eden AI Best Practices"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h5 className="font-bold text-black mb-2">Best Practices</h5>
              <p className="text-sm text-gray-600">Advanced techniques and best practices</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="experience" className="premium-spacing" style={{backgroundColor: '#FAFAFA'}}>
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Partners Header */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-black mb-8 section-heading tracking-tight">
            COMPANIES
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl leading-relaxed">
            Companies I've worked with to deliver high-performing, 
            impactful AI and machine learning solutions for their customers, products, and business growth.
          </p>
        </motion.div>

        {/* Company Showcases */}
        <div className="space-y-0">
          {experience.slice(0, 3).map((exp, index) => (
            <CompanyShowcase key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;