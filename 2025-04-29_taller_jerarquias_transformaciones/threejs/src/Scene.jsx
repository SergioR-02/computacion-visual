import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'

export default function Scene() {
  const parentRef = useRef()
  const childRef = useRef()
  const grandChildRef = useRef()

  // Controles para el grupo padre
  const { posX, rotY } = useControls('Parent Transform', {
    posX: { value: 0, min: -5, max: 5, step: 0.1 },
    rotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 }
  })

  // Controles para el hijo
  const { childRotY } = useControls('Child Transform', {
    childRotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 }
  })

  // Controles para el nieto
  const { grandChildRotZ } = useControls('Grandchild Transform', {
    grandChildRotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 }
  })

  useFrame(() => {
    if (parentRef.current) {
      parentRef.current.position.x = posX
      parentRef.current.rotation.y = rotY
    }
    if (childRef.current) {
      childRef.current.rotation.y = childRotY
    }
    if (grandChildRef.current) {
      grandChildRef.current.rotation.z = grandChildRotZ
    }
  })

  return (
    <group ref={parentRef}>
      {/* Hijo: cubo naranja */}
      <group ref={childRef} position={[2, 0, 0]}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>

        {/* Nieto: dodecaedro azul encima del cubo */}
        <group ref={grandChildRef} position={[0, 1.5, 0]}>
          <mesh>
            <dodecahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial color="skyblue" />
          </mesh>

          {/* Biznieto: toro rosa encima del dodecaedro */}
          <mesh position={[0, 1.2, 0]}>
            <torusGeometry args={[0.3, 0.1, 16, 100]} />
            <meshStandardMaterial color="hotpink" />
          </mesh>
        </group>
      </group>
    </group>
  )
}
