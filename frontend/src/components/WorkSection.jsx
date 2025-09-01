import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/mockData';

const WorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      {/* Featured Project */}
      <section className="premium-spacing bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
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
        </div>
      </section>

      {/* Large WORK Text */}
      <section id="work" className="premium-spacing bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-[12rem] sm:text-[16rem] lg:text-[20rem] xl:text-[25rem] font-bold text-black section-heading leading-none tracking-tighter"
          >
            WORK
          </motion.h2>
        </div>
      </section>

      {/* Project Grid */}
      <section className="premium-spacing bg-gray-50 pt-0">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden bg-white hover:bg-gray-50 transition-all duration-300"
              >
                <div className="aspect-[4/3] bg-white relative overflow-hidden border border-gray-200">
                  {/* Project Visual */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center"
                      >
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </motion.div>
                      <h3 className="text-lg font-bold text-black mb-2 section-heading">{project.title}</h3>
                      <p className="text-xs text-gray-600 font-medium tracking-wide uppercase">{project.company}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-sm font-medium text-black">
                    {project.impact}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkSection;