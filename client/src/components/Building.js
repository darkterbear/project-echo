import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

export const BuildingType = {
  NEXUS: 'nexus',
  POWER_PLANT: 'powerPlant',
  FARM: 'farm',
  REFINERY: 'refinery',
  BARRACKS: 'barracks',
  TURRET: 'turret',
  WATCHTOWER: 'watchtower',
};

const LIGHT_BUILDING_COLOR = '#bbbbbb';
const LIGHT_AREA_COLOR = '#376e18';
const DARK_BUILDING_COLOR = '#333333';
const DARK_AREA_COLOR = '#555555';
const PENDING_BUILDING_COLOR = '#527aff';
const CONFLICT_COLOR = '#ff0000';

/**
 * Three.js mesh component for a building.
 * @param {Number[2]} position: [x, y], describing lower left corner of the building
 * @param {BuildingType} type: enum describing type of building
 * @returns 
 */
export default function Building({ type, position = [0,0,0], friendly = true, pending = null, showArea, conflict = false }) {
  const mesh = useRef();

  useFrame(() => {
    if (pending) {
      mesh.current.position.x = pending[0];
      mesh.current.position.y = pending[1];
    }
  });

  const areaColor = conflict ? CONFLICT_COLOR : pending ? PENDING_BUILDING_COLOR : friendly ? LIGHT_AREA_COLOR : DARK_AREA_COLOR;
  const areaZ = pending ? 0.02 : 0.01;
  const buildingColor = pending ? PENDING_BUILDING_COLOR : friendly ? LIGHT_BUILDING_COLOR : DARK_BUILDING_COLOR;

  switch(type) {
    case BuildingType.NEXUS:
      const NEXUS_HEIGHT = 0.75;
      return (
        <group ref={mesh} position={[position[0], position[1], 0]}>
          <mesh castShadow position={[0, 0, NEXUS_HEIGHT / 2]} rotation={[Math.PI / 2, 0, 0]} >
            <cylinderGeometry args={[0.7, 1, NEXUS_HEIGHT, 6]} />
            <meshStandardMaterial color={buildingColor} />
          </mesh>
          { showArea && <mesh receiveShadow position={[0, 0, areaZ]} >
            <planeGeometry args={[3, 3]} />
            <meshStandardMaterial color={areaColor} />
          </mesh>}
        </group>
      );
      case BuildingType.POWER_PLANT:
        return (
          <group ref={mesh} position={[position[0], position[1], 0]}>
            <mesh castShadow position={[-0.5, 0.5, 0.1]} rotation={[Math.PI / 2, Math.PI / 4, 0]} >
              <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
              <meshStandardMaterial color={buildingColor} />
            </mesh>
            { showArea && <mesh receiveShadow position={[-0.5, 0.5, areaZ]} >
              <planeGeometry args={[2, 2]} />
              <meshStandardMaterial color={areaColor} />
            </mesh> }
          </group>
        );
      case BuildingType.FARM:
        return (
          <group ref={mesh} position={[position[0], position[1], 0]}>
            {/* Fences */}
            <mesh castShadow position={[-0.95, 0, 0.1]} >
              <boxGeometry args={[0.1, 2, 0.2]} />
              <meshStandardMaterial color={buildingColor} />
            </mesh>
            <mesh castShadow position={[0.95, 0, 0.1]} >
              <boxGeometry args={[0.1, 2, 0.2]} />
              <meshStandardMaterial color={buildingColor} />
            </mesh>
            <mesh castShadow position={[0, -0.95, 0.1]} >
              <boxGeometry args={[2, 0.1, 0.2]} />
              <meshStandardMaterial color={buildingColor} />
            </mesh>
            <mesh castShadow position={[0, 0.95, 0.1]} >
              <boxGeometry args={[2, 0.1, 0.2]} />
              <meshStandardMaterial color={buildingColor} />
            </mesh>

            {/* Animals */}
            <mesh castShadow position={[-0.45, 0.15, 0.1]} >
              <boxGeometry args={[0.3, 0.2, 0.2]} />
              <meshStandardMaterial color={buildingColor} />
            </mesh>
            <mesh castShadow position={[-0.05, -0.25, 0.1]} >
              <boxGeometry args={[0.2, 0.3, 0.2]} />
              <meshStandardMaterial color={buildingColor} />
            </mesh>

            { showArea && <mesh receiveShadow position={[0, 0, areaZ]} >
              <planeGeometry args={[3, 3]} />
              <meshStandardMaterial color={areaColor} />
            </mesh>}
          </group>
        );
      case BuildingType.REFINERY:
        return (
          <group ref={mesh} position={[position[0], position[1], 0]}>
            <mesh castShadow position={[-0.8, 0.8, 0.2]} rotation={[Math.PI / 2, Math.PI / 4, 0]} >
              <cylinderGeometry args={[0.075, 0.15, 1.25, 16]} />
              <meshStandardMaterial color={buildingColor} />
            </mesh>
            <mesh castShadow position={[-0.5, 0.5, 0.1]} >
              <boxGeometry args={[1, 1, 0.2]} />
              <meshStandardMaterial color={buildingColor} />
            </mesh>
            { showArea && <mesh receiveShadow position={[-0.5, 0.5, areaZ]} >
              <planeGeometry args={[2, 2]} />
              <meshStandardMaterial color={areaColor} />
            </mesh>}
          </group>
        );
      case BuildingType.BARRACKS:
        return (
          <group ref={mesh} position={[position[0], position[1], 0]}>
            <mesh castShadow position={[0.2 / Math.sqrt(3) - 1, 0.5, 0.2 / 3]} rotation={[0, 0, 0]} >
              <cylinderGeometry args={[0.4 / 3, 0.4 / 3, 1, 3]} />
              <meshStandardMaterial color={buildingColor} />
            </mesh>
            <mesh castShadow position={[-0.2 / Math.sqrt(3), 0.5, 0.2 / 3]} rotation={[0, 0, 0]} >
              <cylinderGeometry args={[0.4 / 3, 0.4 / 3, 1, 3]} />
              <meshStandardMaterial color={buildingColor} />
            </mesh>
            <mesh castShadow position={[-0.5, 0.5, 0.2 / 3]} rotation={[0, 0, 0]} >
              <cylinderGeometry args={[0.4 / 3, 0.4 / 3, 1, 3]} />
              <meshStandardMaterial color={buildingColor} />
            </mesh>
            { showArea && <mesh receiveShadow position={[-0.5, 0.5, areaZ]} >
              <planeGeometry args={[2, 2]} />
              <meshStandardMaterial color={areaColor} />
            </mesh>}
          </group>
        );
      case BuildingType.TURRET:
        return (
          <group ref={mesh} position={[position[0], position[1], 0]}>
            <mesh castShadow position={[-0.5, 0.5, 0.2]} rotation={[Math.PI / 2, Math.PI / 4, 0]} >
              <cylinderGeometry args={[0.3, 0.5, 0.4, 4]} />
              <meshStandardMaterial color={buildingColor} />
            </mesh>
            <mesh castShadow position={[-0.25, 0.5, 0.2]} >
              <boxGeometry args={[1, 0.1, 0.1]} />
              <meshStandardMaterial color={buildingColor} />
            </mesh>
            { showArea && <mesh receiveShadow position={[-0.5, 0.5, areaZ]} >
              <planeGeometry args={[2, 2]} />
              <meshStandardMaterial color={areaColor} />
            </mesh>}
          </group>
        );
      case BuildingType.WATCHTOWER:
        return (
          <group ref={mesh} position={[position[0], position[1], 0]}>
            <mesh castShadow position={[0, 0, 0.75]} rotation={[Math.PI / 2, Math.PI / 4, 0]} >
              <cylinderGeometry args={[0.1, 0.2, 1.5, 4]} />
              <meshStandardMaterial color={buildingColor} />
            </mesh>
            { showArea && <mesh receiveShadow position={[0, 0, areaZ]} >
              <planeGeometry args={[1, 1]} />
              <meshStandardMaterial color={areaColor} />
            </mesh>}
          </group>
        );
      default:
        return null;
  }
}