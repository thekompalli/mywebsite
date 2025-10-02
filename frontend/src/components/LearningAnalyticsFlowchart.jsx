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

const LearningAnalyticsFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  // Define horizontal layout for Real-time Learning Analytics Fabric
  const getHorizontalNodes = () => [
    // STUDENT DATA SOURCES (Column 1)
    { id: 'A', type: 'default', position: { x: 100, y: 50 }, data: { label: 'Learning Management System' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'B', type: 'default', position: { x: 100, y: 150 }, data: { label: 'Assessment Platforms' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'C', type: 'default', position: { x: 100, y: 250 }, data: { label: 'Student Interaction Logs' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'D', type: 'default', position: { x: 100, y: 350 }, data: { label: 'Video/Content Engagement' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'E', type: 'default', position: { x: 100, y: 450 }, data: { label: 'Assignment Submissions' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'F', type: 'default', position: { x: 100, y: 550 }, data: { label: 'Peer Collaboration Data' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'G', type: 'default', position: { x: 100, y: 650 }, data: { label: 'External Learning Tools' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // DATA COLLECTION LAYER (Column 2)
    { id: 'DS', type: 'default', position: { x: 360, y: 350 }, data: { label: 'Data Collection Layer' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 180, height: 80 } },

    // REAL-TIME ANALYTICS PIPELINE (Column 3)
    { id: 'H', type: 'default', position: { x: 620, y: 150 }, data: { label: 'Apache Kafka Event Streaming' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'I', type: 'default', position: { x: 620, y: 250 }, data: { label: 'Real-time Processing - Apache Flink' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'J', type: 'default', position: { x: 620, y: 350 }, data: { label: 'Learning Analytics Engine' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'K', type: 'default', position: { x: 620, y: 450 }, data: { label: 'Student Behavior Analyzer' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'L', type: 'default', position: { x: 620, y: 550 }, data: { label: 'Performance Tracking System' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // AI LEARNING MODELS (Column 4)
    { id: 'M', type: 'default', position: { x: 880, y: 50 }, data: { label: 'Knowledge Tracing Model - DKT/SAKT' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'N', type: 'default', position: { x: 880, y: 150 }, data: { label: 'Learning Style Classifier' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'O', type: 'default', position: { x: 880, y: 250 }, data: { label: 'Difficulty Prediction Model' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'P', type: 'default', position: { x: 880, y: 350 }, data: { label: 'Engagement Prediction Model' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'Q', type: 'default', position: { x: 880, y: 450 }, data: { label: 'Prerequisite Knowledge Mapper' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'R', type: 'default', position: { x: 880, y: 550 }, data: { label: 'Forgetting Curve Predictor' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // AI CORE MODELS (Column 4.5)
    { id: 'S', type: 'default', position: { x: 880, y: 650 }, data: { label: 'Educational LLM Tutor - GPT-4/Claude' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'T', type: 'default', position: { x: 1140, y: 400 }, data: { label: 'Curriculum Optimization Engine' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'U', type: 'default', position: { x: 1140, y: 500 }, data: { label: 'Adaptive Assessment Generator' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // PERSONALIZATION ENGINE (Column 5)
    { id: 'BB', type: 'default', position: { x: 1400, y: 100 }, data: { label: 'Individual Learning Profile' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'CC', type: 'default', position: { x: 1400, y: 200 }, data: { label: 'Adaptive Content Selector' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'DD', type: 'default', position: { x: 1400, y: 300 }, data: { label: 'Difficulty Adjustment System' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'EE', type: 'default', position: { x: 1400, y: 400 }, data: { label: 'Learning Pace Optimizer' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'FF', type: 'default', position: { x: 1400, y: 500 }, data: { label: 'Remediation Path Generator' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'GG', type: 'default', position: { x: 1400, y: 600 }, data: { label: 'Enrichment Content Recommender' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // STUDENT INTERFACE (Column 6)
    { id: 'TT', type: 'default', position: { x: 1660, y: 100 }, data: { label: 'Adaptive Learning Dashboard' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'UU', type: 'default', position: { x: 1660, y: 200 }, data: { label: 'Personalized Study Plan' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'VV', type: 'default', position: { x: 1660, y: 300 }, data: { label: 'Progress Tracking Widget' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'WW', type: 'default', position: { x: 1660, y: 400 }, data: { label: 'AI Tutor Chat Interface' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'XX', type: 'default', position: { x: 1660, y: 500 }, data: { label: 'Gamification Elements' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'YY', type: 'default', position: { x: 1660, y: 600 }, data: { label: 'Peer Collaboration Tools' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // STORAGE & INFRASTRUCTURE (Bottom row)
    { id: 'EEE', type: 'default', position: { x: 880, y: 750 }, data: { label: 'PostgreSQL - Student Profiles' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'FFF', type: 'default', position: { x: 1140, y: 750 }, data: { label: 'MongoDB - Content & Metadata' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'GGG', type: 'default', position: { x: 1400, y: 750 }, data: { label: 'Redis - Session & Cache' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'HHH', type: 'default', position: { x: 1660, y: 750 }, data: { label: 'Vector DB - Content Embeddings' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
  ];

  // Define vertical layout (simplified view)
  const getVerticalNodes = () => [
    { id: 'data_sources', type: 'default', position: { x: 600, y: 50 },
      data: { label: 'Student Data Sources\n(LMS, Assessments, Interactions, Content)' },
      style: { background: '#e3f2fd', border: '3px solid #1976d2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'data_processing', type: 'default', position: { x: 600, y: 200 },
      data: { label: 'Real-time Analytics Pipeline\n(Kafka, Flink, Learning Analytics Engine)' },
      style: { background: '#f3e5f5', border: '3px solid #7b1fa2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'ai_models', type: 'default', position: { x: 600, y: 350 },
      data: { label: 'AI Learning Models\n(Knowledge Tracing, Learning Style, Engagement)' },
      style: { background: '#e8f5e8', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'personalization', type: 'default', position: { x: 600, y: 500 },
      data: { label: 'Personalization Engine\n(Learning Profile, Content Selection, Pace)' },
      style: { background: '#f9fbe7', border: '3px solid #689f38', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'student_interface', type: 'default', position: { x: 600, y: 650 },
      data: { label: 'Student Interface\n(Dashboard, Study Plan, AI Tutor Chat)' },
      style: { background: '#e8eaf6', border: '3px solid #3f51b5', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    // Side components for context
    { id: 'learning_analytics', type: 'default', position: { x: 300, y: 350 },
      data: { label: '📊 Learning\nAnalytics' },
      style: { background: '#fff9c4', border: '3px solid #fbc02d', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },

    { id: 'adaptive_learning', type: 'default', position: { x: 1000, y: 350 },
      data: { label: '🎯 Adaptive\nLearning' },
      style: { background: '#e8f5e9', border: '3px solid #4caf50', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },
  ];

  // Define edges for the learning analytics flowchart
  const initialEdges = [
    // Data sources to data collection layer
    { id: 'e1', source: 'A', target: 'DS', type: 'smoothstep' },
    { id: 'e2', source: 'B', target: 'DS', type: 'smoothstep' },
    { id: 'e3', source: 'C', target: 'DS', type: 'smoothstep' },
    { id: 'e4', source: 'D', target: 'DS', type: 'smoothstep' },
    { id: 'e5', source: 'E', target: 'DS', type: 'smoothstep' },
    { id: 'e6', source: 'F', target: 'DS', type: 'smoothstep' },
    { id: 'e7', source: 'G', target: 'DS', type: 'smoothstep' },

    // Real-time analytics pipeline
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
    { id: 'e19', source: 'L', target: 'S', type: 'smoothstep' },

    // AI models to optimization
    { id: 'e20', source: 'M', target: 'T', type: 'smoothstep' },
    { id: 'e21', source: 'N', target: 'T', type: 'smoothstep' },
    { id: 'e22', source: 'O', target: 'T', type: 'smoothstep' },
    { id: 'e23', source: 'P', target: 'T', type: 'smoothstep' },
    { id: 'e24', source: 'Q', target: 'T', type: 'smoothstep' },
    { id: 'e25', source: 'R', target: 'T', type: 'smoothstep' },
    { id: 'e26', source: 'S', target: 'T', type: 'smoothstep' },

    { id: 'e27', source: 'T', target: 'U', type: 'smoothstep' },

    // Learning profile connections
    { id: 'e28', source: 'L', target: 'BB', type: 'smoothstep' },
    { id: 'e29', source: 'BB', target: 'CC', type: 'smoothstep' },
    { id: 'e30', source: 'CC', target: 'DD', type: 'smoothstep' },
    { id: 'e31', source: 'DD', target: 'EE', type: 'smoothstep' },
    { id: 'e32', source: 'EE', target: 'FF', type: 'smoothstep' },
    { id: 'e33', source: 'FF', target: 'GG', type: 'smoothstep' },

    // Personalization to student interface
    { id: 'e34', source: 'BB', target: 'TT', type: 'smoothstep' },
    { id: 'e35', source: 'T', target: 'UU', type: 'smoothstep' },
    { id: 'e36', source: 'L', target: 'VV', type: 'smoothstep' },
    { id: 'e37', source: 'S', target: 'WW', type: 'smoothstep' },
    { id: 'e38', source: 'M', target: 'XX', type: 'smoothstep' },
    { id: 'e39', source: 'F', target: 'YY', type: 'smoothstep' },

    // Storage connections
    { id: 'e40', source: 'DS', target: 'EEE', type: 'smoothstep' },
    { id: 'e41', source: 'CC', target: 'FFF', type: 'smoothstep' },
    { id: 'e42', source: 'L', target: 'GGG', type: 'smoothstep' },
    { id: 'e43', source: 'S', target: 'HHH', type: 'smoothstep' },
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
            Real-time Learning Analytics Fabric
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto uppercase tracking-wide mb-8">
            Unified student data streaming into analytics, AI models, and personalization services
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
              Real-time learning analytics with AI-powered personalization and adaptive content delivery
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
                <span className="text-gray-600 dark:text-gray-400">AI Models</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-lime-100 border-2 border-lime-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Personalization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-indigo-100 border-2 border-indigo-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Interface</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningAnalyticsFlowchart;