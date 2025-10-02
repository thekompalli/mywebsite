import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ArchitecturalHighlights = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const architecturalData = [
    {
      id: 'ai-models',
      title: 'AI/ML Models Used',
      icon: '',
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      items: [
        { category: 'Large Language Models', tech: 'GPT-4, Claude for conversational AI and complex reasoning' },
        { category: 'Specialized Models', tech: 'BioBERT, ClinicalBERT for healthcare; FinBERT for finance; CodeLlama for programming' },
        { category: 'Computer Vision', tech: 'GPT-4V for medical imaging, document analysis' },
        { category: 'Traditional ML', tech: 'XGBoost, Random Forest, Neural Networks for prediction tasks' },
        { category: 'Vector Embeddings', tech: 'E5, BGE for semantic search and retrieval' }
      ]
    },
    {
      id: 'tech-stack',
      title: 'Modern Technology Stack',
      icon: '',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      items: [
        { category: 'Streaming', tech: 'Apache Kafka, Apache Flink for real-time processing' },
        { category: 'Databases', tech: 'PostgreSQL, MongoDB, Redis, Vector DBs (Pinecone, Weaviate)' },
        { category: 'Search', tech: 'Elasticsearch for full-text search' },
        { category: 'Analytics', tech: 'Time-series DBs (InfluxDB), Data warehouses (Snowflake, BigQuery)' },
        { category: 'Security', tech: 'End-to-end encryption, RBAC, audit trails' },
        { category: 'Compliance', tech: 'HIPAA, GDPR, SOX, PCI DSS frameworks' }
      ]
    },
    {
      id: 'architecture-patterns',
      title: 'Architecture Patterns',
      icon: '',
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      items: [
        { category: 'Microservices', tech: 'Scalable, modular design' },
        { category: 'Event-driven', tech: 'Real-time data processing' },
        { category: 'RAG (Retrieval Augmented Generation)', tech: 'For knowledge-based systems' },
        { category: 'Multi-modal AI', tech: 'Text, voice, image processing' },
        { category: 'Ensemble Models', tech: 'Multiple AI models for improved accuracy' }
      ]
    },
    {
      id: 'integration',
      title: 'Integration Capabilities',
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      items: [
        { category: 'APIs', tech: 'RESTful, GraphQL, webhooks' },
        { category: 'Enterprise Systems', tech: 'ERP, CRM, HRIS integration' },
        { category: 'Cloud Platforms', tech: 'AWS, Azure, GCP compatibility' },
        { category: 'Communication', tech: 'Slack, Teams, email integration' }
      ]
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.4em] uppercase text-gray-500 dark:text-gray-400 mb-4">
            Technical Foundation
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white leading-tight tracking-tight mb-6">
            KEY ARCHITECTURAL HIGHLIGHTS
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Enterprise-grade AI solutions built on cutting-edge technology stacks, designed for scale, security, and seamless integration.
          </p>
        </motion.div>

        {/* Architectural Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {architecturalData.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              className={`${section.bgColor} ${section.borderColor} border-2 rounded-3xl p-8 shadow-[8px_8px_0_0_rgba(0,0,0,0.08)] hover:shadow-[12px_12px_0_0_rgba(0,0,0,0.12)] transition-all duration-300 group`}
            >
              {/* Card Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black dark:text-white tracking-tight">
                    {section.title}
                  </h3>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-6">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                    className="group/item"
                  >
                    <div className="flex flex-col gap-2">
                      <h4 className="font-semibold text-black dark:text-white text-sm uppercase tracking-wide">
                        {item.category}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed pl-4 border-l-2 border-gray-300 dark:border-gray-600 group-hover/item:border-gray-900 dark:group-hover/item:border-gray-100 transition-colors duration-200">
                        {item.tech}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Decorative Element */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className={`h-2 bg-gradient-to-r ${section.gradient} rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-white rounded-2xl shadow-[8px_8px_0_0_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enterprise-Ready Architecture
              </span>
            </div>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                99.9% Uptime SLA
              </span>
            </div>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                SOC 2 Compliant
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArchitecturalHighlights;