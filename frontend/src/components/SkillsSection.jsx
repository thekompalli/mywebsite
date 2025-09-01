import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills, education } from '../data/mockData';

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="skills" className="premium-spacing bg-background">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Main heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-black leading-tight section-heading tracking-tight mb-12">
            I SPECIALIZE IN TURNING 
            <br />
            COMPLEXITY INTO COMMERCE
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl leading-relaxed">
            I know data science can be complicated—and like you, I embrace it. I pair my refined 
            analytical process with an alignment to strategy and technology to establish genuine partnerships. 
            I sit closely with my partners and act as an extension of their team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Technical Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-black mb-8 section-heading">Technical Capabilities</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="border-l-2 border-black pl-6"
                >
                  <p className="text-gray-700 leading-relaxed">{skill}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Educational Background */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-black mb-8 section-heading">Educational Foundation</h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div 
                  key={edu.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-black mb-2 section-heading">
                        {edu.degree}
                      </h4>
                      <p className="text-gray-700 font-medium mb-1">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{edu.location}</p>
                    </div>
                    <div className="ml-6 text-right">
                      <span className="inline-block bg-black text-white px-3 py-1 text-sm font-medium">
                        {edu.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;