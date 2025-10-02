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

const RegulatoryIntelligenceFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  // Define horizontal layout for Regulatory Intelligence Co-pilot
  const getHorizontalNodes = () => [
    // REGULATORY DATA SOURCES (Column 1)
    { id: 'A', type: 'default', position: { x: 100, y: 50 }, data: { label: 'Regulatory Bodies APIs' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'B', type: 'default', position: { x: 100, y: 150 }, data: { label: 'Legal Document Feeds' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'C', type: 'default', position: { x: 100, y: 250 }, data: { label: 'Industry Standards Updates' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'D', type: 'default', position: { x: 100, y: 350 }, data: { label: 'Geographic Regulation DBs' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'E', type: 'default', position: { x: 100, y: 450 }, data: { label: 'Product Configuration Data' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'F', type: 'default', position: { x: 100, y: 550 }, data: { label: 'Company Policy Repository' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'G', type: 'default', position: { x: 100, y: 650 }, data: { label: 'Competitor Analysis Data' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // DATA INGESTION LAYER (Column 2)
    { id: 'DS', type: 'default', position: { x: 360, y: 350 }, data: { label: 'Data Ingestion Layer' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 180, height: 80 } },

    // DOCUMENT PROCESSING PIPELINE (Column 3)
    { id: 'H', type: 'default', position: { x: 620, y: 150 }, data: { label: 'Document Parser - Unstructured.io' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'I', type: 'default', position: { x: 620, y: 250 }, data: { label: 'OCR Engine - AWS Textract' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'J', type: 'default', position: { x: 620, y: 350 }, data: { label: 'NLP Preprocessing Pipeline' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'K', type: 'default', position: { x: 620, y: 450 }, data: { label: 'Document Classification Model' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'L', type: 'default', position: { x: 620, y: 550 }, data: { label: 'Entity Extraction - spaCy/Transformers' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // KNOWLEDGE MANAGEMENT (Column 4)
    { id: 'M', type: 'default', position: { x: 880, y: 200 }, data: { label: 'Regulatory Knowledge Graph - Neo4j' }, style: { background: '#fce4ec', border: '2px solid #c2185b', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'N', type: 'default', position: { x: 880, y: 300 }, data: { label: 'Vector Embeddings - OpenAI/Cohere' }, style: { background: '#fce4ec', border: '2px solid #c2185b', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'O', type: 'default', position: { x: 880, y: 400 }, data: { label: 'Semantic Search Engine' }, style: { background: '#fce4ec', border: '2px solid #c2185b', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'P', type: 'default', position: { x: 880, y: 500 }, data: { label: 'Knowledge Base - Elasticsearch' }, style: { background: '#fce4ec', border: '2px solid #c2185b', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // AI ANALYSIS ENGINE (Column 5)
    { id: 'Q', type: 'default', position: { x: 1140, y: 100 }, data: { label: 'LLM Legal Analyst - GPT-4/Claude' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'R', type: 'default', position: { x: 1140, y: 200 }, data: { label: 'Compliance Gap Detector' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'S', type: 'default', position: { x: 1140, y: 300 }, data: { label: 'Risk Assessment Model' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'T', type: 'default', position: { x: 1140, y: 400 }, data: { label: 'Regulatory Change Impact Analyzer' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'U', type: 'default', position: { x: 1140, y: 500 }, data: { label: 'Geographic Compliance Mapper' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // AI ORCHESTRATION (Column 6)
    { id: 'V', type: 'default', position: { x: 1400, y: 200 }, data: { label: 'Multi-Agent Orchestrator' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'W', type: 'default', position: { x: 1400, y: 300 }, data: { label: 'Legal Reasoning Chain' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'X', type: 'default', position: { x: 1400, y: 400 }, data: { label: 'Compliance Score Calculator' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // PRODUCT ANALYSIS MODULE (Column 7)
    { id: 'Y', type: 'default', position: { x: 1660, y: 50 }, data: { label: 'Product Feature Analyzer' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'Z', type: 'default', position: { x: 1660, y: 150 }, data: { label: 'Regulatory Requirement Matcher' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'AA', type: 'default', position: { x: 1660, y: 250 }, data: { label: 'Gap Analysis Engine' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'BB', type: 'default', position: { x: 1660, y: 350 }, data: { label: 'Compliance Roadmap Generator' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'CC', type: 'default', position: { x: 1660, y: 450 }, data: { label: 'Implementation Cost Estimator' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // GEOGRAPHIC EXPANSION MODULE (Column 8)
    { id: 'DD', type: 'default', position: { x: 1920, y: 50 }, data: { label: 'Market Entry Analyzer' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'EE', type: 'default', position: { x: 1920, y: 150 }, data: { label: 'Local Regulation Scanner' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'FF', type: 'default', position: { x: 1920, y: 250 }, data: { label: 'Licensing Requirement Detector' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'GG', type: 'default', position: { x: 1920, y: 350 }, data: { label: 'Timeline & Cost Projector' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'HH', type: 'default', position: { x: 1920, y: 450 }, data: { label: 'Risk Mitigation Planner' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // DECISION SUPPORT SYSTEM (Column 9)
    { id: 'II', type: 'default', position: { x: 2180, y: 100 }, data: { label: 'Interactive Compliance Dashboard' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'JJ', type: 'default', position: { x: 2180, y: 200 }, data: { label: 'Recommendation Engine' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'KK', type: 'default', position: { x: 2180, y: 300 }, data: { label: 'Action Item Generator' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'LL', type: 'default', position: { x: 2180, y: 400 }, data: { label: 'Progress Tracking System' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'MM', type: 'default', position: { x: 2180, y: 500 }, data: { label: 'Alert & Notification Service' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // STORAGE LAYER (Bottom row)
    { id: 'XX', type: 'default', position: { x: 880, y: 650 }, data: { label: 'PostgreSQL - Structured Data' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'YY', type: 'default', position: { x: 1140, y: 650 }, data: { label: 'MongoDB - Document Store' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'ZZ', type: 'default', position: { x: 1400, y: 650 }, data: { label: 'Vector Database - Pinecone' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'AAA', type: 'default', position: { x: 1660, y: 650 }, data: { label: 'Redis - Caching' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'BBB', type: 'default', position: { x: 1920, y: 650 }, data: { label: 'S3 - Document Storage' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
  ];

  // Define vertical layout (simplified view)
  const getVerticalNodes = () => [
    { id: 'data_sources', type: 'default', position: { x: 600, y: 50 },
      data: { label: 'Regulatory Data Sources\n(APIs, Legal Docs, Standards, Policies)' },
      style: { background: '#e3f2fd', border: '3px solid #1976d2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'document_processing', type: 'default', position: { x: 600, y: 200 },
      data: { label: 'Document Processing\n(Parser, OCR, NLP, Classification)' },
      style: { background: '#f3e5f5', border: '3px solid #7b1fa2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'knowledge_management', type: 'default', position: { x: 600, y: 350 },
      data: { label: 'Knowledge Management\n(Graph DB, Embeddings, Search)' },
      style: { background: '#fce4ec', border: '3px solid #c2185b', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'ai_analysis', type: 'default', position: { x: 600, y: 500 },
      data: { label: 'AI Analysis Engine\n(LLM Analyst, Gap Detection, Risk Assessment)' },
      style: { background: '#e8f5e8', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'orchestration', type: 'default', position: { x: 600, y: 650 },
      data: { label: 'AI Orchestration\n(Multi-Agent, Reasoning, Scoring)' },
      style: { background: '#e1f5fe', border: '3px solid #0277bd', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'product_analysis', type: 'default', position: { x: 600, y: 800 },
      data: { label: 'Product Analysis\n(Feature Analysis, Gap Engine, Roadmap)' },
      style: { background: '#f9fbe7', border: '3px solid #689f38', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'expansion_module', type: 'default', position: { x: 600, y: 950 },
      data: { label: 'Geographic Expansion\n(Market Entry, Local Regulations)' },
      style: { background: '#c8e6c9', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'decision_support', type: 'default', position: { x: 600, y: 1100 },
      data: { label: 'Decision Support\n(Dashboard, Recommendations, Tracking)' },
      style: { background: '#e8eaf6', border: '3px solid #3f51b5', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    // Side components for context
    { id: 'legal_ai', type: 'default', position: { x: 300, y: 600 },
      data: { label: '⚖️ Legal AI\nCo-pilot' },
      style: { background: '#fff9c4', border: '3px solid #fbc02d', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },

    { id: 'compliance_navigator', type: 'default', position: { x: 1000, y: 600 },
      data: { label: '🧭 Compliance\nNavigator' },
      style: { background: '#e8f5e9', border: '3px solid #4caf50', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },
  ];

  // Define edges for the regulatory intelligence flowchart
  const initialEdges = [
    // Data sources to ingestion layer
    { id: 'e1', source: 'A', target: 'DS', type: 'smoothstep' },
    { id: 'e2', source: 'B', target: 'DS', type: 'smoothstep' },
    { id: 'e3', source: 'C', target: 'DS', type: 'smoothstep' },
    { id: 'e4', source: 'D', target: 'DS', type: 'smoothstep' },
    { id: 'e5', source: 'E', target: 'DS', type: 'smoothstep' },
    { id: 'e6', source: 'F', target: 'DS', type: 'smoothstep' },
    { id: 'e7', source: 'G', target: 'DS', type: 'smoothstep' },

    // Document processing pipeline
    { id: 'e8', source: 'DS', target: 'H', type: 'smoothstep' },
    { id: 'e9', source: 'H', target: 'I', type: 'smoothstep' },
    { id: 'e10', source: 'I', target: 'J', type: 'smoothstep' },
    { id: 'e11', source: 'J', target: 'K', type: 'smoothstep' },
    { id: 'e12', source: 'K', target: 'L', type: 'smoothstep' },

    // Knowledge management flow
    { id: 'e13', source: 'L', target: 'M', type: 'smoothstep' },
    { id: 'e14', source: 'M', target: 'N', type: 'smoothstep' },
    { id: 'e15', source: 'N', target: 'O', type: 'smoothstep' },
    { id: 'e16', source: 'O', target: 'P', type: 'smoothstep' },

    // Knowledge base to AI models
    { id: 'e17', source: 'P', target: 'Q', type: 'smoothstep' },
    { id: 'e18', source: 'P', target: 'R', type: 'smoothstep' },
    { id: 'e19', source: 'P', target: 'S', type: 'smoothstep' },
    { id: 'e20', source: 'P', target: 'T', type: 'smoothstep' },
    { id: 'e21', source: 'P', target: 'U', type: 'smoothstep' },

    // AI models to orchestrator
    { id: 'e22', source: 'Q', target: 'V', type: 'smoothstep' },
    { id: 'e23', source: 'R', target: 'V', type: 'smoothstep' },
    { id: 'e24', source: 'S', target: 'V', type: 'smoothstep' },
    { id: 'e25', source: 'T', target: 'V', type: 'smoothstep' },
    { id: 'e26', source: 'U', target: 'V', type: 'smoothstep' },

    // Orchestrator to reasoning chain
    { id: 'e27', source: 'V', target: 'W', type: 'smoothstep' },
    { id: 'e28', source: 'W', target: 'X', type: 'smoothstep' },

    // Product configuration to analysis
    { id: 'e29', source: 'E', target: 'Y', type: 'smoothstep' },
    { id: 'e30', source: 'Y', target: 'Z', type: 'smoothstep' },
    { id: 'e31', source: 'Z', target: 'AA', type: 'smoothstep' },
    { id: 'e32', source: 'AA', target: 'BB', type: 'smoothstep' },
    { id: 'e33', source: 'BB', target: 'CC', type: 'smoothstep' },

    // Geographic data to expansion module
    { id: 'e34', source: 'D', target: 'DD', type: 'smoothstep' },
    { id: 'e35', source: 'DD', target: 'EE', type: 'smoothstep' },
    { id: 'e36', source: 'EE', target: 'FF', type: 'smoothstep' },
    { id: 'e37', source: 'FF', target: 'GG', type: 'smoothstep' },
    { id: 'e38', source: 'GG', target: 'HH', type: 'smoothstep' },

    // Decision support connections
    { id: 'e39', source: 'X', target: 'II', type: 'smoothstep' },
    { id: 'e40', source: 'BB', target: 'JJ', type: 'smoothstep' },
    { id: 'e41', source: 'JJ', target: 'KK', type: 'smoothstep' },
    { id: 'e42', source: 'KK', target: 'LL', type: 'smoothstep' },
    { id: 'e43', source: 'LL', target: 'MM', type: 'smoothstep' },

    // Storage connections
    { id: 'e44', source: 'M', target: 'XX', type: 'smoothstep' },
    { id: 'e45', source: 'P', target: 'YY', type: 'smoothstep' },
    { id: 'e46', source: 'N', target: 'ZZ', type: 'smoothstep' },
    { id: 'e47', source: 'O', target: 'AAA', type: 'smoothstep' },
    { id: 'e48', source: 'H', target: 'BBB', type: 'smoothstep' },
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
            Regulatory Intelligence Co-pilot
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto uppercase tracking-wide mb-8">
            LLM-led compliance navigator for market expansion, product launches, and change management
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
              AI-powered compliance navigation with intelligent document processing and regulatory analysis
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
                <div className="w-4 h-4 bg-pink-100 border-2 border-pink-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Knowledge</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border-2 border-green-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">AI Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-indigo-100 border-2 border-indigo-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Decision Support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RegulatoryIntelligenceFlowchart;