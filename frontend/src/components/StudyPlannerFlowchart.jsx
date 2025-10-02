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

const StudyPlannerFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  // Define horizontal layout for Personalized Study Planner Engine
  const getHorizontalNodes = () => [
    // LEARNING ANALYTICS DATA SOURCES (Column 1)
    { id: 'A', type: 'default', position: { x: 100, y: 50 }, data: { label: 'Learning Management System' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'B', type: 'default', position: { x: 100, y: 150 }, data: { label: 'Assessment & Quiz Results' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'C', type: 'default', position: { x: 100, y: 250 }, data: { label: 'Study Session Tracking' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'D', type: 'default', position: { x: 100, y: 350 }, data: { label: 'Content Interaction Logs' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'E', type: 'default', position: { x: 100, y: 450 }, data: { label: 'Mobile App Usage Data' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'F', type: 'default', position: { x: 100, y: 550 }, data: { label: 'Calendar & Schedule Data' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'G', type: 'default', position: { x: 100, y: 650 }, data: { label: 'External Study Tools' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'H', type: 'default', position: { x: 100, y: 750 }, data: { label: 'Wearable Device Data' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // DATA AGGREGATION LAYER (Column 2)
    { id: 'DA', type: 'default', position: { x: 360, y: 400 }, data: { label: 'Data Aggregation Layer' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 180, height: 80 } },

    // STUDENT PROFILING ENGINE (Column 3)
    { id: 'I', type: 'default', position: { x: 620, y: 100 }, data: { label: 'Learning Style Classifier' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'J', type: 'default', position: { x: 620, y: 200 }, data: { label: 'Knowledge State Estimator' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'K', type: 'default', position: { x: 620, y: 300 }, data: { label: 'Cognitive Load Assessor' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'L', type: 'default', position: { x: 620, y: 400 }, data: { label: 'Attention Span Analyzer' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'M', type: 'default', position: { x: 620, y: 500 }, data: { label: 'Peak Performance Time Detector' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'N', type: 'default', position: { x: 620, y: 600 }, data: { label: 'Subject Affinity Mapper' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'O', type: 'default', position: { x: 620, y: 700 }, data: { label: 'Study Habit Pattern Extractor' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // AI PLANNING ENGINE (Column 4)
    { id: 'Z', type: 'default', position: { x: 880, y: 100 }, data: { label: 'Reinforcement Learning Scheduler' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'AA', type: 'default', position: { x: 880, y: 200 }, data: { label: 'Spaced Repetition Optimizer' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'BB', type: 'default', position: { x: 880, y: 300 }, data: { label: 'Forgetting Curve Predictor - Ebbinghaus' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 180, height: 70 } },
    { id: 'CC', type: 'default', position: { x: 880, y: 400 }, data: { label: 'Cognitive Load Balancer' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'DD', type: 'default', position: { x: 880, y: 500 }, data: { label: 'Mastery Learning Path Generator' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'EE', type: 'default', position: { x: 880, y: 600 }, data: { label: 'Multi-objective Optimization Engine' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 180, height: 70 } },

    // AI STRATEGIST & GENERATOR (Column 4.5)
    { id: 'FF', type: 'default', position: { x: 880, y: 700 }, data: { label: 'LLM Study Strategist - GPT-4/Claude' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 180, height: 70 } },
    { id: 'GG', type: 'default', position: { x: 1140, y: 450 }, data: { label: 'Adaptive Plan Generator' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'HH', type: 'default', position: { x: 1140, y: 550 }, data: { label: 'Real-time Plan Adjuster' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // PERSONALIZATION COMPONENTS (Column 5)
    { id: 'II', type: 'default', position: { x: 1400, y: 100 }, data: { label: 'Individual Goal Tracker' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'JJ', type: 'default', position: { x: 1400, y: 200 }, data: { label: 'Available Time Slot Optimizer' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'KK', type: 'default', position: { x: 1400, y: 300 }, data: { label: 'Energy Level Predictor' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'LL', type: 'default', position: { x: 1400, y: 400 }, data: { label: 'Subject Rotation Scheduler' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'MM', type: 'default', position: { x: 1400, y: 500 }, data: { label: 'Break & Rest Optimizer' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'NN', type: 'default', position: { x: 1400, y: 600 }, data: { label: 'Motivation & Reward System' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'OO', type: 'default', position: { x: 1400, y: 700 }, data: { label: 'Deadline Priority Manager' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // STUDY PLAN GENERATION (Column 6)
    { id: 'PP', type: 'default', position: { x: 1660, y: 100 }, data: { label: 'Daily Study Schedule Creator' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'QQ', type: 'default', position: { x: 1660, y: 200 }, data: { label: 'Weekly/Monthly Plan Builder' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'RR', type: 'default', position: { x: 1660, y: 300 }, data: { label: 'Exam Preparation Timeline' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'SS', type: 'default', position: { x: 1660, y: 400 }, data: { label: 'Review & Revision Scheduler' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'TT', type: 'default', position: { x: 1660, y: 500 }, data: { label: 'Practice Test Integrator' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'UU', type: 'default', position: { x: 1660, y: 600 }, data: { label: 'Micro-learning Session Planner' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'VV', type: 'default', position: { x: 1660, y: 700 }, data: { label: 'Long-term Retention Optimizer' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // STUDENT INTERFACE & ENGAGEMENT (Column 7)
    { id: 'III', type: 'default', position: { x: 1920, y: 100 }, data: { label: 'Interactive Study Dashboard' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'JJJ', type: 'default', position: { x: 1920, y: 200 }, data: { label: 'Mobile App - Study Companion' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'KKK', type: 'default', position: { x: 1920, y: 300 }, data: { label: 'Calendar Integration' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'LLL', type: 'default', position: { x: 1920, y: 400 }, data: { label: 'Gamified Progress Tracker' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'MMM', type: 'default', position: { x: 1920, y: 500 }, data: { label: 'Social Study Features' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'NNN', type: 'default', position: { x: 1920, y: 600 }, data: { label: 'AI Study Coach Chatbot' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'OOO', type: 'default', position: { x: 1920, y: 700 }, data: { label: 'Voice-activated Study Assistant' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 180, height: 70 } },

    // STORAGE & INFRASTRUCTURE (Bottom row)
    { id: 'BBBB', type: 'default', position: { x: 880, y: 800 }, data: { label: 'PostgreSQL - User Profiles & Plans' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'CCCC', type: 'default', position: { x: 1140, y: 800 }, data: { label: 'MongoDB - Content Metadata' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'DDDD', type: 'default', position: { x: 1400, y: 800 }, data: { label: 'Redis - Real-time State' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'EEEE', type: 'default', position: { x: 1660, y: 800 }, data: { label: 'Vector DB - Content Embeddings' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
  ];

  // Define vertical layout (simplified view)
  const getVerticalNodes = () => [
    { id: 'data_sources', type: 'default', position: { x: 600, y: 50 },
      data: { label: 'Learning Analytics Data Sources\n(LMS, Assessments, Study Sessions, Calendar)' },
      style: { background: '#e3f2fd', border: '3px solid #1976d2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'student_profiling', type: 'default', position: { x: 600, y: 200 },
      data: { label: 'Student Profiling Engine\n(Learning Style, Knowledge State, Performance)' },
      style: { background: '#f3e5f5', border: '3px solid #7b1fa2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'ai_planning', type: 'default', position: { x: 600, y: 350 },
      data: { label: 'AI Planning Engine\n(RL Scheduler, Spaced Repetition, Optimization)' },
      style: { background: '#e8f5e8', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'personalization', type: 'default', position: { x: 600, y: 500 },
      data: { label: 'Personalization Components\n(Goal Tracking, Time Optimization, Energy Prediction)' },
      style: { background: '#f9fbe7', border: '3px solid #689f38', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'plan_generation', type: 'default', position: { x: 600, y: 650 },
      data: { label: 'Study Plan Generation\n(Daily Schedules, Exam Prep, Review Planning)' },
      style: { background: '#e8eaf6', border: '3px solid #3f51b5', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'student_interface', type: 'default', position: { x: 600, y: 800 },
      data: { label: 'Student Interface & Engagement\n(Dashboard, Mobile App, AI Coach)' },
      style: { background: '#c8e6c9', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    // Side components for context
    { id: 'study_planner', type: 'default', position: { x: 300, y: 425 },
      data: { label: '📚 Study\nPlanner' },
      style: { background: '#fff9c4', border: '3px solid #fbc02d', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },

    { id: 'adaptive_scheduling', type: 'default', position: { x: 1000, y: 425 },
      data: { label: '⏰ Adaptive\nScheduling' },
      style: { background: '#e8f5e9', border: '3px solid #4caf50', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },
  ];

  // Define edges for the study planner flowchart
  const initialEdges = [
    // Data sources to aggregation layer
    { id: 'e1', source: 'A', target: 'DA', type: 'smoothstep' },
    { id: 'e2', source: 'B', target: 'DA', type: 'smoothstep' },
    { id: 'e3', source: 'C', target: 'DA', type: 'smoothstep' },
    { id: 'e4', source: 'D', target: 'DA', type: 'smoothstep' },
    { id: 'e5', source: 'E', target: 'DA', type: 'smoothstep' },
    { id: 'e6', source: 'F', target: 'DA', type: 'smoothstep' },
    { id: 'e7', source: 'G', target: 'DA', type: 'smoothstep' },
    { id: 'e8', source: 'H', target: 'DA', type: 'smoothstep' },

    // Student profiling engine
    { id: 'e9', source: 'DA', target: 'I', type: 'smoothstep' },
    { id: 'e10', source: 'I', target: 'J', type: 'smoothstep' },
    { id: 'e11', source: 'J', target: 'K', type: 'smoothstep' },
    { id: 'e12', source: 'K', target: 'L', type: 'smoothstep' },
    { id: 'e13', source: 'L', target: 'M', type: 'smoothstep' },
    { id: 'e14', source: 'M', target: 'N', type: 'smoothstep' },
    { id: 'e15', source: 'N', target: 'O', type: 'smoothstep' },

    // AI planning engine
    { id: 'e16', source: 'O', target: 'Z', type: 'smoothstep' },
    { id: 'e17', source: 'O', target: 'AA', type: 'smoothstep' },
    { id: 'e18', source: 'O', target: 'BB', type: 'smoothstep' },
    { id: 'e19', source: 'O', target: 'CC', type: 'smoothstep' },
    { id: 'e20', source: 'O', target: 'DD', type: 'smoothstep' },
    { id: 'e21', source: 'O', target: 'EE', type: 'smoothstep' },
    { id: 'e22', source: 'O', target: 'FF', type: 'smoothstep' },

    // AI planning to plan generation
    { id: 'e23', source: 'Z', target: 'GG', type: 'smoothstep' },
    { id: 'e24', source: 'AA', target: 'GG', type: 'smoothstep' },
    { id: 'e25', source: 'BB', target: 'GG', type: 'smoothstep' },
    { id: 'e26', source: 'CC', target: 'GG', type: 'smoothstep' },
    { id: 'e27', source: 'DD', target: 'GG', type: 'smoothstep' },
    { id: 'e28', source: 'EE', target: 'GG', type: 'smoothstep' },
    { id: 'e29', source: 'FF', target: 'GG', type: 'smoothstep' },

    { id: 'e30', source: 'GG', target: 'HH', type: 'smoothstep' },

    // Personalization components
    { id: 'e31', source: 'F', target: 'II', type: 'smoothstep' },
    { id: 'e32', source: 'II', target: 'JJ', type: 'smoothstep' },
    { id: 'e33', source: 'L', target: 'KK', type: 'smoothstep' },
    { id: 'e34', source: 'N', target: 'LL', type: 'smoothstep' },
    { id: 'e35', source: 'KK', target: 'MM', type: 'smoothstep' },
    { id: 'e36', source: 'LLL', target: 'NN', type: 'smoothstep' },
    { id: 'e37', source: 'II', target: 'OO', type: 'smoothstep' },

    // Study plan generation
    { id: 'e38', source: 'GG', target: 'PP', type: 'smoothstep' },
    { id: 'e39', source: 'PP', target: 'QQ', type: 'smoothstep' },
    { id: 'e40', source: 'QQ', target: 'RR', type: 'smoothstep' },
    { id: 'e41', source: 'RR', target: 'SS', type: 'smoothstep' },
    { id: 'e42', source: 'SS', target: 'TT', type: 'smoothstep' },
    { id: 'e43', source: 'TT', target: 'UU', type: 'smoothstep' },
    { id: 'e44', source: 'UU', target: 'VV', type: 'smoothstep' },

    // Student interface
    { id: 'e45', source: 'PP', target: 'III', type: 'smoothstep' },
    { id: 'e46', source: 'PP', target: 'JJJ', type: 'smoothstep' },
    { id: 'e47', source: 'PP', target: 'KKK', type: 'smoothstep' },
    { id: 'e48', source: 'VV', target: 'LLL', type: 'smoothstep' },
    { id: 'e49', source: 'MMM', target: 'MMM', type: 'smoothstep' },
    { id: 'e50', source: 'FF', target: 'NNN', type: 'smoothstep' },
    { id: 'e51', source: 'NNN', target: 'OOO', type: 'smoothstep' },

    // Storage connections
    { id: 'e52', source: 'DA', target: 'BBBB', type: 'smoothstep' },
    { id: 'e53', source: 'GG', target: 'CCCC', type: 'smoothstep' },
    { id: 'e54', source: 'HH', target: 'DDDD', type: 'smoothstep' },
    { id: 'e55', source: 'PP', target: 'EEEE', type: 'smoothstep' },
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
            Personalized Study Planner Engine
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto uppercase tracking-wide mb-8">
            Dynamic study planning combining learner profiling, curriculum intelligence, and adaptive scheduling
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
              AI-powered personalized study planning with adaptive scheduling and intelligent resource optimization
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 border-2 border-blue-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Data Sources</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-100 border-2 border-purple-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Profiling</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border-2 border-green-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">AI Planning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-lime-100 border-2 border-lime-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Personalization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-indigo-100 border-2 border-indigo-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Plan Generation</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudyPlannerFlowchart;