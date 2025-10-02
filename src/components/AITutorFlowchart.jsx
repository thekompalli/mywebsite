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

const AITutorFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  // Define horizontal layout for AI Tutor Interaction Platform
  const getHorizontalNodes = () => [
    // STUDENT INTERACTION LAYER (Column 1)
    { id: 'A', type: 'default', position: { x: 100, y: 50 }, data: { label: 'Web Chat Interface' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'B', type: 'default', position: { x: 100, y: 150 }, data: { label: 'Mobile App Chat' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'C', type: 'default', position: { x: 100, y: 250 }, data: { label: 'LMS Plugin Interface' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'D', type: 'default', position: { x: 100, y: 350 }, data: { label: 'Voice Interface - Speech-to-Text' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'E', type: 'default', position: { x: 100, y: 450 }, data: { label: 'Image Upload - Math/Diagrams' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'F', type: 'default', position: { x: 100, y: 550 }, data: { label: 'Screen Sharing Interface' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // CHAT API GATEWAY (Column 2)
    { id: 'API', type: 'default', position: { x: 360, y: 300 }, data: { label: 'Chat API Gateway' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 180, height: 80 } },

    // NATURAL LANGUAGE PROCESSING (Column 3)
    { id: 'G', type: 'default', position: { x: 620, y: 100 }, data: { label: 'Intent Classification Model' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'H', type: 'default', position: { x: 620, y: 200 }, data: { label: 'Entity Extraction - spaCy/NER' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'I', type: 'default', position: { x: 620, y: 300 }, data: { label: 'Question Type Classifier' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'J', type: 'default', position: { x: 620, y: 400 }, data: { label: 'Academic Subject Detector' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'K', type: 'default', position: { x: 620, y: 500 }, data: { label: 'Difficulty Level Assessor' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'L', type: 'default', position: { x: 620, y: 600 }, data: { label: 'Context Understanding Engine' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // SPECIALIZED AI TUTORS (Column 4)
    { id: 'M', type: 'default', position: { x: 880, y: 50 }, data: { label: 'Math Tutor - Wolfram Alpha Integration' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'N', type: 'default', position: { x: 880, y: 150 }, data: { label: 'Science Tutor - GPT-4 Science' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'O', type: 'default', position: { x: 880, y: 250 }, data: { label: 'Language Arts Tutor - Claude/GPT-4' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'P', type: 'default', position: { x: 880, y: 350 }, data: { label: 'Programming Tutor - Code Llama' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'Q', type: 'default', position: { x: 880, y: 450 }, data: { label: 'History/Social Studies Tutor' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'R', type: 'default', position: { x: 880, y: 550 }, data: { label: 'Test Prep Specialist - SAT/GRE/etc' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // AI ENGINE & METHODS (Column 4.5)
    { id: 'S', type: 'default', position: { x: 880, y: 650 }, data: { label: 'Multi-modal AI Engine - GPT-4V' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'T', type: 'default', position: { x: 1140, y: 400 }, data: { label: 'Socratic Method Instructor' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'U', type: 'default', position: { x: 1140, y: 500 }, data: { label: 'Adaptive Explanation Generator' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // PERSONALIZATION ENGINE (Column 5)
    { id: 'CC', type: 'default', position: { x: 1400, y: 100 }, data: { label: 'Student Learning Profile' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'DD', type: 'default', position: { x: 1400, y: 200 }, data: { label: 'Learning Style Adapter' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'EE', type: 'default', position: { x: 1400, y: 300 }, data: { label: 'Difficulty Progression Manager' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'FF', type: 'default', position: { x: 1400, y: 400 }, data: { label: 'Hint & Scaffolding System' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'GG', type: 'default', position: { x: 1400, y: 500 }, data: { label: 'Mistake Pattern Analyzer' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'HH', type: 'default', position: { x: 1400, y: 600 }, data: { label: 'Engagement Level Monitor' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // TEACHING STRATEGIES (Column 6)
    { id: 'OO', type: 'default', position: { x: 1660, y: 100 }, data: { label: 'Socratic Questioning Engine' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'PP', type: 'default', position: { x: 1660, y: 200 }, data: { label: 'Step-by-step Problem Solver' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'QQ', type: 'default', position: { x: 1660, y: 300 }, data: { label: 'Visual Learning Aid Generator' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'RR', type: 'default', position: { x: 1660, y: 400 }, data: { label: 'Analogy & Metaphor Creator' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'SS', type: 'default', position: { x: 1660, y: 500 }, data: { label: 'Gamification Strategy Engine' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'TT2', type: 'default', position: { x: 1660, y: 600 }, data: { label: 'Error Recovery Assistant' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // MULTI-MODAL CAPABILITIES (Column 7)
    { id: 'UU', type: 'default', position: { x: 1920, y: 100 }, data: { label: 'Computer Vision - Math OCR' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'VV', type: 'default', position: { x: 1920, y: 200 }, data: { label: 'Diagram Understanding - LayoutLM' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'WW', type: 'default', position: { x: 1920, y: 300 }, data: { label: 'Code Analysis Engine' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'XX', type: 'default', position: { x: 1920, y: 400 }, data: { label: 'Speech Synthesis - TTS' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'YY', type: 'default', position: { x: 1920, y: 500 }, data: { label: 'Interactive Whiteboard Tools' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'ZZ', type: 'default', position: { x: 1920, y: 600 }, data: { label: 'Augmented Reality Helper' }, style: { background: '#c8e6c9', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // STORAGE & INFRASTRUCTURE (Bottom row)
    { id: 'KKK', type: 'default', position: { x: 880, y: 750 }, data: { label: 'PostgreSQL - User Sessions' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'LLL', type: 'default', position: { x: 1140, y: 750 }, data: { label: 'MongoDB - Conversation Logs' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'MMM', type: 'default', position: { x: 1400, y: 750 }, data: { label: 'Redis - Real-time State' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'NNN', type: 'default', position: { x: 1660, y: 750 }, data: { label: 'Vector Store - Knowledge Embeddings' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 180, height: 70 } },
  ];

  // Define vertical layout (simplified view)
  const getVerticalNodes = () => [
    { id: 'interaction_layer', type: 'default', position: { x: 600, y: 50 },
      data: { label: 'Student Interaction Layer\n(Chat, Voice, Image, Screen Sharing)' },
      style: { background: '#e3f2fd', border: '3px solid #1976d2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'nlp_processing', type: 'default', position: { x: 600, y: 200 },
      data: { label: 'Natural Language Processing\n(Intent, Entity, Question Type, Subject)' },
      style: { background: '#f3e5f5', border: '3px solid #7b1fa2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'specialized_tutors', type: 'default', position: { x: 600, y: 350 },
      data: { label: 'Specialized AI Tutors\n(Math, Science, Language Arts, Programming)' },
      style: { background: '#e8f5e8', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'personalization', type: 'default', position: { x: 600, y: 500 },
      data: { label: 'Personalization Engine\n(Learning Profile, Style Adaptation, Scaffolding)' },
      style: { background: '#f9fbe7', border: '3px solid #689f38', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'teaching_strategies', type: 'default', position: { x: 600, y: 650 },
      data: { label: 'Teaching Strategies\n(Socratic Method, Problem Solving, Visual Aids)' },
      style: { background: '#e8eaf6', border: '3px solid #3f51b5', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'multimodal_capabilities', type: 'default', position: { x: 600, y: 800 },
      data: { label: 'Multi-modal Capabilities\n(Vision, Speech, AR, Interactive Tools)' },
      style: { background: '#c8e6c9', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    // Side components for context
    { id: 'ai_tutor', type: 'default', position: { x: 300, y: 425 },
      data: { label: '🤖 AI Tutor\nPlatform' },
      style: { background: '#fff9c4', border: '3px solid #fbc02d', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },

    { id: 'adaptive_tutoring', type: 'default', position: { x: 1000, y: 425 },
      data: { label: '🎯 Adaptive\nTutoring' },
      style: { background: '#e8f5e9', border: '3px solid #4caf50', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },
  ];

  // Define edges for the AI tutor flowchart
  const initialEdges = [
    // Interaction layer to API gateway
    { id: 'e1', source: 'A', target: 'API', type: 'smoothstep' },
    { id: 'e2', source: 'B', target: 'API', type: 'smoothstep' },
    { id: 'e3', source: 'C', target: 'API', type: 'smoothstep' },
    { id: 'e4', source: 'D', target: 'API', type: 'smoothstep' },
    { id: 'e5', source: 'E', target: 'API', type: 'smoothstep' },
    { id: 'e6', source: 'F', target: 'API', type: 'smoothstep' },

    // NLP processing pipeline
    { id: 'e7', source: 'API', target: 'G', type: 'smoothstep' },
    { id: 'e8', source: 'G', target: 'H', type: 'smoothstep' },
    { id: 'e9', source: 'H', target: 'I', type: 'smoothstep' },
    { id: 'e10', source: 'I', target: 'J', type: 'smoothstep' },
    { id: 'e11', source: 'J', target: 'K', type: 'smoothstep' },
    { id: 'e12', source: 'K', target: 'L', type: 'smoothstep' },

    // NLP to specialized tutors
    { id: 'e13', source: 'L', target: 'M', type: 'smoothstep' },
    { id: 'e14', source: 'L', target: 'N', type: 'smoothstep' },
    { id: 'e15', source: 'L', target: 'O', type: 'smoothstep' },
    { id: 'e16', source: 'L', target: 'P', type: 'smoothstep' },
    { id: 'e17', source: 'L', target: 'Q', type: 'smoothstep' },
    { id: 'e18', source: 'L', target: 'R', type: 'smoothstep' },
    { id: 'e19', source: 'L', target: 'S', type: 'smoothstep' },

    // Tutors to AI methods
    { id: 'e20', source: 'M', target: 'T', type: 'smoothstep' },
    { id: 'e21', source: 'N', target: 'T', type: 'smoothstep' },
    { id: 'e22', source: 'O', target: 'T', type: 'smoothstep' },
    { id: 'e23', source: 'P', target: 'T', type: 'smoothstep' },
    { id: 'e24', source: 'Q', target: 'T', type: 'smoothstep' },
    { id: 'e25', source: 'R', target: 'T', type: 'smoothstep' },
    { id: 'e26', source: 'S', target: 'T', type: 'smoothstep' },

    { id: 'e27', source: 'T', target: 'U', type: 'smoothstep' },

    // Personalization connections
    { id: 'e28', source: 'L', target: 'CC', type: 'smoothstep' },
    { id: 'e29', source: 'CC', target: 'DD', type: 'smoothstep' },
    { id: 'e30', source: 'DD', target: 'EE', type: 'smoothstep' },
    { id: 'e31', source: 'EE', target: 'FF', type: 'smoothstep' },
    { id: 'e32', source: 'FF', target: 'GG', type: 'smoothstep' },
    { id: 'e33', source: 'GG', target: 'HH', type: 'smoothstep' },

    // Teaching strategies
    { id: 'e34', source: 'T', target: 'OO', type: 'smoothstep' },
    { id: 'e35', source: 'OO', target: 'PP', type: 'smoothstep' },
    { id: 'e36', source: 'PP', target: 'QQ', type: 'smoothstep' },
    { id: 'e37', source: 'QQ', target: 'RR', type: 'smoothstep' },
    { id: 'e38', source: 'RR', target: 'SS', type: 'smoothstep' },
    { id: 'e39', source: 'SS', target: 'TT2', type: 'smoothstep' },

    // Multi-modal capabilities
    { id: 'e40', source: 'E', target: 'UU', type: 'smoothstep' },
    { id: 'e41', source: 'UU', target: 'VV', type: 'smoothstep' },
    { id: 'e42', source: 'P', target: 'WW', type: 'smoothstep' },
    { id: 'e43', source: 'U', target: 'XX', type: 'smoothstep' },
    { id: 'e44', source: 'S', target: 'YY', type: 'smoothstep' },
    { id: 'e45', source: 'S', target: 'ZZ', type: 'smoothstep' },

    // Storage connections
    { id: 'e46', source: 'API', target: 'KKK', type: 'smoothstep' },
    { id: 'e47', source: 'T', target: 'LLL', type: 'smoothstep' },
    { id: 'e48', source: 'CC', target: 'MMM', type: 'smoothstep' },
    { id: 'e49', source: 'O', target: 'NNN', type: 'smoothstep' },
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
            AI Tutor Interaction Platform
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto uppercase tracking-wide mb-8">
            Multimodal tutoring orchestration across chat, voice, and LMS touchpoints with adaptive guidance
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
              AI-powered multimodal tutoring with subject-specific expertise and adaptive teaching strategies
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 border-2 border-blue-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Interaction Layer</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-100 border-2 border-purple-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">NLP Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border-2 border-green-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">AI Tutors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-lime-100 border-2 border-lime-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Personalization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-indigo-100 border-2 border-indigo-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Teaching Methods</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AITutorFlowchart;