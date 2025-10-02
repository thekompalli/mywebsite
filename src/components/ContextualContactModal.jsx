import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContextualContactModal = ({
  isOpen,
  onClose,
  context = 'general', // 'product', 'industry', 'general'
  contextData = {} // { productTitle, industryTitle, etc. }
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    budget: '',
    timeline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create contextual subject and message
      const contextualInfo = getContextualEmailInfo();

      // Prepare form data for Formspree
      const formData_ = new FormData();
      formData_.append('name', formData.name);
      formData_.append('email', formData.email);
      formData_.append('company', formData.company || 'Not specified');
      formData_.append('budget', formData.budget || 'Not specified');
      formData_.append('timeline', formData.timeline || 'Not specified');
      formData_.append('message', formData.message);
      formData_.append('subject', contextualInfo.subject);
      formData_.append('context_type', context);
      formData_.append('context_details', JSON.stringify(contextData));

      // Send to your existing Formspree endpoint
      const response = await fetch('https://formspree.io/f/mnnbzyqn', {
        method: 'POST',
        body: formData_,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Auto-close after 2 seconds
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            company: '',
            message: '',
            budget: '',
            timeline: ''
          });
        }, 2000);
      } else {
        throw new Error('Form submission failed');
      }

    } catch (error) {
      console.error('Error sending message:', error);
      setIsSubmitting(false);
      // You might want to show an error state here
      alert('Failed to send message. Please try again or contact directly via email.');
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getContextualEmailInfo = () => {
    switch (context) {
      case 'product':
        return {
          subject: `Product Inquiry: ${contextData.productTitle}`,
          contextSummary: `User is interested in building something similar to "${contextData.productTitle}"`
        };
      case 'industry':
        return {
          subject: `Custom ${contextData.industryTitle} Solution Inquiry`,
          contextSummary: `User wants a custom solution in ${contextData.industryTitle}`
        };
      default:
        return {
          subject: 'General Project Inquiry from Portfolio',
          contextSummary: 'General inquiry from portfolio website'
        };
    }
  };

  const getContextualContent = () => {
    switch (context) {
      case 'product':
        return {
          title: `Interested in ${contextData.productTitle}?`,
          subtitle: `Let's discuss building a similar solution for your needs`,
          placeholder: `I'm interested in building something similar to ${contextData.productTitle}. Here's what I have in mind...`,
          submitText: 'Send Product Inquiry'
        };
      case 'industry':
        return {
          title: `Custom ${contextData.industryTitle} Solution`,
          subtitle: `Tell me about your unique requirements in ${contextData.industryTitle.toLowerCase()}`,
          placeholder: `I need a custom solution for ${contextData.industryTitle.toLowerCase()}. My specific requirements are...`,
          submitText: 'Discuss Custom Solution'
        };
      default:
        return {
          title: 'Let\'s Build Something Amazing',
          subtitle: 'Tell me about your project and let\'s make it happen',
          placeholder: 'Describe your project, goals, and any specific requirements...',
          submitText: 'Start the Conversation'
        };
    }
  };

  const content = getContextualContent();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-gray-900 border-2 border-black dark:border-white shadow-[16px_16px_0_0_rgba(0,0,0,0.15)] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 text-center"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Thanks for reaching out. I'll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <div className="px-8 pt-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                      {content.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {content.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors"
                    placeholder="Your Company Name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                      Project Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors"
                    >
                      <option value="">Select budget range</option>
                      <option value="<10k">Under $10k</option>
                      <option value="10k-25k">$10k - $25k</option>
                      <option value="25k-50k">$25k - $50k</option>
                      <option value="50k-100k">$50k - $100k</option>
                      <option value="100k+">$100k+</option>
                      <option value="discuss">Let's discuss</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-3months">1-3 months</option>
                      <option value="3-6months">3-6 months</option>
                      <option value="6-12months">6-12 months</option>
                      <option value="12months+">12+ months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors resize-none"
                    placeholder={content.placeholder}
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    * Required fields
                  </p>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:border-gray-500 dark:hover:border-gray-400 transition-colors"
                    >
                      Cancel
                    </button>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm uppercase tracking-wide border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        content.submitText
                      )}
                    </motion.button>
                  </div>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContextualContactModal;