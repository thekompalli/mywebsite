import React, { useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Panel, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const MedicalImagingFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  const horizontalNodes = [
    // Medical Imaging Sources
    { id: 'XRAY', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Digital X-Ray Systems' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 150, height: 60 } },
    { id: 'CT', type: 'input', position: { x: 50, y: 130 }, data: { label: 'CT Scanners' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 150, height: 60 } },
    { id: 'MRI', type: 'input', position: { x: 50, y: 210 }, data: { label: 'MRI Machines' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 150, height: 60 } },
    { id: 'ULTRASOUND', type: 'input', position: { x: 50, y: 290 }, data: { label: 'Ultrasound Devices' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 150, height: 60 } },
    { id: 'MAMMO', type: 'input', position: { x: 50, y: 370 }, data: { label: 'Mammography Systems' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 150, height: 60 } },
    { id: 'PACS', type: 'input', position: { x: 50, y: 450 }, data: { label: 'PACS - Picture Archiving System' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 150, height: 60 } },

    // Image Ingestion System
    { id: 'IS', type: 'default', position: { x: 280, y: 250 }, data: { label: 'Image Ingestion System' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 160, height: 70 } },

    // Image Processing Pipeline
    { id: 'DICOM', type: 'default', position: { x: 500, y: 150 }, data: { label: 'DICOM Image Processor' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'QUALITY', type: 'default', position: { x: 500, y: 230 }, data: { label: 'Image Quality Assessment' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'ENHANCE', type: 'default', position: { x: 500, y: 310 }, data: { label: 'Preprocessing & Enhancement' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'STANDARD', type: 'default', position: { x: 500, y: 390 }, data: { label: 'Image Standardization Engine' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },

    // AI Analysis Engine - Modality-Specific Models
    { id: 'CHEXNET', type: 'default', position: { x: 720, y: 50 }, data: { label: 'Chest X-Ray Analyzer - CheXNet' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 180, height: 60 } },
    { id: 'CT_INTERP', type: 'default', position: { x: 720, y: 130 }, data: { label: 'CT Scan Interpreter' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 180, height: 60 } },
    { id: 'FREESURFER', type: 'default', position: { x: 720, y: 210 }, data: { label: 'MRI Brain Analysis - FreeSurfer AI' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 180, height: 60 } },
    { id: 'MAMMO_AI', type: 'default', position: { x: 720, y: 290 }, data: { label: 'Mammography Screening AI' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 180, height: 60 } },
    { id: 'PATH_AI', type: 'default', position: { x: 720, y: 370 }, data: { label: 'Pathology Slide Analyzer' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 180, height: 60 } },
    { id: 'RETINAL', type: 'default', position: { x: 720, y: 450 }, data: { label: 'Retinal Image Analyzer' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 180, height: 60 } },

    // Disease Detection Models
    { id: 'PNEUMONIA', type: 'default', position: { x: 960, y: 100 }, data: { label: 'Pneumonia Detection Model' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 170, height: 60 } },
    { id: 'CANCER', type: 'default', position: { x: 960, y: 180 }, data: { label: 'Cancer Detection & Staging AI' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 170, height: 60 } },
    { id: 'FRACTURE', type: 'default', position: { x: 960, y: 260 }, data: { label: 'Fracture Detection System' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 170, height: 60 } },
    { id: 'STROKE', type: 'default', position: { x: 960, y: 340 }, data: { label: 'Stroke Lesion Identifier' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 170, height: 60 } },

    // Multi-modal Fusion and AI Assistant
    { id: 'FUSION', type: 'default', position: { x: 1200, y: 200 }, data: { label: 'Multi-modal Fusion Engine' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 170, height: 60 } },
    { id: 'GPT4V', type: 'default', position: { x: 1200, y: 280 }, data: { label: 'Radiologist Assistant AI - GPT-4V' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 170, height: 60 } },

    // Clinical Decision Support
    { id: 'DIFF_DIAG', type: 'default', position: { x: 1440, y: 100 }, data: { label: 'Differential Diagnosis Generator' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 170, height: 60 } },
    { id: 'SEVERITY_ASSESS', type: 'default', position: { x: 1440, y: 180 }, data: { label: 'Severity Assessment Engine' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 170, height: 60 } },
    { id: 'TREATMENT_REC', type: 'default', position: { x: 1440, y: 260 }, data: { label: 'Treatment Recommendation System' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 170, height: 60 } },
    { id: 'SURGICAL_PLAN', type: 'default', position: { x: 1440, y: 340 }, data: { label: 'Surgical Planning Assistant' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 170, height: 60 } },

    // Quality Assurance & Validation
    { id: 'CONFIDENCE', type: 'default', position: { x: 1680, y: 150 }, data: { label: 'AI Confidence Scoring' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'RAD_REVIEW', type: 'default', position: { x: 1680, y: 230 }, data: { label: 'Radiologist Review Queue' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'PERFORMANCE', type: 'default', position: { x: 1680, y: 310 }, data: { label: 'Model Performance Monitor' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },

    // Reporting & Visualization
    { id: 'AUTO_REPORT', type: 'default', position: { x: 1920, y: 100 }, data: { label: 'Automated Report Generator' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'VISUALIZE', type: 'default', position: { x: 1920, y: 180 }, data: { label: '3D Visualization Engine' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'DASHBOARD', type: 'output', position: { x: 1920, y: 260 }, data: { label: 'Interactive Dashboard' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '11px', width: 160, height: 70 } },

    // Clinical Integration
    { id: 'EHR_INTEG', type: 'output', position: { x: 2160, y: 180 }, data: { label: 'EHR Integration - HL7 FHIR' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
  ];

  const horizontalEdges = [
    // Imaging sources to ingestion
    { id: 'e1', source: 'XRAY', target: 'IS', animated: true },
    { id: 'e2', source: 'CT', target: 'IS', animated: true },
    { id: 'e3', source: 'MRI', target: 'IS', animated: true },
    { id: 'e4', source: 'ULTRASOUND', target: 'IS', animated: true },
    { id: 'e5', source: 'MAMMO', target: 'IS', animated: true },
    { id: 'e6', source: 'PACS', target: 'IS', animated: true },

    // Ingestion to processing pipeline
    { id: 'e7', source: 'IS', target: 'DICOM', animated: true },
    { id: 'e8', source: 'DICOM', target: 'QUALITY', animated: true },
    { id: 'e9', source: 'QUALITY', target: 'ENHANCE', animated: true },
    { id: 'e10', source: 'ENHANCE', target: 'STANDARD', animated: true },

    // Processing to AI models
    { id: 'e11', source: 'STANDARD', target: 'CHEXNET', animated: true },
    { id: 'e12', source: 'STANDARD', target: 'CT_INTERP', animated: true },
    { id: 'e13', source: 'STANDARD', target: 'FREESURFER', animated: true },
    { id: 'e14', source: 'STANDARD', target: 'MAMMO_AI', animated: true },
    { id: 'e15', source: 'STANDARD', target: 'PATH_AI', animated: true },
    { id: 'e16', source: 'STANDARD', target: 'RETINAL', animated: true },

    // AI models to disease detection
    { id: 'e17', source: 'CHEXNET', target: 'PNEUMONIA', animated: true },
    { id: 'e18', source: 'CT_INTERP', target: 'CANCER', animated: true },
    { id: 'e19', source: 'FREESURFER', target: 'STROKE', animated: true },
    { id: 'e20', source: 'MAMMO_AI', target: 'CANCER', animated: true },
    { id: 'e21', source: 'PATH_AI', target: 'FRACTURE', animated: true },

    // Disease detection to fusion
    { id: 'e22', source: 'PNEUMONIA', target: 'FUSION', animated: true },
    { id: 'e23', source: 'CANCER', target: 'FUSION', animated: true },
    { id: 'e24', source: 'FRACTURE', target: 'FUSION', animated: true },
    { id: 'e25', source: 'STROKE', target: 'FUSION', animated: true },

    // Fusion to AI assistant and clinical decision support
    { id: 'e26', source: 'FUSION', target: 'GPT4V', animated: true },
    { id: 'e27', source: 'GPT4V', target: 'DIFF_DIAG', animated: true },
    { id: 'e28', source: 'GPT4V', target: 'SEVERITY_ASSESS', animated: true },
    { id: 'e29', source: 'GPT4V', target: 'TREATMENT_REC', animated: true },
    { id: 'e30', source: 'GPT4V', target: 'SURGICAL_PLAN', animated: true },

    // Clinical decision support to quality assurance
    { id: 'e31', source: 'DIFF_DIAG', target: 'CONFIDENCE', animated: true },
    { id: 'e32', source: 'SEVERITY_ASSESS', target: 'RAD_REVIEW', animated: true },
    { id: 'e33', source: 'TREATMENT_REC', target: 'PERFORMANCE', animated: true },

    // Quality assurance to reporting
    { id: 'e34', source: 'CONFIDENCE', target: 'AUTO_REPORT', animated: true },
    { id: 'e35', source: 'RAD_REVIEW', target: 'VISUALIZE', animated: true },
    { id: 'e36', source: 'PERFORMANCE', target: 'DASHBOARD', animated: true },

    // Reporting to integration
    { id: 'e37', source: 'AUTO_REPORT', target: 'EHR_INTEG', animated: true },
    { id: 'e38', source: 'VISUALIZE', target: 'EHR_INTEG', animated: true },
    { id: 'e39', source: 'DASHBOARD', target: 'EHR_INTEG', animated: true },
  ];

  const verticalNodes = [
    { id: 'A', type: 'input', position: { x: 200, y: 50 }, data: { label: 'Medical Imaging Sources' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'B', type: 'default', position: { x: 200, y: 150 }, data: { label: 'Image Processing Pipeline' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'C', type: 'default', position: { x: 200, y: 250 }, data: { label: 'AI Analysis Engine' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'D', type: 'default', position: { x: 200, y: 350 }, data: { label: 'Disease Detection' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'E', type: 'default', position: { x: 200, y: 450 }, data: { label: 'Clinical Decision Support' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'F', type: 'output', position: { x: 200, y: 550 }, data: { label: 'Reporting & Integration' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
  ];

  const verticalEdges = [
    { id: 'e1', source: 'A', target: 'B', animated: true },
    { id: 'e2', source: 'B', target: 'C', animated: true },
    { id: 'e3', source: 'C', target: 'D', animated: true },
    { id: 'e4', source: 'D', target: 'E', animated: true },
    { id: 'e5', source: 'E', target: 'F', animated: true },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(isVertical ? verticalNodes : horizontalNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(isVertical ? verticalEdges : horizontalEdges);

  React.useEffect(() => {
    setNodes(isVertical ? verticalNodes : horizontalNodes);
    setEdges(isVertical ? verticalEdges : horizontalEdges);
  }, [isVertical, setNodes, setEdges]);

  return (
    <div style={{ width: '100%', height: '600px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        style={{ background: '#fafafa' }}
      >
        <Background color="#aaa" gap={16} />
        <Controls />
        <MiniMap />
        <Panel position="top-right">
          <div style={{ background: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <button
              onClick={() => setIsVertical(!isVertical)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {isVertical ? 'Detailed Horizontal View' : 'Simplified Vertical View'}
            </button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default MedicalImagingFlowchart;