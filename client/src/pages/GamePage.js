import '../css/GamePage.scss';
import { buildConflict, computeNewBuildingVisibility, getBuildingTakenSquares, getTerrain, GRID_SIZE, locToId, perspectiveNexus } from 'echo';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import Plane from '../components/Plane';
import CameraMover from '../components/CameraMover';
import { GRID_LINE_COLOR, PLANE_THICKNESS, SKY_BLUE, keyToType } from '../util';
import Building, { BuildingType } from '../components/Building';
import { placeBuilding, socket } from '../api';

const terrain = getTerrain();

function GamePage() {
  const [friendlyBuildings, setFriendlyBuildings] = useState([perspectiveNexus]);
  const [hostileBuildings, setHostileBuildings] = useState([]);

  const [buildingTakenSquares, setBuildingTakenSquares] = useState(getBuildingTakenSquares(terrain.concat(perspectiveNexus)));
  const [buildingVisibility, setBuildingVisibility] = useState(computeNewBuildingVisibility(friendlyBuildings));
  const [placingBuilding, setPlacingBuilding] = useState(null);
  const [hoverLocation, setHoverLocation] = useState([0, 0]);

  useEffect(() => {
    window.onkeydown = (e) => {
      setPlacingBuilding(keyToType(e.key));
    }

    console.log(socket)
    socket.on('update_buildings', (type, buildings) => {
      console.log('received building update', type, buildings);
    })
  }, []);

  const onCellHover = (x, y) => {
    setHoverLocation([x, y]);
  }

  const onClick = async (e) => {
    if (placingBuilding) {
      if (!buildConflict(buildingTakenSquares, buildingVisibility, hoverLocation, placingBuilding)) {
        const newBuilding = new Building(hoverLocation, placingBuilding);
        const newBuildingTakenSquares = new Map(buildingTakenSquares);

        switch (placingBuilding) {
          case BuildingType.NEXUS:
          case BuildingType.FARM:
            for (let x = -1; x <= 1; x++) {
              for (let y = -1; y <= 1; y++) {
                newBuildingTakenSquares.set(locToId([hoverLocation[0] + x, hoverLocation[1] + y]), newBuilding);
              }
            }
            break;
          case BuildingType.POWER_PLANT:
          case BuildingType.REFINERY:
          case BuildingType.BARRACKS:
          case BuildingType.TURRET:
            for (let x = -1; x <= 0; x++) {
              for (let y = 0; y <= 1; y++) {
                newBuildingTakenSquares.set(locToId([hoverLocation[0] + x, hoverLocation[1] + y]), newBuilding);
              }
            }
            break;
          case BuildingType.WATCHTOWER:
            newBuildingTakenSquares.set(locToId([hoverLocation[0], hoverLocation[1]]), newBuilding);
            break;
          default:
            return;
        }

        const oldBuildingTakenSquares = new Map(buildingTakenSquares);
        const oldFriendlyBuildings = [...friendlyBuildings];

        const newFriendlyBuildings = [...friendlyBuildings, newBuilding];
        setBuildingTakenSquares(newBuildingTakenSquares);
        setBuildingVisibility(computeNewBuildingVisibility(newFriendlyBuildings));
        setFriendlyBuildings(newFriendlyBuildings);
        setPlacingBuilding(null);

        const res = await placeBuilding(newBuilding.position, newBuilding.type);
        if (res.status !== 200) {
          // Didn't succeed, revert
          console.error('Failed to place building', res.status);
          setBuildingTakenSquares(oldBuildingTakenSquares);
          setBuildingVisibility(computeNewBuildingVisibility(friendlyBuildings));
          setFriendlyBuildings(oldFriendlyBuildings);
        }
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
        
        { terrain.map(building => <Building showArea={placingBuilding} {...building} />) }
        { friendlyBuildings.map(building => <Building showArea={placingBuilding} {...building} friendly />) }
        { hostileBuildings.map(building => <Building showArea={placingBuilding} {...building} />) }
      </Canvas>
    </React.Fragment>
  );
}

export default GamePage;
