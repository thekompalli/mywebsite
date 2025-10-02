import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { clientSegments } from '../data/mockData';
import TranslatedText from './TranslatedText';
import MermaidDiagram from './MermaidDiagram';
import RiskScoringFlowchart from './RiskScoringFlowchart';
import FraudIntelligenceFlowchart from './FraudIntelligenceFlowchart';
import RegulatoryIntelligenceFlowchart from './RegulatoryIntelligenceFlowchart';
import FinancialWellnessFlowchart from './FinancialWellnessFlowchart';
import TransactionCategorizationFlowchart from './TransactionCategorizationFlowchart';
import LearningAnalyticsFlowchart from './LearningAnalyticsFlowchart';
import SemanticSearch from './SemanticSearch';
import AITutorFlowchart from './AITutorFlowchart';
import AssessmentFlowchart from './AssessmentFlowchart';
import EarlyWarningFlowchart from './EarlyWarningFlowchart';
import StudyPlannerFlowchart from './StudyPlannerFlowchart';
import ProjectManagementFlowchart from './ProjectManagementFlowchart';
import KnowledgeRetrievalFlowchart from './KnowledgeRetrievalFlowchart';
import WorkflowAutomationFlowchart from './WorkflowAutomationFlowchart';
import PerformanceAnalyticsFlowchart from './PerformanceAnalyticsFlowchart';
import EmployeeOnboardingFlowchart from './EmployeeOnboardingFlowchart';
import CareOrchestrationFlowchart from './CareOrchestrationFlowchart';
import MedicalImagingFlowchart from './MedicalImagingFlowchart';
import HospitalOperationsFlowchart from './HospitalOperationsFlowchart';
import BiomedicalKnowledgeFlowchart from './BiomedicalKnowledgeFlowchart';
import ClinicalTrialsFlowchart from './ClinicalTrialsFlowchart';
import APEXStrategyFlowchart from './APEXStrategyFlowchart';
import APEXPlanningFlowchart from './APEXPlanningFlowchart';
import APEXDiscoveryFlowchart from './APEXDiscoveryFlowchart';
import APEXDevelopmentFlowchart from './APEXDevelopmentFlowchart';
import APEXLaunchFlowchart from './APEXLaunchFlowchart';
import ContextualContactModal from './ContextualContactModal';

