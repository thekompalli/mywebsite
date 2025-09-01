import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/mockData';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section id="contact" className="premium-spacing" style={{backgroundColor: '#FAFAFA'}}>
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-black mb-12 section-heading leading-tight tracking-tight">
              Let's Create Something
              <br />
              Extraordinary Together
            </h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-600 mb-12 leading-relaxed"
            >
              Ready to transform your data into intelligent solutions? 
              I'm available for consulting, full-time opportunities, and collaborative projects.
            </motion.p>
            
            <div className="space-y-8">
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                href={`mailto:${personalInfo.email}`}
                className="flex items-center space-x-6 group hover:text-gray-600 transition-colors"
              >
                <div className="w-12 h-12 bg-black group-hover:bg-gray-800 flex items-center justify-center transition-colors">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-black group-hover:text-gray-600 text-lg transition-colors">
                    {personalInfo.email}
                  </p>
                  <p className="text-sm text-gray-500 tracking-wide">Email me directly</p>
                </div>
              </motion.a>
              
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                href={`tel:${personalInfo.phone}`}
                className="flex items-center space-x-6 group hover:text-gray-600 transition-colors"
              >
                <div className="w-12 h-12 bg-black group-hover:bg-gray-800 flex items-center justify-center transition-colors">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-black group-hover:text-gray-600 text-lg transition-colors">
                    {personalInfo.phone}
                  </p>
                  <p className="text-sm text-gray-500 tracking-wide">Call me</p>
                </div>
              </motion.a>
              
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                href={`https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-6 group hover:text-gray-600 transition-colors"
              >
                <div className="w-12 h-12 bg-black group-hover:bg-gray-800 flex items-center justify-center transition-colors">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-black group-hover:text-gray-600 text-lg transition-colors">
                    LinkedIn Profile
                  </p>
                  <p className="text-sm text-gray-500 tracking-wide">Connect with me</p>
                </div>
              </motion.a>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex items-center space-x-6"
              >
                <div className="w-12 h-12 bg-black flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-black text-lg">{personalInfo.location}</p>
                  <p className="text-sm text-gray-500 tracking-wide">Currently based</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-10 border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-black mb-8 section-heading">Get In Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                { name: 'company', label: 'Company', type: 'text', placeholder: 'Your company' }
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all duration-300 bg-white"
                    placeholder={field.placeholder}
                    required
                  />
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all duration-300 bg-white resize-none"
                  placeholder="Tell me about your project..."
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
                className="w-full bg-black text-white py-3 px-6 font-medium hover:bg-gray-800 transition-colors duration-300 tracking-wide"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;