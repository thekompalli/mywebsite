import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/mockData';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="premium-spacing bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="max-w-5xl">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-0 section-heading tracking-tight">
              I KNOW DATA CAN BE COMPLICATED—AND LIKE YOU, I EMBRACE IT. I PAIR MY REFINED ANALYTICAL PROCESS WITH AN ALIGNMENT TO STRATEGY AND TECHNOLOGY TO ESTABLISH GENUINE PARTNERSHIPS. I SIT CLOSELY WITH MY PARTNERS AND ACT AS AN EXTENSION OF THEIR TEAM. BY ESTABLISHING THIS FOUNDATION OF TRUST I AM ABLE TO ACCOMPLISH GREATER RESULTS.
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;