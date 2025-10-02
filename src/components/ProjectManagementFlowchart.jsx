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

const ProjectManagementFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  // Define horizontal layout for AI-powered Project Management Copilot
  const getHorizontalNodes = () => [
    // PROJECT DATA SOURCES (Column 1)
    { id: 'A', type: 'default', position: { x: 100, y: 50 }, data: { label: 'Project Management Tools - Jira/Asana' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'B', type: 'default', position: { x: 100, y: 150 }, data: { label: 'Git Repositories & Code Commits' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'C', type: 'default', position: { x: 100, y: 250 }, data: { label: 'Team Communication - Slack/Teams' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'D', type: 'default', position: { x: 100, y: 350 }, data: { label: 'Calendar & Meeting Systems' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'E', type: 'default', position: { x: 100, y: 450 }, data: { label: 'Time Tracking Applications' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'F', type: 'default', position: { x: 100, y: 550 }, data: { label: 'Document Management Systems' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'G', type: 'default', position: { x: 100, y: 650 }, data: { label: 'Email & Collaboration Tools' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'H', type: 'default', position: { x: 100, y: 750 }, data: { label: 'Resource Planning Systems' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // DATA INTEGRATION HUB (Column 2)
    { id: 'DS', type: 'default', position: { x: 360, y: 400 }, data: { label: 'Data Integration Hub' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 180, height: 80 } },

    // REAL-TIME PROJECT ANALYTICS (Column 3)
    { id: 'I', type: 'default', position: { x: 620, y: 150 }, data: { label: 'Project State Analyzer' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'J', type: 'default', position: { x: 620, y: 250 }, data: { label: 'Task Dependency Mapper' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'K', type: 'default', position: { x: 620, y: 350 }, data: { label: 'Progress Tracking Engine' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'L', type: 'default', position: { x: 620, y: 450 }, data: { label: 'Velocity & Burndown Calculator' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'M', type: 'default', position: { x: 620, y: 550 }, data: { label: 'Resource Utilization Monitor' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'N', type: 'default', position: { x: 620, y: 650 }, data: { label: 'Risk & Blocker Detector' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'O', type: 'default', position: { x: 620, y: 750 }, data: { label: 'Timeline Prediction Engine' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // AI TASK MANAGEMENT ENGINE (Column 4)
    { id: 'P', type: 'default', position: { x: 880, y: 100 }, data: { label: 'Task Breakdown AI - GPT-4/Claude' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'Q', type: 'default', position: { x: 880, y: 200 }, data: { label: 'Story Point Estimation Model' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'R', type: 'default', position: { x: 880, y: 300 }, data: { label: 'Task Priority Classifier' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'S', type: 'default', position: { x: 880, y: 400 }, data: { label: 'Effort Estimation Engine' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'T', type: 'default', position: { x: 880, y: 500 }, data: { label: 'Task Similarity Matcher' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'U', type: 'default', position: { x: 880, y: 600 }, data: { label: 'Dependency Prediction Model' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // AI PLANNING ASSISTANTS (Column 4.5)
    { id: 'V', type: 'default', position: { x: 880, y: 700 }, data: { label: 'Project Planning LLM' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'W', type: 'default', position: { x: 1140, y: 450 }, data: { label: 'Sprint Planning Assistant' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'X', type: 'default', position: { x: 1140, y: 550 }, data: { label: 'Backlog Optimization Engine' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // AUTOMATED TASK BREAKDOWN (Column 5)
    { id: 'Y', type: 'default', position: { x: 1400, y: 100 }, data: { label: 'Epic Decomposition Engine' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'Z', type: 'default', position: { x: 1400, y: 200 }, data: { label: 'User Story Generator' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'AA', type: 'default', position: { x: 1400, y: 300 }, data: { label: 'Acceptance Criteria Creator' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'BB', type: 'default', position: { x: 1400, y: 400 }, data: { label: 'Subtask Identification System' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'CC', type: 'default', position: { x: 1400, y: 500 }, data: { label: 'Technical Task Extractor' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'DD', type: 'default', position: { x: 1400, y: 600 }, data: { label: 'Testing Task Generator' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'EE', type: 'default', position: { x: 1400, y: 700 }, data: { label: 'Documentation Task Creator' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // STATUS SUMMARIZATION SYSTEM (Column 6)
    { id: 'FF', type: 'default', position: { x: 1660, y: 100 }, data: { label: 'Progress Report Generator' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'GG', type: 'default', position: { x: 1660, y: 200 }, data: { label: 'Milestone Status Tracker' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'HH', type: 'default', position: { x: 1660, y: 300 }, data: { label: 'Team Performance Summarizer' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'II', type: 'default', position: { x: 1660, y: 400 }, data: { label: 'Risk & Issue Aggregator' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'JJ', type: 'default', position: { x: 1660, y: 500 }, data: { label: 'Burndown Chart Analyzer' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'KK', type: 'default', position: { x: 1660, y: 600 }, data: { label: 'Velocity Trend Reporter' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'LL', type: 'default', position: { x: 1660, y: 700 }, data: { label: 'Executive Dashboard Creator' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // AI COPILOT INTERFACE (Column 7)
    { id: 'HHH', type: 'default', position: { x: 1920, y: 200 }, data: { label: 'Conversational Project Assistant' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'III', type: 'default', position: { x: 1920, y: 300 }, data: { label: 'Natural Language Query Processor' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 180, height: 70 } },
    { id: 'JJJ', type: 'default', position: { x: 1920, y: 400 }, data: { label: 'Voice Command Interface' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'KKK', type: 'default', position: { x: 1920, y: 500 }, data: { label: 'Visual Project Dashboard' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'LLL', type: 'default', position: { x: 1920, y: 600 }, data: { label: 'Interactive Planning Board' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // STORAGE & INFRASTRUCTURE (Bottom row)
    { id: 'PPPP', type: 'default', position: { x: 880, y: 850 }, data: { label: 'PostgreSQL - Project Data' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'QQQQ', type: 'default', position: { x: 1140, y: 850 }, data: { label: 'MongoDB - Documents & Artifacts' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 180, height: 70 } },
    { id: 'RRRR', type: 'default', position: { x: 1400, y: 850 }, data: { label: 'Redis - Real-time Cache' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'SSSS', type: 'default', position: { x: 1660, y: 850 }, data: { label: 'Vector DB - Embeddings' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
  ];

  // Define vertical layout (simplified view)
  const getVerticalNodes = () => [
    { id: 'data_sources', type: 'default', position: { x: 600, y: 50 },
      data: { label: 'Project Data Sources\n(Jira, Git, Slack, Calendar, Time Tracking)' },
      style: { background: '#e3f2fd', border: '3px solid #1976d2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'real_time_analytics', type: 'default', position: { x: 600, y: 200 },
      data: { label: 'Real-time Project Analytics\n(State Analysis, Progress Tracking, Risk Detection)' },
      style: { background: '#f3e5f5', border: '3px solid #7b1fa2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'ai_task_management', type: 'default', position: { x: 600, y: 350 },
      data: { label: 'AI Task Management Engine\n(Task Breakdown, Estimation, Planning)' },
      style: { background: '#e8f5e8', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'automated_breakdown', type: 'default', position: { x: 600, y: 500 },
      data: { label: 'Automated Task Breakdown\n(Epic Decomposition, Story Generation)' },
      style: { background: '#f9fbe7', border: '3px solid #689f38', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'status_summarization', type: 'default', position: { x: 600, y: 650 },
      data: { label: 'Status Summarization System\n(Reports, Dashboards, Analytics)' },
      style: { background: '#e8eaf6', border: '3px solid #3f51b5', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'ai_copilot', type: 'default', position: { x: 600, y: 800 },
      data: { label: 'AI Copilot Interface\n(Conversational Assistant, Voice Commands)' },
      style: { background: '#c8e6c9', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    // Side components for context
    { id: 'project_copilot', type: 'default', position: { x: 300, y: 425 },
      data: { label: '🤖 Project\nCopilot' },
      style: { background: '#fff9c4', border: '3px solid #fbc02d', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },

    { id: 'intelligent_automation', type: 'default', position: { x: 1000, y: 425 },
      data: { label: '⚡ Intelligent\nAutomation' },
      style: { background: '#e8f5e9', border: '3px solid #4caf50', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },
  ];

  // Define edges for the project management flowchart
  const initialEdges = [
    // Data sources to data integration hub
    { id: 'e1', source: 'A', target: 'DS', type: 'smoothstep' },
    { id: 'e2', source: 'B', target: 'DS', type: 'smoothstep' },
    { id: 'e3', source: 'C', target: 'DS', type: 'smoothstep' },
    { id: 'e4', source: 'D', target: 'DS', type: 'smoothstep' },
    { id: 'e5', source: 'E', target: 'DS', type: 'smoothstep' },
    { id: 'e6', source: 'F', target: 'DS', type: 'smoothstep' },
    { id: 'e7', source: 'G', target: 'DS', type: 'smoothstep' },
    { id: 'e8', source: 'H', target: 'DS', type: 'smoothstep' },

    // Real-time project analytics pipeline
    { id: 'e9', source: 'DS', target: 'I', type: 'smoothstep' },
    { id: 'e10', source: 'I', target: 'J', type: 'smoothstep' },
    { id: 'e11', source: 'J', target: 'K', type: 'smoothstep' },
    { id: 'e12', source: 'K', target: 'L', type: 'smoothstep' },
    { id: 'e13', source: 'L', target: 'M', type: 'smoothstep' },
    { id: 'e14', source: 'M', target: 'N', type: 'smoothstep' },
    { id: 'e15', source: 'N', target: 'O', type: 'smoothstep' },

    // AI task management engine
    { id: 'e16', source: 'O', target: 'P', type: 'smoothstep' },
    { id: 'e17', source: 'O', target: 'Q', type: 'smoothstep' },
    { id: 'e18', source: 'O', target: 'R', type: 'smoothstep' },
    { id: 'e19', source: 'O', target: 'S', type: 'smoothstep' },
    { id: 'e20', source: 'O', target: 'T', type: 'smoothstep' },
    { id: 'e21', source: 'O', target: 'U', type: 'smoothstep' },
    { id: 'e22', source: 'O', target: 'V', type: 'smoothstep' },

    // AI planning assistants
    { id: 'e23', source: 'P', target: 'W', type: 'smoothstep' },
    { id: 'e24', source: 'Q', target: 'W', type: 'smoothstep' },
    { id: 'e25', source: 'R', target: 'W', type: 'smoothstep' },
    { id: 'e26', source: 'S', target: 'W', type: 'smoothstep' },
    { id: 'e27', source: 'T', target: 'W', type: 'smoothstep' },
    { id: 'e28', source: 'U', target: 'W', type: 'smoothstep' },
    { id: 'e29', source: 'V', target: 'W', type: 'smoothstep' },

    { id: 'e30', source: 'W', target: 'X', type: 'smoothstep' },

    // Automated task breakdown
    { id: 'e31', source: 'P', target: 'Y', type: 'smoothstep' },
    { id: 'e32', source: 'Y', target: 'Z', type: 'smoothstep' },
    { id: 'e33', source: 'Z', target: 'AA', type: 'smoothstep' },
    { id: 'e34', source: 'AA', target: 'BB', type: 'smoothstep' },
    { id: 'e35', source: 'BB', target: 'CC', type: 'smoothstep' },
    { id: 'e36', source: 'CC', target: 'DD', type: 'smoothstep' },
    { id: 'e37', source: 'DD', target: 'EE', type: 'smoothstep' },

    // Status summarization system
    { id: 'e38', source: 'K', target: 'FF', type: 'smoothstep' },
    { id: 'e39', source: 'L', target: 'GG', type: 'smoothstep' },
    { id: 'e40', source: 'M', target: 'HH', type: 'smoothstep' },
    { id: 'e41', source: 'N', target: 'II', type: 'smoothstep' },
    { id: 'e42', source: 'L', target: 'JJ', type: 'smoothstep' },
    { id: 'e43', source: 'L', target: 'KK', type: 'smoothstep' },
    { id: 'e44', source: 'FF', target: 'LL', type: 'smoothstep' },

    // AI copilot interface
    { id: 'e45', source: 'V', target: 'HHH', type: 'smoothstep' },
    { id: 'e46', source: 'HHH', target: 'III', type: 'smoothstep' },
    { id: 'e47', source: 'III', target: 'JJJ', type: 'smoothstep' },
    { id: 'e48', source: 'FF', target: 'KKK', type: 'smoothstep' },
    { id: 'e49', source: 'X', target: 'LLL', type: 'smoothstep' },

    // Storage connections
    { id: 'e50', source: 'DS', target: 'PPPP', type: 'smoothstep' },
    { id: 'e51', source: 'F', target: 'QQQQ', type: 'smoothstep' },
    { id: 'e52', source: 'HHH', target: 'RRRR', type: 'smoothstep' },
    { id: 'e53', source: 'V', target: 'SSSS', type: 'smoothstep' },
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
            AI-powered Project Management Copilot
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto uppercase tracking-wide mb-8">
            Intelligent task breakdown, automated planning, and real-time project intelligence for teams
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
              AI-powered project management with intelligent task breakdown and automated planning workflows
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 border-2 border-blue-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Data Sources</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-100 border-2 border-purple-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border-2 border-green-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">AI Models</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-lime-100 border-2 border-lime-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Task Breakdown</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-indigo-100 border-2 border-indigo-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Status & Reports</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectManagementFlowchart;