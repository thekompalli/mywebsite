import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../data/mockData';
import TranslatedText from './TranslatedText';

// Metric display component with mini charts and tooltips
const MetricDisplay = ({ text }) => {
  const [hoveredMetric, setHoveredMetric] = useState(null);

  // Function to get methodology explanation for different metrics
  const getMethodologyTooltip = (metric) => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes('30%') && lowerText.includes('search')) {
      return "Measured by comparing search result relevance scores before and after BERT implementation using A/B testing with 1000+ queries";
    }
    if (lowerText.includes('22%') && lowerText.includes('ctr')) {
      return "Click-through rate improvement measured over 3-month period using randomized controlled testing with 50k+ users";
    }
    if (lowerText.includes('30%') && lowerText.includes('latency')) {
      return "Response time reduction measured using automated performance testing across 10k+ API calls";
    }
    if (lowerText.includes('75%') && lowerText.includes('conversion')) {
      return "Client conversion rate calculated from 8 presented POCs to 6 signed contracts over 2-year period";
    }
    if (lowerText.includes('90%') && lowerText.includes('success')) {
      return "Pose verification accuracy measured using computer vision validation against 500+ labeled yoga poses";
    }
    if (lowerText.includes('40%') && lowerText.includes('efficiency')) {
      return "Operational efficiency measured by reduction in manual task completion time across 3 banking clients";
    }
    if (lowerText.includes('95%') && lowerText.includes('satisfaction')) {
      return "Client satisfaction rate from quarterly surveys across 12 banking clients over 1-year period";
    }
    if (lowerText.includes('60%') && lowerText.includes('qa')) {
      return "QA time reduction measured by comparing manual vs automated testing cycles across 20+ releases";
    }
    if (lowerText.includes('99.9%') && lowerText.includes('uptime')) {
      return "System uptime calculated from server monitoring logs over 6-month production period";
    }
    if (lowerText.includes('10,000+') && lowerText.includes('users')) {
      return "Concurrent user capacity verified through load testing using realistic traffic simulation";
    }
    if (lowerText.includes('4 weeks') && lowerText.includes('1 week')) {
      return "Deployment time reduction measured by tracking ML pipeline execution from development to production";
    }
    if (lowerText.includes('20%') && lowerText.includes('queries')) {
      return "Support query automation rate measured by analyzing ticket volumes before and after LLM implementation";
    }

    return "Methodology details available upon request";
  };

  // Function to create mini chart based on metric type
  const MiniChart = ({ value }) => {
    const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));

    if (value.includes('%')) {
      return (
        <div className="inline-block ml-1 w-8 h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden align-middle">
          <div
            className="h-full bg-black dark:bg-white rounded-full transition-all duration-300"
            style={{ width: `${Math.min(numericValue, 100)}%` }}
          />
        </div>
      );
    }

    if (value.includes('week') || value.includes('month') || value.includes('hour')) {
      return (
        <div className="inline-block ml-1 align-middle">
          <div className="flex items-center gap-0.5">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
            <div className="w-0.5 h-1.5 bg-gray-400"></div>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          </div>
        </div>
      );
    }

    if (numericValue > 1000) {
      return (
        <div className="inline-block ml-1 w-6 h-2 align-middle">
          <div className="flex items-end h-full gap-px">
            <div className="w-1 bg-black dark:bg-white h-1/4 rounded-t"></div>
            <div className="w-1 bg-black dark:bg-white h-2/4 rounded-t"></div>
            <div className="w-1 bg-black dark:bg-white h-3/4 rounded-t"></div>
            <div className="w-1 bg-black dark:bg-white h-full rounded-t"></div>
          </div>
        </div>
      );
    }

    return null;
  };

  // Process text to identify and highlight metrics
  const renderTextWithMetrics = () => {
    const metricRegex = /(\d+(?:\.\d+)?%|\d+(?:,\d{3})*(?:\+)?|\d+(?:\.\d+)?\s*(?:weeks?|days?|hours?|months?|years?))/g;
    const parts = text.split(metricRegex);

    return parts.map((part, index) => {
      const isMetric = metricRegex.test(part);
      metricRegex.lastIndex = 0; // Reset regex for next test

      if (isMetric) {
        return (
          <span key={index} className="inline-flex items-center">
            <span
              className="font-bold text-black dark:text-white bg-yellow-200 dark:bg-yellow-900 px-1 rounded cursor-help relative"
              onMouseEnter={() => setHoveredMetric(part)}
              onMouseLeave={() => setHoveredMetric(null)}
            >
              {part}
              <span className="text-xs ml-0.5">?</span>
            </span>
            <MiniChart value={part} />
          </span>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="relative">
      <span>{renderTextWithMetrics()}</span>
      {hoveredMetric && (
        <div className="absolute z-50 bottom-full left-0 mb-2 p-3 bg-black dark:bg-white text-white dark:text-black text-xs rounded-lg shadow-lg max-w-xs whitespace-normal border-2 border-gray-300 dark:border-gray-600">
          <div className="font-semibold mb-1">📊 Methodology:</div>
          <div>{getMethodologyTooltip(hoveredMetric)}</div>
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black dark:border-t-white"></div>
        </div>
      )}
    </div>
  );
};

// Company logo, website, and description mapping
const getCompanyInfo = (companyName) => {
  const companyMap = {
    'Flyers Soft Pvt. Ltd.': {
      logo: 'flyerssoft.png',
      website: 'https://flyerssoft.com',
      isPartner: true,
      description: "Flyers Soft is a leading AI solutions company specializing in transforming businesses through cutting-edge artificial intelligence and machine learning technologies. We help organizations build scalable AI products, from custom data science solutions to enterprise-ready AI platforms. Our expertise spans across industries including healthcare, finance, education, and e-commerce, delivering innovative solutions that drive measurable business impact."
    },
    'Eden AI': {
      logo: 'edenai.png',
      website: 'https://edenai.co',
      isPartner: false,
      description: "Eden AI is a comprehensive AI API platform that provides developers with unified access to the best AI engines through a single API. The platform offers a wide range of AI services including NLP, computer vision, speech recognition, and generative AI from multiple providers, allowing developers to easily integrate, compare, and switch between different AI technologies without vendor lock-in."
    },
    'Oncourse AI': {
      logo: 'oncourse.png',
      website: 'https://getoncourse.ai/',
      isPartner: false,
      description: "Oncourse AI is an innovative educational technology startup that revolutionizes learning through AI-powered personalization. The company develops intelligent tutoring systems and educational platforms that adapt to individual learning styles, providing personalized content recommendations and real-time performance analytics to enhance student outcomes in educational institutions worldwide."
    },
    'MFine': {
      logo: 'mfine.png',
      website: 'https://mfine.co',
      isPartner: false,
      description: "MFine is a leading AI-powered healthcare platform that connects patients with qualified doctors through telemedicine and provides comprehensive health monitoring solutions. The platform leverages machine learning and data analytics to offer personalized health insights, predictive diagnostics, and seamless digital healthcare experiences across India's diverse healthcare ecosystem."
    },
    'Temenos India Pvt. Ltd.': {
      logo: 'temenos.png',
      website: 'https://temenos.com',
      isPartner: false,
      description: "Temenos is a global leader in banking software, serving over 3,000 financial institutions across 150+ countries. The company provides cloud-native, cloud-agnostic digital banking platforms that enable banks to deliver innovative customer experiences while maintaining operational efficiency. Temenos India focuses on AI-powered banking solutions and conversational AI technologies for the financial services industry."
    }
  };
  return companyMap[companyName] || { logo: null, website: '#', isPartner: false, description: '' };
};

const getCompanyLogo = (companyName) => {
  return getCompanyInfo(companyName).logo;
};

const CompanyBox = ({ exp, index, onClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const companyInfo = getCompanyInfo(exp.company);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className="group relative h-full border-2 border-black dark:border-white shadow-[8px_8px_0_0_rgba(0,0,0,0.08)] hover:shadow-[12px_12px_0_0_rgba(0,0,0,0.12)] transition-shadow duration-200 cursor-pointer overflow-hidden"
      onClick={() => onClick(exp)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick(exp);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View experience at ${exp.company}`}
    >
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />

      <div className="relative z-10 p-6 flex flex-col justify-between h-full transition-colors duration-300">
        <div>
          {/* Partnership Badge */}
          {companyInfo.isPartner && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
              Partner
            </div>
          )}

          {/* Company Logo/Name */}
          <div className="mb-4 flex justify-center">
            {getCompanyLogo(exp.company) ? (
              <img
                src={`/company_logos/${getCompanyLogo(exp.company)}`}
                alt={exp.company}
                className="h-12 w-auto object-contain"
              />
            ) : (
              <h3 className="text-lg font-bold text-black dark:text-white uppercase tracking-tight text-center">
                {exp.company}
              </h3>
            )}
          </div>

          <h4 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wide mb-2 text-center">
            {exp.title}
          </h4>

          <p className="text-xs text-gray-500 dark:text-gray-400 tracking-wide mb-4 text-center">
            {exp.period} • {exp.location}
          </p>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
            {exp.achievements[0]}
          </p>
        </div>

        <div className="mt-auto pt-4">
          <span className="inline-flex items-center text-sm font-semibold text-black dark:text-white uppercase tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
            View Experience <span className="ml-2">→</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const ref = useRef(null);
  const detailRef = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeExperience, setActiveExperience] = useState(null);

  const handleCompanyClick = (exp) => {
    setActiveExperience(exp);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      detailRef.current?.focus();
    }, 100);
  };

  const handleBackToCompanies = () => {
    setActiveExperience(null);
  };

  return (
    <section id="experience" className="premium-spacing bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Partners Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white leading-tight tracking-tight mb-6">
            PROFESSIONAL JOURNEY
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            <TranslatedText path="experience.description" enableCipher={true} />
          </p>
        </motion.div>

        {activeExperience ? (
          <motion.div
            key="experience-detail"
            ref={detailRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative border-2 border-black dark:border-white shadow-[12px_12px_0_0_rgba(0,0,0,0.08)] focus:outline-none bg-gray-50 dark:bg-gray-900"
            style={{ minHeight: '70vh' }}
          >
            <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="px-6 sm:px-8 pt-6">
                <button
                  type="button"
                  onClick={handleBackToCompanies}
                  className="inline-flex items-center text-sm font-semibold uppercase tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity"
                  aria-label="Back to all companies"
                >
                  <span className="mr-2 text-lg">←</span> Back to all companies
                </button>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-6">
                      {getCompanyLogo(activeExperience.company) ? (
                        <img
                          src={`/company_logos/${getCompanyLogo(activeExperience.company)}`}
                          alt={activeExperience.company}
                          className="h-16 w-auto object-contain"
                        />
                      ) : (
                        <h3 className="text-3xl font-bold text-black dark:text-white uppercase tracking-tight">
                          {activeExperience.company}
                        </h3>
                      )}
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-xl font-semibold text-black dark:text-white">
                            {activeExperience.title}
                          </h4>
                          {getCompanyInfo(activeExperience.company).isPartner && (
                            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                              Current Partner
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {activeExperience.period} • {activeExperience.location}
                        </p>
                      </div>
                    </div>

                    {/* Company Website Link */}
                    <a
                      href={getCompanyInfo(activeExperience.company).website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors border border-blue-600 dark:border-blue-400 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <span>Visit Website</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Company Description */}
                <div className="mt-6 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h5 className="text-sm font-bold text-black dark:text-white mb-2 uppercase tracking-wide">About {activeExperience.company}</h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {getCompanyInfo(activeExperience.company).description}
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-8 pb-8 flex-1 overflow-y-auto">
                <div className="space-y-8 mt-8">
                  <div className="text-center">
                    <h5 className="text-2xl font-bold text-black dark:text-white mb-2">Key Achievements</h5>
                    <div className="w-16 h-1 bg-black dark:bg-white mx-auto"></div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {activeExperience.achievements.map((achievement, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="group relative"
                      >
                        <div className="bg-white dark:bg-gray-900 border-2 border-black dark:border-white p-6 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.15)] dark:hover:shadow-[6px_6px_0_0_rgba(255,255,255,0.15)] transition-shadow duration-200">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white flex items-center justify-center">
                              <span className="text-white dark:text-black text-sm font-bold">{idx + 1}</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200 font-medium">
                                <MetricDisplay text={achievement} />
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Special Service Request section for Flyerssoft */}
                  {activeExperience.company === "Flyers Soft Pvt. Ltd." && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="mt-12"
                    >
                      <h4 className="text-xl font-bold text-black dark:text-white mb-6">
                        Request Services from Our Partner
                      </h4>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-black dark:border-white p-8 shadow-[8px_8px_0_0_rgba(0,0,0,0.08)]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Contact Information */}
                          <div className="space-y-6">
                            <div>
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0v-4a2 2 0 011-1h2a2 2 0 011 1v4m-6 0H4" />
                                  </svg>
                                </div>
                                <h5 className="font-bold text-black dark:text-white">Chennai Office</h5>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                392, Rajiv Gandhi Salai, OMR,<br />
                                Perungudi, Chennai - 600096
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0v-4a2 2 0 011-1h2a2 2 0 011 1v4m-6 0H4" />
                                  </svg>
                                </div>
                                <h5 className="font-bold text-black dark:text-white">US Office</h5>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                651 N Broad St, Suite 201<br />
                                Middletown, 19709 Delaware
                              </p>
                            </div>
                          </div>

                          {/* Contact Methods */}
                          <div className="space-y-6">
                            <div>
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                </div>
                                <h5 className="font-bold text-black dark:text-white">Email Contacts</h5>
                              </div>
                              <div className="space-y-2">
                                <div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">General & Business Enquiries</p>
                                  <a
                                    href="mailto:info@flyerssoft.com"
                                    className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
                                  >
                                    info@flyerssoft.com
                                  </a>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Career Opportunities</p>
                                  <a
                                    href="mailto:careers@flyerssoft.com"
                                    className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
                                  >
                                    careers@flyerssoft.com
                                  </a>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                </div>
                                <h5 className="font-bold text-black dark:text-white">Call Us</h5>
                              </div>
                              <a
                                href="tel:+916382303389"
                                className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium text-lg"
                              >
                                +91 638 230 3389
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              Ready to transform your business with AI solutions? Get in touch with our partner team.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <a
                                href="https://www.flyerssoft.com/book-demo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Request Quote
                              </a>
                              <a
                                href="tel:+916382303389"
                                className="inline-flex items-center gap-2 border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Call Now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Special YouTube showcase for Eden AI */}
                  {activeExperience.company === "Eden AI" && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="mt-12"
                    >
                      <h4 className="text-xl font-bold text-black dark:text-white mb-6">
                        <TranslatedText path="experience.educationalVideo" enableCipher={true} />
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-gray-950 border-2 border-black dark:border-white p-6 shadow-[8px_8px_0_0_rgba(0,0,0,0.08)]">
                          <div className="aspect-video bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 overflow-hidden mb-4">
                            <iframe
                              src="https://www.youtube.com/embed/KlCghmesA5o"
                              title="Eden AI Tutorial - Integration Guide"
                              className="w-full h-full"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                          <h5 className="font-bold text-black dark:text-white mb-2">
                            <TranslatedText path="experience.aiIntegrationGuide" enableCipher={true} />
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <TranslatedText path="experience.comprehensiveTutorial" enableCipher={true} />
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-950 border-2 border-black dark:border-white p-6 shadow-[8px_8px_0_0_rgba(0,0,0,0.08)]">
                          <div className="aspect-video bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 overflow-hidden mb-4">
                            <iframe
                              src="https://www.youtube.com/embed/GN5HhhnH-ew"
                              title="Eden AI Product Demo"
                              className="w-full h-full"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                          <h5 className="font-bold text-black dark:text-white mb-2">
                            <TranslatedText path="experience.productDemo" enableCipher={true} />
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <TranslatedText path="experience.showcasingFeatures" enableCipher={true} />
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-950 border-2 border-black dark:border-white p-6 shadow-[8px_8px_0_0_rgba(0,0,0,0.08)]">
                          <div className="aspect-video bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 overflow-hidden mb-4">
                            <iframe
                              src="https://www.youtube.com/embed/5VIqZ3qYzs0"
                              title="Eden AI Best Practices"
                              className="w-full h-full"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                          <h5 className="font-bold text-black dark:text-white mb-2">
                            <TranslatedText path="experience.bestPractices" enableCipher={true} />
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <TranslatedText path="experience.advancedTechniques" enableCipher={true} />
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Company Boxes Grid */
          <motion.div
            key="companies-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {experience.map((exp, index) => (
              <CompanyBox
                key={exp.id}
                exp={exp}
                index={index}
                onClick={handleCompanyClick}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
