import React from 'react';
import { personalInfo } from '../data/mockData';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl font-bold text-black mb-8">
              Let's Create Something
              <br />
              Extraordinary Together
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Ready to transform your data into intelligent solutions? 
              I'm available for consulting, full-time opportunities, and collaborative projects.
            </p>
            
            <div className="space-y-6">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="flex items-center space-x-4 group hover:text-gray-600 transition-colors"
              >
                <div className="w-12 h-12 bg-black group-hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-black group-hover:text-gray-600">{personalInfo.email}</p>
                  <p className="text-sm text-gray-500">Email me directly</p>
                </div>
              </a>
              
              <a 
                href={`tel:${personalInfo.phone}`}
                className="flex items-center space-x-4 group hover:text-gray-600 transition-colors"
              >
                <div className="w-12 h-12 bg-black group-hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-black group-hover:text-gray-600">{personalInfo.phone}</p>
                  <p className="text-sm text-gray-500">Call me</p>
                </div>
              </a>
              
              <a 
                href={`https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 group hover:text-gray-600 transition-colors"
              >
                <div className="w-12 h-12 bg-black group-hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-black group-hover:text-gray-600">LinkedIn Profile</p>
                  <p className="text-sm text-gray-500">Connect with me</p>
                </div>
              </a>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-black">{personalInfo.location}</p>
                  <p className="text-sm text-gray-500">Currently based</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8">
            <h3 className="text-2xl font-bold text-black mb-6">Get In Touch</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white"
                  placeholder="Your company"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 font-medium hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;