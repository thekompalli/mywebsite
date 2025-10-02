import React, { useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Panel, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const HospitalOperationsFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  const horizontalNodes = [
    // Hospital Data Sources
    { id: 'EHR', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Electronic Health Records' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },
    { id: 'ADT', type: 'input', position: { x: 50, y: 120 }, data: { label: 'Admission/Discharge Records' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },
    { id: 'ED', type: 'input', position: { x: 50, y: 190 }, data: { label: 'Emergency Department Data' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },
    { id: 'ICU', type: 'input', position: { x: 50, y: 260 }, data: { label: 'ICU Monitoring Systems' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },
    { id: 'BED', type: 'input', position: { x: 50, y: 330 }, data: { label: 'Bed Management System' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },
    { id: 'NURSING', type: 'input', position: { x: 50, y: 400 }, data: { label: 'Nursing Documentation' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },

    // External Data Integration
    { id: 'WEATHER', type: 'input', position: { x: 50, y: 480 }, data: { label: 'Weather & Seasonal Data' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },
    { id: 'OUTBREAK', type: 'input', position: { x: 50, y: 550 }, data: { label: 'Disease Outbreak Monitoring' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },

    // Real-time Processing Pipeline
    { id: 'KAFKA', type: 'default', position: { x: 280, y: 250 }, data: { label: 'Apache Kafka Event Streams' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'FLINK', type: 'default', position: { x: 280, y: 330 }, data: { label: 'Apache Flink Stream Processing' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },
    { id: 'VALIDATION', type: 'default', position: { x: 280, y: 410 }, data: { label: 'Data Validation & Cleaning' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 60 } },

    // Predictive ML Models - Admission Prediction
    { id: 'ED_ADMIT', type: 'default', position: { x: 520, y: 100 }, data: { label: 'ED Admission Risk Predictor' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'READMIT', type: 'default', position: { x: 520, y: 170 }, data: { label: 'Readmission Risk Model - HOSPITAL Score' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'ICU_ADMIT', type: 'default', position: { x: 520, y: 240 }, data: { label: 'ICU Admission Probability Engine' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'LOS', type: 'default', position: { x: 520, y: 310 }, data: { label: 'Length of Stay Predictor' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'MORTALITY', type: 'default', position: { x: 520, y: 380 }, data: { label: 'Mortality Risk Assessment' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },

    // Discharge Readiness Models
    { id: 'CLINICAL_STAB', type: 'default', position: { x: 520, y: 450 }, data: { label: 'Clinical Stability Assessor' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'FUNCTIONAL', type: 'default', position: { x: 520, y: 520 }, data: { label: 'Functional Status Evaluator' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },

    // Capacity & Resource Planning
    { id: 'BED_DEMAND', type: 'default', position: { x: 760, y: 150 }, data: { label: 'Bed Demand Forecaster' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'STAFF_SCHED', type: 'default', position: { x: 760, y: 220 }, data: { label: 'Staff Scheduling Optimizer' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'OR_COORD', type: 'default', position: { x: 760, y: 290 }, data: { label: 'OR Schedule Coordinator' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'ED_SURGE', type: 'default', position: { x: 760, y: 360 }, data: { label: 'ED Surge Capacity Planner' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },

    // Clinical Decision Support
    { id: 'DISCHARGE_PLAN', type: 'default', position: { x: 1000, y: 100 }, data: { label: 'Discharge Planning Assistant' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'CARE_TRANS', type: 'default', position: { x: 1000, y: 170 }, data: { label: 'Care Transition Coordinator' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'POST_ACUTE', type: 'default', position: { x: 1000, y: 240 }, data: { label: 'Post-acute Care Matcher' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'MED_RECON', type: 'default', position: { x: 1000, y: 310 }, data: { label: 'Medication Reconciliation AI' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },

    // Alert & Notification System
    { id: 'EARLY_WARN', type: 'default', position: { x: 1240, y: 120 }, data: { label: 'Early Warning Alert System' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'DISCHARGE_READY', type: 'default', position: { x: 1240, y: 190 }, data: { label: 'Discharge Readiness Notifications' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'CAPACITY_ALERT', type: 'default', position: { x: 1240, y: 260 }, data: { label: 'Capacity Threshold Alerts' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },

    // Care Coordination Hub
    { id: 'MDT_DASH', type: 'default', position: { x: 1480, y: 100 }, data: { label: 'Multidisciplinary Team Dashboard' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'PATIENT_FLOW', type: 'default', position: { x: 1480, y: 170 }, data: { label: 'Patient Flow Visualization' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'DISCHARGE_WORK', type: 'default', position: { x: 1480, y: 240 }, data: { label: 'Discharge Planning Workflow' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },

    // Quality & Outcomes Tracking
    { id: 'READMIT_RATE', type: 'default', position: { x: 1720, y: 120 }, data: { label: 'Readmission Rate Monitor' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'LOS_ANALYTICS', type: 'default', position: { x: 1720, y: 190 }, data: { label: 'Length of Stay Analytics' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'COST_EFFECT', type: 'output', position: { x: 1720, y: 260 }, data: { label: 'Cost-effectiveness Analyzer' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '11px', width: 160, height: 60 } },

    // Final Integration
    { id: 'EHR_INTEG', type: 'output', position: { x: 1960, y: 190 }, data: { label: 'EHR Integration - HL7 FHIR' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 160, height: 60 } },
  ];

  const horizontalEdges = [
    // Hospital data sources to Kafka
    { id: 'e1', source: 'EHR', target: 'KAFKA', animated: true },
    { id: 'e2', source: 'ADT', target: 'KAFKA', animated: true },
    { id: 'e3', source: 'ED', target: 'KAFKA', animated: true },
    { id: 'e4', source: 'ICU', target: 'KAFKA', animated: true },
    { id: 'e5', source: 'BED', target: 'KAFKA', animated: true },
    { id: 'e6', source: 'NURSING', target: 'KAFKA', animated: true },
    { id: 'e7', source: 'WEATHER', target: 'KAFKA', animated: true },
    { id: 'e8', source: 'OUTBREAK', target: 'KAFKA', animated: true },

    // Processing pipeline
    { id: 'e9', source: 'KAFKA', target: 'FLINK', animated: true },
    { id: 'e10', source: 'FLINK', target: 'VALIDATION', animated: true },

    // Validation to prediction models
    { id: 'e11', source: 'VALIDATION', target: 'ED_ADMIT', animated: true },
    { id: 'e12', source: 'VALIDATION', target: 'READMIT', animated: true },
    { id: 'e13', source: 'VALIDATION', target: 'ICU_ADMIT', animated: true },
    { id: 'e14', source: 'VALIDATION', target: 'LOS', animated: true },
    { id: 'e15', source: 'VALIDATION', target: 'MORTALITY', animated: true },
    { id: 'e16', source: 'VALIDATION', target: 'CLINICAL_STAB', animated: true },
    { id: 'e17', source: 'VALIDATION', target: 'FUNCTIONAL', animated: true },

    // Prediction models to capacity planning
    { id: 'e18', source: 'LOS', target: 'BED_DEMAND', animated: true },
    { id: 'e19', source: 'ED_ADMIT', target: 'STAFF_SCHED', animated: true },
    { id: 'e20', source: 'ICU_ADMIT', target: 'OR_COORD', animated: true },
    { id: 'e21', source: 'ED_ADMIT', target: 'ED_SURGE', animated: true },

    // Capacity planning to clinical decision support
    { id: 'e22', source: 'BED_DEMAND', target: 'DISCHARGE_PLAN', animated: true },
    { id: 'e23', source: 'STAFF_SCHED', target: 'CARE_TRANS', animated: true },
    { id: 'e24', source: 'OR_COORD', target: 'POST_ACUTE', animated: true },
    { id: 'e25', source: 'ED_SURGE', target: 'MED_RECON', animated: true },

    // Clinical decision support to alerts
    { id: 'e26', source: 'DISCHARGE_PLAN', target: 'EARLY_WARN', animated: true },
    { id: 'e27', source: 'CARE_TRANS', target: 'DISCHARGE_READY', animated: true },
    { id: 'e28', source: 'POST_ACUTE', target: 'CAPACITY_ALERT', animated: true },

    // Alerts to care coordination
    { id: 'e29', source: 'EARLY_WARN', target: 'MDT_DASH', animated: true },
    { id: 'e30', source: 'DISCHARGE_READY', target: 'PATIENT_FLOW', animated: true },
    { id: 'e31', source: 'CAPACITY_ALERT', target: 'DISCHARGE_WORK', animated: true },

    // Care coordination to quality tracking
    { id: 'e32', source: 'MDT_DASH', target: 'READMIT_RATE', animated: true },
    { id: 'e33', source: 'PATIENT_FLOW', target: 'LOS_ANALYTICS', animated: true },
    { id: 'e34', source: 'DISCHARGE_WORK', target: 'COST_EFFECT', animated: true },

    // Quality tracking to final integration
    { id: 'e35', source: 'READMIT_RATE', target: 'EHR_INTEG', animated: true },
    { id: 'e36', source: 'LOS_ANALYTICS', target: 'EHR_INTEG', animated: true },
    { id: 'e37', source: 'COST_EFFECT', target: 'EHR_INTEG', animated: true },
  ];

  const verticalNodes = [
    { id: 'A', type: 'input', position: { x: 200, y: 50 }, data: { label: 'Hospital Data Sources' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'B', type: 'default', position: { x: 200, y: 150 }, data: { label: 'Real-time Processing' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'C', type: 'default', position: { x: 200, y: 250 }, data: { label: 'Predictive Models' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'D', type: 'default', position: { x: 200, y: 350 }, data: { label: 'Capacity Planning' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'E', type: 'default', position: { x: 200, y: 450 }, data: { label: 'Care Coordination' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'F', type: 'output', position: { x: 200, y: 550 }, data: { label: 'Quality & Integration' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
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

export default HospitalOperationsFlowchart;