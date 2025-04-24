

import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useEffect, useState } from 'react'
import { Edges } from '@react-three/drei'
import * as THREE from 'three'
import { useModelViewStore } from './store'

export default function Model() {
  const view = useModelViewStore((state) => state.view)
  const setVertexCount = useModelViewStore((state) => state.setVertexCount)

  const obj = useLoader(OBJLoader, 'Lowpoly_tree_sample.obj')
  const [geometry, setGeometry] = useState(null)

  useEffect(() => {
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        setGeometry(child.geometry)
        const count = child.geometry.attributes.position.count
        setVertexCount(count)
      }
    })
  }, [obj, setVertexCount])

  if (!geometry) return null

  return (
    <group>
      {view === 'wireframe' && (
        <mesh geometry={geometry}>
          <meshBasicMaterial wireframe color="white" />
        </mesh>
      )}

      {view === 'edges' && (
        <mesh geometry={geometry}>
          <meshBasicMaterial color="gray" />
          <Edges threshold={15} color="white" />
        </mesh>
      )}

      {view === 'points' && (
        <points geometry={geometry}>
          <pointsMaterial size={0.02} color="cyan" />
        </points>
      )}
    </group>
  )
}
