import React, { useState, useMemo } from 'react';
import ReactFlow, { Background, Controls, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';

// 1. A Simple Zone Component
const ZoneNode = ({ data }) => (
  <div style={{ padding: 20, border: '2px dashed #777', borderRadius: 10, background: 'rgba(200,200,200,0.2)', width: 200, height: 200 }}>
    <strong>{data.label}</strong>
  </div>
);

// 2. The Product Component
const ProductNode = ({ data }) => (
  <div style={{ padding: 5, border: '1px solid #333', background: '#fff', borderRadius: 5 }}>
    {data.label}: ${data.price}
  </div>
);

const nodeTypes = { zone: ZoneNode, product: ProductNode };

export default function App() {
  const [nodes, setNodes] = useState([
    { id: 'zone-1', type: 'zone', data: { label: 'IoT Zone' }, position: { x: 50, y: 50 } }
  ]);
  const [edges, setEdges] = useState([]);

  // Auto-calculate total cost
  const totalCost = useMemo(() => {
    return nodes.reduce((sum, node) => sum + (parseFloat(node.data.price) || 0), 0);
  }, [nodes]);

  const addProduct = () => {
    const newNode = {
      id: Math.random().toString(),
      type: 'product',
      data: { label: 'New Sensor', price: 10 },
      position: { x: 80, y: 80 },
      parentNode: 'zone-1', // Link to the Zone
      extent: 'parent'      // Keep inside the box
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
        <button onClick={addProduct}>Add Product to Zone</button>
        <div style={{ background: '#fff', padding: 5 }}>Total Project Cost: ${totalCost}</div>
      </div>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} />
    </div>
  );
}