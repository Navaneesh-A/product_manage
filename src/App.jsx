import React, { useState, useCallback } from 'react';
import ReactFlow, { addEdge, Background, Controls, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import 'reactflow/dist/style.css';

// A Custom Node component to show Price and Link
const ProductNode = ({ data }) => (
  <div style={{ padding: 10, border: '1px solid #777', borderRadius: 5, background: '#fff' }}>
    <strong>{data.label}</strong>
    <p>Price: ${data.price}</p>
    <a href={data.url} target="_blank" rel="noreferrer">View on Amazon</a>
  </div>
);

const nodeTypes = { product: ProductNode };

export default function App() {
  const [nodes, setNodes] = useState([{ id: '1', type: 'product', data: { label: 'ESP32', price: 5, url: '#' }, position: { x: 250, y: 100 } }]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback((changes) => setNodes((ns) => applyNodeChanges(changes, ns)), []);
  const onEdgesChange = useCallback((changes) => setEdges((ns) => applyEdgeChanges(changes, ns)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  // Function to Add a New Product
  const addProduct = () => {
    const id = Math.random().toString();
    const newNode = { id, type: 'product', data: { label: 'New Item', price: 0, url: '#' }, position: { x: Math.random() * 400, y: Math.random() * 400 } };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button onClick={addProduct} style={{ position: 'absolute', zIndex: 10, top: 10, left: 10 }}>Add Product</button>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={nodeTypes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}