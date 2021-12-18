import './css/GamePage.scss';
import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Plane from './components/Plane';
import CameraMover from './components/CameraMover';
import { GRASS_GREEN, GRID_LINE_COLOR, GRID_SIZE, PLANE_THICKNESS, SKY_BLUE } from './util';
import Building, { BuildingType } from './components/Building';

function GamePage() {

  const canvasRef = useRef();

  return (
    <React.Fragment>
      <Canvas ref={canvasRef} shadows style={{ height: '100vh'}} camera={{ 
        rotation: [Math.PI / 6, 0, 0], 
        position: [0, 0 - (10 / Math.sqrt(3)), 10]
      }}>
        {/* <CameraMover canvasRef={canvasRef} /> */}
        <color attach="background" args={[SKY_BLUE]} />

        <ambientLight intensity={1} />
        <directionalLight castShadow intensity={2} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]}>
          <orthographicCamera attach="shadow-camera" left={-20} right={20} top={20} bottom={-20} />
        </directionalLight>

        {/* Puts 0, 0 at the center of the bottom left square */}
        <gridHelper args={[GRID_SIZE, GRID_SIZE, GRID_LINE_COLOR, GRID_LINE_COLOR]} rotation={[Math.PI / 2, 0, 0]} position={[GRID_SIZE / 2 - 0.5, GRID_SIZE / 2 - 0.5, 0.01]} />
        <Plane position={[GRID_SIZE / 2 - 0.5, GRID_SIZE / 2 - 0.5, -PLANE_THICKNESS / 2]} dimensions={[GRID_SIZE, GRID_SIZE, PLANE_THICKNESS]} color={GRASS_GREEN} />

        <Building position={[1, 1]} type={BuildingType.NEXUS} />
      </Canvas>
    </React.Fragment>
  );
}

export default GamePage;
