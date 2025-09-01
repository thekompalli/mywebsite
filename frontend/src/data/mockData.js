// Mock data for Krishna's portfolio website
export const personalInfo = {
  name: "Krishna KOMPALLI",
  title: "Lead Data Scientist | Machine Learning & AI Specialist",
  location: "Paris, France",
  email: "gk.kompalli@gmail.com",
  linkedin: "linkedin.com/in/krishna-kompalli/",
  aboutMe: "Senior Data Scientist and ML Engineer with deep expertise in developing and deploying advanced machine learning solutions across healthcare, fintech, and education domains. Over 5+ years of hands-on experience building production-ready AI systems, from research and experimentation to scalable deployment. Proven track record of leading technical initiatives, mentoring junior data scientists, and translating complex analytical insights into impactful business outcomes."
};

export const skills = [
  "Programming Languages: Python, R, SQL, Java, JavaScript",
  "Frameworks & Tools: TensorFlow, PyTorch, LangChain, LangFlow, OpenCV, N8N, AirFlow, MLFlow & LlamaIndex",
  "Cloud & Deployment: SaaS product development, AWS and Azure",
  "Machine Learning Techniques: Tree-based models (Random Forest, XGBoost), Clustering (K-means, DBSCAN), Time Series Forecasting, Regression Analysis, Anomaly Detection, Deep Learning (LSTM, CNNs)",
  "Data Expertise: Large-scale datasets, Temporal data analysis, Unstructured data processing (text, images), Cross-sectional analysis"
];

export const experience = [
  {
    id: 1,
    title: "Lead Data Scientist",
    company: "Flyers Soft Pvt. Ltd.",
    period: "2023 - Present",
    location: "Remote",
    achievements: [
      "Defined the technical AI roadmap, leading a team of 4 to deliver 5 major client-facing features in under 2 years",
      "Automated end-to-end ML pipelines, reducing model deployment time from 4 weeks to less than 1 week",
      "Achieved a 75% project conversion rate by building and presenting over 8 client-facing proof-of-concept models",
      "Optimized a core recommendation engine, increasing click-through rate (CTR) by 22% and reducing latency by 30%",
      "Pioneered fine-tuned LLM applications, creating a support agent to handle 20% of queries and a tool to save clients 70+ hours weekly"
    ]
  },
  {
    id: 2,
    title: "AI Product Manager",
    company: "Flyers Soft Pvt. Ltd.",
    period: "2024 - Present",
    location: "Remote",
    achievements: [
      "Building something great - leading AI product strategy and development",
      "Driving product vision for next-generation AI solutions",
      "Collaborating with cross-functional teams to deliver innovative AI products",
      "Translating complex AI capabilities into user-friendly product features"
    ]
  },
  {
    id: 3,
    title: "Developer Advocate (Product)",
    company: "Eden AI",
    period: "2025 - Present",
    location: "Lyon, France",
    achievements: [
      "Promoted product adoption by creating compelling content, tutorials, and technical documentation",
      "Bridged client and development teams to facilitate user-centric product enhancements",
      "Created educational video content showcasing AI/ML integrations and best practices"
    ]
  },
  {
    id: 4,
    title: "Founding Team Member (AI Solutions)",
    company: "Oncourse AI",
    period: "Feb 2023 - Aug 2023",
    location: "Bengaluru, India",
    achievements: [
      "Developed Turing, an AI-driven data science server, enhancing the efficiency and scalability of educational solutions",
      "Integrated advanced AI models to deliver robust, scalable solutions tailored to client needs"
    ]
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "MFine",
    period: "2022 - 2023 (10 months)",
    location: "India",
    achievements: [
      "Developed a 'Smart Search Bar' using BERT, improving search accuracy by 30%",
      "Designed AI solutions for yoga pose verification using OpenCV, achieving a 90% success rate"
    ]
  },
  {
    id: 6,
    title: "Software Engineer",
    company: "Temenos India Pvt. Ltd.",
    period: "2021-2022 (1.4 years)",
    location: "India",
    achievements: [
      "Built AI-powered virtual assistants for global banking clients using RASA, boosting operational efficiency by 40%",
      "Enhanced chatbot interfaces for better user experience, achieving a 95% client satisfaction rate"
    ]
  }
];

