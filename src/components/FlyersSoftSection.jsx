import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FlyersSoftSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const services = [
    {
      icon: "🌐",
      title: "Web Development",
      description: "Modern, responsive websites and web applications built with cutting-edge technologies"
    },
    {
      icon: "📱",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android"
    },
    {
      icon: "🤖",
      title: "AI & Machine Learning",
      description: "Custom AI solutions, predictive analytics, and intelligent automation systems"
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      description: "Cloud migration, infrastructure management, and scalable cloud-native applications"
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "User-centered design solutions that enhance engagement and conversion"
    },
    {
      icon: "📊",
      title: "Data Analytics",
      description: "Business intelligence, data visualization, and advanced analytics platforms"
    },
    {
      icon: "🔧",
      title: "DevOps & Automation",
      description: "CI/CD pipelines, infrastructure automation, and deployment optimization"
    },
    {
      icon: "🛡️",
      title: "Cybersecurity",
      description: "Security audits, penetration testing, and comprehensive security solutions"
    }
  ];

  return (
    <section id="flyers-soft" className="py-24 md:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.4em] uppercase text-gray-500 dark:text-gray-400 mb-4">
            strategic partner
          </p>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white leading-tight tracking-tight mb-6">
            FLYERS SOFT PRIVATE LIMITED
          </h3>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
            Our strategic technology partner providing comprehensive IT solutions across all domains.
            From AI-powered applications to cloud infrastructure.
          </p>
        </motion.div>

        {/* Mixed Theme Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative overflow-hidden bg-white dark:bg-gray-800/50 rounded-2xl border-4 border-transparent"
          style={{
            minHeight: '70vh',
            background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899) border-box'
          }}
        >
          {/* Your Theme Background with FlyersSoft Accents */}
          <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900">
            {/* Subtle Grid Pattern - Your Theme */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 sm:px-8 py-12">
            {/* Header with FlyersSoft Border Style */}
            <div className="mb-12 text-center">
              <div className="inline-block p-8 rounded-2xl border-2 border-transparent bg-clip-padding mb-8"
                style={{
                  background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #3b82f6, #8b5cf6) border-box',
                  borderWidth: '3px'
                }}
              >
                <div className="flex items-center justify-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center p-0.5">
                    <div className="w-full h-full bg-white rounded-xl flex items-center justify-center p-2">
                      <img
                        src="/company_logos/flyerssoft.png"
                        alt="Flyers Soft Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight"
                      style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em' }}
                    >
                      FLYERS SOFT
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wide text-sm font-semibold">
                      Strategic Technology Partner
                    </p>
                  </div>
                </div>
              </div>

              <div className="max-w-4xl mx-auto">
                <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  Strategic Technology Partner providing comprehensive IT solutions.
                  From AI-powered applications to cloud infrastructure, we transform business challenges into digital opportunities.
                </p>

                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-transparent rounded-full px-6 py-3"
                  style={{
                    background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1)) padding-box, linear-gradient(90deg, #3b82f6, #8b5cf6) border-box'
                  }}
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                  <span className="text-gray-800 dark:text-gray-200 font-semibold tracking-wide text-sm">
                    STRATEGIC PARTNER & COLLABORATOR
                  </span>
                </div>
              </div>
            </div>

            {/* Services Grid - Mixed Theme */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-transparent"
                    style={{
                      background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #3b82f6, #8b5cf6) border-box',
                      borderWidth: '2px'
                    }}
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 filter grayscale-0 group-hover:grayscale-0">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3"
                      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section - Mixed Theme */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-center"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto border-3 border-transparent shadow-xl"
                style={{
                  background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #3b82f6, #8b5cf6) border-box',
                  borderWidth: '3px'
                }}
              >
                <h3 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  Ready to Transform Your Business?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                  Partner with Flyers Soft for cutting-edge technology solutions that drive growth and innovation.
                  From concept to deployment, we deliver excellence at every step.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="mailto:contact@flyerssoft.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-transparent"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Get in Touch
                  </motion.a>

                  <motion.a
                    href="https://flyerssoft.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 border-2 border-transparent hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #3b82f6, #8b5cf6) border-box',
                      borderWidth: '2px',
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Website
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FlyersSoftSection;