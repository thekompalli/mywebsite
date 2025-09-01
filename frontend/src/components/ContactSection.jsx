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
    // Handle form submission (mock for now)
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const contactItems = [
    {
      icon: Mail,
      label: personalInfo.email,
      sublabel: "Email me directly",
      href: `mailto:${personalInfo.email}`,
      external: false
    },
    {
      icon: Phone,
      label: personalInfo.phone,
      sublabel: "Call me",
      href: `tel:${personalInfo.phone}`,
      external: false
    },
    {
      icon: Linkedin,
      label: "LinkedIn Profile",
      sublabel: "Connect with me",
      href: `https://${personalInfo.linkedin}`,
      external: true
    },
    {
      icon: MapPin,
      label: personalInfo.location,
      sublabel: "Currently based",
      href: null,
      external: false
    }
  ];

  return (
    <section id="contact" className="premium-spacing bg-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-black mb-12 section-heading leading-tight">
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
              {contactItems.map((item, index) => {
                const IconComponent = item.icon;
                const content = (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className={`flex items-center space-x-6 group ${item.href ? 'hover:text-gray-600 cursor-pointer' : ''} transition-colors duration-300`}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-black group-hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors duration-300"
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-black group-hover:text-gray-600 text-lg transition-colors duration-300">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-500 tracking-wide mt-1">{item.sublabel}</p>
                    </div>
                  </motion.div>
                );

                return item.href ? (
                  <a
                    key={index}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-50 p-12"
          >
            <h3 className="text-3xl font-bold text-black mb-10 section-heading">Get In Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-8">
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
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-3 tracking-wide">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all duration-300 bg-white text-lg"
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
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3 tracking-wide">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all duration-300 bg-white resize-none text-lg"
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
                className="w-full bg-black text-white py-4 px-8 font-medium hover:bg-gray-800 transition-colors duration-300 text-lg tracking-wide"
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