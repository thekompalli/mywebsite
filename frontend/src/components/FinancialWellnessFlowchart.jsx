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

const FinancialWellnessFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  // Define horizontal layout for Personalized Financial Wellness Coach
  const getHorizontalNodes = () => [
    // DATA AGGREGATION LAYER (Column 1)
    { id: 'A', type: 'default', position: { x: 100, y: 50 }, data: { label: 'Open Banking APIs' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'B', type: 'default', position: { x: 100, y: 150 }, data: { label: 'Credit Card APIs' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'C', type: 'default', position: { x: 100, y: 250 }, data: { label: 'Investment Platforms' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'D', type: 'default', position: { x: 100, y: 350 }, data: { label: 'Crypto Exchanges' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'E', type: 'default', position: { x: 100, y: 450 }, data: { label: 'Loan/Mortgage Data' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'F', type: 'default', position: { x: 100, y: 550 }, data: { label: 'Insurance Platforms' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'G', type: 'default', position: { x: 100, y: 650 }, data: { label: 'Manual Input Interface' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // ACCOUNT AGGREGATION SERVICE (Column 2)
    { id: 'DS', type: 'default', position: { x: 360, y: 350 }, data: { label: 'Account Aggregation Service' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 180, height: 80 } },

    // DATA PROCESSING PIPELINE (Column 3)
    { id: 'H', type: 'default', position: { x: 620, y: 150 }, data: { label: 'Data Standardization Engine' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'I', type: 'default', position: { x: 620, y: 250 }, data: { label: 'Transaction Categorization ML' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'J', type: 'default', position: { x: 620, y: 350 }, data: { label: 'Financial Pattern Detection' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'K', type: 'default', position: { x: 620, y: 450 }, data: { label: 'Behavioral Analytics Engine' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'L', type: 'default', position: { x: 620, y: 550 }, data: { label: 'Predictive Forecasting Models' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // AI COACHING ENGINE (Column 4)
    { id: 'M', type: 'default', position: { x: 880, y: 100 }, data: { label: 'Financial LLM Coach - GPT-4/Claude' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'N', type: 'default', position: { x: 880, y: 200 }, data: { label: 'Goal-based Planning Model' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'O', type: 'default', position: { x: 880, y: 300 }, data: { label: 'Risk Tolerance Assessor' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'P', type: 'default', position: { x: 880, y: 400 }, data: { label: 'Spending Behavior Analyzer' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'Q', type: 'default', position: { x: 880, y: 500 }, data: { label: 'Investment Recommendation Engine' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'R', type: 'default', position: { x: 880, y: 600 }, data: { label: 'Debt Optimization Model' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // AI INTERFACE & PERSONALIZATION (Column 5)
    { id: 'S', type: 'default', position: { x: 1140, y: 200 }, data: { label: 'Conversational AI Interface' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'T', type: 'default', position: { x: 1140, y: 300 }, data: { label: 'Personalization Engine' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'U', type: 'default', position: { x: 1140, y: 400 }, data: { label: 'Financial Health Scorer' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // FORECASTING & PLANNING (Column 6)
    { id: 'V', type: 'default', position: { x: 1400, y: 50 }, data: { label: 'Monte Carlo Simulation Engine' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'W', type: 'default', position: { x: 1400, y: 150 }, data: { label: 'Cash Flow Predictor' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'X', type: 'default', position: { x: 1400, y: 250 }, data: { label: 'Retirement Planning Calculator' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'Y', type: 'default', position: { x: 1400, y: 350 }, data: { label: 'Emergency Fund Optimizer' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'Z', type: 'default', position: { x: 1400, y: 450 }, data: { label: 'Goal Timeline Estimator' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'AA', type: 'default', position: { x: 1400, y: 550 }, data: { label: 'Tax Optimization Advisor' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // BEHAVIORAL INSIGHTS (Column 7)
    { id: 'BB', type: 'default', position: { x: 1660, y: 100 }, data: { label: 'Spending Pattern Analyzer' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'CC', type: 'default', position: { x: 1660, y: 200 }, data: { label: 'Financial Stress Detector' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'DD', type: 'default', position: { x: 1660, y: 300 }, data: { label: 'Habit Formation Tracker' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'EE', type: 'default', position: { x: 1660, y: 400 }, data: { label: 'Behavioral Nudge Engine' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'FF', type: 'default', position: { x: 1660, y: 500 }, data: { label: 'Milestone Achievement System' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // COACHING FEATURES (Column 8)
    { id: 'GG', type: 'default', position: { x: 1920, y: 100 }, data: { label: 'Interactive Chat Interface' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'HH', type: 'default', position: { x: 1920, y: 200 }, data: { label: 'Financial Education Content' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'II', type: 'default', position: { x: 1920, y: 300 }, data: { label: 'Actionable Recommendations' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'JJ', type: 'default', position: { x: 1920, y: 400 }, data: { label: 'Goal Setting & Tracking' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'KK', type: 'default', position: { x: 1920, y: 500 }, data: { label: 'Budget Creation & Monitoring' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'LL', type: 'default', position: { x: 1920, y: 600 }, data: { label: 'Investment Guidance' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // NOTIFICATION & ENGAGEMENT (Column 9)
    { id: 'NN', type: 'default', position: { x: 2180, y: 100 }, data: { label: 'Smart Alert System' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'OO', type: 'default', position: { x: 2180, y: 200 }, data: { label: 'Progress Notifications' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'PP', type: 'default', position: { x: 2180, y: 300 }, data: { label: 'Coaching Reminders' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'QQ', type: 'default', position: { x: 2180, y: 400 }, data: { label: 'Achievement Celebrations' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'RR', type: 'default', position: { x: 2180, y: 500 }, data: { label: 'Educational Push Content' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // STORAGE & ANALYTICS (Bottom row)
    { id: 'DDD', type: 'default', position: { x: 880, y: 750 }, data: { label: 'PostgreSQL - User Data' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'EEE', type: 'default', position: { x: 1140, y: 750 }, data: { label: 'Time-series DB - InfluxDB' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'FFF', type: 'default', position: { x: 1400, y: 750 }, data: { label: 'Vector Store - Chroma' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'GGG', type: 'default', position: { x: 1660, y: 750 }, data: { label: 'Redis - Session Cache' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'HHH', type: 'default', position: { x: 1920, y: 750 }, data: { label: 'Data Warehouse - BigQuery' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
  ];

  // Define vertical layout (simplified view)
  const getVerticalNodes = () => [
    { id: 'data_aggregation', type: 'default', position: { x: 600, y: 50 },
      data: { label: 'Data Aggregation\n(Banking, Investment, Crypto, Insurance)' },
      style: { background: '#e3f2fd', border: '3px solid #1976d2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'data_processing', type: 'default', position: { x: 600, y: 200 },
      data: { label: 'Data Processing\n(Standardization, Categorization, Pattern Detection)' },
      style: { background: '#f3e5f5', border: '3px solid #7b1fa2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'ai_coaching', type: 'default', position: { x: 600, y: 350 },
      data: { label: 'AI Coaching Engine\n(LLM Coach, Goal Planning, Risk Assessment)' },
      style: { background: '#e8f5e8', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'personalization', type: 'default', position: { x: 600, y: 500 },
      data: { label: 'AI Interface & Personalization\n(Conversational AI, Health Scoring)' },
      style: { background: '#e1f5fe', border: '3px solid #0277bd', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'forecasting', type: 'default', position: { x: 600, y: 650 },
      data: { label: 'Forecasting & Planning\n(Monte Carlo, Cash Flow, Retirement)' },
      style: { background: '#f9fbe7', border: '3px solid #689f38', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'behavioral_insights', type: 'default', position: { x: 600, y: 800 },
      data: { label: 'Behavioral Insights\n(Pattern Analysis, Nudges, Habits)' },
      style: { background: '#c8e6c9', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'coaching_features', type: 'default', position: { x: 600, y: 950 },
      data: { label: 'Coaching Features\n(Chat, Education, Recommendations)' },
      style: { background: '#e8eaf6', border: '3px solid #3f51b5', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'engagement', type: 'default', position: { x: 600, y: 1100 },
      data: { label: 'Notification & Engagement\n(Alerts, Progress, Achievements)' },
      style: { background: '#f3e5f5', border: '3px solid #7b1fa2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    // Side components for context
    { id: 'wellness_coach', type: 'default', position: { x: 300, y: 600 },
      data: { label: '💰 Financial\nWellness Coach' },
      style: { background: '#fff9c4', border: '3px solid #fbc02d', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },

    { id: 'personalized_ai', type: 'default', position: { x: 1000, y: 600 },
      data: { label: '🎯 Personalized\nAI Guidance' },
      style: { background: '#e8f5e9', border: '3px solid #4caf50', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },
  ];

  // Define edges for the financial wellness flowchart
  const initialEdges = [
    // Data sources to aggregation service
    { id: 'e1', source: 'A', target: 'DS', type: 'smoothstep' },
    { id: 'e2', source: 'B', target: 'DS', type: 'smoothstep' },
    { id: 'e3', source: 'C', target: 'DS', type: 'smoothstep' },
    { id: 'e4', source: 'D', target: 'DS', type: 'smoothstep' },
    { id: 'e5', source: 'E', target: 'DS', type: 'smoothstep' },
    { id: 'e6', source: 'F', target: 'DS', type: 'smoothstep' },
    { id: 'e7', source: 'G', target: 'DS', type: 'smoothstep' },

    // Data processing pipeline
    { id: 'e8', source: 'DS', target: 'H', type: 'smoothstep' },
    { id: 'e9', source: 'H', target: 'I', type: 'smoothstep' },
    { id: 'e10', source: 'I', target: 'J', type: 'smoothstep' },
    { id: 'e11', source: 'J', target: 'K', type: 'smoothstep' },
    { id: 'e12', source: 'K', target: 'L', type: 'smoothstep' },

    // Processing to AI models
    { id: 'e13', source: 'L', target: 'M', type: 'smoothstep' },
    { id: 'e14', source: 'L', target: 'N', type: 'smoothstep' },
    { id: 'e15', source: 'L', target: 'O', type: 'smoothstep' },
    { id: 'e16', source: 'L', target: 'P', type: 'smoothstep' },
    { id: 'e17', source: 'L', target: 'Q', type: 'smoothstep' },
    { id: 'e18', source: 'L', target: 'R', type: 'smoothstep' },

    // AI models to interface
    { id: 'e19', source: 'M', target: 'S', type: 'smoothstep' },
    { id: 'e20', source: 'N', target: 'T', type: 'smoothstep' },
    { id: 'e21', source: 'O', target: 'U', type: 'smoothstep' },
    { id: 'e22', source: 'P', target: 'U', type: 'smoothstep' },
    { id: 'e23', source: 'Q', target: 'U', type: 'smoothstep' },
    { id: 'e24', source: 'R', target: 'U', type: 'smoothstep' },

    // Processing to forecasting
    { id: 'e25', source: 'L', target: 'V', type: 'smoothstep' },
    { id: 'e26', source: 'V', target: 'W', type: 'smoothstep' },
    { id: 'e27', source: 'W', target: 'X', type: 'smoothstep' },
    { id: 'e28', source: 'X', target: 'Y', type: 'smoothstep' },
    { id: 'e29', source: 'Y', target: 'Z', type: 'smoothstep' },
    { id: 'e30', source: 'Z', target: 'AA', type: 'smoothstep' },

    // Pattern detection to behavioral insights
    { id: 'e31', source: 'J', target: 'BB', type: 'smoothstep' },
    { id: 'e32', source: 'BB', target: 'CC', type: 'smoothstep' },
    { id: 'e33', source: 'CC', target: 'DD', type: 'smoothstep' },
    { id: 'e34', source: 'DD', target: 'EE', type: 'smoothstep' },
    { id: 'e35', source: 'EE', target: 'FF', type: 'smoothstep' },

    // Interface to coaching features
    { id: 'e36', source: 'S', target: 'GG', type: 'smoothstep' },
    { id: 'e37', source: 'T', target: 'HH', type: 'smoothstep' },
    { id: 'e38', source: 'U', target: 'II', type: 'smoothstep' },
    { id: 'e39', source: 'N', target: 'JJ', type: 'smoothstep' },
    { id: 'e40', source: 'P', target: 'KK', type: 'smoothstep' },
    { id: 'e41', source: 'Q', target: 'LL', type: 'smoothstep' },

    // Behavioral insights to notifications
    { id: 'e42', source: 'EE', target: 'NN', type: 'smoothstep' },
    { id: 'e43', source: 'FF', target: 'OO', type: 'smoothstep' },
    { id: 'e44', source: 'S', target: 'PP', type: 'smoothstep' },
    { id: 'e45', source: 'FF', target: 'QQ', type: 'smoothstep' },
    { id: 'e46', source: 'HH', target: 'RR', type: 'smoothstep' },

    // Storage connections
    { id: 'e47', source: 'DS', target: 'DDD', type: 'smoothstep' },
    { id: 'e48', source: 'L', target: 'EEE', type: 'smoothstep' },
    { id: 'e49', source: 'S', target: 'FFF', type: 'smoothstep' },
    { id: 'e50', source: 'T', target: 'GGG', type: 'smoothstep' },
    { id: 'e51', source: 'J', target: 'HHH', type: 'smoothstep' },
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
            Personalized Financial Wellness Coach
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto uppercase tracking-wide mb-8">
            Goal-based planning, conversational coaching, and behavioral nudges for consumers
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
              AI-powered personal finance coaching with behavioral insights and goal-based planning
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 border-2 border-blue-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Data Sources</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-100 border-2 border-purple-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border-2 border-green-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">AI Coaching</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-cyan-100 border-2 border-cyan-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Personalization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-indigo-100 border-2 border-indigo-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Features</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinancialWellnessFlowchart;