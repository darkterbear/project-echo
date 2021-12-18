import './css/GamePage.scss';
import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Plane from './components/Plane';
import CameraMover from './components/CameraMover';
import { GRASS_GREEN, GRID_LINE_COLOR, GRID_SIZE, PLANE_THICKNESS, SKY_BLUE } from './util';
import Building, { BuildingType } from './components/Building';

function GamePage() {
  return (
    <React.Fragment>
      <Canvas shadows style={{ height: '100vh'}} camera={{ 
        rotation: [Math.PI / 6, 0, 0], 
        position: [0, 0 - (10 / Math.sqrt(3)), 10]
      }}>
        {/* <CameraMover speed={0.5} /> */}
        <color attach="background" args={[SKY_BLUE]} />

        <ambientLight intensity={0.75} />
        <pointLight position={[15, 15, 25]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
        {/* <directionalLight castShadow intensity={1.5} position={[10, 10, 10]} shadow-mapSize={[2048, 2048]}>
          <orthographicCamera attach="shadow-camera" left={-20} right={20} top={20} bottom={-20} />
        </directionalLight> */}

        {/* Puts 0, 0 at the center of the bottom left square */}
        <gridHelper args={[GRID_SIZE, GRID_SIZE, GRID_LINE_COLOR, GRID_LINE_COLOR]} rotation={[Math.PI / 2, 0, 0]} position={[GRID_SIZE / 2 - 0.5, GRID_SIZE / 2 - 0.5, 0.01]} />
        <Plane position={[GRID_SIZE / 2 - 0.5, GRID_SIZE / 2 - 0.5, -PLANE_THICKNESS / 2]} dimensions={[GRID_SIZE, GRID_SIZE, PLANE_THICKNESS]} color={GRASS_GREEN} />

        <Building position={[1, 1]} type={BuildingType.NEXUS} />
        <Building position={[4, 1]} type={BuildingType.POWER_PLANT} />
        <Building position={[1, 5]} type={BuildingType.FARM} />
        <Building position={[1, 7]} type={BuildingType.REFINERY} />
        <Building position={[1, 9]} type={BuildingType.TURRET} />

        <Building position={[5, 5]} type={BuildingType.FARM} friendly={false} />
        <Building position={[5, 8]} type={BuildingType.NEXUS} friendly={false} />
        <Building position={[6, 1]} type={BuildingType.BARRACKS} friendly={false} />
        <Building position={[8, 4]} type={BuildingType.WATCHTOWER} friendly={false} />
      </Canvas>
    </React.Fragment>
  );
}

export default GamePage;
