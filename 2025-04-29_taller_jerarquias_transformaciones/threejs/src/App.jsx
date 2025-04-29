import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Scene from './Scene'

export default function App() {
  return (
    <Canvas
  style={{
    width: '100vw',
    height: '100vh',
    display: 'block',
  }}
>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <OrbitControls />
      <Scene />
    </Canvas>
  )
}
