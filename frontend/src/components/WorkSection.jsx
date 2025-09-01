import React from 'react';
import { projects } from '../data/mockData';

const ProjectCard = ({ project, index }) => {
  return (
    <div className="group relative overflow-hidden bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Project Visual Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">{index + 1}</span>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.company}</p>
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
      </div>
      
      <div className="p-6">
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <span 
              key={tagIndex}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="text-sm font-medium text-black">
          Impact: {project.impact}
        </div>
      </div>
    </div>
  );
};

const WorkSection = () => {
  return (
    <section id="work" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Featured Project */}
        <div className="mb-20">
          <p className="text-sm text-gray-500 mb-2">Featured Project</p>
          <div className="border-l-4 border-black pl-6">
            <h3 className="text-2xl font-bold text-black mb-2">
              {projects[0].title}
            </h3>
            <p className="text-sm text-gray-600 uppercase tracking-wide">
              {projects[0].tags.join(', ')}
            </p>
          </div>
        </div>

        {/* Work Grid */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-black mb-12">Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;