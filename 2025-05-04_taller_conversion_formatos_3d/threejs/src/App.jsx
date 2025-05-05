import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import ModelViewer from './components/ModelViewer';
import ModelInfoPanel from './components/ModelInfoPanel';
import './App.css'; // Asegúrate de importar los estilos

function App() {
  const [format, setFormat] = useState('OBJ');
  const [verticesCount, setVerticesCount] = useState(0);

  const handleModelLoaded = (model) => {
    let vertices = 0;
    model.traverse?.((child) => {
      if (child.isMesh) {
        vertices += child.geometry.attributes?.position?.count || 0;
      }
    });
    setVerticesCount(vertices);
  };

  return (
    <>
      {/* Contenedor para controles */}
      <div className="ui-container">
        {/* Selector de formato */}
        <div className="ui-card">
          <label htmlFor="format"><strong>Selecciona el formato</strong></label>
          <select
            id="format"
            value={format}
            onChange={e => setFormat(e.target.value)}
            className="select-format"
          >
            <option value="OBJ">OBJ</option>
            <option value="STL">STL</option>
            <option value="GLB">GLB</option>
          </select>
        </div>

        {/* Panel de información */}
        <div className="ui-card info-panel">
          <p><strong>Formato:</strong> {format}</p>
          <p><strong>Vértices:</strong> {verticesCount}</p>
        </div>
      </div>

      {/* Canvas 3D */}
      <Canvas>
        <ModelViewer format={format} onModelLoaded={handleModelLoaded} />
      </Canvas>
    </>
  );
}

export default App;
