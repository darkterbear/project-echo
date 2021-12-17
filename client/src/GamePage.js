import './css/GamePage.scss';
import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Plane from './components/Plane';
import CameraMover from './components/CameraMover';
import { GRASS_GREEN, GRID_SIZE, SKY_BLUE } from './util';

function GamePage() {

  const canvasRef = useRef();

  return (
    <React.Fragment>
      <Canvas ref={canvasRef} shadows style={{ height: '100vh'}} camera={{ 
        rotation: [Math.PI / 6, 0, 0], 
        position: [-(GRID_SIZE / 2 - 5), -(GRID_SIZE / 2 - 5) - (10 / Math.sqrt(3)), 10]
      }}>
        <CameraMover canvasRef={canvasRef} />
        <color attach="background" args={[SKY_BLUE]} />

        <ambientLight intensity={1} />
        <directionalLight castShadow intensity={2} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]}>
          <orthographicCamera attach="shadow-camera" left={-20} right={20} top={20} bottom={-20} />
        </directionalLight>

        <gridHelper args={[GRID_SIZE, GRID_SIZE, '#cccccc', '#cccccc']} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.3]} />

        <Plane position={[0, 0, 0]} dimensions={[GRID_SIZE, GRID_SIZE, 0.5]} color={GRASS_GREEN} />
      </Canvas>
    </React.Fragment>
  );
}

export default GamePage;
