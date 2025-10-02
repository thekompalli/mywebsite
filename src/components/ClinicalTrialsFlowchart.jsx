import React, { useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Panel, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const ClinicalTrialsFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  const horizontalNodes = [
    // Clinical Trial Data Sources
    { id: 'CLINTRIALS_GOV', type: 'input', position: { x: 50, y: 50 }, data: { label: 'ClinicalTrials.gov Registry' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },
    { id: 'EUDRACT', type: 'input', position: { x: 50, y: 120 }, data: { label: 'EudraCT Database' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },
    { id: 'WHO_ICTRP', type: 'input', position: { x: 50, y: 190 }, data: { label: 'WHO ICTRP Registry' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },
    { id: 'FDA_TRIALS', type: 'input', position: { x: 50, y: 260 }, data: { label: 'FDA Drug Trials Database' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },
    { id: 'NIH_REPORTER', type: 'input', position: { x: 50, y: 330 }, data: { label: 'NIH RePORTER' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },
    { id: 'PHARMA_TRIALS', type: 'input', position: { x: 50, y: 400 }, data: { label: 'Pharmaceutical Company Trials' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },

    // Patient Data Sources
    { id: 'EHR_PATIENT', type: 'input', position: { x: 50, y: 500 }, data: { label: 'EHR Patient Records' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },
    { id: 'PATIENT_REGISTRY', type: 'input', position: { x: 50, y: 570 }, data: { label: 'Patient Disease Registries' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },
    { id: 'GENOMIC_DATA', type: 'input', position: { x: 50, y: 640 }, data: { label: 'Genomic & Biomarker Data' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },

    // Trial Information Processing
    { id: 'TRIAL_PARSER', type: 'default', position: { x: 250, y: 200 }, data: { label: 'Trial Protocol Parser' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },
    { id: 'CRITERIA_EXTRACT', type: 'default', position: { x: 250, y: 270 }, data: { label: 'Eligibility Criteria Extractor' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },
    { id: 'TRIAL_CLASSIFIER', type: 'default', position: { x: 250, y: 340 }, data: { label: 'Trial Type Classifier' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },

    // Patient Profile Processing
    { id: 'PATIENT_PARSER', type: 'default', position: { x: 250, y: 500 }, data: { label: 'Patient Profile Processor' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },
    { id: 'MEDICAL_HISTORY', type: 'default', position: { x: 250, y: 570 }, data: { label: 'Medical History Analyzer' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },
    { id: 'BIOMARKER_PROFILE', type: 'default', position: { x: 250, y: 640 }, data: { label: 'Biomarker Profile Matcher' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },

    // AI Matching Engine
    { id: 'BIOBERT_MATCH', type: 'default', position: { x: 470, y: 250 }, data: { label: 'BioBERT Clinical Matcher' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'GPT4_ELIGIBILITY', type: 'default', position: { x: 470, y: 320 }, data: { label: 'GPT-4 Eligibility Assessment' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'SIMILARITY_ENGINE', type: 'default', position: { x: 470, y: 390 }, data: { label: 'Vector Similarity Engine' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'ML_PREDICTOR', type: 'default', position: { x: 470, y: 460 }, data: { label: 'ML Success Predictor' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'GENOMIC_MATCHER', type: 'default', position: { x: 470, y: 530 }, data: { label: 'Genomic Matching Algorithm' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },

    // Eligibility Assessment Engine
    { id: 'INCLUSION_CHECK', type: 'default', position: { x: 690, y: 200 }, data: { label: 'Inclusion Criteria Validator' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'EXCLUSION_CHECK', type: 'default', position: { x: 690, y: 270 }, data: { label: 'Exclusion Criteria Checker' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'COMORBIDITY_EVAL', type: 'default', position: { x: 690, y: 340 }, data: { label: 'Comorbidity Evaluator' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'MEDICATION_CHECK', type: 'default', position: { x: 690, y: 410 }, data: { label: 'Medication Conflict Checker' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'RISK_ASSESSMENT', type: 'default', position: { x: 690, y: 480 }, data: { label: 'Risk-Benefit Assessor' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },

    // Trial Recommendation System
    { id: 'RANKING_ENGINE', type: 'default', position: { x: 910, y: 280 }, data: { label: 'Trial Ranking Engine' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },
    { id: 'DIVERSITY_OPTIMIZER', type: 'default', position: { x: 910, y: 350 }, data: { label: 'Patient Diversity Optimizer' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },
    { id: 'LOCATION_MATCHER', type: 'default', position: { x: 910, y: 420 }, data: { label: 'Geographic Location Matcher' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },

    // Patient Engagement Platform
    { id: 'PATIENT_PORTAL', type: 'default', position: { x: 1130, y: 200 }, data: { label: 'Patient Engagement Portal' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'CONSENT_MANAGER', type: 'default', position: { x: 1130, y: 270 }, data: { label: 'Digital Consent Manager' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'EDUCATION_ENGINE', type: 'default', position: { x: 1130, y: 340 }, data: { label: 'Trial Education Engine' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'NOTIFICATION_SYS', type: 'default', position: { x: 1130, y: 410 }, data: { label: 'Smart Notification System' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'MOBILE_APP', type: 'default', position: { x: 1130, y: 480 }, data: { label: 'Mobile Patient App' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },

    // Research Team Tools
    { id: 'INVESTIGATOR_DASH', type: 'default', position: { x: 1350, y: 150 }, data: { label: 'Principal Investigator Dashboard' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 170, height: 50 } },
    { id: 'RECRUITMENT_TRACK', type: 'default', position: { x: 1350, y: 220 }, data: { label: 'Recruitment Tracker' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 170, height: 50 } },
    { id: 'PROTOCOL_MONITOR', type: 'default', position: { x: 1350, y: 290 }, data: { label: 'Protocol Deviation Monitor' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 170, height: 50 } },
    { id: 'SAFETY_MONITOR', type: 'default', position: { x: 1350, y: 360 }, data: { label: 'Safety Signal Monitor' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 170, height: 50 } },
    { id: 'DATA_ANALYTICS', type: 'default', position: { x: 1350, y: 430 }, data: { label: 'Trial Data Analytics' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 170, height: 50 } },
    { id: 'REGULATORY_HUB', type: 'default', position: { x: 1350, y: 500 }, data: { label: 'Regulatory Compliance Hub' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 170, height: 50 } },

    // Integration & Output
    { id: 'API_GATEWAY', type: 'default', position: { x: 1570, y: 280 }, data: { label: 'Clinical Trials API Gateway' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'FHIR_CONNECTOR', type: 'default', position: { x: 1570, y: 350 }, data: { label: 'FHIR Clinical Connector' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'CLINICAL_DB', type: 'output', position: { x: 1570, y: 420 }, data: { label: 'Clinical Trials Database' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '11px', width: 160, height: 60 } },

    // Real-time Monitoring & Analytics
    { id: 'REAL_TIME_DASH', type: 'output', position: { x: 1790, y: 300 }, data: { label: 'Real-time Monitoring Dashboard' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 160, height: 60 } },
    { id: 'PREDICTIVE_MODEL', type: 'output', position: { x: 1790, y: 380 }, data: { label: 'Predictive Enrollment Model' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 160, height: 60 } },
  ];

  const horizontalEdges = [
    // Trial data sources to processing
    { id: 'e1', source: 'CLINTRIALS_GOV', target: 'TRIAL_PARSER', animated: true },
    { id: 'e2', source: 'EUDRACT', target: 'TRIAL_PARSER', animated: true },
    { id: 'e3', source: 'WHO_ICTRP', target: 'TRIAL_PARSER', animated: true },
    { id: 'e4', source: 'FDA_TRIALS', target: 'CRITERIA_EXTRACT', animated: true },
    { id: 'e5', source: 'NIH_REPORTER', target: 'CRITERIA_EXTRACT', animated: true },
    { id: 'e6', source: 'PHARMA_TRIALS', target: 'TRIAL_CLASSIFIER', animated: true },

    // Patient data sources to processing
    { id: 'e7', source: 'EHR_PATIENT', target: 'PATIENT_PARSER', animated: true },
    { id: 'e8', source: 'PATIENT_REGISTRY', target: 'MEDICAL_HISTORY', animated: true },
    { id: 'e9', source: 'GENOMIC_DATA', target: 'BIOMARKER_PROFILE', animated: true },

    // Trial processing to AI matching
    { id: 'e10', source: 'TRIAL_PARSER', target: 'BIOBERT_MATCH', animated: true },
    { id: 'e11', source: 'CRITERIA_EXTRACT', target: 'GPT4_ELIGIBILITY', animated: true },
    { id: 'e12', source: 'TRIAL_CLASSIFIER', target: 'SIMILARITY_ENGINE', animated: true },

    // Patient processing to AI matching
    { id: 'e13', source: 'PATIENT_PARSER', target: 'BIOBERT_MATCH', animated: true },
    { id: 'e14', source: 'MEDICAL_HISTORY', target: 'ML_PREDICTOR', animated: true },
    { id: 'e15', source: 'BIOMARKER_PROFILE', target: 'GENOMIC_MATCHER', animated: true },

    // AI matching to eligibility assessment
    { id: 'e16', source: 'BIOBERT_MATCH', target: 'INCLUSION_CHECK', animated: true },
    { id: 'e17', source: 'GPT4_ELIGIBILITY', target: 'EXCLUSION_CHECK', animated: true },
    { id: 'e18', source: 'SIMILARITY_ENGINE', target: 'COMORBIDITY_EVAL', animated: true },
    { id: 'e19', source: 'ML_PREDICTOR', target: 'MEDICATION_CHECK', animated: true },
    { id: 'e20', source: 'GENOMIC_MATCHER', target: 'RISK_ASSESSMENT', animated: true },

    // Eligibility assessment to recommendation
    { id: 'e21', source: 'INCLUSION_CHECK', target: 'RANKING_ENGINE', animated: true },
    { id: 'e22', source: 'EXCLUSION_CHECK', target: 'RANKING_ENGINE', animated: true },
    { id: 'e23', source: 'COMORBIDITY_EVAL', target: 'DIVERSITY_OPTIMIZER', animated: true },
    { id: 'e24', source: 'MEDICATION_CHECK', target: 'DIVERSITY_OPTIMIZER', animated: true },
    { id: 'e25', source: 'RISK_ASSESSMENT', target: 'LOCATION_MATCHER', animated: true },

    // Recommendation to patient engagement
    { id: 'e26', source: 'RANKING_ENGINE', target: 'PATIENT_PORTAL', animated: true },
    { id: 'e27', source: 'DIVERSITY_OPTIMIZER', target: 'CONSENT_MANAGER', animated: true },
    { id: 'e28', source: 'LOCATION_MATCHER', target: 'EDUCATION_ENGINE', animated: true },
    { id: 'e29', source: 'RANKING_ENGINE', target: 'NOTIFICATION_SYS', animated: true },
    { id: 'e30', source: 'DIVERSITY_OPTIMIZER', target: 'MOBILE_APP', animated: true },

    // Patient engagement to research tools
    { id: 'e31', source: 'PATIENT_PORTAL', target: 'INVESTIGATOR_DASH', animated: true },
    { id: 'e32', source: 'CONSENT_MANAGER', target: 'RECRUITMENT_TRACK', animated: true },
    { id: 'e33', source: 'EDUCATION_ENGINE', target: 'PROTOCOL_MONITOR', animated: true },
    { id: 'e34', source: 'NOTIFICATION_SYS', target: 'SAFETY_MONITOR', animated: true },
    { id: 'e35', source: 'MOBILE_APP', target: 'DATA_ANALYTICS', animated: true },
    { id: 'e36', source: 'PATIENT_PORTAL', target: 'REGULATORY_HUB', animated: true },

    // Research tools to integration
    { id: 'e37', source: 'INVESTIGATOR_DASH', target: 'API_GATEWAY', animated: true },
    { id: 'e38', source: 'RECRUITMENT_TRACK', target: 'API_GATEWAY', animated: true },
    { id: 'e39', source: 'PROTOCOL_MONITOR', target: 'FHIR_CONNECTOR', animated: true },
    { id: 'e40', source: 'SAFETY_MONITOR', target: 'FHIR_CONNECTOR', animated: true },
    { id: 'e41', source: 'DATA_ANALYTICS', target: 'CLINICAL_DB', animated: true },
    { id: 'e42', source: 'REGULATORY_HUB', target: 'CLINICAL_DB', animated: true },

    // Integration to monitoring
    { id: 'e43', source: 'API_GATEWAY', target: 'REAL_TIME_DASH', animated: true },
    { id: 'e44', source: 'FHIR_CONNECTOR', target: 'REAL_TIME_DASH', animated: true },
    { id: 'e45', source: 'CLINICAL_DB', target: 'PREDICTIVE_MODEL', animated: true },
    { id: 'e46', source: 'API_GATEWAY', target: 'PREDICTIVE_MODEL', animated: true },
  ];

  const verticalNodes = [
    { id: 'A', type: 'input', position: { x: 200, y: 50 }, data: { label: 'Clinical Trial Data Sources' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'B', type: 'default', position: { x: 200, y: 150 }, data: { label: 'AI-Powered Patient Matching' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'C', type: 'default', position: { x: 200, y: 250 }, data: { label: 'Eligibility Assessment' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'D', type: 'default', position: { x: 200, y: 350 }, data: { label: 'Trial Recommendation System' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'E', type: 'default', position: { x: 200, y: 450 }, data: { label: 'Patient Engagement Platform' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'F', type: 'output', position: { x: 200, y: 550 }, data: { label: 'Research Team Tools' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
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

export default ClinicalTrialsFlowchart;