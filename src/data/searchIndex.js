import { clientSegments, experience, projects, skills, education } from './mockData';

// Deep indexing function that extracts all searchable content from mock data
export const buildSearchIndex = () => {
  const index = [];

  // Index all industries and their products with deep content
  clientSegments.forEach(industry => {
    // Add industry itself
    index.push({
      title: industry.title,
      keywords: [
        industry.title.toLowerCase(),
        industry.description.toLowerCase(),
        ...industry.title.toLowerCase().split(' '),
        // Add variations
        industry.title.toLowerCase().replace('&', 'and'),
        // Multilingual industry terms
        industry.title === 'Fintech & Banking' ? ['fintech', 'banking', 'finance', 'финансы', '金融', 'finanzas', 'banque'] : [],
        industry.title === 'EdTech Platforms' ? ['edtech', 'education', 'learning', 'शिक्षा', '教育', 'educación', 'éducation'] : [],
        industry.title === 'Healthcare & Biotech' ? ['healthcare', 'health', 'biotech', 'medical', 'स्वास्थ्य', '医療', 'salud', 'santé'] : [],
        industry.title === 'Enterprise SaaS' ? ['enterprise', 'saas', 'business', 'software', 'एंटरप्राइज', '企業', 'empresa'] : []
      ].flat().filter(Boolean),
      section: 'work',
      type: 'industry',
      description: industry.description,
      data: { industryId: industry.id }
    });

    // Index all products within each industry
    if (industry.products) {
      industry.products.forEach(product => {
        // Extract all meaningful keywords from product
        const productKeywords = [
          product.title.toLowerCase(),
          product.summary.toLowerCase(),
          ...product.title.toLowerCase().split(' '),
          ...product.worksWellFor ? product.worksWellFor.toLowerCase().split(/[,\s]+/) : [],
          // Extract tech terms from description
          ...(product.fullDescription || '').toLowerCase().match(/\b[a-z]{4,}\b/g) || []
        ];

        index.push({
          title: product.title,
          keywords: [...new Set(productKeywords)], // Remove duplicates
          section: 'work',
          type: 'product',
          description: product.summary,
          industry: industry.title,
          data: { industryId: industry.id, productId: product.id }
        });

        // Index specific use cases and features from fullDescription
        if (product.fullDescription) {
          const sentences = product.fullDescription.split(/[.!?]+/).filter(s => s.trim().length > 20);
          sentences.slice(0, 5).forEach((sentence, idx) => {
            const cleanSentence = sentence.trim();
            if (cleanSentence.length > 30) {
              index.push({
                title: `${product.title} - ${cleanSentence.substring(0, 50)}...`,
                keywords: cleanSentence.toLowerCase().split(/\s+/).filter(w => w.length > 3),
                section: 'work',
                type: 'feature',
                description: cleanSentence,
                industry: industry.title,
                product: product.title,
                data: { industryId: industry.id, productId: product.id }
              });
            }
          });
        }
      });
    }
  });

  // Index all skills with deep categorization
  skills.forEach(skillCategory => {
    skillCategory.items.forEach(skill => {
      const skillKeywords = [
        skill.toLowerCase(),
        ...skill.toLowerCase().split(/[,\s()]+/),
        skillCategory.category.toLowerCase(),
        // Add tech-specific keywords
        skill.includes('Python') ? ['backend', 'scripting', 'pandas', 'numpy'] : [],
        skill.includes('TensorFlow') || skill.includes('PyTorch') ? ['deep learning', 'neural networks'] : [],
        skill.includes('AWS') || skill.includes('Azure') ? ['cloud', 'devops', 'deployment'] : [],
        skill.includes('SQL') ? ['database', 'query', 'data'] : []
      ].flat().filter(Boolean);

      index.push({
        title: skill,
        keywords: [...new Set(skillKeywords)],
        section: 'skills',
        type: 'skill',
        description: `${skillCategory.category}: ${skill}`,
        category: skillCategory.category
      });
    });

    // Also index the category itself
    index.push({
      title: skillCategory.category,
      keywords: [
        skillCategory.category.toLowerCase(),
        ...skillCategory.category.toLowerCase().split(/\s+/),
        ...skillCategory.items.flatMap(item => item.toLowerCase().split(/[,\s()]+/))
      ],
      section: 'skills',
      type: 'skill-category',
      description: `Category: ${skillCategory.category}`,
      items: skillCategory.items
    });
  });

  // Index all work experience with companies and achievements
  experience.forEach(exp => {
    // Index company/role
    index.push({
      title: `${exp.title} at ${exp.company}`,
      keywords: [
        exp.company.toLowerCase(),
        exp.title.toLowerCase(),
        exp.location.toLowerCase(),
        ...exp.title.toLowerCase().split(/\s+/),
        ...exp.company.toLowerCase().split(/\s+/),
        // Extract keywords from achievements
        ...exp.achievements.flatMap(a =>
          a.toLowerCase().match(/\b(ai|ml|llm|model|data|product|team|client|build|develop|design|improve|reduce|increase|lead|manage|implement)\b/g) || []
        )
      ],
      section: 'experience',
      type: 'company',
      description: `${exp.title} at ${exp.company} (${exp.period})`,
      data: { experienceId: exp.id }
    });

    // Index individual achievements
    exp.achievements.forEach((achievement, idx) => {
      index.push({
        title: `${exp.company} - Achievement`,
        keywords: achievement.toLowerCase().split(/\s+/).filter(w => w.length > 3),
        section: 'experience',
        type: 'achievement',
        description: achievement,
        company: exp.company,
        data: { experienceId: exp.id, achievementIndex: idx }
      });
    });
  });

  // Index all projects with technologies
  projects.forEach(project => {
    index.push({
      title: project.title,
      keywords: [
        project.title.toLowerCase(),
        project.description.toLowerCase(),
        project.company.toLowerCase(),
        project.impact.toLowerCase(),
        ...project.tags.map(t => t.toLowerCase()),
        ...project.title.toLowerCase().split(/\s+/),
        ...project.description.toLowerCase().split(/\s+/).filter(w => w.length > 3)
      ],
      section: 'work',
      type: 'project',
      description: project.description,
      impact: project.impact,
      tags: project.tags,
      data: { projectId: project.id }
    });
  });

  // Index education
  education.forEach(edu => {
    index.push({
      title: `${edu.degree} - ${edu.institution}`,
      keywords: [
        edu.degree.toLowerCase(),
        edu.institution.toLowerCase(),
        edu.location.toLowerCase(),
        ...edu.degree.toLowerCase().split(/\s+/),
        ...edu.institution.toLowerCase().split(/\s+/)
      ],
      section: 'resume',
      type: 'education',
      description: `${edu.degree} from ${edu.institution}`,
      data: { educationId: edu.id }
    });
  });

  // Add high-level navigation items
  const navItems = [
    { title: 'Work', keywords: ['work', 'projects', 'portfolio', 'what i do', 'capabilities', '作品', 'trabajo', 'travail'], section: 'work', type: 'section', description: 'View my work and projects' },
    { title: 'Experience', keywords: ['experience', 'companies', 'jobs', 'work history', 'where worked', 'career', '経験', 'experiencia', 'expérience'], section: 'experience', type: 'section', description: 'My professional experience' },
    { title: 'Skills', keywords: ['skills', 'capabilities', 'technologies', 'tech stack', 'what can do', 'expertise', 'スキル', 'habilidades', 'compétences'], section: 'skills', type: 'section', description: 'Technical skills and expertise' },
    { title: 'Flyers Soft', keywords: ['flyers soft', 'flyerssoft', 'current company', 'employer'], section: 'flyers-soft', type: 'section', description: 'About Flyers Soft' },
    { title: 'Resume', keywords: ['resume', 'cv', 'curriculum vitae', 'download', 'pdf', '履歴書', 'currículum', 'résumé'], section: 'resume', type: 'section', description: 'View or download resume' },
    { title: 'Contact', keywords: ['contact', 'email', 'reach out', 'get in touch', 'message', 'talk', '連絡', 'contacto', 'contacter'], section: 'contact', type: 'section', description: 'Get in touch' }
  ];

  index.push(...navItems);

  // Add action items
  const actions = [
    {
      title: 'Download Resume',
      keywords: ['download', 'resume', 'cv', 'pdf', 'get cv', 'get resume', 'download cv', 'télécharger', 'descargar', 'ダウンロード'],
      action: 'download-resume',
      type: 'action',
      description: 'Download my resume/CV'
    }
  ];

  index.push(...actions);

  // Add common search intents
  const intents = [
    { title: 'AI/ML Projects', keywords: ['ai projects', 'ml projects', 'machine learning work', 'artificial intelligence'], section: 'work', type: 'intent', description: 'View AI and ML projects' },
    { title: 'Healthcare Solutions', keywords: ['healthcare', 'medical ai', 'health tech', 'patient', 'clinical'], section: 'work', type: 'intent', description: 'Healthcare AI solutions' },
    { title: 'Fintech Products', keywords: ['fintech', 'banking', 'financial', 'payments', 'fraud'], section: 'work', type: 'intent', description: 'Financial technology products' },
    { title: 'Education Tech', keywords: ['edtech', 'education', 'learning', 'students', 'tutor', 'teaching'], section: 'work', type: 'intent', description: 'Educational technology solutions' },
    { title: 'Enterprise Tools', keywords: ['enterprise', 'business tools', 'workflow', 'automation', 'saas'], section: 'work', type: 'intent', description: 'Enterprise software solutions' }
  ];

  index.push(...intents);

  return index;
};
