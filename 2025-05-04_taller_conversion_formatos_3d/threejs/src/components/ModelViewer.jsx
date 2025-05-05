import React, { useEffect, Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function ModelViewer({ format, onModelLoaded }) {
  const objModel = useLoader(OBJLoader, '/model.obj');
  const stlModel = useLoader(STLLoader, '/model.stl');
  const glbModel = useLoader(GLTFLoader, '/model.glb');

  useEffect(() => {
    if (format === 'OBJ') {
      onModelLoaded(objModel);
    } else if (format === 'STL') {
      onModelLoaded(stlModel);
    } else if (format === 'GLB') {
      onModelLoaded(glbModel.scene); // ¡OJO! `scene` es importante aquí
    }
  }, [format, objModel, stlModel, glbModel]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Suspense fallback={null}>
        {format === 'OBJ' && <primitive object={objModel} />}
        {format === 'STL' && <primitive object={stlModel} />}
        {format === 'GLB' && <primitive object={glbModel.scene} />}
      </Suspense>
    </>
  );
}
