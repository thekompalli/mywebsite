import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/mockData';

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-lg"
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Project Visual */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-center">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 bg-black rounded-full mx-auto mb-6 flex items-center justify-center"
            >
              <span className="text-white font-bold text-2xl">{index + 1}</span>
            </motion.div>
            <h3 className="text-2xl font-bold text-black mb-3 section-heading">{project.title}</h3>
            <p className="text-sm text-gray-600 font-medium tracking-wide">{project.company}</p>
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500"></div>
      </div>
      
      <div className="p-8">
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {project.tags.map((tag, tagIndex) => (
            <span 
              key={tagIndex}
              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-medium tracking-wide transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="text-sm font-medium text-black">
          Impact: {project.impact}
        </div>
      </div>
    </motion.div>
  );
};

const WorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="work" className="premium-spacing bg-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Featured Project */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <p className="text-sm text-gray-500 mb-4 tracking-wide">Featured Project</p>
          <div className="border-l-4 border-black pl-8">
            <h3 className="text-3xl font-bold text-black mb-3 section-heading">
              {projects[0].title}
            </h3>
            <p className="text-sm text-gray-600 uppercase tracking-[0.2em] font-medium">
              {projects[0].tags.join(', ')}
            </p>
          </div>
        </motion.div>

        {/* Work Grid */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-6xl font-bold text-black mb-16 section-heading"
          >
            Work
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;