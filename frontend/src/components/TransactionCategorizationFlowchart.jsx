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

const TransactionCategorizationFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  // Define horizontal layout for AI-powered Transaction Categorization Engine
  const getHorizontalNodes = () => [
    // DATA INPUT SOURCES (Column 1)
    { id: 'A', type: 'default', position: { x: 100, y: 50 }, data: { label: 'Bank Transaction Feeds' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'B', type: 'default', position: { x: 100, y: 150 }, data: { label: 'Credit Card Networks' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'C', type: 'default', position: { x: 100, y: 250 }, data: { label: 'Payment Processors' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'D', type: 'default', position: { x: 100, y: 350 }, data: { label: 'POS System Data' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'E', type: 'default', position: { x: 100, y: 450 }, data: { label: 'E-commerce Platforms' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'F', type: 'default', position: { x: 100, y: 550 }, data: { label: 'Mobile Payment Apps' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'G', type: 'default', position: { x: 100, y: 650 }, data: { label: 'Expense Management Tools' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // TRANSACTION INGESTION API (Column 2)
    { id: 'DS', type: 'default', position: { x: 360, y: 350 }, data: { label: 'Transaction Ingestion API' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 180, height: 80 } },

    // REAL-TIME PROCESSING PIPELINE (Column 3)
    { id: 'H', type: 'default', position: { x: 620, y: 200 }, data: { label: 'Apache Kafka Streams' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'I', type: 'default', position: { x: 620, y: 300 }, data: { label: 'Data Validation & Cleaning' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'J', type: 'default', position: { x: 620, y: 400 }, data: { label: 'Transaction Enrichment Service' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'K', type: 'default', position: { x: 620, y: 500 }, data: { label: 'Feature Extraction Engine' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'L', type: 'default', position: { x: 620, y: 600 }, data: { label: 'Real-time ML Pipeline' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // AI CLASSIFICATION ENGINE (Column 4)
    { id: 'M', type: 'default', position: { x: 880, y: 100 }, data: { label: 'BERT-based Transaction Classifier' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'N', type: 'default', position: { x: 880, y: 200 }, data: { label: 'Ensemble Random Forest Model' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'O', type: 'default', position: { x: 880, y: 300 }, data: { label: 'Neural Network Category Predictor' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'P', type: 'default', position: { x: 880, y: 400 }, data: { label: 'Few-shot Learning Model' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'Q', type: 'default', position: { x: 880, y: 500 }, data: { label: 'Rule-based Classification Engine' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // LLM & CONFIDENCE (Column 5)
    { id: 'R', type: 'default', position: { x: 1140, y: 200 }, data: { label: 'LLM Merchant Analyzer - GPT-4' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'S', type: 'default', position: { x: 1140, y: 300 }, data: { label: 'Confidence Scoring System' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'T', type: 'default', position: { x: 1140, y: 400 }, data: { label: 'Active Learning Framework' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // MERCHANT INTELLIGENCE (Column 6)
    { id: 'U', type: 'default', position: { x: 1400, y: 100 }, data: { label: 'Merchant Database - Factual/Foursquare' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'V', type: 'default', position: { x: 1400, y: 200 }, data: { label: 'Web Scraping & Research Engine' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'W', type: 'default', position: { x: 1400, y: 300 }, data: { label: 'Business Category Mapper' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'X', type: 'default', position: { x: 1400, y: 400 }, data: { label: 'Location-based Context Engine' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'Y', type: 'default', position: { x: 1400, y: 500 }, data: { label: 'Merchant Reputation Scorer' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // ANOMALY DETECTION SYSTEM (Column 7)
    { id: 'Z', type: 'default', position: { x: 1660, y: 100 }, data: { label: 'Isolation Forest Anomaly Detector' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'AA', type: 'default', position: { x: 1660, y: 200 }, data: { label: 'Statistical Outlier Detection' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'BB', type: 'default', position: { x: 1660, y: 300 }, data: { label: 'Behavioral Pattern Analyzer' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'CC', type: 'default', position: { x: 1660, y: 400 }, data: { label: 'Fraud Risk Assessor' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'DD', type: 'default', position: { x: 1660, y: 500 }, data: { label: 'Expense Policy Violation Detector' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // USER FEEDBACK LOOP (Column 8)
    { id: 'EE', type: 'default', position: { x: 1920, y: 100 }, data: { label: 'Manual Correction Interface' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'FF', type: 'default', position: { x: 1920, y: 200 }, data: { label: 'User Preference Learning' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'GG', type: 'default', position: { x: 1920, y: 300 }, data: { label: 'Custom Category Creator' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'HH', type: 'default', position: { x: 1920, y: 400 }, data: { label: 'Feedback Collection API' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'II', type: 'default', position: { x: 1920, y: 500 }, data: { label: 'Model Retraining Trigger' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // BUSINESS INTELLIGENCE (Column 9)
    { id: 'JJ', type: 'default', position: { x: 2180, y: 100 }, data: { label: 'Spending Analytics Engine' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'KK', type: 'default', position: { x: 2180, y: 200 }, data: { label: 'Trend Analysis Module' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'LL', type: 'default', position: { x: 2180, y: 300 }, data: { label: 'Budget vs Actual Tracker' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'MM', type: 'default', position: { x: 2180, y: 400 }, data: { label: 'Tax Deduction Identifier' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'NN', type: 'default', position: { x: 2180, y: 500 }, data: { label: 'Cash Flow Forecaster' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // ALERT & NOTIFICATION (Bottom left)
    { id: 'PP', type: 'default', position: { x: 880, y: 650 }, data: { label: 'Smart Alert Engine' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'QQ', type: 'default', position: { x: 1140, y: 650 }, data: { label: 'Anomaly Notifications' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'RR', type: 'default', position: { x: 1400, y: 650 }, data: { label: 'Budget Threshold Alerts' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // API & INTEGRATION (Bottom right)
    { id: 'UU', type: 'default', position: { x: 1920, y: 650 }, data: { label: 'RESTful Categorization API' }, style: { background: '#fff8e1', border: '2px solid #ffa000', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'VV', type: 'default', position: { x: 2180, y: 650 }, data: { label: 'Webhook Event Publisher' }, style: { background: '#fff8e1', border: '2px solid #ffa000', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
  ];

  // Define vertical layout (simplified view)
  const getVerticalNodes = () => [
    { id: 'data_sources', type: 'default', position: { x: 600, y: 50 },
      data: { label: 'Data Input Sources\n(Banks, Cards, POS, E-commerce, Mobile)' },
      style: { background: '#e3f2fd', border: '3px solid #1976d2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'processing_pipeline', type: 'default', position: { x: 600, y: 200 },
      data: { label: 'Real-time Processing\n(Kafka, Validation, Enrichment, Feature Extraction)' },
      style: { background: '#f3e5f5', border: '3px solid #7b1fa2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'ai_classification', type: 'default', position: { x: 600, y: 350 },
      data: { label: 'AI Classification Engine\n(BERT, Random Forest, Neural Network, Rules)' },
      style: { background: '#e8f5e8', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'llm_confidence', type: 'default', position: { x: 600, y: 500 },
      data: { label: 'LLM & Confidence System\n(Merchant Analysis, Scoring, Active Learning)' },
      style: { background: '#e1f5fe', border: '3px solid #0277bd', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'merchant_intelligence', type: 'default', position: { x: 600, y: 650 },
      data: { label: 'Merchant Intelligence\n(Database, Research, Categorization, Context)' },
      style: { background: '#f9fbe7', border: '3px solid #689f38', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'anomaly_detection', type: 'default', position: { x: 600, y: 800 },
      data: { label: 'Anomaly Detection\n(Isolation Forest, Outliers, Fraud, Policy)' },
      style: { background: '#c8e6c9', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'feedback_loop', type: 'default', position: { x: 600, y: 950 },
      data: { label: 'User Feedback Loop\n(Corrections, Learning, Custom Categories)' },
      style: { background: '#e8eaf6', border: '3px solid #3f51b5', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'business_intelligence', type: 'default', position: { x: 600, y: 1100 },
      data: { label: 'Business Intelligence\n(Analytics, Trends, Forecasting, Alerts)' },
      style: { background: '#f3e5f5', border: '3px solid #7b1fa2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    // Side components for context
    { id: 'smart_categorization', type: 'default', position: { x: 300, y: 600 },
      data: { label: '🏷️ Smart\nCategorization' },
      style: { background: '#fff9c4', border: '3px solid #fbc02d', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },

    { id: 'self_improving', type: 'default', position: { x: 1000, y: 600 },
      data: { label: '🔄 Self-improving\nIntelligence' },
      style: { background: '#e8f5e9', border: '3px solid #4caf50', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },
  ];

  // Define edges for the transaction categorization flowchart
  const initialEdges = [
    // Data sources to ingestion API
    { id: 'e1', source: 'A', target: 'DS', type: 'smoothstep' },
    { id: 'e2', source: 'B', target: 'DS', type: 'smoothstep' },
    { id: 'e3', source: 'C', target: 'DS', type: 'smoothstep' },
    { id: 'e4', source: 'D', target: 'DS', type: 'smoothstep' },
    { id: 'e5', source: 'E', target: 'DS', type: 'smoothstep' },
    { id: 'e6', source: 'F', target: 'DS', type: 'smoothstep' },
    { id: 'e7', source: 'G', target: 'DS', type: 'smoothstep' },

    // Processing pipeline
    { id: 'e8', source: 'DS', target: 'H', type: 'smoothstep' },
    { id: 'e9', source: 'H', target: 'I', type: 'smoothstep' },
    { id: 'e10', source: 'I', target: 'J', type: 'smoothstep' },
    { id: 'e11', source: 'J', target: 'K', type: 'smoothstep' },
    { id: 'e12', source: 'K', target: 'L', type: 'smoothstep' },

    // ML pipeline to classification models
    { id: 'e13', source: 'L', target: 'M', type: 'smoothstep' },
    { id: 'e14', source: 'L', target: 'N', type: 'smoothstep' },
    { id: 'e15', source: 'L', target: 'O', type: 'smoothstep' },
    { id: 'e16', source: 'L', target: 'P', type: 'smoothstep' },
    { id: 'e17', source: 'L', target: 'Q', type: 'smoothstep' },
    { id: 'e18', source: 'L', target: 'R', type: 'smoothstep' },

    // Models to confidence system
    { id: 'e19', source: 'M', target: 'S', type: 'smoothstep' },
    { id: 'e20', source: 'N', target: 'S', type: 'smoothstep' },
    { id: 'e21', source: 'O', target: 'S', type: 'smoothstep' },
    { id: 'e22', source: 'P', target: 'S', type: 'smoothstep' },
    { id: 'e23', source: 'Q', target: 'S', type: 'smoothstep' },
    { id: 'e24', source: 'R', target: 'S', type: 'smoothstep' },

    // Enrichment to merchant intelligence
    { id: 'e25', source: 'J', target: 'U', type: 'smoothstep' },
    { id: 'e26', source: 'U', target: 'V', type: 'smoothstep' },
    { id: 'e27', source: 'V', target: 'W', type: 'smoothstep' },
    { id: 'e28', source: 'W', target: 'X', type: 'smoothstep' },
    { id: 'e29', source: 'X', target: 'Y', type: 'smoothstep' },

    // Feature extraction to anomaly detection
    { id: 'e30', source: 'K', target: 'Z', type: 'smoothstep' },
    { id: 'e31', source: 'Z', target: 'AA', type: 'smoothstep' },
    { id: 'e32', source: 'AA', target: 'BB', type: 'smoothstep' },
    { id: 'e33', source: 'BB', target: 'CC', type: 'smoothstep' },
    { id: 'e34', source: 'CC', target: 'DD', type: 'smoothstep' },

    // Confidence system to user feedback
    { id: 'e35', source: 'S', target: 'EE', type: 'smoothstep' },
    { id: 'e36', source: 'EE', target: 'FF', type: 'smoothstep' },
    { id: 'e37', source: 'FF', target: 'GG', type: 'smoothstep' },
    { id: 'e38', source: 'GG', target: 'HH', type: 'smoothstep' },
    { id: 'e39', source: 'HH', target: 'II', type: 'smoothstep' },
    { id: 'e40', source: 'II', target: 'T', type: 'smoothstep' },

    // Confidence system to business intelligence
    { id: 'e41', source: 'S', target: 'JJ', type: 'smoothstep' },
    { id: 'e42', source: 'JJ', target: 'KK', type: 'smoothstep' },
    { id: 'e43', source: 'KK', target: 'LL', type: 'smoothstep' },
    { id: 'e44', source: 'LL', target: 'MM', type: 'smoothstep' },
    { id: 'e45', source: 'MM', target: 'NN', type: 'smoothstep' },

    // Anomaly detection to alerts
    { id: 'e46', source: 'DD', target: 'PP', type: 'smoothstep' },
    { id: 'e47', source: 'PP', target: 'QQ', type: 'smoothstep' },
    { id: 'e48', source: 'LL', target: 'RR', type: 'smoothstep' },

    // Confidence system to APIs
    { id: 'e49', source: 'S', target: 'UU', type: 'smoothstep' },
    { id: 'e50', source: 'PP', target: 'VV', type: 'smoothstep' },
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
            AI-powered Transaction Categorization Engine
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto uppercase tracking-wide mb-8">
            Self-improving merchant intelligence with anomaly detection and enterprise integrations
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
              Intelligent transaction categorization with continuous learning and enterprise analytics
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
                <span className="text-gray-600 dark:text-gray-400">AI Classification</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-lime-100 border-2 border-lime-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-indigo-100 border-2 border-indigo-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Feedback</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TransactionCategorizationFlowchart;