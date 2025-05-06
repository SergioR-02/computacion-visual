// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <OrbitControls />
    <App />
  </Canvas>
)
