import React, { useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Panel, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const BiomedicalKnowledgeFlowchart = () => {
  const [isVertical, setIsVertical] = useState(false);

  const horizontalNodes = [
    // Biomedical Data Sources
    { id: 'PUBMED', type: 'input', position: { x: 50, y: 50 }, data: { label: 'PubMed/MEDLINE' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },
    { id: 'CLINTRIALS', type: 'input', position: { x: 50, y: 120 }, data: { label: 'Clinical Trials Database' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },
    { id: 'FDA', type: 'input', position: { x: 50, y: 190 }, data: { label: 'FDA Drug Databases' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },
    { id: 'UMLS', type: 'input', position: { x: 50, y: 260 }, data: { label: 'UMLS - Unified Medical Language' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },
    { id: 'GO', type: 'input', position: { x: 50, y: 330 }, data: { label: 'Gene Ontology - GO' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },
    { id: 'KEGG', type: 'input', position: { x: 50, y: 400 }, data: { label: 'KEGG Pathway Database' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },
    { id: 'DRUGBANK', type: 'input', position: { x: 50, y: 470 }, data: { label: 'DrugBank' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },
    { id: 'OMIM', type: 'input', position: { x: 50, y: 540 }, data: { label: 'OMIM - Genetic Disorders' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },

    // Data Ingestion Pipeline
    { id: 'DI', type: 'default', position: { x: 250, y: 300 }, data: { label: 'Data Ingestion Pipeline' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 160, height: 60 } },

    // Literature Processing Pipeline
    { id: 'DOC_PARSER', type: 'default', position: { x: 470, y: 200 }, data: { label: 'Document Parser & OCR' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },
    { id: 'BIOBERT', type: 'default', position: { x: 470, y: 270 }, data: { label: 'Biomedical NER - BioBERT/PubMedBERT' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },
    { id: 'SCIBERT', type: 'default', position: { x: 470, y: 340 }, data: { label: 'Relation Extraction - SciBERT' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },
    { id: 'ENTITY_LINK', type: 'default', position: { x: 470, y: 410 }, data: { label: 'Entity Linking & Resolution' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },

    // Knowledge Graph Construction
    { id: 'KG_BUILDER', type: 'default', position: { x: 690, y: 250 }, data: { label: 'Knowledge Graph Builder - Neo4j' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'ONTOLOGY', type: 'default', position: { x: 690, y: 320 }, data: { label: 'Ontology Alignment Engine' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'VECTOR_EMB', type: 'default', position: { x: 690, y: 390 }, data: { label: 'Vector Embeddings - OpenAI/Cohere' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },

    // AI-Powered Knowledge Extraction - NLP Models
    { id: 'BIOBERT_AI', type: 'default', position: { x: 910, y: 150 }, data: { label: 'BioBERT - Biomedical Language Model' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 170, height: 50 } },
    { id: 'CLINBERT', type: 'default', position: { x: 910, y: 220 }, data: { label: 'ClinicalBERT - Clinical Text' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 170, height: 50 } },
    { id: 'BIOGPT', type: 'default', position: { x: 910, y: 290 }, data: { label: 'BioGPT - Biomedical Generation' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 170, height: 50 } },
    { id: 'PUBMEDBERT', type: 'default', position: { x: 910, y: 360 }, data: { label: 'PubMedBERT - Literature Analysis' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 170, height: 50 } },
    { id: 'MED_NER', type: 'default', position: { x: 910, y: 430 }, data: { label: 'Medical NER Models' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 170, height: 50 } },
    { id: 'DDI_EXTRACT', type: 'default', position: { x: 910, y: 500 }, data: { label: 'Drug-Drug Interaction Extractor' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 170, height: 50 } },

    // Large Language Model
    { id: 'LLM_MED', type: 'default', position: { x: 1130, y: 300 }, data: { label: 'Large Language Model - GPT-4/Claude Medical' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 170, height: 60 } },
    { id: 'HYPO_GEN', type: 'default', position: { x: 1130, y: 380 }, data: { label: 'Hypothesis Generation Engine' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '10px', width: 170, height: 50 } },

    // Clinical Decision Support Engine
    { id: 'DIFF_DIAG', type: 'default', position: { x: 1360, y: 150 }, data: { label: 'Differential Diagnosis Assistant' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'DRUG_CHECK', type: 'default', position: { x: 1360, y: 220 }, data: { label: 'Drug Interaction Checker' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'TREAT_REC', type: 'default', position: { x: 1360, y: 290 }, data: { label: 'Treatment Recommendation System' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'GUIDE_MAP', type: 'default', position: { x: 1360, y: 360 }, data: { label: 'Clinical Guideline Mapper' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'EVIDENCE_MED', type: 'default', position: { x: 1360, y: 430 }, data: { label: 'Evidence-based Medicine Engine' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },

    // Research & Discovery Tools
    { id: 'LIT_SEARCH', type: 'default', position: { x: 1580, y: 100 }, data: { label: 'Literature Search & Synthesis' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'DRUG_REPO', type: 'default', position: { x: 1580, y: 170 }, data: { label: 'Drug Repurposing Identifier' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'BIOMARKER', type: 'default', position: { x: 1580, y: 240 }, data: { label: 'Biomarker Discovery Engine' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'GENE_DISEASE', type: 'default', position: { x: 1580, y: 310 }, data: { label: 'Gene-Disease Association Finder' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },
    { id: 'PATHWAY', type: 'default', position: { x: 1580, y: 380 }, data: { label: 'Pathway Analysis Tool' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '10px', width: 160, height: 50 } },

    // Query & Reasoning Engine
    { id: 'SPARQL', type: 'default', position: { x: 1800, y: 200 }, data: { label: 'SPARQL Query Interface' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },
    { id: 'NL_QUERY', type: 'default', position: { x: 1800, y: 270 }, data: { label: 'Natural Language Query Processor' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },
    { id: 'GNN_REASON', type: 'default', position: { x: 1800, y: 340 }, data: { label: 'Graph Neural Network Reasoner' }, style: { background: '#ffebee', border: '2px solid #d32f2f', borderRadius: '8px', fontSize: '10px', width: 150, height: 50 } },

    // User Interfaces & APIs
    { id: 'CLIN_DASH', type: 'default', position: { x: 2020, y: 150 }, data: { label: 'Clinician Dashboard' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },
    { id: 'RES_PORTAL', type: 'default', position: { x: 2020, y: 220 }, data: { label: 'Researcher Portal' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },
    { id: 'GRAPHQL', type: 'default', position: { x: 2020, y: 290 }, data: { label: 'GraphQL API Gateway' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '10px', width: 140, height: 50 } },
    { id: 'KG_VIZ', type: 'output', position: { x: 2020, y: 360 }, data: { label: 'Knowledge Graph Visualization' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '11px', width: 140, height: 60 } },

    // Storage & Infrastructure
    { id: 'NEO4J', type: 'output', position: { x: 2220, y: 250 }, data: { label: 'Neo4j Graph Database' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '11px', width: 140, height: 60 } },
  ];

  const horizontalEdges = [
    // Data sources to ingestion
    { id: 'e1', source: 'PUBMED', target: 'DI', animated: true },
    { id: 'e2', source: 'CLINTRIALS', target: 'DI', animated: true },
    { id: 'e3', source: 'FDA', target: 'DI', animated: true },
    { id: 'e4', source: 'UMLS', target: 'DI', animated: true },
    { id: 'e5', source: 'GO', target: 'DI', animated: true },
    { id: 'e6', source: 'KEGG', target: 'DI', animated: true },
    { id: 'e7', source: 'DRUGBANK', target: 'DI', animated: true },
    { id: 'e8', source: 'OMIM', target: 'DI', animated: true },

    // Ingestion to processing pipeline
    { id: 'e9', source: 'DI', target: 'DOC_PARSER', animated: true },
    { id: 'e10', source: 'DOC_PARSER', target: 'BIOBERT', animated: true },
    { id: 'e11', source: 'BIOBERT', target: 'SCIBERT', animated: true },
    { id: 'e12', source: 'SCIBERT', target: 'ENTITY_LINK', animated: true },

    // Processing to knowledge graph
    { id: 'e13', source: 'ENTITY_LINK', target: 'KG_BUILDER', animated: true },
    { id: 'e14', source: 'ENTITY_LINK', target: 'ONTOLOGY', animated: true },
    { id: 'e15', source: 'ENTITY_LINK', target: 'VECTOR_EMB', animated: true },

    // Knowledge graph to AI models
    { id: 'e16', source: 'KG_BUILDER', target: 'BIOBERT_AI', animated: true },
    { id: 'e17', source: 'KG_BUILDER', target: 'CLINBERT', animated: true },
    { id: 'e18', source: 'KG_BUILDER', target: 'BIOGPT', animated: true },
    { id: 'e19', source: 'KG_BUILDER', target: 'PUBMEDBERT', animated: true },
    { id: 'e20', source: 'KG_BUILDER', target: 'MED_NER', animated: true },
    { id: 'e21', source: 'KG_BUILDER', target: 'DDI_EXTRACT', animated: true },

    // AI models to LLM
    { id: 'e22', source: 'BIOBERT_AI', target: 'LLM_MED', animated: true },
    { id: 'e23', source: 'CLINBERT', target: 'LLM_MED', animated: true },
    { id: 'e24', source: 'BIOGPT', target: 'LLM_MED', animated: true },
    { id: 'e25', source: 'PUBMEDBERT', target: 'LLM_MED', animated: true },
    { id: 'e26', source: 'MED_NER', target: 'LLM_MED', animated: true },
    { id: 'e27', source: 'DDI_EXTRACT', target: 'LLM_MED', animated: true },

    // LLM to hypothesis generation
    { id: 'e28', source: 'LLM_MED', target: 'HYPO_GEN', animated: true },

    // LLM to clinical decision support
    { id: 'e29', source: 'LLM_MED', target: 'DIFF_DIAG', animated: true },
    { id: 'e30', source: 'LLM_MED', target: 'DRUG_CHECK', animated: true },
    { id: 'e31', source: 'LLM_MED', target: 'TREAT_REC', animated: true },
    { id: 'e32', source: 'LLM_MED', target: 'GUIDE_MAP', animated: true },
    { id: 'e33', source: 'LLM_MED', target: 'EVIDENCE_MED', animated: true },

    // Clinical decision support to research tools
    { id: 'e34', source: 'DIFF_DIAG', target: 'LIT_SEARCH', animated: true },
    { id: 'e35', source: 'DRUG_CHECK', target: 'DRUG_REPO', animated: true },
    { id: 'e36', source: 'TREAT_REC', target: 'BIOMARKER', animated: true },
    { id: 'e37', source: 'GUIDE_MAP', target: 'GENE_DISEASE', animated: true },
    { id: 'e38', source: 'EVIDENCE_MED', target: 'PATHWAY', animated: true },

    // Research tools to query engine
    { id: 'e39', source: 'LIT_SEARCH', target: 'SPARQL', animated: true },
    { id: 'e40', source: 'DRUG_REPO', target: 'NL_QUERY', animated: true },
    { id: 'e41', source: 'BIOMARKER', target: 'GNN_REASON', animated: true },

    // Query engine to user interfaces
    { id: 'e42', source: 'SPARQL', target: 'CLIN_DASH', animated: true },
    { id: 'e43', source: 'NL_QUERY', target: 'RES_PORTAL', animated: true },
    { id: 'e44', source: 'GNN_REASON', target: 'GRAPHQL', animated: true },
    { id: 'e45', source: 'SPARQL', target: 'KG_VIZ', animated: true },

    // User interfaces to storage
    { id: 'e46', source: 'CLIN_DASH', target: 'NEO4J', animated: true },
    { id: 'e47', source: 'RES_PORTAL', target: 'NEO4J', animated: true },
    { id: 'e48', source: 'GRAPHQL', target: 'NEO4J', animated: true },
    { id: 'e49', source: 'KG_VIZ', target: 'NEO4J', animated: true },
  ];

  const verticalNodes = [
    { id: 'A', type: 'input', position: { x: 200, y: 50 }, data: { label: 'Biomedical Data Sources' }, style: { background: '#e3f2fd', border: '2px solid #1976d2', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'B', type: 'default', position: { x: 200, y: 150 }, data: { label: 'Literature Processing' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'C', type: 'default', position: { x: 200, y: 250 }, data: { label: 'Knowledge Graph Construction' }, style: { background: '#e8f5e8', border: '2px solid #388e3c', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'D', type: 'default', position: { x: 200, y: 350 }, data: { label: 'AI Knowledge Extraction' }, style: { background: '#e1f5fe', border: '2px solid #0277bd', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'E', type: 'default', position: { x: 200, y: 450 }, data: { label: 'Clinical Decision Support' }, style: { background: '#fff3e0', border: '2px solid #f57c00', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
    { id: 'F', type: 'output', position: { x: 200, y: 550 }, data: { label: 'Research Tools & Interfaces' }, style: { background: '#f3e5f5', border: '2px solid #7b1fa2', borderRadius: '8px', fontSize: '12px', width: 140, height: 50 } },
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

export default BiomedicalKnowledgeFlowchart;