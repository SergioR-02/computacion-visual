import React, { useEffect, Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

export default function ModelViewer({ format, onModelLoaded }) {
  const objModel = useLoader(OBJLoader, '/model.obj');
  const stlGeometry = useLoader(STLLoader, '/model.stl');
  const glbModel = useLoader(GLTFLoader, '/model.glb');

  // Convertir STL geometry en mesh
  const stlMesh = new THREE.Mesh(stlGeometry, new THREE.MeshStandardMaterial({ color: 'gray' }));

  useEffect(() => {
    if (format === 'OBJ') {
      onModelLoaded(objModel);
    } else if (format === 'STL') {
      onModelLoaded(stlMesh);
    } else if (format === 'GLB') {
      onModelLoaded(glbModel.scene);
    }
  }, [format, objModel, stlMesh, glbModel]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Suspense fallback={null}>
        {format === 'OBJ' && <primitive object={objModel} />}
        {format === 'STL' && <primitive object={stlMesh} />}
        {format === 'GLB' && <primitive object={glbModel.scene} />}
      </Suspense>
    </>
  );
}
