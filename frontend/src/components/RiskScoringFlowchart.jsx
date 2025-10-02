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

const RiskScoringFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  // Define horizontal layout for AI-driven Risk Scoring & Lending OS
  const getHorizontalNodes = () => [
    // DATA SOURCES COLUMN (Column 1)
    { id: 'A', type: 'default', position: { x: 100, y: 50 }, data: { label: 'Credit Bureaus APIs' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'B', type: 'default', position: { x: 100, y: 160 }, data: { label: 'Banking Transaction History' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'C', type: 'default', position: { x: 100, y: 270 }, data: { label: 'Social Media APIs' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'D', type: 'default', position: { x: 100, y: 380 }, data: { label: 'Open Banking APIs' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'E', type: 'default', position: { x: 100, y: 490 }, data: { label: 'Alternative Data Sources' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'F', type: 'default', position: { x: 100, y: 600 }, data: { label: 'Real-time Payment Data' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },

    // DATA STREAMING LAYER (Column 2)
    { id: 'DS', type: 'default', position: { x: 380, y: 325 }, data: { label: 'Data Streaming Layer' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },

    // DATA INGESTION & PROCESSING (Column 3)
    { id: 'G', type: 'default', position: { x: 660, y: 100 }, data: { label: 'Apache Kafka Streams' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'H', type: 'default', position: { x: 660, y: 220 }, data: { label: 'Data Validation Service' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'I', type: 'default', position: { x: 660, y: 340 }, data: { label: 'Feature Engineering Pipeline' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'J', type: 'default', position: { x: 660, y: 460 }, data: { label: 'Data Lake - S3/Delta Lake' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },

    // ML PIPELINE (Column 4)
    { id: 'K', type: 'default', position: { x: 940, y: 50 }, data: { label: 'Feature Store - Feast' }, style: { background: '#fce4ec', border: '2px solid #c2185b', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'L', type: 'default', position: { x: 940, y: 170 }, data: { label: 'Model Training Pipeline' }, style: { background: '#fce4ec', border: '2px solid #c2185b', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'M', type: 'default', position: { x: 940, y: 290 }, data: { label: 'Model Registry - MLflow' }, style: { background: '#fce4ec', border: '2px solid #c2185b', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },

    // ML MODELS (Column 5)
    { id: 'N', type: 'default', position: { x: 1220, y: 50 }, data: { label: 'XGBoost Risk Model' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'O', type: 'default', position: { x: 1220, y: 170 }, data: { label: 'Neural Network - PyTorch' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'P', type: 'default', position: { x: 1220, y: 290 }, data: { label: 'Ensemble Meta-Model' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'Q', type: 'default', position: { x: 1220, y: 410 }, data: { label: 'LLM Risk Analyst - GPT-4' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },

    // REAL-TIME SCORING ENGINE (Column 6)
    { id: 'R', type: 'default', position: { x: 1500, y: 50 }, data: { label: 'API Gateway - Kong' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'S', type: 'default', position: { x: 1500, y: 170 }, data: { label: 'Redis Cache Layer' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'T', type: 'default', position: { x: 1500, y: 290 }, data: { label: 'Model Serving - Seldon/TorchServe' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'U', type: 'default', position: { x: 1500, y: 410 }, data: { label: 'Risk Score Calculator' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'V', type: 'default', position: { x: 1500, y: 530 }, data: { label: 'Dynamic Interest Rate Engine' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },

    // SECURITY & COMPLIANCE (Column 7)
    { id: 'W', type: 'default', position: { x: 1780, y: 50 }, data: { label: 'OAuth 2.0/JWT Auth' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'X', type: 'default', position: { x: 1780, y: 170 }, data: { label: 'Data Encryption at Rest/Transit' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'Y', type: 'default', position: { x: 1780, y: 290 }, data: { label: 'Audit Logging - ELK Stack' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'Z', type: 'default', position: { x: 1780, y: 410 }, data: { label: 'GDPR Compliance Engine' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },

    // API & INTEGRATION LAYER (Column 8)
    { id: 'AA', type: 'default', position: { x: 2060, y: 50 }, data: { label: 'RESTful APIs' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'BB', type: 'default', position: { x: 2060, y: 170 }, data: { label: 'GraphQL Gateway' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'CC', type: 'default', position: { x: 2060, y: 290 }, data: { label: 'Webhook Notifications' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'DD', type: 'default', position: { x: 2060, y: 410 }, data: { label: 'Banking Core Integration' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },

    // MONITORING & OBSERVABILITY (Column 9)
    { id: 'EE', type: 'default', position: { x: 2340, y: 50 }, data: { label: 'Prometheus/Grafana' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'FF', type: 'default', position: { x: 2340, y: 170 }, data: { label: 'Model Drift Detection' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'GG', type: 'default', position: { x: 2340, y: 290 }, data: { label: 'Performance Metrics' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'HH', type: 'default', position: { x: 2340, y: 410 }, data: { label: 'Alert Management - PagerDuty' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },

    // DATABASE LAYER (Bottom row)
    { id: 'II', type: 'default', position: { x: 940, y: 650 }, data: { label: 'PostgreSQL - Customer Data' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'JJ', type: 'default', position: { x: 1220, y: 650 }, data: { label: 'ClickHouse - Analytics' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'KK', type: 'default', position: { x: 1500, y: 650 }, data: { label: 'Redis - Caching' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
    { id: 'LL', type: 'default', position: { x: 1780, y: 650 }, data: { label: 'Vector DB - Pinecone' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 200, height: 80 } },
  ];

  // Define vertical layout (simplified view)
  const getVerticalNodes = () => [
    { id: 'data_sources', type: 'default', position: { x: 600, y: 50 },
      data: { label: 'Data Sources\n(Credit Bureaus, Banking, Social Media)' },
      style: { background: '#e3f2fd', border: '3px solid #1976d2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'data_processing', type: 'default', position: { x: 600, y: 200 },
      data: { label: 'Data Ingestion & Processing\n(Kafka, Validation, Feature Engineering)' },
      style: { background: '#f3e5f5', border: '3px solid #7b1fa2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'ml_pipeline', type: 'default', position: { x: 600, y: 350 },
      data: { label: 'ML Pipeline\n(Feature Store, Training, Registry)' },
      style: { background: '#fce4ec', border: '3px solid #c2185b', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'ai_models', type: 'default', position: { x: 600, y: 500 },
      data: { label: 'AI Models\n(XGBoost, Neural Network, LLM)' },
      style: { background: '#e1f5fe', border: '3px solid #0277bd', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'scoring_engine', type: 'default', position: { x: 600, y: 650 },
      data: { label: 'Real-time Scoring Engine\n(API Gateway, Cache, Calculator)' },
      style: { background: '#f9fbe7', border: '3px solid #689f38', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'security', type: 'default', position: { x: 600, y: 800 },
      data: { label: 'Security & Compliance\n(OAuth, Encryption, GDPR)' },
      style: { background: '#c8e6c9', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'api_integration', type: 'default', position: { x: 600, y: 950 },
      data: { label: 'API & Integration Layer\n(REST, GraphQL, Banking Core)' },
      style: { background: '#e8eaf6', border: '3px solid #3f51b5', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'monitoring', type: 'default', position: { x: 600, y: 1100 },
      data: { label: 'Monitoring & Storage\n(Metrics, Databases, Analytics)' },
      style: { background: '#f3e5f5', border: '3px solid #7b1fa2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    // Side components for context
    { id: 'real_time', type: 'default', position: { x: 300, y: 600 },
      data: { label: '⚡ Real-time\nProcessing' },
      style: { background: '#fff9c4', border: '3px solid #fbc02d', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },

    { id: 'ai_powered', type: 'default', position: { x: 1000, y: 600 },
      data: { label: '🤖 AI-Powered\nScoring' },
      style: { background: '#e8f5e9', border: '3px solid #4caf50', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },
  ];

  // Define edges for the risk scoring flowchart
  const initialEdges = [
    // Data sources to streaming layer
    { id: 'e1', source: 'A', target: 'DS', type: 'smoothstep' },
    { id: 'e2', source: 'B', target: 'DS', type: 'smoothstep' },
    { id: 'e3', source: 'C', target: 'DS', type: 'smoothstep' },
    { id: 'e4', source: 'D', target: 'DS', type: 'smoothstep' },
    { id: 'e5', source: 'E', target: 'DS', type: 'smoothstep' },
    { id: 'e6', source: 'F', target: 'DS', type: 'smoothstep' },

    // Streaming to processing pipeline
    { id: 'e7', source: 'DS', target: 'G', type: 'smoothstep' },
    { id: 'e8', source: 'G', target: 'H', type: 'smoothstep' },
    { id: 'e9', source: 'H', target: 'I', type: 'smoothstep' },
    { id: 'e10', source: 'I', target: 'J', type: 'smoothstep' },

    // Processing to ML pipeline
    { id: 'e11', source: 'J', target: 'K', type: 'smoothstep' },
    { id: 'e12', source: 'K', target: 'L', type: 'smoothstep' },
    { id: 'e13', source: 'L', target: 'M', type: 'smoothstep' },

    // ML pipeline to models
    { id: 'e14', source: 'M', target: 'N', type: 'smoothstep' },
    { id: 'e15', source: 'M', target: 'O', type: 'smoothstep' },
    { id: 'e16', source: 'M', target: 'P', type: 'smoothstep' },
    { id: 'e17', source: 'M', target: 'Q', type: 'smoothstep' },

    // Feature store to scoring engine
    { id: 'e18', source: 'K', target: 'T', type: 'smoothstep' },

    // Models to scoring components
    { id: 'e19', source: 'N', target: 'U', type: 'smoothstep' },
    { id: 'e20', source: 'O', target: 'U', type: 'smoothstep' },
    { id: 'e21', source: 'P', target: 'U', type: 'smoothstep' },
    { id: 'e22', source: 'Q', target: 'U', type: 'smoothstep' },

    // Scoring engine flow
    { id: 'e23', source: 'R', target: 'W', type: 'smoothstep' },
    { id: 'e24', source: 'R', target: 'AA', type: 'smoothstep' },
    { id: 'e25', source: 'AA', target: 'T', type: 'smoothstep' },
    { id: 'e26', source: 'T', target: 'U', type: 'smoothstep' },
    { id: 'e27', source: 'U', target: 'V', type: 'smoothstep' },
    { id: 'e28', source: 'U', target: 'S', type: 'smoothstep' },
    { id: 'e29', source: 'V', target: 'DD', type: 'smoothstep' },

    // Monitoring connections
    { id: 'e30', source: 'T', target: 'FF', type: 'smoothstep' },
    { id: 'e31', source: 'U', target: 'EE', type: 'smoothstep' },
    { id: 'e32', source: 'V', target: 'GG', type: 'smoothstep' },

    // Database connections
    { id: 'e33', source: 'J', target: 'II', type: 'smoothstep' }, // Data Lake to PostgreSQL
    { id: 'e34', source: 'K', target: 'II', type: 'smoothstep' }, // Feature Store to PostgreSQL
    { id: 'e35', source: 'U', target: 'II', type: 'smoothstep' }, // Risk Score Calculator to PostgreSQL
    { id: 'e36', source: 'J', target: 'JJ', type: 'smoothstep' }, // Data Lake to ClickHouse
    { id: 'e37', source: 'S', target: 'KK', type: 'smoothstep' }, // Redis Cache Layer to Redis DB
    { id: 'e38', source: 'K', target: 'LL', type: 'smoothstep' }, // Feature Store to Vector DB
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
    <div className="w-full">
      <div className="w-full px-4 lg:px-6">{/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 uppercase tracking-wide">
            Architecture Overview
          </p>
        </motion.div>

        {/* Control Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-6"
        >
          <button
            onClick={toggleLayout}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            {isVertical ? '📐 Horizontal' : '📏 Vertical'}
          </button>
          <button
            onClick={resetLayout}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            🔄 Reset
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
            <div className="h-[500px] md:h-[600px] relative">
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
          className="mt-6 text-center"
        >
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Real-time risk assessment with AI-powered scoring and compliance-aware lending decisions
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-100 border-2 border-blue-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Data Sources</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-100 border-2 border-purple-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-pink-100 border-2 border-pink-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">ML Pipeline</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-100 border-2 border-cyan-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">AI Models</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-200 border-2 border-green-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Scoring Engine</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RiskScoringFlowchart;