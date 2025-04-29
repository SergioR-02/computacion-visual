import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'

export default function Scene() {
  const parentRef = useRef()
  const childRef = useRef()
  const grandChildRef = useRef()

  const { posX, rotY } = useControls('Parent Transform', {
    posX: { value: 0, min: -5, max: 5, step: 0.1 },
    rotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 }
  })

  useFrame(() => {
    if (parentRef.current) {
      parentRef.current.position.x = posX
      parentRef.current.rotation.y = rotY
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

        {/* Nieto: esfera azul encima del cubo */}
        <group ref={grandChildRef} position={[0, 1.5, 0]}>
          <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="skyblue" />
          </mesh>

          {/* Biznieto (cuarto nivel, opcional): cono verde sobre la esfera */}
          <mesh position={[0, 1.2, 0]}>
            <coneGeometry args={[0.3, 0.7, 32]} />
            <meshStandardMaterial color="green" />
          </mesh>
        </group>
      </group>
    </group>
  )
}