const WorkSection = () => {
  const ref = useRef(null);
  const workRef = useRef(null);
  const clientsRef = useRef(null);
  const detailRef = useRef(null);
  const isInView = useInView(ref, { once: true });
  const clientsInView = useInView(clientsRef, { once: true });
  const [activeSegment, setActiveSegment] = useState(null);
  const [activeProductId, setActiveProductId] = useState(null);
  const [isFromSearch, setIsFromSearch] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    context: 'general',
    contextData: {}
  });
  
  const { scrollYProgress } = useScroll({
    target: workRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1.2, 1.1, 0.9, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0.8]);

  const activeSegmentData = clientSegments.find(segment => segment.id === activeSegment);
  const activeProduct = activeSegmentData?.products?.find(product => product.id === activeProductId) || null;

  // Map product IDs and flowComponent names to their corresponding ReactFlow components
  const getFlowchartComponent = (product) => {
    // First check if product has flowComponent property (new approach)
    if (product.flowComponent) {
      const flowchartMap = {
        'LearningAnalyticsFlowchart': LearningAnalyticsFlowchart,
        'AITutorFlowchart': AITutorFlowchart,
        'AssessmentFlowchart': AssessmentFlowchart,
        'EarlyWarningFlowchart': EarlyWarningFlowchart,
        'StudyPlannerFlowchart': StudyPlannerFlowchart,
        'ProjectManagementFlowchart': ProjectManagementFlowchart,
        'KnowledgeRetrievalFlowchart': KnowledgeRetrievalFlowchart,
        'WorkflowAutomationFlowchart': WorkflowAutomationFlowchart,
        'PerformanceAnalyticsFlowchart': PerformanceAnalyticsFlowchart,
        'EmployeeOnboardingFlowchart': EmployeeOnboardingFlowchart,
        'CareOrchestrationFlowchart': CareOrchestrationFlowchart,
        'MedicalImagingFlowchart': MedicalImagingFlowchart,
        'HospitalOperationsFlowchart': HospitalOperationsFlowchart,
        'BiomedicalKnowledgeFlowchart': BiomedicalKnowledgeFlowchart,
        'ClinicalTrialsFlowchart': ClinicalTrialsFlowchart,
        'APEXStrategyFlowchart': APEXStrategyFlowchart,
        'APEXPlanningFlowchart': APEXPlanningFlowchart,
        'APEXDiscoveryFlowchart': APEXDiscoveryFlowchart,
        'APEXDevelopmentFlowchart': APEXDevelopmentFlowchart,
        'APEXLaunchFlowchart': APEXLaunchFlowchart,
      };
      return flowchartMap[product.flowComponent] || null;
    }

    // Fallback to product ID mapping (existing approach for fintech)
    const flowchartMap = {
      'fintech-risk': RiskScoringFlowchart,
      'fintech-fraud': FraudIntelligenceFlowchart,
      'fintech-compliance': RegulatoryIntelligenceFlowchart,
      'fintech-coach': FinancialWellnessFlowchart,
      'fintech-categorization': TransactionCategorizationFlowchart,
    };
    return flowchartMap[product.id] || null;
  };


  const handleSegmentClick = (segment) => {
    const hasDetails = segment.isFramework ||
      (Array.isArray(segment.details) && segment.details.length > 0) ||
      (Array.isArray(segment.products) && segment.products.length > 0);

    if (hasDetails) {
      setActiveSegment(segment.id);
    }
  };

  const handleBackToSegments = () => {
    setActiveSegment(null);
    setActiveProductId(null);
  };

  const handleBackToProducts = () => {
    setActiveProductId(null);
  };

  // Modal handlers
  const openProductModal = (product) => {
    setModalState({
      isOpen: true,
      context: 'product',
      contextData: {
        productTitle: product.title,
        productId: product.id
      }
    });
  };

  const openIndustryModal = (segment) => {
    setModalState({
      isOpen: true,
      context: 'industry',
      contextData: {
        industryTitle: segment.title,
        industryId: segment.id
      }
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      context: 'general',
      contextData: {}
    });
  };

  // Handlers for search result navigation
  const handleSearchSegmentSelect = (segment) => {
    setIsFromSearch(true);
    setActiveSegment(segment.id);
    setActiveProductId(null);

    // Smooth scroll to the results area
    setTimeout(() => {
      if (detailRef.current) {
        detailRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleSearchProductSelect = (segmentId, productId) => {
    setIsFromSearch(true);
    setActiveSegment(segmentId);
    // Delay setting product ID to ensure segment is set first
    setTimeout(() => {
      setActiveProductId(productId);
    }, 50);

    // Smooth scroll to the results area
    setTimeout(() => {
      if (detailRef.current) {
        detailRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 200);
  };


  useEffect(() => {
    if (activeSegment && detailRef.current) {
      detailRef.current.focus({ preventScroll: true });
    }
    // Only clear product ID if not coming from search
    if (!isFromSearch) {
      setActiveProductId(null);
    }
    // Reset the search flag
    setIsFromSearch(false);
  }, [activeSegment, isFromSearch]);

  return (
    <>
      {/* AI Product Development CTA */}
      <section className="py-32 md:py-40 lg:py-48 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 section-heading leading-none tracking-tight">
             PLANNING TO BUILD AN AI - PRODUCT?
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-400 dark:text-gray-500 tracking-tight mb-4">
                AI-powered product development.
              </p>
              <p className="text-xl sm:text-2xl text-gray-400 dark:text-gray-500 tracking-wide mb-10">
                From concept to deployment.
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block text-black dark:text-white font-semibold text-lg tracking-wide border-b-2 border-black dark:border-white pb-2 transition-all duration-300 hover:border-gray-600 dark:hover:border-gray-300"
              >
                Click here to get started &rarr;
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Large WORK Text with Zoom Effect */}
      <section id="work" className="premium-spacing overflow-hidden bg-gray-50 dark:bg-gray-900" ref={workRef}>
        <div className="w-full px-8 lg:px-12 flex items-center justify-center">
          <motion.h2
            style={{ scale, opacity }}
            className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[25rem] font-bold text-black dark:text-white section-heading leading-none tracking-tighter will-change-transform text-center"
          >
            <TranslatedText path="work.workTitle" enableCipher={true} />
          </motion.h2>
        </div>
      </section>

      {/* Client Segments - Now under WORK */}
      <section className="py-24 md:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <motion.div
            ref={clientsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={clientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold tracking-[0.4em] uppercase text-gray-500 dark:text-gray-400 mb-4">
              clients served
            </p>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white leading-tight tracking-tight">
              INDUSTRY PARTERNSHIPS ACROSS DATA-DRIVEN TEAMS
            </h3>
            <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              From regulatory-heavy fintech products to learning platforms and clinical environments, I build AI capabilities that align with each sector's pace and precision.
            </p>
          </motion.div>

          {/* Semantic Search Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={clientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <SemanticSearch
              onSegmentSelect={handleSearchSegmentSelect}
              onProductSelect={handleSearchProductSelect}
            />
          </motion.div>

          <AnimatePresence mode="wait">
            {activeSegmentData ? (
              <motion.div
                key="segment-detail"
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
                      onClick={handleBackToSegments}
                      className="inline-flex items-center text-sm font-semibold uppercase tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity"
                      aria-label="Back to client segments"
                    >
                      <span className="mr-2 text-lg">←</span> Back to all clients
                    </button>

                    <div className="mt-6 space-y-4">
                      <h4 className="text-2xl sm:text-3xl font-bold text-black dark:text-white uppercase tracking-tight">
                        {activeSegmentData.title}
                      </h4>
                      {activeSegmentData.description && !activeSegmentData.isFramework && (
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                          {activeSegmentData.description}
                        </p>
                      )}

                      {activeProduct && (
                        <button
                          type="button"
                          onClick={handleBackToProducts}
                          className="inline-flex items-center text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                          aria-label="Back to product list"
                        >
                          <span className="mr-2 text-base">↩</span>Back to {activeSegmentData.title} offerings
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 pb-8 flex-1 overflow-y-auto">
                    {activeProduct ? (
                      <motion.div
                        key={activeProduct.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-8"
                      >
                        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-[6px_6px_0_0_rgba(0,0,0,0.08)] overflow-hidden">
                          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                            <h5 className="text-xl font-semibold text-black dark:text-white tracking-tight">
                              {activeProduct.title}
                            </h5>
                            {(activeProduct.fullDescription || activeProduct.summary) && (
                              <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                {activeProduct.fullDescription || activeProduct.summary}
                              </p>
                            )}
                            {activeProduct.worksWellFor && (
                              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border-l-4 border-black dark:border-white">
                                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-2">
                                  Works well for
                                </p>
                                <p className="text-sm font-semibold text-black dark:text-white">
                                  {activeProduct.worksWellFor}
                                </p>
                              </div>
                            )}
                          </div>
                          {(() => {
                            const FlowchartComponent = getFlowchartComponent(activeProduct);
                            if (FlowchartComponent) {
                              return (
                                <div className="bg-gray-50 dark:bg-gray-900">
                                  <FlowchartComponent />
                                </div>
                              );
                            } else if (activeProduct.diagram) {
                              return (
                                <div className="bg-gray-50 dark:bg-gray-900 p-4">
                                  <div className="overflow-auto" style={{ minHeight: '760px', maxHeight: '70vh' }}>
                                    <div className="min-w-[1280px] min-h-[720px]">
                                      <MermaidDiagram chart={activeProduct.diagram} />
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          })()}

                          {/* Product CTA */}
                          <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                            <div className="text-center">
                              <p className="text-lg font-semibold text-black dark:text-white mb-4">
                                Liked this product? Want to build something like this?
                              </p>
                              <motion.button
                                onClick={() => openProductModal(activeProduct)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm uppercase tracking-wide border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all duration-300"
                              >
                                Contact Me Directly
                                <span className="ml-2">→</span>
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="space-y-8">
                        {/* Framework Detailed View */}
                        {activeSegmentData.isFramework ? (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                          >
                            {/* Detailed Description */}
                            <div>
                              <h4 className="text-xl font-bold text-black dark:text-white mb-4">
                                What is the APEX Framework?
                              </h4>
                              <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                                {activeSegmentData.detailedDescription.split('\n\n').map((paragraph, idx) => (
                                  <p key={idx}>{paragraph}</p>
                                ))}
                              </div>
                            </div>

                            {/* Framework Flowchart */}
                            <div>
                              <h4 className="text-xl font-bold text-black dark:text-white mb-4">
                                Framework Architecture
                              </h4>
                              <div className="border-2 border-black dark:border-white shadow-[8px_8px_0_0_rgba(0,0,0,0.08)] overflow-hidden">
                                <APEXStrategyFlowchart />
                              </div>
                            </div>

                            {/* Feedback CTA */}
                            <div className="text-center p-8 border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                              <p className="text-xl font-semibold text-black dark:text-white mb-2">
                                Like the architecture?
                              </p>
                              <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Have any concerns or questions about the APEX methodology?
                              </p>
                              <motion.button
                                onClick={() => setModalState({
                                  isOpen: true,
                                  context: 'general',
                                  contextData: {
                                    subject: 'APEX Framework Inquiry',
                                    context: 'User inquiring about the APEX Framework methodology'
                                  }
                                })}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center px-8 py-3 bg-gray-600 dark:bg-gray-500 text-white font-semibold text-sm uppercase tracking-wide border-2 border-gray-600 dark:border-gray-500 hover:bg-gray-700 dark:hover:bg-gray-400 transition-all duration-300"
                              >
                                Share Feedback
                                <span className="ml-2">→</span>
                              </motion.button>
                            </div>
                          </motion.div>
                        ) : (
                          <>
                            {Array.isArray(activeSegmentData.details) && activeSegmentData.details.length > 0 && (
                              <motion.ul
                                initial="hidden"
                                animate="visible"
                                variants={{
                                  hidden: { opacity: 0, y: 10 },
                                  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } }
                                }}
                                className="space-y-4 pr-2"
                              >
                                {activeSegmentData.details.map((item, idx) => (
                                  <motion.li
                                    key={idx}
                                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                                    className="text-base text-gray-700 dark:text-gray-200 leading-relaxed flex"
                                  >
                                    <span className="mr-3 text-black dark:text-white">•</span>
                                    <span>{item}</span>
                                  </motion.li>
                                ))}
                              </motion.ul>
                            )}

                            {Array.isArray(activeSegmentData.products) && activeSegmentData.products.length > 0 && (
                          <>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {activeSegmentData.products.map((product, productIndex) => (
                                <motion.button
                                  key={product.id}
                                  type="button"
                                  onClick={() => setActiveProductId(product.id)}
                                  initial={{ opacity: 0, y: 12 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: 0.05 * productIndex }}
                                  className="text-left border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-950 shadow-[4px_4px_0_0_rgba(0,0,0,0.08)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.12)] transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white p-6"
                                  aria-label={`View architecture for ${product.title}`}
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div>
                                      <p className="text-xs uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-3">Product Architecture</p>
                                      <h5 className="text-lg font-semibold text-black dark:text-white tracking-tight">
                                        {product.title}
                                      </h5>
                                      {product.summary && (
                                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                          {product.summary}
                                        </p>
                                      )}
                                      {product.worksWellFor && (
                                        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border-l-4 border-black dark:border-white">
                                          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-1">
                                            Works well for
                                          </p>
                                          <p className="text-sm font-medium text-black dark:text-white">
                                            {product.worksWellFor}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                    <span className="text-2xl leading-none text-gray-400 dark:text-gray-500">→</span>
                                  </div>
                                </motion.button>
                              ))}
                            </div>

                            {/* Industry CTA */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                              className="mt-12 p-8 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-950 text-center"
                            >
                              <p className="text-xl font-semibold text-black dark:text-white mb-2">
                                Don't see exactly what you're looking for?
                              </p>
                              <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Want to build something else in {activeSegmentData.title}?
                              </p>
                              <motion.button
                                onClick={() => openIndustryModal(activeSegmentData)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm uppercase tracking-wide border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all duration-300"
                              >
                                Let's Discuss Your Project
                                <span className="ml-2">→</span>
                              </motion.button>
                            </motion.div>
                          </>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="segment-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={clientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-8"
              >
                {/* First 4 Industry Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {clientSegments.slice(0, 4).map((segment, index) => {
                    const canOpen = (Array.isArray(segment.details) && segment.details.length > 0) ||
                      (Array.isArray(segment.products) && segment.products.length > 0);

                    return (
                      <motion.div
                        key={segment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={clientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        className={`group relative h-full border-2 border-black dark:border-white shadow-[8px_8px_0_0_rgba(0,0,0,0.08)] overflow-hidden ${canOpen ? 'cursor-pointer' : ''}`}
                        onClick={() => {
                          if (canOpen) {
                            handleSegmentClick(segment);
                          }
                        }}
                        onKeyDown={(event) => {
                          if (!canOpen) return;
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            handleSegmentClick(segment);
                          }
                        }}
                        role={canOpen ? 'button' : undefined}
                        tabIndex={canOpen ? 0 : -1}
                        aria-label={canOpen ? `View more about ${segment.title}` : undefined}
                      >
                        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />
                        {segment.background && (
                          <>
                            <div
                              className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{ backgroundImage: `url(${segment.background})` }}
                            />
                            <div className="absolute inset-0 bg-white/85 dark:bg-gray-900/85 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </>
                        )}

                        <div className="relative z-10 p-6 flex flex-col justify-between h-full transition-colors duration-300">
                          <div>
                            <h4 className="text-xl font-semibold text-black dark:text-white uppercase tracking-wide mb-4">
                              {segment.title}
                            </h4>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                              {segment.description}
                            </p>
                          </div>
                          {canOpen && (
                            <div className="mt-auto">
                              <span className="inline-flex items-center text-sm font-semibold text-black dark:text-white uppercase tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                                Learn More <span className="ml-2">→</span>
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* APEX Framework Box - Centered Below */}
                {clientSegments.length > 4 && (
                  <div className="flex justify-center">
                    <div className="w-full max-w-sm">
                      {clientSegments.slice(4).map((segment, index) => {
                        const canOpen = segment.isFramework ||
                          (Array.isArray(segment.details) && segment.details.length > 0) ||
                          (Array.isArray(segment.products) && segment.products.length > 0);

                        return (
                          <motion.div
                            key={segment.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={clientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                            className={`group relative h-full border border-gray-400 dark:border-gray-500 shadow-[4px_4px_0_0_rgba(0,0,0,0.05)] overflow-hidden ${canOpen ? 'cursor-pointer' : ''} hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.08)] transition-shadow duration-200`}
                            onClick={() => {
                              if (canOpen) {
                                handleSegmentClick(segment);
                              }
                            }}
                            onKeyDown={(event) => {
                              if (!canOpen) return;
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                handleSegmentClick(segment);
                              }
                            }}
                            role={canOpen ? 'button' : undefined}
                            tabIndex={canOpen ? 0 : -1}
                            aria-label={canOpen ? `View more about ${segment.title}` : undefined}
                          >
                            <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />
                            {segment.background && (
                              <>
                                <div
                                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                  style={{ backgroundImage: `url(${segment.background})` }}
                                />
                                <div className="absolute inset-0 bg-white/85 dark:bg-gray-900/85 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              </>
                            )}

                            <div className="relative z-10 p-5 flex flex-col justify-between h-full transition-colors duration-300">
                              <div>
                                <h4 className="text-lg font-semibold text-black dark:text-white uppercase tracking-wide mb-3">
                                  {segment.title}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                  {segment.description}
                                </p>
                              </div>
                              {canOpen && (
                                <div className="mt-auto">
                                  <span className="inline-flex items-center text-xs font-semibold text-black dark:text-white uppercase tracking-wide opacity-70 group-hover:opacity-100 transition-opacity">
                                    Learn More <span className="ml-2">→</span>
                                  </span>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Architectural Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={clientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400 mb-3">
                Technical Foundation
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white leading-tight tracking-tight">
                KEY ARCHITECTURAL HIGHLIGHTS
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI/ML Models Used */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={clientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h4 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide mb-5 border-b border-gray-200 dark:border-gray-700 pb-3">
                  AI/ML Models Used
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Large Language Models:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">GPT-4, Claude for conversational AI and complex reasoning</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Specialized Models:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">BioBERT, ClinicalBERT for healthcare; FinBERT for finance; CodeLlama for programming</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Computer Vision:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">GPT-4V for medical imaging, document analysis</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Traditional ML:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">XGBoost, Random Forest, Neural Networks for prediction tasks</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Vector Embeddings:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">E5, BGE for semantic search and retrieval</p>
                  </div>
                </div>
              </motion.div>

              {/* Modern Technology Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={clientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h4 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide mb-5 border-b border-gray-200 dark:border-gray-700 pb-3">
                  Modern Technology Stack
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Streaming:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Apache Kafka, Apache Flink for real-time processing</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Databases:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">PostgreSQL, MongoDB, Redis, Vector DBs (Pinecone, Weaviate)</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Search:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Elasticsearch for full-text search</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Analytics:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Time-series DBs (InfluxDB), Data warehouses (Snowflake, BigQuery)</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Security:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">End-to-end encryption, RBAC, audit trails</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Compliance:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">HIPAA, GDPR, SOX, PCI DSS frameworks</p>
                  </div>
                </div>
              </motion.div>

              {/* Architecture Patterns */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={clientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h4 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide mb-5 border-b border-gray-200 dark:border-gray-700 pb-3">
                  Architecture Patterns
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Microservices:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Scalable, modular design</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Event-driven:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Real-time data processing</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">RAG (Retrieval Augmented Generation):</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">For knowledge-based systems</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Multi-modal AI:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Text, voice, image processing</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Ensemble Models:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Multiple AI models for improved accuracy</p>
                  </div>
                </div>
              </motion.div>

              {/* Integration Capabilities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={clientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h4 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide mb-5 border-b border-gray-200 dark:border-gray-700 pb-3">
                  Integration Capabilities
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">APIs:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">RESTful, GraphQL, webhooks</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Enterprise Systems:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">ERP, CRM, HRIS integration</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Cloud Platforms:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">AWS, Azure, GCP compatibility</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-black dark:text-white text-sm mb-2">Communication:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Slack, Teams, email integration</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contextual Contact Modal */}
      <ContextualContactModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        context={modalState.context}
        contextData={modalState.contextData}
      />
    </>
  );
};

export default WorkSection;
