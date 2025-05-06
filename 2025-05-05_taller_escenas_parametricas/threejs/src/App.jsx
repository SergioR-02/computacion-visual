// App.jsx
import { useControls } from 'leva' // UI de control interactiva
import { useFrame } from '@react-three/fiber' // Hook para animaciones por frame
import { useRef } from 'react' // Hook para referencias mutables a objetos

// 🧱 Datos base simulados: se generan 10 objetos con posición, color, escala y rotación aleatoria
const rawData = Array.from({ length: 10 }, (_, i) => ({
  position: [i * 2, 0, 0], // separación inicial por defecto en el eje X
  color: ['red', 'blue', 'green', 'orange', 'purple'][i % 5],
  scale: 1 + Math.random(), // escala aleatoria
  rotation: Math.random() * Math.PI, // rotación aleatoria en Y
}))

export default function App() {
  const groupRef = useRef() // Referencia al grupo contenedor de todos los objetos 3D

  // 🎛️ Interfaz interactiva para modificar parámetros en tiempo real con Leva
  const {
    globalScale,        // Escala global que se aplica a todos los objetos
    geometryType,       // Tipo de geometría: 'cube' o 'sphere'
    baseSize,           // Escala individual de cada objeto (base)
    spacing,            // Separación entre objetos en el eje X
    colorBase,          // Color común para todos los objetos
    lightIntensity,     // Intensidad de la luz puntual
    randomizeRotation,  // Alterna entre usar rotaciones aleatorias o no
    animateRotation,    // Activa/desactiva rotación animada del grupo completo
  } = useControls({
    globalScale: { value: 1, min: 0.1, max: 3 },
    geometryType: { options: { Cube: 'cube', Sphere: 'sphere' } },
    baseSize: { value: 1, min: 0.2, max: 3 },
    spacing: { value: 2, min: 1, max: 5 },
    colorBase: '#ffaa00',
    animateRotation: false,
  })

  // 🔁 Animación por cuadro: rota lentamente todo el grupo si está habilitado
  useFrame(() => {
    if (animateRotation && groupRef.current) {
      groupRef.current.rotation.y += 0.01
    }
  })

  // 🧩 Mapeo de datos dinámico en base a los controles activos
  const data = rawData.map((item, i) => ({
    ...item,
    position: [i * spacing, 0, 0], // separa en X según spacing
    color: colorBase,              // reemplaza color por el común
    rotation: randomizeRotation
      ? Math.random() * Math.PI    // aplica nueva rotación aleatoria si está activado
      : item.rotation,
    scale: baseSize,               // todos los objetos reciben la misma escala base
  }))

  return (
    <group ref={groupRef}>
      {/* 💡 Iluminación básica: ambiente + punto */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={lightIntensity} />

      {/* 🧱 Renderizado del array de objetos: posición, rotación y geometría según parámetros */}
      {data.map((item, index) => (
        <mesh
          key={index}
          position={item.position}
          rotation={[0, item.rotation, 0]}
          scale={[
            item.scale * globalScale, // aplicamos la escala combinada (base * global)
            item.scale * globalScale,
            item.scale * globalScale,
          ]}
        >
          {/* Geometría condicional: cubo o esfera según selección del usuario */}
          {geometryType === 'sphere' ? (
            <sphereGeometry args={[0.5, 32, 32]} />
          ) : (
            <boxGeometry args={[1, 1, 1]} />
          )}
          <meshStandardMaterial color={item.color} />
        </mesh>
      ))}
    </group>
  )
}
