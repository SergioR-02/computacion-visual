import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'; // Import THREE.js

function Cube() {
  const meshRef = useRef();

  // Materials for each face
  const materials = [
    new THREE.MeshStandardMaterial({ color: new THREE.Color("hsl(211, 100.00%, 15.70%)") }),
    new THREE.MeshStandardMaterial({ color: new THREE.Color("hsl(210, 100%, 20%)") }),
    new THREE.MeshStandardMaterial({ color: new THREE.Color("hsl(210, 100%, 30%)") }),
    new THREE.MeshStandardMaterial({ color: new THREE.Color("hsl(210, 100%, 40%)") }),
    new THREE.MeshStandardMaterial({ color: new THREE.Color("hsl(210, 100%, 60%)") }),
    new THREE.MeshStandardMaterial({ color: new THREE.Color("hsl(210, 100%, 80%)") }),
  ];
  
  

  // Animation with useFrame
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Sinusoidal movement
    meshRef.current.position.x = Math.sin(time) * 2.5;
    meshRef.current.position.y = Math.cos(time) * 2.5;
  
    // Continuous rotation
    meshRef.current.rotation.x = time;
    meshRef.current.rotation.y = time;
  
    // Smoother scaling
    const scale = Math.sin(time) * 0.2 + 1.7; // Between 1 and 2
    meshRef.current.scale.set(scale, scale, scale);
  });

  useEffect(() => {
    // Resize the cube to fill the entire screen
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      meshRef.current.scale.set(width / 100, height / 100, 1);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially to set the size
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      {materials.map((material, index) => (
        <meshBasicMaterial key={index} attach={`material-${index}`} {...material} />
      ))}
    </mesh>
  );
}

export default Cube;
