import React, { useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Panel, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const WorkflowAutomationFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  const horizontalNodes = [
    { id: 'A', type: 'input', position: { x: 50, y: 100 }, data: { label: 'Trigger Detection - Event Monitoring' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'B', type: 'default', position: { x: 280, y: 50 }, data: { label: 'Rule Engine - Business Logic' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'C', type: 'default', position: { x: 280, y: 150 }, data: { label: 'Condition Evaluation - Decision Tree' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'D', type: 'default', position: { x: 510, y: 100 }, data: { label: 'Action Orchestrator - Workflow Engine' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'E', type: 'default', position: { x: 740, y: 50 }, data: { label: 'API Integration - Third-party Services' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'F', type: 'default', position: { x: 740, y: 150 }, data: { label: 'Notification System - Multi-channel' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'G', type: 'default', position: { x: 970, y: 50 }, data: { label: 'Execution Monitor - Status Tracking' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'H', type: 'default', position: { x: 970, y: 150 }, data: { label: 'Error Handler - Retry Logic' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'I', type: 'output', position: { x: 1200, y: 100 }, data: { label: 'Completion Log - Audit Trail' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
  ];

  const horizontalEdges = [
    { id: 'e1', source: 'A', target: 'B', animated: true },
    { id: 'e2', source: 'A', target: 'C', animated: true },
    { id: 'e3', source: 'B', target: 'D', animated: true },
    { id: 'e4', source: 'C', target: 'D', animated: true },
    { id: 'e5', source: 'D', target: 'E', animated: true },
    { id: 'e6', source: 'D', target: 'F', animated: true },
    { id: 'e7', source: 'E', target: 'G', animated: true },
    { id: 'e8', source: 'F', target: 'H', animated: true },
    { id: 'e9', source: 'G', target: 'I', animated: true },
    { id: 'e10', source: 'H', target: 'I', animated: true },
  ];

  const verticalNodes = [
    { id: 'A', type: 'input', position: { x: 200, y: 50 }, data: { label: 'Trigger Detection' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 120, height: 50 } },
    { id: 'B', type: 'default', position: { x: 200, y: 150 }, data: { label: 'Rule Engine' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 120, height: 50 } },
    { id: 'C', type: 'default', position: { x: 200, y: 250 }, data: { label: 'Action Orchestrator' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 120, height: 50 } },
    { id: 'D', type: 'default', position: { x: 200, y: 350 }, data: { label: 'Integration Layer' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 120, height: 50 } },
    { id: 'E', type: 'default', position: { x: 200, y: 450 }, data: { label: 'Execution Monitor' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 120, height: 50 } },
    { id: 'F', type: 'output', position: { x: 200, y: 550 }, data: { label: 'Completion Log' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 120, height: 50 } },
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
              {isVertical ? 'Horizontal View' : 'Vertical View'}
            </button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default WorkflowAutomationFlowchart;