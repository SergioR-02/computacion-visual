import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useEffect, useState } from 'react'
import { Edges } from '@react-three/drei'
import * as THREE from 'three'
import { useModelViewStore } from './store'

export default function Model() {
  const view = useModelViewStore((state) => state.view)
  const setVertexCount = useModelViewStore((state) => state.setVertexCount)
  const setFaceCount = useModelViewStore((state) => state.setFaceCount)
  const setEdgeCount = useModelViewStore((state) => state.setEdgeCount)

  const obj = useLoader(OBJLoader, 'Corona.obj')
  const [geometry, setGeometry] = useState(null)

  useEffect(() => {
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        setGeometry(child.geometry)

        const countVertices = child.geometry.attributes.position.count
        setVertexCount(countVertices)

        // Calcular caras (suponiendo que es geometría de triángulos)
        if (child.geometry.index) {
          const countFaces = child.geometry.index.count / 3
          setFaceCount(countFaces)
          
          // Cada triángulo tiene 3 aristas, pero muchas aristas se comparten
          // Así que para simplificar, como aproximación rápida:
          const uniqueEdges = new Set()
          const indexArray = child.geometry.index.array
          for (let i = 0; i < indexArray.length; i += 3) {
            const a = indexArray[i]
            const b = indexArray[i+1]
            const c = indexArray[i+2]
            // Normalizar el par (menor primero)
            uniqueEdges.add([Math.min(a,b), Math.max(a,b)].toString())
            uniqueEdges.add([Math.min(b,c), Math.max(b,c)].toString())
            uniqueEdges.add([Math.min(c,a), Math.max(c,a)].toString())
          }
          setEdgeCount(uniqueEdges.size)
        } else {
          // Si no hay índices (non-indexed geometry), hacemos un cálculo simple
          const countFaces = countVertices / 3
          setFaceCount(countFaces)
          setEdgeCount(countFaces * 3 / 2) // Aproximación si las aristas no se repiten
        }
      }
    })
  }, [obj, setVertexCount, setFaceCount, setEdgeCount])

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
