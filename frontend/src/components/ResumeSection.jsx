import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '../data/mockData';
import TranslatedText from './TranslatedText';

const ResumeSection = () => {
  const resumeRef = useRef(null);
  const [scrollCount, setScrollCount] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: resumeRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1.2, 1.1, 0.9, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      if (resumeRef.current) {
        const rect = resumeRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          if (scrollProgress > 0.3 && scrollProgress < 0.9) {
            // User is scrolling through the RESUME section
            setScrollCount(prev => Math.min(prev + 1, 3));
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = () => {
    // Check if PDF exists first
    fetch('/KrishnaKompalli.pdf', { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          const link = document.createElement('a');
          link.href = '/KrishnaKompalli.pdf';
          link.download = 'Krishna_Kompalli_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          alert('Resume is currently being updated. Please contact Krishna at ' + personalInfo.email + ' for the latest version.');
        }
      })
      .catch(() => {
        alert('Resume is currently being updated. Please contact Krishna at ' + personalInfo.email + ' for the latest version.');
      });
  };

  const handleView = () => {
    // Check if PDF exists first
    fetch('/KrishnaKompalli.pdf', { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          window.open('/KrishnaKompalli.pdf', '_blank');
        } else {
          alert('Resume is currently being updated. Please contact Krishna at ' + personalInfo.email + ' for the latest version.');
        }
      })
      .catch(() => {
        alert('Resume is currently being updated. Please contact Krishna at ' + personalInfo.email + ' for the latest version.');
      });
  };

  return (
    <>
      {/* Large RESUME Text with Zoom Effect */}
      <section id="resume" className="premium-spacing overflow-hidden bg-gray-50 dark:bg-gray-900" ref={resumeRef}>
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex items-center justify-center">
          <motion.h2 
            style={{ scale, opacity }}
            className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[25rem] font-bold text-black dark:text-white section-heading leading-none tracking-tighter will-change-transform text-center"
          >
            <TranslatedText path="resume.title" enableCipher={true} />
          </motion.h2>
        </div>
      </section>

      {/* Resume Download/View Section */}
      <section className="premium-spacing pt-0 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Resume Preview Container */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 lg:p-12 mb-8">
              <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-12">
                
                {/* PDF Preview Area */}
                <div className="flex-1 max-w-md">
                  <div className="border-2 border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700">
                    <img 
                      src="/eyesGIF.gif" 
                      alt="Resume Preview"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-4">
                  <motion.button
                    onClick={handleView}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <TranslatedText path="resume.viewResume" enableCipher={true} />
                  </motion.button>

                  <motion.button
                    onClick={handleDownload}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center px-8 py-3 border-2 border-black dark:border-white text-black dark:text-white font-medium rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <TranslatedText path="resume.downloadResume" enableCipher={true} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-400"
            >
              <p className="text-sm">
                <TranslatedText path="resume.inquiries" enableCipher={true} />
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="text-black dark:text-white hover:underline ml-1"
                >
                  {personalInfo.email}
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ResumeSection;