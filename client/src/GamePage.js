import './css/GamePage.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Plane from './components/Plane';
import CameraMover from './components/CameraMover';
import { GRASS_GREEN, GRID_LINE_COLOR, GRID_SIZE, PLANE_THICKNESS, SKY_BLUE, locToId , buildConflict, keyToType } from './util';
import Building, { BuildingType } from './components/Building';

function GamePage() {
  const [buildings, setBuildings] = useState([
    { position: [4, 4], type: BuildingType.REFINERY, friendly: true },
  ]);

  const [takenSquares, setTakenSquares] = useState(new Set([[4, 4], [3, 4], [3, 5], [4, 5]].map(locToId)));

  const [placingBuilding, setPlacingBuilding] = useState(null);
  const [hoverLocation, setHoverLocation] = useState([0, 0]);

  useEffect(() => {
    window.onkeydown = (e) => {
      setPlacingBuilding(keyToType(e.key));
    }
  }, []);

  const onCellHover = (x, y) => {
    setHoverLocation([x, y]);
  }

  const onClick = (e) => {
    if (placingBuilding) {
      if (!buildConflict(takenSquares, hoverLocation, placingBuilding)) {
        const newTakenSquares = new Set([...takenSquares])

        switch (placingBuilding) {
          case BuildingType.NEXUS:
          case BuildingType.FARM:
            for (let x = -1; x <= 1; x++) {
              for (let y = -1; y <= 1; y++) {
                newTakenSquares.add(locToId([hoverLocation[0] + x, hoverLocation[1] + y]));
              }
            }
            break;
          case BuildingType.POWER_PLANT:
          case BuildingType.REFINERY:
          case BuildingType.BARRACKS:
          case BuildingType.TURRET:
            for (let x = -1; x <= 0; x++) {
              for (let y = 0; y <= 1; y++) {
                newTakenSquares.add(locToId([hoverLocation[0] + x, hoverLocation[1] + y]));
              }
            }
            break;
          case BuildingType.WATCHTOWER:
            newTakenSquares.add(locToId([hoverLocation[0], hoverLocation[1]]));
            break;
          default:
            return;
        }

        setTakenSquares(newTakenSquares);
        setBuildings([...buildings, { position: hoverLocation, type: placingBuilding, friendly: true }]);
        setPlacingBuilding(null);
      }
    }
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
        {/* <CameraMover speed={0.5} /> */}
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
          onClick={onClick}
        />

        { placingBuilding && <Building showArea conflict={buildConflict(takenSquares, hoverLocation, placingBuilding)} pending={hoverLocation} type={placingBuilding} /> }
        { buildings.map(building => <Building showArea={placingBuilding} {...building} />) }
      </Canvas>
    </React.Fragment>
  );
}

export default GamePage;
