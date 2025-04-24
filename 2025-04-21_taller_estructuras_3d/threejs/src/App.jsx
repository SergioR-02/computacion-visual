import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import Model from './Model'
import UI from './UI'

export default function App() {
  return (
    <div style={{
      height: '100vh', // Ocupa toda la altura de la ventana
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* UI en la parte superior */}
      <div style={{
        zIndex: 10, // Asegura que UI esté sobre el canvas
        position: 'relative',
        flexShrink: 0, // Impide que el UI se reduzca
      }}>
        <UI />
      </div>

      {/* Canvas ocupa el resto del espacio */}
      <div style={{ flex: 1 }}>
        <Canvas camera={{ position: [50, 0, 15], fov: 60 }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          <Model />
          <Stats />
        </Canvas>
      </div>
    </div>
  )
}
