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

/**
 * Three.js mesh component for a building.
 * @param {Number[2]} position: [x, y], describing lower left corner of the building
 * @param {BuildingType} type: enum describing type of building
 * @returns 
 */
export default function Building({ type, position }) {
  const mesh = useRef()  

  switch(type) {
    case BuildingType.NEXUS:
      const NEXUS_HEIGHT = 1.5;
      return (
        <mesh castShadow position={[position[0] + 1, position[1] + 1, NEXUS_HEIGHT / 2]} rotation={[Math.PI / 2, Math.PI / 4, 0]} ref={mesh}>
          <coneGeometry args={[Math.sqrt(2), NEXUS_HEIGHT, 4]} />
          <meshStandardMaterial color={'white'} />
        </mesh>
      );
      case BuildingType.POWER_PLANT:
        return (
          <mesh castShadow position={[position[0] + 0.5, position[1] + 0.5, 0.2]} rotation={[Math.PI / 2, Math.PI / 4, 0]} ref={mesh}>
            <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
            <meshStandardMaterial color={'white'} />
          </mesh>
        );
      case BuildingType.FARM:

        return (
          <>
            {/* Fences */}
            <mesh castShadow position={[position[0] + 0.05, position[1], 0.2]} ref={mesh}>
              <boxGeometry args={[0.1, 2, 0.4]} />
              <meshStandardMaterial color={'white'} />
            </mesh>
            <mesh castShadow position={[position[0] + 1.95, position[1], 0.2]} ref={mesh}>
              <boxGeometry args={[0.1, 2, 0.4]} />
              <meshStandardMaterial color={'white'} />
            </mesh>
            <mesh castShadow position={[position[0] + 1, position[1] - 0.95, 0.2]} ref={mesh}>
              <boxGeometry args={[2, 0.1, 0.4]} />
              <meshStandardMaterial color={'white'} />
            </mesh>
            <mesh castShadow position={[position[0] + 1, position[1] + 0.95, 0.2]} ref={mesh}>
              <boxGeometry args={[2, 0.1, 0.4]} />
              <meshStandardMaterial color={'white'} />
            </mesh>

            {/* Animals */}
            <mesh castShadow position={[position[0] + 0.55, position[1] + 0.15, 0.1]} ref={mesh}>
              <boxGeometry args={[0.3, 0.2, 0.2]} />
              <meshStandardMaterial color={'white'} />
            </mesh>
            <mesh castShadow position={[position[0] + 0.95, position[1] - 0.25, 0.1]} ref={mesh}>
              <boxGeometry args={[0.2, 0.3, 0.2]} />
              <meshStandardMaterial color={'white'} />
            </mesh>
          </>
        );
      default:
        return null;
  }
}