import React, { useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Panel, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const CareOrchestrationFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  const horizontalNodes = [
    // Patient Data Sources
    { id: 'A', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Electronic Health Records - FHIR' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'B', type: 'input', position: { x: 50, y: 130 }, data: { label: 'Wearable Device Data' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'C', type: 'input', position: { x: 50, y: 210 }, data: { label: 'Patient Symptom Reports' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'D', type: 'input', position: { x: 50, y: 290 }, data: { label: 'Lab Results & Diagnostic Data' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'E', type: 'input', position: { x: 50, y: 370 }, data: { label: 'Pharmacy Records' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },

    // Data Integration Layer
    { id: 'DS', type: 'default', position: { x: 280, y: 200 }, data: { label: 'Secure Data Integration Layer' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },

    // Real-time Health Monitoring
    { id: 'HL7', type: 'default', position: { x: 520, y: 100 }, data: { label: 'HL7 FHIR Data Pipeline' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'VALID', type: 'default', position: { x: 520, y: 180 }, data: { label: 'Health Data Validation Engine' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'VITAL', type: 'default', position: { x: 520, y: 260 }, data: { label: 'Vital Signs Analyzer' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'SYMPTOM', type: 'default', position: { x: 520, y: 340 }, data: { label: 'Symptom Pattern Detector' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },

    // AI Triage Engine - Clinical AI Models
    { id: 'MEDPALM', type: 'default', position: { x: 760, y: 50 }, data: { label: 'Symptom Assessment AI - Med-PaLM' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 180, height: 60 } },
    { id: 'SEVERITY', type: 'default', position: { x: 760, y: 130 }, data: { label: 'Severity Classification Model' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 180, height: 60 } },
    { id: 'URGENCY', type: 'default', position: { x: 760, y: 210 }, data: { label: 'Urgency Prediction Engine' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 180, height: 60 } },
    { id: 'DIAGNOSIS', type: 'default', position: { x: 760, y: 290 }, data: { label: 'Differential Diagnosis Assistant' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 180, height: 60 } },
    { id: 'REDFLAG', type: 'default', position: { x: 760, y: 370 }, data: { label: 'Red Flag Detection System' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 180, height: 60 } },

    // LLM and Orchestration
    { id: 'LLM', type: 'default', position: { x: 1000, y: 150 }, data: { label: 'Medical LLM - GPT-4 Medical/Claude' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 180, height: 70 } },
    { id: 'TRIAGE_REC', type: 'default', position: { x: 1000, y: 250 }, data: { label: 'Triage Recommendation Generator' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 180, height: 60 } },

    // Chronic Disease Management
    { id: 'DIABETES', type: 'default', position: { x: 1240, y: 50 }, data: { label: 'Diabetes Care Coordinator' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'HYPERTENSION', type: 'default', position: { x: 1240, y: 130 }, data: { label: 'Hypertension Monitor' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'HEART', type: 'default', position: { x: 1240, y: 210 }, data: { label: 'Heart Disease Manager' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'MENTAL', type: 'default', position: { x: 1240, y: 290 }, data: { label: 'Mental Health Support Assistant' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },

    // Patient Interaction Interface
    { id: 'CHATBOT', type: 'default', position: { x: 1480, y: 100 }, data: { label: 'Conversational AI Chatbot' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'VOICE', type: 'default', position: { x: 1480, y: 180 }, data: { label: 'Voice Assistant - Speech Recognition' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'SCHEDULER', type: 'default', position: { x: 1480, y: 260 }, data: { label: 'Appointment Scheduler' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },

    // Care Coordination Hub
    { id: 'PROVIDER_ALERT', type: 'default', position: { x: 1720, y: 50 }, data: { label: 'Primary Care Provider Alerts' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'SPECIALIST', type: 'default', position: { x: 1720, y: 130 }, data: { label: 'Specialist Referral Engine' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'CARE_TEAM', type: 'default', position: { x: 1720, y: 210 }, data: { label: 'Care Team Communication' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },

    // Emergency Response System
    { id: 'CRITICAL', type: 'default', position: { x: 1960, y: 100 }, data: { label: 'Critical Alert Detector' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'EMERGENCY', type: 'default', position: { x: 1960, y: 180 }, data: { label: 'Emergency Services Integration' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },

    // Final Output
    { id: 'ANALYTICS', type: 'output', position: { x: 2200, y: 150 }, data: { label: 'Population Health Analytics' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
  ];

  const horizontalEdges = [
    // Data sources to integration layer
    { id: 'e1', source: 'A', target: 'DS', animated: true },
    { id: 'e2', source: 'B', target: 'DS', animated: true },
    { id: 'e3', source: 'C', target: 'DS', animated: true },
    { id: 'e4', source: 'D', target: 'DS', animated: true },
    { id: 'e5', source: 'E', target: 'DS', animated: true },

    // Integration to monitoring
    { id: 'e6', source: 'DS', target: 'HL7', animated: true },
    { id: 'e7', source: 'HL7', target: 'VALID', animated: true },
    { id: 'e8', source: 'VALID', target: 'VITAL', animated: true },
    { id: 'e9', source: 'VITAL', target: 'SYMPTOM', animated: true },

    // Monitoring to AI models
    { id: 'e10', source: 'SYMPTOM', target: 'MEDPALM', animated: true },
    { id: 'e11', source: 'SYMPTOM', target: 'SEVERITY', animated: true },
    { id: 'e12', source: 'SYMPTOM', target: 'URGENCY', animated: true },
    { id: 'e13', source: 'SYMPTOM', target: 'DIAGNOSIS', animated: true },
    { id: 'e14', source: 'SYMPTOM', target: 'REDFLAG', animated: true },

    // AI models to LLM orchestration
    { id: 'e15', source: 'MEDPALM', target: 'LLM', animated: true },
    { id: 'e16', source: 'SEVERITY', target: 'LLM', animated: true },
    { id: 'e17', source: 'URGENCY', target: 'LLM', animated: true },
    { id: 'e18', source: 'DIAGNOSIS', target: 'LLM', animated: true },
    { id: 'e19', source: 'REDFLAG', target: 'LLM', animated: true },

    // LLM to triage and disease management
    { id: 'e20', source: 'LLM', target: 'TRIAGE_REC', animated: true },
    { id: 'e21', source: 'TRIAGE_REC', target: 'DIABETES', animated: true },
    { id: 'e22', source: 'TRIAGE_REC', target: 'HYPERTENSION', animated: true },
    { id: 'e23', source: 'TRIAGE_REC', target: 'HEART', animated: true },
    { id: 'e24', source: 'TRIAGE_REC', target: 'MENTAL', animated: true },

    // Disease management to patient interaction
    { id: 'e25', source: 'DIABETES', target: 'CHATBOT', animated: true },
    { id: 'e26', source: 'HYPERTENSION', target: 'VOICE', animated: true },
    { id: 'e27', source: 'HEART', target: 'SCHEDULER', animated: true },

    // Patient interaction to care coordination
    { id: 'e28', source: 'CHATBOT', target: 'PROVIDER_ALERT', animated: true },
    { id: 'e29', source: 'VOICE', target: 'SPECIALIST', animated: true },
    { id: 'e30', source: 'SCHEDULER', target: 'CARE_TEAM', animated: true },

    // Care coordination to emergency response
    { id: 'e31', source: 'PROVIDER_ALERT', target: 'CRITICAL', animated: true },
    { id: 'e32', source: 'SPECIALIST', target: 'EMERGENCY', animated: true },

    // Emergency response to analytics
    { id: 'e33', source: 'CRITICAL', target: 'ANALYTICS', animated: true },
    { id: 'e34', source: 'EMERGENCY', target: 'ANALYTICS', animated: true },
    { id: 'e35', source: 'CARE_TEAM', target: 'ANALYTICS', animated: true },
  ];

  const verticalNodes = [
    { id: 'A', type: 'input', position: { x: 200, y: 50 }, data: { label: 'Patient Data Sources' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'B', type: 'default', position: { x: 200, y: 150 }, data: { label: 'Data Integration & Monitoring' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'C', type: 'default', position: { x: 200, y: 250 }, data: { label: 'AI Triage Engine' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'D', type: 'default', position: { x: 200, y: 350 }, data: { label: 'Disease Management' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'E', type: 'default', position: { x: 200, y: 450 }, data: { label: 'Care Coordination' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'F', type: 'output', position: { x: 200, y: 550 }, data: { label: 'Analytics & Emergency Response' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
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

export default CareOrchestrationFlowchart;