export const education = [
  {
    id: 1,
    degree: "Programme Grande Ecole (Management, Product)",
    institution: "EMLyon Business School",
    location: "Lyon, France",
    year: "2024"
  },
  {
    id: 2,
    degree: "Master of Science (Machine Learning & AI)",
    institution: "Liverpool John Moores University",
    location: "UK",
    year: "2022"
  },
  {
    id: 3,
    degree: "PG Diploma (Machine Learning & AI)",
    institution: "IIIT",
    location: "Bengaluru, India",
    year: "2021"
  },
  {
    id: 4,
    degree: "Bachelor of Technology (Electronics & Communication Engineering)",
    institution: "SRM University",
    location: "Chennai, India",
    year: "2020"
  }
];

export const projects = [
  {
    id: 1,
    title: "LLM Support Agent",
    company: "Flyers Soft",
    description: "Fine-tuned LLM application handling 20% of customer queries",
    tags: ["LLM", "Fine-tuning", "Customer Support", "NLP"],
    impact: "Reduced support team workload by 20%"
  },
  {
    id: 2,
    title: "Recommendation Engine Optimization",
    company: "Flyers Soft",
    description: "Optimized core recommendation system for improved performance",
    tags: ["Machine Learning", "Optimization", "Recommendation Systems"],
    impact: "22% CTR increase, 30% latency reduction"
  },
  {
    id: 3,
    title: "Plant Disease Detection with YOLO v11",
    company: "Personal Project",
    description: "Advanced computer vision model for detecting plant diseases using state-of-the-art YOLO v11 architecture",
    tags: ["Computer Vision", "YOLO", "Agriculture Tech", "Python"],
    impact: "High-accuracy disease detection for agricultural applications"
  },
  {
    id: 4,
    title: "Student Motion Tracking System",
    company: "Personal Project", 
    description: "AI-powered system for tracking student engagement and motion in educational environments",
    tags: ["Computer Vision", "Motion Tracking", "Education Tech", "Python"],
    impact: "Enhanced learning analytics and engagement monitoring"
  },
  {
    id: 5,
    title: "Coffee Machine Failure Prediction",
    company: "Personal Project",
    description: "Predictive maintenance model for coffee machines using machine learning algorithms",
    tags: ["Predictive Analytics", "IoT", "Machine Learning", "Python"],
    impact: "Preventive maintenance optimization and cost reduction"
  },
  {
    id: 6,
    title: "GitHub Critic AI System",
    company: "Personal Project",
    description: "AI-powered code review and analysis tool with FastAPI backend and Streamlit frontend",
    tags: ["AI", "Code Analysis", "FastAPI", "Streamlit"],
    impact: "Automated code quality assessment and improvement suggestions"
  },
  {
    id: 7,
    title: "Smart Search Bar",
    company: "MFine",
    description: "BERT-powered search functionality for healthcare platform",
    tags: ["BERT", "NLP", "Search", "Healthcare"],
    impact: "30% improvement in search accuracy"
  },
  {
    id: 8,
    title: "Llama2 RAG Fusion System",
    company: "Personal Project",
    description: "Advanced Retrieval-Augmented Generation system using Llama2 for enhanced AI responses",
    tags: ["RAG", "Llama2", "NLP", "Jupyter"],
    impact: "Enhanced AI response accuracy with document-based context"
  },
  {
    id: 9,
    title: "COVID-19 Data Visualizer",
    company: "Personal Project",
    description: "Comprehensive data visualization dashboard for COVID-19 statistics and trends",
    tags: ["Data Visualization", "TypeScript", "Analytics", "Public Health"],
    impact: "Real-time pandemic data insights and trend analysis"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Senior Manager",
    company: "Flyers Soft",
    text: "Krishna's technical leadership and innovative approach to ML solutions have been instrumental in our product success. His ability to translate complex AI concepts into business value is exceptional."
  },
  {
    id: 2,
    name: "Product Team",
    company: "Eden AI",
    text: "As a Developer Advocate, Krishna excels at bridging the gap between technical complexity and user understanding. His content and tutorials have significantly improved our product adoption."
  },
  {
    id: 3,
    name: "Engineering Team",
    company: "MFine",
    text: "Krishna's work on our Smart Search Bar transformed user experience. His deep understanding of NLP and practical implementation skills make him a valuable team member."
  }
];