import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills, education } from '../data/mockData';
import TranslatedText from './TranslatedText';

// Education institution website and image mapping
const getEducationInfo = (institution) => {
  const eduMap = {
    'EMLyon Business School': {
      website: 'https://em-lyon.com/fr',
      image: '/lyon.webp'
    },
    'Liverpool John Moores University': {
      website: 'https://ljmu.ac.uk',
      image: '/liverpool.jpg'
    },
    'IIIT': {
      website: 'https://iiit.ac.in',
      image: '/blore.jpg'
    },
    'SRM University': {
      website: 'https://srmist.edu.in',
      image: '/chennai.jpg'
    }
  };
  return eduMap[institution] || { website: '#', image: null };
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="skills" className="premium-spacing bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Main heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-black dark:text-white leading-tight section-heading tracking-tight mb-12">
            <TranslatedText path="skills.title" enableCipher={true} />
            <br />
            <TranslatedText path="skills.subtitle" enableCipher={true} />
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
            <TranslatedText path="skills.description" enableCipher={true} />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Technical Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-black dark:text-white mb-8 section-heading">
              <TranslatedText path="skills.technicalCapabilities" enableCipher={true} />
            </h3>
            <div className="space-y-8">
              {skills.map((skillCategory, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="border-l-2 border-black dark:border-white pl-6"
                >
                  <h4 className="text-lg font-bold text-black dark:text-white mb-3 section-heading">
                    {skillCategory.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((item, itemIndex) => (
                      <span
                        key={itemIndex}
                        className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-200 dark:border-gray-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
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
            <h3 className="text-2xl font-bold text-black dark:text-white mb-8 section-heading">
              <TranslatedText path="skills.educationalFoundation" enableCipher={true} />
            </h3>
            <div className="space-y-8">
              {education.map((edu, index) => {
                const eduInfo = getEducationInfo(edu.institution);
                return (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-6 last:pb-0 relative group transition-all duration-300 cursor-pointer hover:border-2 hover:border-blue-500 hover:rounded-xl hover:p-6 hover:shadow-lg hover:-translate-y-1"
                    onClick={() => {
                      if (eduInfo.website !== '#') {
                        window.open(eduInfo.website, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    {/* Background image for all schools */}
                    {eduInfo.image && (
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-cover bg-center bg-no-repeat rounded-xl"
                        style={{ backgroundImage: `url(${eduInfo.image})` }}
                      />
                    )}

                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-black dark:text-white mb-2 section-heading">
                        {edu.degree}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">{edu.institution}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{edu.location}</p>

                      {/* Exchange Program Information */}
                      {edu.exchange && (
                        <div className="mt-3 pl-4 border-l-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-r-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0v-4a2 2 0 011-1h2a2 2 0 011 1v4m-6 0H4" />
                            </svg>
                            <span className="text-yellow-600 dark:text-yellow-400 font-medium text-sm uppercase tracking-wide">Exchange Program</span>
                          </div>
                          <h5 className="font-semibold text-black dark:text-white text-sm">{edu.exchange.program}</h5>
                          <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">{edu.exchange.institution}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{edu.exchange.description}</p>
                        </div>
                      )}
                    </div>
                    <div className="ml-6 text-right">
                      <span className="inline-block bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-sm font-medium">
                        {edu.year}
                      </span>
                    </div>
                  </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;