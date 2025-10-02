import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from 'reactflow';

import 'reactflow/dist/style.css';

const APEXFrameworkShowcase = () => {
  const [isVertical, setIsVertical] = useState(false);

  // Define clean, well-spaced APEX framework layout
  const getHorizontalNodes = () => [
    // PRODUCT STRATEGY PHASE (Column 1)
    { id: 'A', type: 'default', position: { x: 100, y: 50 }, data: { label: 'Market Opportunity Analysis' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'B', type: 'default', position: { x: 100, y: 160 }, data: { label: 'Competitive Landscape Research' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'C', type: 'default', position: { x: 100, y: 270 }, data: { label: 'User Research & Persona Development' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'D', type: 'default', position: { x: 100, y: 380 }, data: { label: 'Problem-Solution Fit Validation' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'E', type: 'default', position: { x: 100, y: 490 }, data: { label: 'Business Case & ROI Analysis' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'F', type: 'default', position: { x: 100, y: 600 }, data: { label: 'Product Vision & Strategy Definition' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'G', type: 'default', position: { x: 100, y: 710 }, data: { label: 'Success Metrics & KPIs Definition' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },

    // PRODUCT PLANNING PHASE (Column 2)
    { id: 'H', type: 'default', position: { x: 380, y: 50 }, data: { label: 'Technical Feasibility Assessment' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'I', type: 'default', position: { x: 380, y: 160 }, data: { label: 'Data Strategy & AI Capability Mapping' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'J', type: 'default', position: { x: 380, y: 270 }, data: { label: 'Product Requirements Documentation' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'K', type: 'default', position: { x: 380, y: 380 }, data: { label: 'Feature Prioritization Framework' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'L', type: 'default', position: { x: 380, y: 490 }, data: { label: 'Product Roadmap Creation' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'M', type: 'default', position: { x: 380, y: 600 }, data: { label: 'Resource Planning & Team Formation' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },

    // DISCOVERY & VALIDATION PHASE (Column 3)
    { id: 'N', type: 'default', position: { x: 660, y: 50 }, data: { label: 'User Journey Mapping' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'O', type: 'default', position: { x: 660, y: 160 }, data: { label: 'Data Collection Strategy' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'P', type: 'default', position: { x: 660, y: 270 }, data: { label: 'Data Quality & Availability Assessment' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'Q', type: 'default', position: { x: 660, y: 380 }, data: { label: 'Sufficient Data Quality?' }, style: { background: '#ffeb3b', border: '2px solid #f57f17', borderRadius: '20px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'R', type: 'default', position: { x: 440, y: 480 }, data: { label: 'Data Acquisition/Enhancement Plan' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'S', type: 'default', position: { x: 660, y: 490 }, data: { label: 'Exploratory Data Analysis' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'T', type: 'default', position: { x: 660, y: 600 }, data: { label: 'AI Model Feasibility Testing' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'U', type: 'default', position: { x: 660, y: 710 }, data: { label: 'Technical Architecture Design' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },

    // PRODUCT DEVELOPMENT PHASE (Column 4)
    { id: 'V', type: 'default', position: { x: 940, y: 50 }, data: { label: 'User Stories & Acceptance Criteria' }, style: { background: '#fce4ec', border: '2px solid #c2185b', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'W', type: 'default', position: { x: 940, y: 160 }, data: { label: 'Feature Engineering & Data Preparation' }, style: { background: '#fce4ec', border: '2px solid #c2185b', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'X', type: 'default', position: { x: 940, y: 270 }, data: { label: 'Model Development & Training' }, style: { background: '#fce4ec', border: '2px solid #c2185b', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'Y', type: 'default', position: { x: 940, y: 380 }, data: { label: 'Model Evaluation & Validation' }, style: { background: '#fce4ec', border: '2px solid #c2185b', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'Z', type: 'default', position: { x: 940, y: 490 }, data: { label: 'Model Meets Success Criteria?' }, style: { background: '#ffeb3b', border: '2px solid #f57f17', borderRadius: '20px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'AA', type: 'default', position: { x: 720, y: 580 }, data: { label: 'Model Iteration & Optimization' }, style: { background: '#fce4ec', border: '2px solid #c2185b', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'BB', type: 'default', position: { x: 940, y: 600 }, data: { label: 'MVP Feature Set Definition' }, style: { background: '#fce4ec', border: '2px solid #c2185b', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },

    // PROTOTYPE & TESTING PHASE (Column 5)
    { id: 'CC', type: 'default', position: { x: 1220, y: 50 }, data: { label: 'Prototype Development' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'DD', type: 'default', position: { x: 1220, y: 160 }, data: { label: 'User Experience Design' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'EE', type: 'default', position: { x: 1220, y: 270 }, data: { label: 'Usability Testing' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'FF', type: 'default', position: { x: 1220, y: 380 }, data: { label: 'Stakeholder Feedback Collection' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'GG', type: 'default', position: { x: 1220, y: 490 }, data: { label: 'User Acceptance Achieved?' }, style: { background: '#ffeb3b', border: '2px solid #f57f17', borderRadius: '20px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'HH', type: 'default', position: { x: 1000, y: 580 }, data: { label: 'Feature Refinement' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'II', type: 'default', position: { x: 1220, y: 600 }, data: { label: 'Product-Market Fit Assessment' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },

    // GO-TO-MARKET PLANNING (Column 6)
    { id: 'JJ', type: 'default', position: { x: 1500, y: 50 }, data: { label: 'Pricing Strategy Development' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'KK', type: 'default', position: { x: 1500, y: 160 }, data: { label: 'Go-to-Market Strategy' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'LL', type: 'default', position: { x: 1500, y: 270 }, data: { label: 'Sales & Marketing Material Creation' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'MM', type: 'default', position: { x: 1500, y: 380 }, data: { label: 'Partnership & Integration Planning' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'NN', type: 'default', position: { x: 1500, y: 490 }, data: { label: 'Customer Success Strategy' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'OO', type: 'default', position: { x: 1500, y: 600 }, data: { label: 'Launch Plan & Timeline' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },

    // LAUNCH PHASE (Column 7) 
    { id: 'YY', type: 'default', position: { x: 1780, y: 50 }, data: { label: 'Soft Launch/Limited Release' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'ZZ', type: 'default', position: { x: 1780, y: 160 }, data: { label: 'Launch Metrics Monitoring' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'AAA', type: 'default', position: { x: 1780, y: 270 }, data: { label: 'Customer Onboarding Process' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'BBB', type: 'default', position: { x: 1780, y: 380 }, data: { label: 'Full Market Launch' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'CCC', type: 'default', position: { x: 1780, y: 490 }, data: { label: 'Marketing Campaign Execution' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'DDD', type: 'default', position: { x: 1780, y: 600 }, data: { label: 'Sales Enablement & Support' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },

    // POST-LAUNCH MANAGEMENT (Column 8)
    { id: 'EEE', type: 'default', position: { x: 2060, y: 50 }, data: { label: 'Product Analytics Implementation' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'FFF', type: 'default', position: { x: 2060, y: 160 }, data: { label: 'User Behavior Analysis' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'GGG', type: 'default', position: { x: 2060, y: 270 }, data: { label: 'Customer Feedback Collection' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'HHH', type: 'default', position: { x: 2060, y: 380 }, data: { label: 'Product Performance Review' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'III', type: 'default', position: { x: 2060, y: 490 }, data: { label: 'Performance Meets Goals?' }, style: { background: '#ffeb3b', border: '2px solid #f57f17', borderRadius: '20px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'JJJ', type: 'default', position: { x: 1840, y: 680 }, data: { label: 'Root Cause Analysis' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'KKK', type: 'default', position: { x: 1840, y: 790 }, data: { label: 'Product Optimization' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'LLL', type: 'default', position: { x: 2060, y: 600 }, data: { label: 'Feature Usage Analysis' }, style: { background: '#fce4ec', border: '2px solid #c2185b', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },

    // CONTINUOUS PRODUCT MANAGEMENT (Column 9)
    { id: 'MMM', type: 'default', position: { x: 2340, y: 50 }, data: { label: 'Model Drift Monitoring' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'NNN', type: 'default', position: { x: 2340, y: 160 }, data: { label: 'Competitive Analysis Updates' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'OOO', type: 'default', position: { x: 2340, y: 270 }, data: { label: 'Market Trend Analysis' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'PPP', type: 'default', position: { x: 2340, y: 380 }, data: { label: 'Customer Needs Evolution Assessment' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'QQQ', type: 'default', position: { x: 2340, y: 490 }, data: { label: 'New Opportunities Identified?' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '20px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'RRR', type: 'default', position: { x: 2620, y: 50 }, data: { label: 'Feature Roadmap Updates' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'SSS', type: 'default', position: { x: 2620, y: 160 }, data: { label: 'Stakeholder Alignment' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'TTT', type: 'default', position: { x: 2620, y: 270 }, data: { label: 'Development Sprint Planning' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'UUU', type: 'default', position: { x: 2620, y: 380 }, data: { label: 'Feature Development Cycle' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'VVV', type: 'default', position: { x: 2340, y: 600 }, data: { label: 'Product Health Monitoring' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
    { id: 'WWW', type: 'default', position: { x: 2340, y: 710 }, data: { label: 'Major Issues Detected?' }, style: { background: '#ffeb3b', border: '2px solid #f57f17', borderRadius: '20px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'XXX', type: 'default', position: { x: 2120, y: 800 }, data: { label: 'Issue Resolution Planning' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 220, height: 80 } },
  ];

  // Define vertical layout (same as horizontal for now - simplified)
  const getVerticalNodes = () => [
    // Vertical stack layout
    { id: 'strategy', type: 'default', position: { x: 600, y: 50 }, 
      data: { label: 'Product Strategy' }, 
      style: { background: '#e3f2fd', border: '3px solid #1976d2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 80, padding: '20px' } 
    },
    
    { id: 'planning', type: 'default', position: { x: 600, y: 180 }, 
      data: { label: 'Product Planning' }, 
      style: { background: '#fff3e0', border: '3px solid #f57c00', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 80, padding: '20px' } 
    },
    
    { id: 'discovery', type: 'default', position: { x: 600, y: 310 }, 
      data: { label: 'Discovery & Validation' }, 
      style: { background: '#f3e5f5', border: '3px solid #7b1fa2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 80, padding: '20px' } 
    },
    
    { id: 'development', type: 'default', position: { x: 600, y: 440 }, 
      data: { label: 'Product Development' }, 
      style: { background: '#fce4ec', border: '3px solid #c2185b', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 80, padding: '20px' } 
    },
    
    { id: 'prototype', type: 'default', position: { x: 600, y: 570 }, 
      data: { label: 'Prototype & Testing' }, 
      style: { background: '#e1f5fe', border: '3px solid #0277bd', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 80, padding: '20px' } 
    },
    
    { id: 'gtm', type: 'default', position: { x: 600, y: 700 }, 
      data: { label: 'Go-to-Market' }, 
      style: { background: '#f9fbe7', border: '3px solid #689f38', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 80, padding: '20px' } 
    },
    
    { id: 'production', type: 'default', position: { x: 600, y: 830 }, 
      data: { label: 'Production Development' }, 
      style: { background: '#ffebee', border: '3px solid #d32f2f', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 80, padding: '20px' } 
    },
    
    { id: 'launch', type: 'default', position: { x: 600, y: 960 }, 
      data: { label: 'Launch' }, 
      style: { background: '#c8e6c9', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 80, padding: '20px' } 
    },
    
    { id: 'postlaunch', type: 'default', position: { x: 600, y: 1090 }, 
      data: { label: 'Post-Launch Management' }, 
      style: { background: '#e8eaf6', border: '3px solid #3f51b5', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 80, padding: '20px' } 
    },
    
    { id: 'continuous', type: 'default', position: { x: 600, y: 1220 }, 
      data: { label: 'Continuous Management' }, 
      style: { background: '#f3e5f5', border: '3px solid #7b1fa2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 80, padding: '20px' } 
    },

    // Feedback loops
    { id: 'human_loop', type: 'default', position: { x: 300, y: 600 }, 
      data: { label: '👥 Human-in-the-Loop\nValidation' }, 
      style: { background: '#fff9c4', border: '3px solid #fbc02d', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' } 
    },
    
    { id: 'ai_feedback', type: 'default', position: { x: 1000, y: 600 }, 
      data: { label: '🤖 AI-Powered\nOptimization' }, 
      style: { background: '#e8f5e9', border: '3px solid #4caf50', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' } 
    },
  ];

  // Define complete edges based on mermaid flowchart specification
  const initialEdges = [
    // PRODUCT STRATEGY PHASE
    { id: 'e1', source: 'A', target: 'B', type: 'smoothstep' },
    { id: 'e2', source: 'B', target: 'C', type: 'smoothstep' },
    { id: 'e3', source: 'C', target: 'D', type: 'smoothstep' },
    { id: 'e4', source: 'D', target: 'E', type: 'smoothstep' },
    { id: 'e5', source: 'E', target: 'F', type: 'smoothstep' },
    { id: 'e6', source: 'F', target: 'G', type: 'smoothstep' },
    
    // PRODUCT PLANNING PHASE
    { id: 'e7', source: 'G', target: 'H', type: 'smoothstep' },
    { id: 'e8', source: 'H', target: 'I', type: 'smoothstep' },
    { id: 'e9', source: 'I', target: 'J', type: 'smoothstep' },
    { id: 'e10', source: 'J', target: 'K', type: 'smoothstep' },
    { id: 'e11', source: 'K', target: 'L', type: 'smoothstep' },
    { id: 'e12', source: 'L', target: 'M', type: 'smoothstep' },
    
    // DISCOVERY & VALIDATION PHASE
    { id: 'e13', source: 'M', target: 'N', type: 'smoothstep' },
    { id: 'e14', source: 'N', target: 'O', type: 'smoothstep' },
    { id: 'e15', source: 'O', target: 'P', type: 'smoothstep' },
    { id: 'e16', source: 'P', target: 'Q', type: 'smoothstep' },
    { id: 'e17', source: 'Q', target: 'R', label: 'No', type: 'smoothstep', style: { stroke: '#f44336' } },
    { id: 'e18', source: 'R', target: 'P', type: 'smoothstep', style: { stroke: '#f44336' } },
    { id: 'e19', source: 'Q', target: 'S', label: 'Yes', type: 'smoothstep', style: { stroke: '#4caf50' } },
    { id: 'e20', source: 'S', target: 'T', type: 'smoothstep' },
    { id: 'e21', source: 'T', target: 'U', type: 'smoothstep' },
    
    // PRODUCT DEVELOPMENT PHASE
    { id: 'e22', source: 'U', target: 'V', type: 'smoothstep' },
    { id: 'e23', source: 'V', target: 'W', type: 'smoothstep' },
    { id: 'e24', source: 'W', target: 'X', type: 'smoothstep' },
    { id: 'e25', source: 'X', target: 'Y', type: 'smoothstep' },
    { id: 'e26', source: 'Y', target: 'Z', type: 'smoothstep' },
    { id: 'e27', source: 'Z', target: 'AA', label: 'No', type: 'smoothstep', style: { stroke: '#f44336' } },
    { id: 'e28', source: 'AA', target: 'X', type: 'smoothstep', style: { stroke: '#f44336' } },
    { id: 'e29', source: 'Z', target: 'BB', label: 'Yes', type: 'smoothstep', style: { stroke: '#4caf50' } },
    
    // PROTOTYPE & TESTING PHASE
    { id: 'e30', source: 'BB', target: 'CC', type: 'smoothstep' },
    { id: 'e31', source: 'CC', target: 'DD', type: 'smoothstep' },
    { id: 'e32', source: 'DD', target: 'EE', type: 'smoothstep' },
    { id: 'e33', source: 'EE', target: 'FF', type: 'smoothstep' },
    { id: 'e34', source: 'FF', target: 'GG', type: 'smoothstep' },
    { id: 'e35', source: 'GG', target: 'HH', label: 'No', type: 'smoothstep', style: { stroke: '#f44336' } },
    { id: 'e36', source: 'HH', target: 'CC', type: 'smoothstep', style: { stroke: '#f44336' } },
    { id: 'e37', source: 'GG', target: 'II', label: 'Yes', type: 'smoothstep', style: { stroke: '#4caf50' } },
    
    // GO-TO-MARKET PLANNING
    { id: 'e38', source: 'II', target: 'JJ', type: 'smoothstep' },
    { id: 'e39', source: 'JJ', target: 'KK', type: 'smoothstep' },
    { id: 'e40', source: 'KK', target: 'LL', type: 'smoothstep' },
    { id: 'e41', source: 'LL', target: 'MM', type: 'smoothstep' },
    { id: 'e42', source: 'MM', target: 'NN', type: 'smoothstep' },
    { id: 'e43', source: 'NN', target: 'OO', type: 'smoothstep' },
    
    // PRODUCTION DEVELOPMENT
    { id: 'e44', source: 'OO', target: 'PP', type: 'smoothstep' },
    { id: 'e45', source: 'PP', target: 'QQ', type: 'smoothstep' },
    { id: 'e46', source: 'QQ', target: 'RR', type: 'smoothstep' },
    { id: 'e47', source: 'RR', target: 'SS', type: 'smoothstep' },
    { id: 'e48', source: 'SS', target: 'TT', type: 'smoothstep' },
    { id: 'e49', source: 'TT', target: 'UU', type: 'smoothstep' },
    { id: 'e50', source: 'UU', target: 'VV', type: 'smoothstep' },
    { id: 'e51', source: 'VV', target: 'WW', label: 'No', type: 'smoothstep', style: { stroke: '#f44336' } },
    { id: 'e52', source: 'WW', target: 'PP', type: 'smoothstep', style: { stroke: '#f44336' } },
    { id: 'e53', source: 'VV', target: 'XX', label: 'Yes', type: 'smoothstep', style: { stroke: '#4caf50' } },
    
    // LAUNCH PHASE
    { id: 'e54', source: 'XX', target: 'YY', type: 'smoothstep' },
    { id: 'e55', source: 'YY', target: 'ZZ', type: 'smoothstep' },
    { id: 'e56', source: 'ZZ', target: 'AAA', type: 'smoothstep' },
    { id: 'e57', source: 'AAA', target: 'BBB', type: 'smoothstep' },
    { id: 'e58', source: 'BBB', target: 'CCC', type: 'smoothstep' },
    { id: 'e59', source: 'CCC', target: 'DDD', type: 'smoothstep' },
    
    // POST-LAUNCH MANAGEMENT
    { id: 'e60', source: 'DDD', target: 'EEE', type: 'smoothstep' },
    { id: 'e61', source: 'EEE', target: 'FFF', type: 'smoothstep' },
    { id: 'e62', source: 'FFF', target: 'GGG', type: 'smoothstep' },
    { id: 'e63', source: 'GGG', target: 'HHH', type: 'smoothstep' },
    { id: 'e64', source: 'HHH', target: 'III', type: 'smoothstep' },
    { id: 'e65', source: 'III', target: 'JJJ', label: 'No', type: 'smoothstep', style: { stroke: '#f44336' } },
    { id: 'e66', source: 'JJJ', target: 'KKK', type: 'smoothstep', style: { stroke: '#f44336' } },
    { id: 'e67', source: 'KKK', target: 'FFF', type: 'smoothstep', style: { stroke: '#f44336' } },
    { id: 'e68', source: 'III', target: 'LLL', label: 'Yes', type: 'smoothstep', style: { stroke: '#4caf50' } },
    
    // CONTINUOUS PRODUCT MANAGEMENT
    { id: 'e69', source: 'LLL', target: 'MMM', type: 'smoothstep' },
    { id: 'e70', source: 'MMM', target: 'NNN', type: 'smoothstep' },
    { id: 'e71', source: 'NNN', target: 'OOO', type: 'smoothstep' },
    { id: 'e72', source: 'OOO', target: 'PPP', type: 'smoothstep' },
    { id: 'e73', source: 'PPP', target: 'QQQ', type: 'smoothstep' },
    { id: 'e74', source: 'QQQ', target: 'RRR', label: 'Yes', type: 'smoothstep', style: { stroke: '#4caf50' } },
    { id: 'e75', source: 'RRR', target: 'SSS', type: 'smoothstep' },
    { id: 'e76', source: 'SSS', target: 'TTT', type: 'smoothstep' },
    { id: 'e77', source: 'TTT', target: 'UUU', type: 'smoothstep' },
    { id: 'e78', source: 'UUU', target: 'LLL', type: 'smoothstep' },
    { id: 'e79', source: 'QQQ', target: 'VVV', label: 'No', type: 'smoothstep', style: { stroke: '#f44336' } },
    { id: 'e80', source: 'VVV', target: 'WWW', type: 'smoothstep' },
    { id: 'e81', source: 'WWW', target: 'XXX', label: 'Yes', type: 'smoothstep', style: { stroke: '#f44336' } },
    { id: 'e82', source: 'XXX', target: 'LLL', type: 'smoothstep', style: { stroke: '#f44336' } },
    { id: 'e83', source: 'WWW', target: 'LLL', label: 'No', type: 'smoothstep', style: { stroke: '#4caf50' } },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(getHorizontalNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Function to switch between vertical and horizontal layouts
  const toggleLayout = useCallback(() => {
    setIsVertical(!isVertical);
    if (!isVertical) {
      setNodes(getVerticalNodes());
    } else {
      setNodes(getHorizontalNodes());
    }
  }, [isVertical, setNodes]);

  // Function to reset to original layout
  const resetLayout = useCallback(() => {
    setIsVertical(false);
    setNodes(getHorizontalNodes());
  }, [setNodes]);

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="w-full px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-black dark:text-white section-heading mb-6 uppercase tracking-tight">
            AI Product Excellence Framework
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto uppercase tracking-wide mb-8">
            (APEX) - A comprehensive methodology for building successful AI products
          </p>
        </motion.div>

        {/* Control Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-8"
        >
          <button
            onClick={toggleLayout}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            {isVertical ? '📐 Switch to Horizontal' : '📏 Switch to Vertical'}
          </button>
          <button
            onClick={resetLayout}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            🔄 Reset Layout
          </button>
        </motion.div>

        {/* Interactive Flowchart Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Clean Flowchart Frame with Thin Bezels */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden border-2 border-gray-300 dark:border-gray-600" style={{
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1), 0 4px 20px rgba(0,0,0,0.15)'
          }}>
            {/* Flowchart Content Area */}
            <div className="h-[600px] md:h-[700px] relative">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodesDraggable={true}
                nodesConnectable={false}
                elementsSelectable={true}
                zoomOnScroll={true}
                panOnScroll={true}
                panOnDrag={true}
                fitView={true}
                fitViewOptions={{
                  padding: 0.2,
                  minZoom: 0.1,
                  maxZoom: 2
                }}
              >
                <Background variant="dots" gap={20} size={1} />
                <Controls 
                  className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                  showInteractive={false}
                />
                <MiniMap 
                  className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                  nodeColor={(node) => {
                    if (node.style?.background) return node.style.background;
                    return '#e5e7eb';
                  }}
                />
                <Panel position="top-right" className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 p-2 rounded border">
                  🔍 Zoom & Pan | 🖱️ Drag Nodes | 🚫 No New Connections
                </Panel>
              </ReactFlow>
            </div>
          </div>
        </motion.div>

        {/* Framework Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A structured approach to AI product development from conception to continuous management
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 border-2 border-blue-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Strategy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-100 border-2 border-orange-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Planning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-100 border-2 border-purple-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Discovery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-pink-100 border-2 border-pink-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Development</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-200 border-2 border-green-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Launch</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default APEXFrameworkShowcase;