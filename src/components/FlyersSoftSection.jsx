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

        {/* Detailed Screen - Always Visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative overflow-hidden"
          style={{ minHeight: '70vh' }}
        >
          {/* Flyers Soft Themed Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 sm:px-8 py-12">
            {/* Header */}
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center p-2">
                  <img
                    src="/company_logos/flyerssoft.png"
                    alt="Flyers Soft Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">
                    FLYERS SOFT
                  </h1>
                  <p className="text-blue-200 uppercase tracking-wide text-lg">
                    Strategic Technology Partner
                  </p>
                </div>
              </div>

              <div className="max-w-4xl mx-auto">
                <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed mb-8">
                  Strategic Technology Partner providing comprehensive IT solutions.
                  From AI-powered applications to cloud infrastructure, we transform business challenges into digital opportunities.
                </p>

                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-200 font-medium tracking-wide">
                    STRATEGIC PARTNER & COLLABORATOR
                  </span>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 h-full hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
                <h3 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Ready to Transform Your Business?
                </h3>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                  Partner with Flyers Soft for cutting-edge technology solutions that drive growth and innovation.
                  From concept to deployment, we deliver excellence at every step.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="mailto:contact@flyerssoft.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
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
                    className="inline-flex items-center justify-center border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-bold px-8 py-4 rounded-lg transition-all duration-300"
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