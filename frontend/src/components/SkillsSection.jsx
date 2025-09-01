import React from 'react';
import { skills, education } from '../data/mockData';

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Skills */}
          <div>
            <h2 className="text-4xl font-bold text-black mb-8">Capabilities</h2>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="border-l-4 border-black pl-6">
                  <p className="text-gray-700 leading-relaxed">{skill}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-4xl font-bold text-black mb-8">Education</h2>
            <div className="space-y-8">
              {education.map((edu) => (
                <div key={edu.id} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-black mb-1">{edu.degree}</h3>
                    <p className="text-gray-700 font-medium">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-black text-white px-3 py-1 text-sm font-medium">
                      {edu.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;