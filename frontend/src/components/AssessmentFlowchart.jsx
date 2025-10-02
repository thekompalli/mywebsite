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

const AssessmentFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  // Define horizontal layout for Automated Assessment & Feedback Pipeline
  const getHorizontalNodes = () => [
    // SUBMISSION INPUT LAYER (Column 1)
    { id: 'A', type: 'default', position: { x: 100, y: 50 }, data: { label: 'LMS File Upload' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'B', type: 'default', position: { x: 100, y: 150 }, data: { label: 'Email Attachments' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'C', type: 'default', position: { x: 100, y: 250 }, data: { label: 'Google Classroom' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'D', type: 'default', position: { x: 100, y: 350 }, data: { label: 'Canvas Integration' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'E', type: 'default', position: { x: 100, y: 450 }, data: { label: 'Direct Web Upload' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'F', type: 'default', position: { x: 100, y: 550 }, data: { label: 'Code Repository Links' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'G', type: 'default', position: { x: 100, y: 650 }, data: { label: 'Plagiarism Detection Input' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // SUBMISSION PROCESSING API (Column 2)
    { id: 'SUB', type: 'default', position: { x: 360, y: 350 }, data: { label: 'Submission Processing API' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 180, height: 80 } },

    // CONTENT PROCESSING PIPELINE (Column 3)
    { id: 'H', type: 'default', position: { x: 620, y: 100 }, data: { label: 'File Type Detector' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'I', type: 'default', position: { x: 620, y: 200 }, data: { label: 'Document Parser - PyMuPDF/docx' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'J', type: 'default', position: { x: 620, y: 300 }, data: { label: 'OCR Engine - Tesseract/AWS Textract' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 180, height: 70 } },
    { id: 'K', type: 'default', position: { x: 620, y: 400 }, data: { label: 'Text Extraction & Cleaning' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'L', type: 'default', position: { x: 620, y: 500 }, data: { label: 'Content Structure Analyzer' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'M', type: 'default', position: { x: 620, y: 600 }, data: { label: 'Metadata Extractor' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // ESSAY & WRITING GRADER (Column 4)
    { id: 'N', type: 'default', position: { x: 880, y: 50 }, data: { label: 'BERT-based Essay Scorer' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'O', type: 'default', position: { x: 880, y: 150 }, data: { label: 'Grammar Checker - LanguageTool' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'P', type: 'default', position: { x: 880, y: 250 }, data: { label: 'Coherence & Flow Analyzer' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'Q', type: 'default', position: { x: 880, y: 350 }, data: { label: 'Citation & Reference Checker' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'R', type: 'default', position: { x: 880, y: 450 }, data: { label: 'Plagiarism Detector - Turnitin API' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'S', type: 'default', position: { x: 880, y: 550 }, data: { label: 'Writing Style Evaluator' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // CODE ASSIGNMENT GRADER (Column 4.5)
    { id: 'T', type: 'default', position: { x: 880, y: 650 }, data: { label: 'Automated Test Suite Runner' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'U', type: 'default', position: { x: 1140, y: 400 }, data: { label: 'Code Quality Analyzer - SonarQube' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'V', type: 'default', position: { x: 1140, y: 500 }, data: { label: 'Algorithm Efficiency Checker' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // AI FEEDBACK GENERATION (Column 5)
    { id: 'FF', type: 'default', position: { x: 1400, y: 100 }, data: { label: 'GPT-4 Feedback Generator' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'GG', type: 'default', position: { x: 1400, y: 200 }, data: { label: 'Subject-specific Feedback Models' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'HH', type: 'default', position: { x: 1400, y: 300 }, data: { label: 'Constructive Criticism Engine' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'II', type: 'default', position: { x: 1400, y: 400 }, data: { label: 'Improvement Suggestion Generator' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'JJ', type: 'default', position: { x: 1400, y: 500 }, data: { label: 'Personalized Learning Recommendations' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 180, height: 70 } },
    { id: 'KK', type: 'default', position: { x: 1400, y: 600 }, data: { label: 'Error Pattern Analyzer' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },

    // RUBRIC & ASSESSMENT ENGINE (Column 6)
    { id: 'LL', type: 'default', position: { x: 1660, y: 100 }, data: { label: 'Digital Rubric Parser' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'MM', type: 'default', position: { x: 1660, y: 200 }, data: { label: 'Criteria-based Scoring' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'NN', type: 'default', position: { x: 1660, y: 300 }, data: { label: 'Weighted Grade Calculator' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'OO', type: 'default', position: { x: 1660, y: 400 }, data: { label: 'Comparative Assessment Engine' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'PP', type: 'default', position: { x: 1660, y: 500 }, data: { label: 'Holistic Scoring Model' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'QQ', type: 'default', position: { x: 1660, y: 600 }, data: { label: 'Peer Assessment Integrator' }, style: { background: '#f9fbe7', border: '2px solid #689f38', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // FEEDBACK DELIVERY SYSTEM (Column 7)
    { id: 'XX', type: 'default', position: { x: 1920, y: 100 }, data: { label: 'Multi-format Report Generator' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'YY', type: 'default', position: { x: 1920, y: 200 }, data: { label: 'Interactive Feedback Interface' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'ZZ', type: 'default', position: { x: 1920, y: 300 }, data: { label: 'Video Feedback Creator' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'AAA', type: 'default', position: { x: 1920, y: 400 }, data: { label: 'Audio Commentary Generator' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'BBB', type: 'default', position: { x: 1920, y: 500 }, data: { label: 'Annotated Document Creator' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'CCC', type: 'default', position: { x: 1920, y: 600 }, data: { label: 'Progress Tracking Dashboard' }, style: { background: '#e8eaf6', border: '2px solid #3f51b5', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // STORAGE & INFRASTRUCTURE (Bottom row)
    { id: 'PPP', type: 'default', position: { x: 880, y: 750 }, data: { label: 'PostgreSQL - Assignments & Grades' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'QQQ', type: 'default', position: { x: 1140, y: 750 }, data: { label: 'MongoDB - Submissions & Feedback' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'RRR', type: 'default', position: { x: 1400, y: 750 }, data: { label: 'Redis - Processing Queue' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
    { id: 'SSS', type: 'default', position: { x: 1660, y: 750 }, data: { label: 'S3 - File Storage' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 180, height: 70 } },
  ];

  // Define vertical layout (simplified view)
  const getVerticalNodes = () => [
    { id: 'submission_input', type: 'default', position: { x: 600, y: 50 },
      data: { label: 'Submission Input Layer\n(LMS, Email, Canvas, Code Repos)' },
      style: { background: '#e3f2fd', border: '3px solid #1976d2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'content_processing', type: 'default', position: { x: 600, y: 200 },
      data: { label: 'Content Processing Pipeline\n(Parser, OCR, Text Extraction, Structure Analysis)' },
      style: { background: '#f3e5f5', border: '3px solid #7b1fa2', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'specialized_graders', type: 'default', position: { x: 600, y: 350 },
      data: { label: 'Specialized Grading Engines\n(Essay, Code, Math, Science)' },
      style: { background: '#e8f5e8', border: '3px solid #388e3c', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'ai_feedback', type: 'default', position: { x: 600, y: 500 },
      data: { label: 'AI Feedback Generation\n(GPT-4, Subject-specific Models, Suggestions)' },
      style: { background: '#e1f5fe', border: '3px solid #0277bd', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'assessment_engine', type: 'default', position: { x: 600, y: 650 },
      data: { label: 'Rubric & Assessment Engine\n(Digital Rubrics, Scoring, Grade Calculation)' },
      style: { background: '#f9fbe7', border: '3px solid #689f38', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    { id: 'feedback_delivery', type: 'default', position: { x: 600, y: 800 },
      data: { label: 'Feedback Delivery System\n(Reports, Interactive Interface, Progress Tracking)' },
      style: { background: '#e8eaf6', border: '3px solid #3f51b5', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', width: 300, height: 100, padding: '20px' }
    },

    // Side components for context
    { id: 'automated_grading', type: 'default', position: { x: 300, y: 425 },
      data: { label: '📝 Automated\nGrading' },
      style: { background: '#fff9c4', border: '3px solid #fbc02d', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },

    { id: 'ai_feedback_sys', type: 'default', position: { x: 1000, y: 425 },
      data: { label: '🤖 AI Feedback\nSystem' },
      style: { background: '#e8f5e9', border: '3px solid #4caf50', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', width: 150, height: 80, textAlign: 'center', padding: '10px' }
    },
  ];

  // Define edges for the assessment flowchart
  const initialEdges = [
    // Submission inputs to processing API
    { id: 'e1', source: 'A', target: 'SUB', type: 'smoothstep' },
    { id: 'e2', source: 'B', target: 'SUB', type: 'smoothstep' },
    { id: 'e3', source: 'C', target: 'SUB', type: 'smoothstep' },
    { id: 'e4', source: 'D', target: 'SUB', type: 'smoothstep' },
    { id: 'e5', source: 'E', target: 'SUB', type: 'smoothstep' },
    { id: 'e6', source: 'F', target: 'SUB', type: 'smoothstep' },
    { id: 'e7', source: 'G', target: 'SUB', type: 'smoothstep' },

    // Content processing pipeline
    { id: 'e8', source: 'SUB', target: 'H', type: 'smoothstep' },
    { id: 'e9', source: 'H', target: 'I', type: 'smoothstep' },
    { id: 'e10', source: 'I', target: 'J', type: 'smoothstep' },
    { id: 'e11', source: 'J', target: 'K', type: 'smoothstep' },
    { id: 'e12', source: 'K', target: 'L', type: 'smoothstep' },
    { id: 'e13', source: 'L', target: 'M', type: 'smoothstep' },

    // Processing to specialized graders
    { id: 'e14', source: 'M', target: 'N', type: 'smoothstep' },
    { id: 'e15', source: 'M', target: 'O', type: 'smoothstep' },
    { id: 'e16', source: 'M', target: 'P', type: 'smoothstep' },
    { id: 'e17', source: 'M', target: 'Q', type: 'smoothstep' },
    { id: 'e18', source: 'M', target: 'R', type: 'smoothstep' },
    { id: 'e19', source: 'M', target: 'S', type: 'smoothstep' },
    { id: 'e20', source: 'M', target: 'T', type: 'smoothstep' },
    { id: 'e21', source: 'M', target: 'U', type: 'smoothstep' },
    { id: 'e22', source: 'M', target: 'V', type: 'smoothstep' },

    // Graders to AI feedback
    { id: 'e23', source: 'N', target: 'FF', type: 'smoothstep' },
    { id: 'e24', source: 'T', target: 'FF', type: 'smoothstep' },
    { id: 'e25', source: 'FF', target: 'GG', type: 'smoothstep' },
    { id: 'e26', source: 'GG', target: 'HH', type: 'smoothstep' },
    { id: 'e27', source: 'HH', target: 'II', type: 'smoothstep' },
    { id: 'e28', source: 'II', target: 'JJ', type: 'smoothstep' },
    { id: 'e29', source: 'JJ', target: 'KK', type: 'smoothstep' },

    // Rubric & assessment engine
    { id: 'e30', source: 'LL', target: 'MM', type: 'smoothstep' },
    { id: 'e31', source: 'MM', target: 'NN', type: 'smoothstep' },
    { id: 'e32', source: 'NN', target: 'OO', type: 'smoothstep' },
    { id: 'e33', source: 'OO', target: 'PP', type: 'smoothstep' },
    { id: 'e34', source: 'PP', target: 'QQ', type: 'smoothstep' },

    // Feedback delivery system
    { id: 'e35', source: 'GG', target: 'XX', type: 'smoothstep' },
    { id: 'e36', source: 'XX', target: 'YY', type: 'smoothstep' },
    { id: 'e37', source: 'YY', target: 'ZZ', type: 'smoothstep' },
    { id: 'e38', source: 'ZZ', target: 'AAA', type: 'smoothstep' },
    { id: 'e39', source: 'AAA', target: 'BBB', type: 'smoothstep' },
    { id: 'e40', source: 'BBB', target: 'CCC', type: 'smoothstep' },

    // Assessment to delivery
    { id: 'e41', source: 'NN', target: 'XX', type: 'smoothstep' },
    { id: 'e42', source: 'CCC', target: 'YY', type: 'smoothstep' },

    // Storage connections
    { id: 'e43', source: 'SUB', target: 'PPP', type: 'smoothstep' },
    { id: 'e44', source: 'GG', target: 'QQQ', type: 'smoothstep' },
    { id: 'e45', source: 'T', target: 'RRR', type: 'smoothstep' },
    { id: 'e46', source: 'SUB', target: 'SSS', type: 'smoothstep' },
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
            Automated Assessment & Feedback Pipeline
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto uppercase tracking-wide mb-8">
            End-to-end submission processing with domain-specific grading engines and rich feedback delivery
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
              AI-powered automated grading with specialized engines for different content types and comprehensive feedback
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 border-2 border-blue-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Input Sources</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-100 border-2 border-purple-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border-2 border-green-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Grading Engines</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-cyan-100 border-2 border-cyan-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">AI Feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-lime-100 border-2 border-lime-600 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Assessment</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AssessmentFlowchart;