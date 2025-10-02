import React, { useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Panel, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const KnowledgeRetrievalFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  const horizontalNodes = [
    { id: 'A', type: 'input', position: { x: 50, y: 100 }, data: { label: 'Query Input Interface - Natural Language' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'B', type: 'default', position: { x: 280, y: 50 }, data: { label: 'Query Processing NLP - BERT/RoBERTa' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'C', type: 'default', position: { x: 280, y: 150 }, data: { label: 'Intent Classification - Multi-class NLP' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'D', type: 'default', position: { x: 510, y: 100 }, data: { label: 'Vector Database Search - Pinecone/Weaviate' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'E', type: 'default', position: { x: 740, y: 50 }, data: { label: 'Document Retrieval - Semantic Search' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'F', type: 'default', position: { x: 740, y: 150 }, data: { label: 'Context Aggregation - Information Synthesis' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'G', type: 'default', position: { x: 970, y: 100 }, data: { label: 'Answer Generation - GPT-4/Claude' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
    { id: 'H', type: 'output', position: { x: 1200, y: 100 }, data: { label: 'Response Delivery - Formatted Output' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '11px', width: 180, height: 70 } },
  ];

  const horizontalEdges = [
    { id: 'e1', source: 'A', target: 'B', animated: true },
    { id: 'e2', source: 'A', target: 'C', animated: true },
    { id: 'e3', source: 'B', target: 'D', animated: true },
    { id: 'e4', source: 'C', target: 'D', animated: true },
    { id: 'e5', source: 'D', target: 'E', animated: true },
    { id: 'e6', source: 'D', target: 'F', animated: true },
    { id: 'e7', source: 'E', target: 'G', animated: true },
    { id: 'e8', source: 'F', target: 'G', animated: true },
    { id: 'e9', source: 'G', target: 'H', animated: true },
  ];

  const verticalNodes = [
    { id: 'A', type: 'input', position: { x: 200, y: 50 }, data: { label: 'Query Input' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 120, height: 50 } },
    { id: 'B', type: 'default', position: { x: 200, y: 150 }, data: { label: 'NLP Processing' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 120, height: 50 } },
    { id: 'C', type: 'default', position: { x: 200, y: 250 }, data: { label: 'Vector Search' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 120, height: 50 } },
    { id: 'D', type: 'default', position: { x: 200, y: 350 }, data: { label: 'Document Retrieval' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 120, height: 50 } },
    { id: 'E', type: 'default', position: { x: 200, y: 450 }, data: { label: 'Answer Generation' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 120, height: 50 } },
    { id: 'F', type: 'output', position: { x: 200, y: 550 }, data: { label: 'Response Output' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '12px', width: 120, height: 50 } },
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

export default KnowledgeRetrievalFlowchart;