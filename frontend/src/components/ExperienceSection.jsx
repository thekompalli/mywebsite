import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience, testimonials } from '../data/mockData';

const ExperienceCard = ({ exp, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="border-b border-gray-100 last:border-b-0 pb-12 last:pb-0 mb-12 last:mb-0"
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
        <div className="lg:w-2/3">
          <h3 className="text-3xl font-bold text-black mb-4 section-heading">{exp.title}</h3>
          <p className="text-xl text-gray-700 mb-2 font-medium">{exp.company}</p>
          <p className="text-sm text-gray-500 tracking-wide">{exp.location}</p>
        </div>
        <div className="mt-6 lg:mt-0 lg:text-right">
          <p className="text-sm font-medium text-black tracking-wide">{exp.period}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {exp.achievements.map((achievement, achIndex) => (
          <motion.div 
            key={achIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 + achIndex * 0.1 }}
            className="flex items-start space-x-4"
          >
            <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
            <p className="text-gray-600 leading-relaxed">{achievement}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({ testimonial, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="bg-white p-10 border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-sm group"
    >
      <motion.div 
        initial={{ scale: 0.8 }}
        animate={isInView ? { scale: 1 } : { scale: 0.8 }}
        transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
        className="mb-8"
      >
        <div className="w-20 h-20 bg-gray-50 group-hover:bg-gray-100 rounded-full mb-6 transition-colors duration-300"></div>
        <h4 className="font-bold text-black mb-2 text-lg section-heading">{testimonial.company}</h4>
        <p className="text-sm text-gray-500 tracking-wide">{testimonial.name}</p>
      </motion.div>
      
      <p className="text-gray-600 leading-relaxed italic text-lg">
        "{testimonial.text}"
      </p>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="experience" className="premium-spacing bg-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Experience Section */}
        <div className="mb-24">
          <motion.h2 
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-6xl font-bold text-black mb-8 section-heading"
          >
            Partners
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-600 mb-16 max-w-4xl leading-relaxed"
          >
            I partner closely with industry-leading companies to deliver high-performing, 
            impactful AI and machine learning solutions for their customers, products, and business growth.
          </motion.p>
          
          <div className="space-y-16">
            {experience.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;