import React from 'react';
import { experience, testimonials } from '../data/mockData';

const ExperienceCard = ({ exp }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0 pb-8 last:pb-0">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
        <div className="lg:w-2/3">
          <h3 className="text-2xl font-bold text-black mb-2">{exp.title}</h3>
          <p className="text-lg text-gray-700 mb-1">{exp.company}</p>
          <p className="text-sm text-gray-500">{exp.location}</p>
        </div>
        <div className="mt-4 lg:mt-0 lg:text-right">
          <p className="text-sm font-medium text-black">{exp.period}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {exp.achievements.map((achievement, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-gray-600 leading-relaxed">{achievement}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white p-8 border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="mb-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full mb-4"></div>
        <h4 className="font-bold text-black mb-1">{testimonial.company}</h4>
        <p className="text-sm text-gray-500">{testimonial.name}</p>
      </div>
      
      <p className="text-gray-600 leading-relaxed italic">
        "{testimonial.text}"
      </p>
    </div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Experience Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-black mb-4">Partners</h2>
          <p className="text-gray-600 mb-12 max-w-3xl">
            I partner closely with industry-leading companies to deliver high-performing, 
            impactful AI and machine learning solutions for their customers, products, and business growth.
          </p>
          
          <div className="space-y-12">
            {experience.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;