import './css/GamePage.scss';
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Plane from './components/Plane';
import CameraMover from './components/CameraMover';
import { GRASS_GREEN, GRID_LINE_COLOR, GRID_SIZE, PLANE_THICKNESS, SKY_BLUE } from './util';
import Building, { BuildingType } from './components/Building';

function GamePage() {
  const [buildings, setBuildings] = useState([
    { position: [1, 1], type: BuildingType.NEXUS, friendly: true },
    { position: [4, 1], type: BuildingType.FARM, friendly: true },
    { position: [1, 4], type: BuildingType.REFINERY, friendly: true },

    { position: [4, 4], type: BuildingType.NEXUS, friendly: false },
  ]);

  const [placingBuilding, setPlacingBuilding] = useState(null);
  const [hoverLocation, setHoverLocation] = useState([0, 0]);

  useEffect(() => {
    window.onkeydown = (e) => {
      if (e.key === 'Escape') {
        setPlacingBuilding(null);
      } else if (e.key === '1') {
        setPlacingBuilding(BuildingType.NEXUS);
      } else if (e.key === '2') {
        setPlacingBuilding(BuildingType.POWER_PLANT);
      } else if (e.key === '3') {
        setPlacingBuilding(BuildingType.FARM);
      } else if (e.key === '4') {
        setPlacingBuilding(BuildingType.REFINERY);
      } else if (e.key === '5') {
        setPlacingBuilding(BuildingType.BARRACKS);
      } else if (e.key === '6') {
        setPlacingBuilding(BuildingType.TURRET);
      } else if (e.key === '7') {
        setPlacingBuilding(BuildingType.WATCHTOWER);
      }
    }
  }, []);

  const onCellHover = (x, y) => {
    setHoverLocation([x, y]);
  }

  return (
    <React.Fragment>
      <div id="info">
        { placingBuilding && <h1>Placing {placingBuilding}...</h1> }
      </div>
      <Canvas shadows style={{ height: '100vh'}} camera={{ 
        rotation: [Math.PI / 6, 0, 0], 
        position: [0, 0 - (10 / Math.sqrt(3)), 10]
      }}>
        <CameraMover speed={0.5} />
        <color attach="background" args={[SKY_BLUE]} />

        <ambientLight intensity={0.75} />
        <pointLight position={[15, 15, 25]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />

        {/* Puts 0, 0 at the center of the bottom left square */}
        <gridHelper args={[GRID_SIZE, GRID_SIZE, GRID_LINE_COLOR, GRID_LINE_COLOR]} rotation={[Math.PI / 2, 0, 0]} position={[GRID_SIZE / 2 - 0.5, GRID_SIZE / 2 - 0.5, 0.01]} />
        <Plane 
          position={[GRID_SIZE / 2 - 0.5, GRID_SIZE / 2 - 0.5, -PLANE_THICKNESS / 2]} 
          dimensions={[GRID_SIZE, GRID_SIZE, PLANE_THICKNESS]} color={GRASS_GREEN} 
          selectionEnabled={placingBuilding === null}
          onCellHover={onCellHover}
        />

        { placingBuilding && <Building showArea pending={hoverLocation} type={placingBuilding} /> }
        { buildings.map(building => <Building showArea={placingBuilding} {...building} />) }
      </Canvas>
    </React.Fragment>
  );
}

export default GamePage;
