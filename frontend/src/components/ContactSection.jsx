import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/mockData';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import Toast from './Toast';
import TranslatedText from './TranslatedText';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Using your actual Formspree form endpoint
      const formData_ = new FormData();
      formData_.append('name', formData.name);
      formData_.append('email', formData.email);
      formData_.append('company', formData.company);
      formData_.append('message', formData.message);
      
      const response = await fetch('https://formspree.io/f/mnnbzyqn', {
        method: 'POST',
        body: formData_,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setToast({
          isVisible: true,
          message: translations[language].toast.success,
          type: 'success'
        });
        // Clear the form
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      setToast({
        isVisible: true,
        message: translations[language].toast.error,
        type: 'error'
      });
    }
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <>
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onHide={hideToast}
      />
    <section id="contact" className="premium-spacing bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-black dark:text-white mb-12 section-heading leading-tight tracking-tight">
              <TranslatedText path="contact.title" enableCipher={true} />
              <br />
              <TranslatedText path="contact.subtitle" enableCipher={true} />
            </h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-12 leading-relaxed"
            >
              <TranslatedText path="contact.description" enableCipher={true} />
            </motion.p>
            
            <div className="space-y-8">
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                href={`mailto:${personalInfo.email}`}
                className="flex items-center space-x-6 group hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <div className="w-12 h-12 bg-black dark:bg-white group-hover:bg-gray-800 dark:group-hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <Mail className="w-6 h-6 text-white dark:text-black" />
                </div>
                <div>
                  <p className="font-medium text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 text-lg transition-colors">
                    {personalInfo.email}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 tracking-wide">
                    <TranslatedText path="contact.emailDirect" enableCipher={true} />
                  </p>
                </div>
              </motion.a>
              
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                href={`https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-6 group hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <div className="w-12 h-12 bg-black dark:bg-white group-hover:bg-gray-800 dark:group-hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <Linkedin className="w-6 h-6 text-white dark:text-black" />
                </div>
                <div>
                  <p className="font-medium text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 text-lg transition-colors">
                    LinkedIn Profile
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 tracking-wide">
                    <TranslatedText path="contact.connectWith" enableCipher={true} />
                  </p>
                </div>
              </motion.a>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center space-x-6"
              >
                <div className="w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white dark:text-black" />
                </div>
                <div>
                  <p className="font-medium text-black dark:text-white text-lg">{personalInfo.location}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 tracking-wide">
                    <TranslatedText path="contact.currentlyBased" enableCipher={true} />
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-10 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-black dark:text-white mb-8 section-heading">
              <TranslatedText path="contact.getInTouch" enableCipher={true} />
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6" netlify>
              {[
                { name: 'name', label: 'contact.name', type: 'text', placeholder: 'contact.namePlaceholder' },
                { name: 'email', label: 'contact.email', type: 'email', placeholder: 'contact.emailPlaceholder' },
                { name: 'company', label: 'contact.company', type: 'text', placeholder: 'contact.companyPlaceholder' }
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 tracking-wide">
                    <TranslatedText path={field.label} enableCipher={true} />
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white transition-all duration-300 bg-white dark:bg-gray-700 text-black dark:text-white"
                    placeholder={translations[language][field.placeholder.split('.')[0]][field.placeholder.split('.')[1]]}
                    required
                  />
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 tracking-wide">
                  <TranslatedText path="contact.projectDetails" enableCipher={true} />
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white transition-all duration-300 bg-white dark:bg-gray-700 text-black dark:text-white resize-none"
                  placeholder={translations[language].contact.messagePlaceholder}
                  required
                ></textarea>
              </motion.div>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-6 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300 tracking-wide"
              >
                <TranslatedText path="contact.sendMessage" enableCipher={true} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ContactSection;