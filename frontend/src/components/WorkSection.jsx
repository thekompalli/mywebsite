import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/mockData';

const WorkSection = () => {
  const ref = useRef(null);
  const workRef = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [scrollCount, setScrollCount] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: workRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 1.2, 1.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      if (workRef.current) {
        const rect = workRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          if (scrollProgress > 0.3 && scrollProgress < 0.9) {
            // User is scrolling through the WORK section
            setScrollCount(prev => Math.min(prev + 1, 3));
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Featured Project */}
      <section className="premium-spacing" style={{backgroundColor: '#FAFAFA'}}>
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

      {/* Large WORK Text with Zoom Effect */}
      <section id="work" className="premium-spacing overflow-hidden" ref={workRef} style={{backgroundColor: '#FAFAFA'}}>
        <div className="max-w-7xl mx-auto px-8 lg:px-12 text-center">
          <motion.h2 
            style={{ scale, opacity }}
            className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[25rem] font-bold text-black section-heading leading-none tracking-tighter will-change-transform"
          >
            WORK
          </motion.h2>
        </div>
      </section>

      {/* Project Grid */}
      <section className="premium-spacing pt-0" style={{backgroundColor: '#FAFAFA'}}>
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

      {/* Professional Photo Section */}
      <section className="premium-spacing" style={{backgroundColor: '#FAFAFA'}}>
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://customer-assets.emergentagent.com/job_resume-elva/artifacts/qjoovfrn_Picsart_25-08-30_12-11-48-478.jpg"
                alt="Krishna Kompalli - Lead Data Scientist"
                className="w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] object-cover rounded-lg shadow-xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold text-black mb-2">Krishna Kompalli</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Lead Data Scientist specializing in AI & Machine Learning solutions across healthcare, fintech, and education domains.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkSection;