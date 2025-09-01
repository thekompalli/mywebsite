import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills, education } from '../data/mockData';

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="skills" className="premium-spacing bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Skills */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-black mb-12 section-heading">Capabilities</h2>
            <div className="space-y-8">
              {skills.map((skill, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="border-l-4 border-black pl-8 hover:pl-10 transition-all duration-300"
                >
                  <p className="text-gray-700 leading-relaxed text-lg">{skill}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-black mb-12 section-heading">Education</h2>
            <div className="space-y-10">
              {education.map((edu, index) => (
                <motion.div 
                  key={edu.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="border-b border-gray-200 last:border-b-0 pb-8 last:pb-0 group hover:border-gray-300 transition-colors duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-black mb-2 section-heading group-hover:text-gray-700 transition-colors duration-300">
                        {edu.degree}
                      </h3>
                      <p className="text-gray-700 font-medium mb-1">{edu.institution}</p>
                      <p className="text-sm text-gray-500 tracking-wide">{edu.location}</p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="ml-6"
                    >
                      <span className="inline-block bg-black text-white px-4 py-2 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors duration-300">
                        {edu.year}
                      </span>
                    </motion.div>
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