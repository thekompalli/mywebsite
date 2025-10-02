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

const FraudIntelligenceFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  // Define horizontal layout for Cross-channel Fraud Intelligence Platform
  const getHorizontalNodes = () => [
    // REAL-TIME DATA SOURCES (Column 1)
    { id: 'A', type: 'default', position: { x: 100, y: 50 }, data: { label: 'Transaction Streams' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'B', type: 'default', position: { x: 100, y: 150 }, data: { label: 'Mobile App Behavior' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'C', type: 'default', position: { x: 100, y: 250 }, data: { label: 'Web Analytics' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'D', type: 'default', position: { x: 100, y: 350 }, data: { label: 'Device Fingerprinting' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'E', type: 'default', position: { x: 100, y: 450 }, data: { label: 'Geolocation Data' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'F', type: 'default', position: { x: 100, y: 550 }, data: { label: 'Biometric Signals' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'G', type: 'default', position: { x: 100, y: 650 }, data: { label: 'Card Networks' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // EVENT STREAMING PLATFORM (Column 2)
    { id: 'DS', type: 'default', position: { x: 360, y: 350 }, data: { label: 'Event Streaming Platform' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 180, height: 80 } },

    // STREAM PROCESSING LAYER (Column 3)
    { id: 'H', type: 'default', position: { x: 620, y: 200 }, data: { label: 'Apache Kafka' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'I', type: 'default', position: { x: 620, y: 300 }, data: { label: 'Apache Flink/Spark Streaming' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'J', type: 'default', position: { x: 620, y: 400 }, data: { label: 'Real-time Feature Store' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'K', type: 'default', position: { x: 620, y: 500 }, data: { label: 'Event Enrichment Service' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // FRAUD DETECTION MODELS (Column 4)
    { id: 'L', type: 'default', position: { x: 880, y: 100 }, data: { label: 'Isolation Forest - Anomaly Detection' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'M', type: 'default', position: { x: 880, y: 200 }, data: { label: 'Graph Neural Network - Relationship Analysis' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'N', type: 'default', position: { x: 880, y: 300 }, data: { label: 'LSTM - Sequence Pattern Detection' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'O', type: 'default', position: { x: 880, y: 400 }, data: { label: 'Transformer - Behavioral Analysis' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'P', type: 'default', position: { x: 880, y: 500 }, data: { label: 'Gradient Boosting - Rule-based ML' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // AI ENGINE (Column 5)
    { id: 'Q', type: 'default', position: { x: 1140, y: 150 }, data: { label: 'LLM Reasoning Engine - Claude/GPT-4' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'R', type: 'default', position: { x: 1140, y: 250 }, data: { label: 'Ensemble Fraud Classifier' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'S', type: 'default', position: { x: 1140, y: 350 }, data: { label: 'Real-time Scoring Engine' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // CROSS-CHANNEL ANALYTICS (Column 6)
    { id: 'T', type: 'default', position: { x: 1400, y: 100 }, data: { label: 'Behavioral Analytics Engine' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'U', type: 'default', position: { x: 1400, y: 200 }, data: { label: 'Device Identity Graph' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'V', type: 'default', position: { x: 1400, y: 300 }, data: { label: 'Customer Journey Mapper' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'W', type: 'default', position: { x: 1400, y: 400 }, data: { label: 'Risk Profile Builder' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // DECISION ENGINE (Column 7)
    { id: 'X', type: 'default', position: { x: 1660, y: 100 }, data: { label: 'Rule Engine - Drools' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'Y', type: 'default', position: { x: 1660, y: 200 }, data: { label: 'Risk Threshold Manager' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'Z', type: 'default', position: { x: 1660, y: 300 }, data: { label: 'Action Orchestrator' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'AA', type: 'default', position: { x: 1660, y: 400 }, data: { label: 'Notification Service' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // API & INTEGRATION (Column 8)
    { id: 'FF', type: 'default', position: { x: 1920, y: 100 }, data: { label: 'Real-time Fraud API' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'GG', type: 'default', position: { x: 1920, y: 200 }, data: { label: 'Webhook Alerts' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'HH', type: 'default', position: { x: 1920, y: 300 }, data: { label: 'SMS/Email Notifications' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'II', type: 'default', position: { x: 1920, y: 400 }, data: { label: 'Core Banking Integration' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // STORAGE & ANALYTICS (Bottom row)
    { id: 'KK', type: 'default', position: { x: 880, y: 650 }, data: { label: 'Time-series DB - InfluxDB' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'LL', type: 'default', position: { x: 1140, y: 650 }, data: { label: 'Graph Database - Neo4j' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'MM', type: 'default', position: { x: 1400, y: 650 }, data: { label: 'Data Warehouse - Snowflake' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'NN', type: 'default', position: { x: 1660, y: 650 }, data: { label: 'Vector Store - Weaviate' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // MONITORING & ML OPS (Top right)
    { id: 'PP', type: 'default', position: { x: 2180, y: 100 }, data: { label: 'Model Performance Monitoring' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'QQ', type: 'default', position: { x: 2180, y: 200 }, data: { label: 'False Positive Rate Tracking' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'RR', type: 'default', position: { x: 2180, y: 300 }, data: { label: 'A/B Testing Framework' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'SS', type: 'default', position: { x: 2180, y: 400 }, data: { label: 'Model Retraining Pipeline' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
  ];

  // Define vertical layout (simplified view)
  const getVerticalNodes = () => [
    { id: 'data_sources', type: 'default', position: { x: 600, y: 50 },
      data: { label: 'Real-time Data Sources\n(Transactions, Mobile, Web, Biometrics)' },
      style: { background: '#e3f2fd', border: '3px solid #1976d2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'stream_processing', type: 'default', position: { x: 600, y: 200 },
      data: { label: 'Stream Processing\n(Kafka, Flink, Real-time Features)' },
      style: { background: '#f3e5f5', border: '3px solid #7b1fa2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'fraud_models', type: 'default', position: { x: 600, y: 350 },
      data: { label: 'Fraud Detection Models\n(Isolation Forest, Graph NN, LSTM, Transformers)' },
      style: { background: '#e8f5e8', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'ai_engine', type: 'default', position: { x: 600, y: 500 },
      data: { label: 'AI Engine\n(LLM Reasoning, Ensemble Classifier)' },
      style: { background: '#e1f5fe', border: '3px solid #0277bd', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'analytics', type: 'default', position: { x: 600, y: 650 },
      data: { label: 'Cross-Channel Analytics\n(Behavioral, Device Identity, Journey Map)' },
      style: { background: '#f9fbe7', border: '3px solid #689f38', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'decision_engine', type: 'default', position: { x: 600, y: 800 },
      data: { label: 'Decision Engine\n(Rules, Thresholds, Actions)' },
      style: { background: '#c8e6c9', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'integration', type: 'default', position: { x: 600, y: 950 },
      data: { label: 'API & Integration\n(Real-time APIs, Webhooks, Banking)' },
      style: { background: '#e8eaf6', border: '3px solid #3f51b5', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'monitoring', type: 'default', position: { x: 600, y: 1100 },
      data: { label: 'Monitoring & Storage\n(Performance, A/B Testing, Databases)' },
      style: { background: '#f3e5f5', border: '3px solid #7b1fa2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    // Side components for context
    { id: 'real_time_fraud', type: 'default', position: { x: 300, y: 600 },
      data: { label: '⚡ Real-time\nFraud Detection' },
      style: { background: '#fff9c4', border: '3px solid #fbc02d', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },

    { id: 'ml_powered', type: 'default', position: { x: 1000, y: 600 },
      data: { label: '🤖 ML-Powered\nIntelligence' },
      style: { background: '#e8f5e9', border: '3px solid #4caf50', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },
  ];

  // Define edges for the fraud intelligence flowchart
  const initialEdges = [
    // Data sources to streaming platform
    { id: 'e1', source: 'A', target: 'DS', type: 'smoothstep' },
    { id: 'e2', source: 'B', target: 'DS', type: 'smoothstep' },
    { id: 'e3', source: 'C', target: 'DS', type: 'smoothstep' },
    { id: 'e4', source: 'D', target: 'DS', type: 'smoothstep' },
    { id: 'e5', source: 'E', target: 'DS', type: 'smoothstep' },
    { id: 'e6', source: 'F', target: 'DS', type: 'smoothstep' },
    { id: 'e7', source: 'G', target: 'DS', type: 'smoothstep' },

    // Stream processing flow
    { id: 'e8', source: 'DS', target: 'H', type: 'smoothstep' },
    { id: 'e9', source: 'H', target: 'I', type: 'smoothstep' },
    { id: 'e10', source: 'I', target: 'J', type: 'smoothstep' },
    { id: 'e11', source: 'I', target: 'K', type: 'smoothstep' },

    // Feature store to ML models
    { id: 'e12', source: 'J', target: 'L', type: 'smoothstep' },
    { id: 'e13', source: 'J', target: 'M', type: 'smoothstep' },
    { id: 'e14', source: 'J', target: 'N', type: 'smoothstep' },
    { id: 'e15', source: 'J', target: 'O', type: 'smoothstep' },
    { id: 'e16', source: 'J', target: 'P', type: 'smoothstep' },

    // Event enrichment to analytics
    { id: 'e17', source: 'K', target: 'T', type: 'smoothstep' },
    { id: 'e18', source: 'K', target: 'U', type: 'smoothstep' },
    { id: 'e19', source: 'K', target: 'V', type: 'smoothstep' },
    { id: 'e20', source: 'K', target: 'W', type: 'smoothstep' },

    // ML models to ensemble
    { id: 'e21', source: 'L', target: 'R', type: 'smoothstep' },
    { id: 'e22', source: 'M', target: 'R', type: 'smoothstep' },
    { id: 'e23', source: 'N', target: 'R', type: 'smoothstep' },
    { id: 'e24', source: 'O', target: 'R', type: 'smoothstep' },
    { id: 'e25', source: 'P', target: 'R', type: 'smoothstep' },
    { id: 'e26', source: 'Q', target: 'R', type: 'smoothstep' },

    // Ensemble to scoring engine
    { id: 'e27', source: 'R', target: 'S', type: 'smoothstep' },

    // Scoring engine to decision engine
    { id: 'e28', source: 'S', target: 'X', type: 'smoothstep' },
    { id: 'e29', source: 'X', target: 'Y', type: 'smoothstep' },
    { id: 'e30', source: 'Y', target: 'Z', type: 'smoothstep' },
    { id: 'e31', source: 'Z', target: 'AA', type: 'smoothstep' },

    // Decision engine to APIs
    { id: 'e32', source: 'S', target: 'FF', type: 'smoothstep' },
    { id: 'e33', source: 'Z', target: 'GG', type: 'smoothstep' },
    { id: 'e34', source: 'AA', target: 'HH', type: 'smoothstep' },

    // Analytics to storage
    { id: 'e35', source: 'T', target: 'LL', type: 'smoothstep' },
    { id: 'e36', source: 'U', target: 'LL', type: 'smoothstep' },
    { id: 'e37', source: 'V', target: 'MM', type: 'smoothstep' },
    { id: 'e38', source: 'W', target: 'NN', type: 'smoothstep' },

    // Monitoring connections
    { id: 'e39', source: 'S', target: 'PP', type: 'smoothstep' },
    { id: 'e40', source: 'R', target: 'QQ', type: 'smoothstep' },
    { id: 'e41', source: 'Z', target: 'RR', type: 'smoothstep' },
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
      <div className="w-full px-4 lg:px-6">
        {/* Section Header */}
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
              Advanced fraud detection using ensemble AI models and real-time behavioral analytics
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-100 border-2 border-blue-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Data Sources</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-100 border-2 border-purple-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Stream Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-100 border-2 border-green-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">ML Models</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-100 border-2 border-cyan-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">AI Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-lime-100 border-2 border-lime-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Analytics</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FraudIntelligenceFlowchart;