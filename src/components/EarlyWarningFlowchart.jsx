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

const EarlyWarningFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  // Define horizontal layout for Student Risk Early Warning System
  const getHorizontalNodes = () => [
    // MULTI-SOURCE DATA COLLECTION (Column 1)
    { id: 'A', type: 'default', position: { x: 100, y: 50 }, data: { label: 'LMS Activity Logs' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'B', type: 'default', position: { x: 100, y: 150 }, data: { label: 'Assignment Submission Patterns' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'C', type: 'default', position: { x: 100, y: 250 }, data: { label: 'Video/Content Engagement Metrics' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'D', type: 'default', position: { x: 100, y: 350 }, data: { label: 'Discussion Forum Participation' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'E', type: 'default', position: { x: 100, y: 450 }, data: { label: 'Attendance Records' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'F', type: 'default', position: { x: 100, y: 550 }, data: { label: 'Grade/Assessment Data' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'G', type: 'default', position: { x: 100, y: 650 }, data: { label: 'Library/Resource Usage' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'H', type: 'default', position: { x: 100, y: 750 }, data: { label: 'Campus Access Logs' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'I', type: 'default', position: { x: 100, y: 850 }, data: { label: 'Financial Aid Status' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // DATA COLLECTION HUB (Column 2)
    { id: 'DC', type: 'default', position: { x: 360, y: 450 }, data: { label: 'Data Collection Hub' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 180, height: 80 } },

    // REAL-TIME DATA PROCESSING (Column 3)
    { id: 'J', type: 'default', position: { x: 620, y: 200 }, data: { label: 'Apache Kafka Event Streaming' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'K', type: 'default', position: { x: 620, y: 300 }, data: { label: 'Apache Flink Stream Processing' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'L', type: 'default', position: { x: 620, y: 400 }, data: { label: 'Data Validation & Cleaning' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'M', type: 'default', position: { x: 620, y: 500 }, data: { label: 'Feature Engineering Pipeline' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'N', type: 'default', position: { x: 620, y: 600 }, data: { label: 'Behavioral Pattern Extractor' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // ENGAGEMENT ANALYTICS ENGINE (Column 4)
    { id: 'O', type: 'default', position: { x: 880, y: 150 }, data: { label: 'Engagement Score Calculator' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'P', type: 'default', position: { x: 880, y: 250 }, data: { label: 'Activity Trend Analyzer' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'Q', type: 'default', position: { x: 880, y: 350 }, data: { label: 'Social Network Analysis' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'R', type: 'default', position: { x: 880, y: 450 }, data: { label: 'Learning Velocity Tracker' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'S', type: 'default', position: { x: 880, y: 550 }, data: { label: 'Comparative Peer Analysis' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'T', type: 'default', position: { x: 880, y: 650 }, data: { label: 'Temporal Pattern Detector' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // PREDICTIVE ML MODELS (Column 5)
    { id: 'U', type: 'default', position: { x: 1140, y: 100 }, data: { label: 'Gradient Boosting Dropout Predictor' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 180, height: 70 } },
    { id: 'V', type: 'default', position: { x: 1140, y: 200 }, data: { label: 'LSTM Time Series Analyzer' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'W', type: 'default', position: { x: 1140, y: 300 }, data: { label: 'Random Forest Risk Classifier' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'X', type: 'default', position: { x: 1140, y: 400 }, data: { label: 'Neural Network Engagement Model' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'Y', type: 'default', position: { x: 1140, y: 500 }, data: { label: 'Survival Analysis Model' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'Z', type: 'default', position: { x: 1140, y: 600 }, data: { label: 'Multi-task Learning Model' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // ENSEMBLE & PREDICTION (Column 5.5)
    { id: 'AA', type: 'default', position: { x: 1140, y: 700 }, data: { label: 'Ensemble Risk Predictor' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'MM', type: 'default', position: { x: 1400, y: 450 }, data: { label: 'Personalized Intervention Recommender' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 180, height: 70 } },

    // ALERT & INTERVENTION SYSTEM (Column 6)
    { id: 'LL', type: 'default', position: { x: 1660, y: 150 }, data: { label: 'Multi-level Alert System' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'NN', type: 'default', position: { x: 1660, y: 250 }, data: { label: 'Automated Outreach Triggers' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'OO', type: 'default', position: { x: 1660, y: 350 }, data: { label: 'Escalation Pathway Manager' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'PP', type: 'default', position: { x: 1660, y: 450 }, data: { label: 'Success Strategy Matcher' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'QQ', type: 'default', position: { x: 1660, y: 550 }, data: { label: 'Resource Recommendation Engine' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // STAKEHOLDER NOTIFICATION HUB (Column 7)
    { id: 'RR', type: 'default', position: { x: 1920, y: 100 }, data: { label: 'Student Self-awareness Dashboard' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'SS', type: 'default', position: { x: 1920, y: 200 }, data: { label: 'Academic Advisor Alerts' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'TT', type: 'default', position: { x: 1920, y: 300 }, data: { label: 'Instructor Notification System' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'UU', type: 'default', position: { x: 1920, y: 400 }, data: { label: 'Counselor Referral Engine' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'VV', type: 'default', position: { x: 1920, y: 500 }, data: { label: 'Parent/Guardian Communications' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'WW', type: 'default', position: { x: 1920, y: 600 }, data: { label: 'Peer Mentor Assignment' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // STORAGE & ANALYTICS INFRASTRUCTURE (Bottom row)
    { id: 'PPP', type: 'default', position: { x: 880, y: 800 }, data: { label: 'PostgreSQL - Student Records' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'QQQ', type: 'default', position: { x: 1140, y: 800 }, data: { label: 'Time-series DB - InfluxDB' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'RRR', type: 'default', position: { x: 1400, y: 800 }, data: { label: 'Data Warehouse - Snowflake' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'SSS', type: 'default', position: { x: 1660, y: 800 }, data: { label: 'Vector Store - Pinecone' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
  ];

  // Define vertical layout (simplified view)
  const getVerticalNodes = () => [
    { id: 'data_collection', type: 'default', position: { x: 600, y: 50 },
      data: { label: 'Multi-source Data Collection\n(LMS, Assignments, Engagement, Attendance)' },
      style: { background: '#e3f2fd', border: '3px solid #1976d2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'data_processing', type: 'default', position: { x: 600, y: 200 },
      data: { label: 'Real-time Data Processing\n(Kafka, Flink, Feature Engineering)' },
      style: { background: '#f3e5f5', border: '3px solid #7b1fa2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'engagement_analytics', type: 'default', position: { x: 600, y: 350 },
      data: { label: 'Engagement Analytics Engine\n(Score Calculation, Trend Analysis, Peer Comparison)' },
      style: { background: '#e8f5e8', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'predictive_models', type: 'default', position: { x: 600, y: 500 },
      data: { label: 'Predictive ML Models\n(Dropout Prediction, Risk Classification, Ensemble)' },
      style: { background: '#e1f5fe', border: '3px solid #0277bd', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'intervention_system', type: 'default', position: { x: 600, y: 650 },
      data: { label: 'Alert & Intervention System\n(Multi-level Alerts, Automated Outreach)' },
      style: { background: '#f9fbe7', border: '3px solid #689f38', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'stakeholder_notifications', type: 'default', position: { x: 600, y: 800 },
      data: { label: 'Stakeholder Notification Hub\n(Students, Advisors, Instructors, Parents)' },
      style: { background: '#e8eaf6', border: '3px solid #3f51b5', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    // Side components for context
    { id: 'early_warning', type: 'default', position: { x: 300, y: 425 },
      data: { label: '⚠️ Early Warning\nSystem' },
      style: { background: '#fff9c4', border: '3px solid #fbc02d', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },

    { id: 'student_success', type: 'default', position: { x: 1000, y: 425 },
      data: { label: '🎯 Student\nSuccess' },
      style: { background: '#e8f5e9', border: '3px solid #4caf50', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },
  ];

  // Define edges for the early warning flowchart
  const initialEdges = [
    // Data sources to data collection hub
    { id: 'e1', source: 'A', target: 'DC', type: 'smoothstep' },
    { id: 'e2', source: 'B', target: 'DC', type: 'smoothstep' },
    { id: 'e3', source: 'C', target: 'DC', type: 'smoothstep' },
    { id: 'e4', source: 'D', target: 'DC', type: 'smoothstep' },
    { id: 'e5', source: 'E', target: 'DC', type: 'smoothstep' },
    { id: 'e6', source: 'F', target: 'DC', type: 'smoothstep' },
    { id: 'e7', source: 'G', target: 'DC', type: 'smoothstep' },
    { id: 'e8', source: 'H', target: 'DC', type: 'smoothstep' },
    { id: 'e9', source: 'I', target: 'DC', type: 'smoothstep' },

    // Real-time data processing pipeline
    { id: 'e10', source: 'DC', target: 'J', type: 'smoothstep' },
    { id: 'e11', source: 'J', target: 'K', type: 'smoothstep' },
    { id: 'e12', source: 'K', target: 'L', type: 'smoothstep' },
    { id: 'e13', source: 'L', target: 'M', type: 'smoothstep' },
    { id: 'e14', source: 'M', target: 'N', type: 'smoothstep' },

    // Engagement analytics engine
    { id: 'e15', source: 'N', target: 'O', type: 'smoothstep' },
    { id: 'e16', source: 'O', target: 'P', type: 'smoothstep' },
    { id: 'e17', source: 'P', target: 'Q', type: 'smoothstep' },
    { id: 'e18', source: 'Q', target: 'R', type: 'smoothstep' },
    { id: 'e19', source: 'R', target: 'S', type: 'smoothstep' },
    { id: 'e20', source: 'S', target: 'T', type: 'smoothstep' },

    // Predictive ML models
    { id: 'e21', source: 'T', target: 'U', type: 'smoothstep' },
    { id: 'e22', source: 'T', target: 'V', type: 'smoothstep' },
    { id: 'e23', source: 'T', target: 'W', type: 'smoothstep' },
    { id: 'e24', source: 'T', target: 'X', type: 'smoothstep' },
    { id: 'e25', source: 'T', target: 'Y', type: 'smoothstep' },
    { id: 'e26', source: 'T', target: 'Z', type: 'smoothstep' },

    // Ensemble prediction
    { id: 'e27', source: 'U', target: 'AA', type: 'smoothstep' },
    { id: 'e28', source: 'V', target: 'AA', type: 'smoothstep' },
    { id: 'e29', source: 'W', target: 'AA', type: 'smoothstep' },
    { id: 'e30', source: 'X', target: 'AA', type: 'smoothstep' },
    { id: 'e31', source: 'Y', target: 'AA', type: 'smoothstep' },
    { id: 'e32', source: 'Z', target: 'AA', type: 'smoothstep' },

    // Alert & intervention system
    { id: 'e33', source: 'AA', target: 'LL', type: 'smoothstep' },
    { id: 'e34', source: 'MM', target: 'LL', type: 'smoothstep' },
    { id: 'e35', source: 'LL', target: 'NN', type: 'smoothstep' },
    { id: 'e36', source: 'NN', target: 'OO', type: 'smoothstep' },
    { id: 'e37', source: 'MM', target: 'PP', type: 'smoothstep' },
    { id: 'e38', source: 'PP', target: 'QQ', type: 'smoothstep' },

    // Stakeholder notification hub
    { id: 'e39', source: 'LL', target: 'RR', type: 'smoothstep' },
    { id: 'e40', source: 'LL', target: 'SS', type: 'smoothstep' },
    { id: 'e41', source: 'LL', target: 'TT', type: 'smoothstep' },
    { id: 'e42', source: 'MM', target: 'UU', type: 'smoothstep' },
    { id: 'e43', source: 'LL', target: 'VV', type: 'smoothstep' },
    { id: 'e44', source: 'MM', target: 'WW', type: 'smoothstep' },

    // Storage connections
    { id: 'e45', source: 'DC', target: 'PPP', type: 'smoothstep' },
    { id: 'e46', source: 'N', target: 'QQQ', type: 'smoothstep' },
    { id: 'e47', source: 'T', target: 'RRR', type: 'smoothstep' },
    { id: 'e48', source: 'AA', target: 'SSS', type: 'smoothstep' },
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
            Student Risk Early Warning System
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto uppercase tracking-wide mb-8">
            Continuous engagement analytics feeding predictive risk models and intervention workflows
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
              AI-powered early warning system with predictive analytics and proactive intervention workflows
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 border-2 border-blue-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Data Collection</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-100 border-2 border-purple-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border-2 border-green-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-cyan-100 border-2 border-cyan-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">ML Models</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-lime-100 border-2 border-lime-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Interventions</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EarlyWarningFlowchart;