import './css/GamePage.scss';
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Plane from './components/Plane';

function GamePage() {
  return (
    <>
      <Canvas shadows style={{ height: '100vh'}} camera={{ rotation: [Math.PI / 6, 0, 0], position: [-40, -40 - (50 / Math.sqrt(3)), 50]}}>
        
        <color attach="background" args={['#17171b']} />

        <ambientLight intensity={0.25} />
        <directionalLight castShadow intensity={2} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]}>
          <orthographicCamera attach="shadow-camera" left={-20} right={20} top={20} bottom={-20} />
        </directionalLight>

        <Plane position={[0, 0, 0]}/>
      </Canvas>
    </>
  );
}

export default GamePage;
