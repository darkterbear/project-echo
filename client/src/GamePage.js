import './css/GamePage.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import Plane from './components/Plane';
import CameraMover from './components/CameraMover';
import { GRID_LINE_COLOR, GRID_SIZE, PLANE_THICKNESS, SKY_BLUE, locToId , buildConflict, keyToType, DEFAULT_TERRAIN, DEFAULT_BUILDING_TAKEN_SQUARES, DEFAULT_BUILDING_VISIBLE_SQUARES, computeNewBuildingVisibility } from './util';
import Building, { BuildingType } from './components/Building';

function GamePage() {
  const [buildings, setBuildings] = useState([
    ...DEFAULT_TERRAIN
  ]);

  const [buildingTakenSquares, setBuildingTakenSquares] = useState(DEFAULT_BUILDING_TAKEN_SQUARES);
  const [buildingVisibility, setBuildingVisibility] = useState(DEFAULT_BUILDING_VISIBLE_SQUARES);
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
      if (!buildConflict(buildingTakenSquares, buildingVisibility, hoverLocation, placingBuilding)) {
        const newBuildingTakenSquares = new Set([...buildingTakenSquares])
        const newBuildingVisibility = new Set([...buildingVisibility])
        switch (placingBuilding) {
          case BuildingType.NEXUS:
          case BuildingType.FARM:
            for (let x = -1; x <= 1; x++) {
              for (let y = -1; y <= 1; y++) {
                newBuildingTakenSquares.add(locToId([hoverLocation[0] + x, hoverLocation[1] + y]));
              }
            }

            for (let x = -4; x <= 4; x++) {
              for (let y = -4; y <= 4; y++) {
                newBuildingVisibility.add(locToId([hoverLocation[0] + x, hoverLocation[1] + y]));
              }
            }
            break;
          case BuildingType.POWER_PLANT:
          case BuildingType.REFINERY:
          case BuildingType.BARRACKS:
          case BuildingType.TURRET:
            for (let x = -1; x <= 0; x++) {
              for (let y = 0; y <= 1; y++) {
                newBuildingTakenSquares.add(locToId([hoverLocation[0] + x, hoverLocation[1] + y]));
              }
            }
            break;
          case BuildingType.WATCHTOWER:
            newBuildingTakenSquares.add(locToId([hoverLocation[0], hoverLocation[1]]));
            break;
          default:
            return;
        }

        const newBuildings = [...buildings, { position: hoverLocation, type: placingBuilding, friendly: true }];
        setBuildingTakenSquares(newBuildingTakenSquares);
        setBuildingVisibility(computeNewBuildingVisibility(newBuildings, buildingVisibility));
        setBuildings(newBuildings);
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
        <CameraMover speed={0.5} />
        <color attach="background" args={[SKY_BLUE]} />

        <ambientLight intensity={0.75} />
        <pointLight position={[15, 15, 25]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />

        {/* Puts 0, 0 at the center of the bottom left square */}
        <gridHelper args={[GRID_SIZE, GRID_SIZE, GRID_LINE_COLOR, GRID_LINE_COLOR]} rotation={[Math.PI / 2, 0, 0]} position={[GRID_SIZE / 2 - 0.5, GRID_SIZE / 2 - 0.5, 0.01]} />
        <Plane 
          position={[GRID_SIZE / 2 - 0.5, GRID_SIZE / 2 - 0.5, -PLANE_THICKNESS / 2]} 
          dimensions={[GRID_SIZE, GRID_SIZE, PLANE_THICKNESS]}
          visibility={buildingVisibility}
          selectionEnabled={placingBuilding === null}
          onCellHover={onCellHover}
          onClick={onClick}
        />

        { placingBuilding && <Building showArea conflict={buildConflict(buildingTakenSquares, buildingVisibility, hoverLocation, placingBuilding)} pending={hoverLocation} type={placingBuilding} /> }
        { buildings.map(building => <Building showArea={placingBuilding} {...building} />) }
      </Canvas>
    </React.Fragment>
  );
}

export default GamePage;
